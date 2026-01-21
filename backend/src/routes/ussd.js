import express from 'express';
import { getContract } from '../config/blockchain.js';

const router = express.Router();

// Session storage for USSD sessions (in production, use Redis or similar)
const sessions = new Map();

/**
 * USSD callback endpoint
 * POST /api/ussd
 * Body: { sessionId, serviceCode, phoneNumber, text }
 */
router.post('/', async (req, res) => {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';
    const textArray = text.split('*');
    const level = textArray.length;

    // Initialize session if not exists
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        phoneNumber,
        stage: 'menu',
        data: {}
      });
    }

    const session = sessions.get(sessionId);

    if (text === '') {
      // Main menu
      response = `CON Welcome to Ubuntu Health Vault
1. View Pending Access Requests
2. Grant Access
3. Revoke Access
4. View My Records
5. Help`;
    } else if (text === '1') {
      // View pending requests
      // In production, fetch from blockchain using phone number mapping
      response = `CON Pending Access Requests:
1. Dr. Smith - General Checkup
2. Dr. Jones - Specialist Consultation
0. Back to Main Menu`;
      session.stage = 'view_requests';
    } else if (text === '2') {
      // Grant access
      response = `CON Enter Request ID to grant access:
(You received this in SMS)
0. Back to Main Menu`;
      session.stage = 'grant_access_input';
    } else if (text.startsWith('2*')) {
      // Process grant access
      const requestId = textArray[1];
      session.data.requestId = requestId;
      
      response = `CON Grant access to request ${requestId.substring(0, 8)}?
1. Grant for 24 hours
2. Grant for 7 days
3. Grant permanent access
0. Cancel`;
      session.stage = 'grant_access_confirm';
    } else if (text.startsWith('2*') && level === 3) {
      // Confirm grant access
      const duration = textArray[2];
      let expiryTime = 0;
      
      if (duration === '1') {
        expiryTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours
      } else if (duration === '2') {
        expiryTime = Math.floor(Date.now() / 1000) + 604800; // 7 days
      }
      
      // In production, execute blockchain transaction here
      response = `END Access granted successfully!
The doctor will be notified via SMS.`;
      
      // Clean up session
      sessions.delete(sessionId);
    } else if (text === '3') {
      // Revoke access
      response = `CON Enter doctor's ID to revoke access:
0. Back to Main Menu`;
      session.stage = 'revoke_access';
    } else if (text === '4') {
      // View records
      response = `CON Your Medical Records:
1. Record from 2024-01-15
2. Record from 2024-01-10
3. Record from 2023-12-20
0. Back to Main Menu`;
      session.stage = 'view_records';
    } else if (text === '5') {
      // Help
      response = `END Ubuntu Health Vault Help:
- Control your medical records
- Grant/revoke doctor access
- Receive notifications via SMS

For support: support@ubuntuhealthvault.co.za
Website: www.ubuntuhealthvault.co.za`;
      sessions.delete(sessionId);
    } else if (text === '0' || textArray[textArray.length - 1] === '0') {
      // Back to main menu
      response = `CON Welcome to Ubuntu Health Vault
1. View Pending Access Requests
2. Grant Access
3. Revoke Access
4. View My Records
5. Help`;
      session.stage = 'menu';
    } else {
      // Invalid input
      response = `CON Invalid option. Please try again.
0. Back to Main Menu`;
    }

    // Set response header
    res.set('Content-Type', 'text/plain');
    res.send(response);

  } catch (error) {
    console.error('USSD error:', error);
    res.set('Content-Type', 'text/plain');
    res.send('END An error occurred. Please try again later.');
  }
});

export default router;

