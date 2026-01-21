import express from 'express';
import { getContract } from '../config/blockchain.js';
import { sendAccessRequestNotification, sendAccessGrantedNotification } from '../config/africastalking.js';

const router = express.Router();

// In-memory store for user phone numbers (in production, use a database)
const userPhoneNumbers = new Map();

/**
 * Register user phone number
 * POST /api/access/register-phone
 * Body: { address, phoneNumber }
 */
router.post('/register-phone', async (req, res) => {
  try {
    const { address, phoneNumber } = req.body;

    if (!address || !phoneNumber) {
      return res.status(400).json({ error: 'Address and phone number required' });
    }

    // Validate South African phone number format
    const phoneRegex = /^\+27[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format. Use +27XXXXXXXXX' 
      });
    }

    userPhoneNumbers.set(address.toLowerCase(), phoneNumber);

    res.json({
      success: true,
      message: 'Phone number registered successfully'
    });
  } catch (error) {
    console.error('Register phone error:', error);
    res.status(500).json({ error: 'Failed to register phone number' });
  }
});

/**
 * Request access to patient records
 * POST /api/access/request
 * Body: { doctorAddress, patientAddress, doctorName }
 */
router.post('/request', async (req, res) => {
  try {
    const { doctorAddress, patientAddress, doctorName } = req.body;

    if (!doctorAddress || !patientAddress || !doctorName) {
      return res.status(400).json({ 
        error: 'Doctor address, patient address, and doctor name required' 
      });
    }

    // This would typically be done via the frontend with user's wallet
    // Here we return the data needed for the transaction
    const patientPhone = userPhoneNumbers.get(patientAddress.toLowerCase());

    res.json({
      success: true,
      message: 'Access request initiated. Patient will be notified.',
      hasPhoneNumber: !!patientPhone
    });

    // Send SMS notification if phone number is registered
    if (patientPhone) {
      // Note: requestId would come from the blockchain transaction
      const mockRequestId = `0x${Date.now().toString(16)}`;
      await sendAccessRequestNotification(patientPhone, doctorName, mockRequestId);
    }
  } catch (error) {
    console.error('Request access error:', error);
    res.status(500).json({ error: 'Failed to request access' });
  }
});

/**
 * Get pending access requests for a patient
 * GET /api/access/pending/:patientAddress
 */
router.get('/pending/:patientAddress', async (req, res) => {
  try {
    const { patientAddress } = req.params;
    const contract = getContract();

    const requestIds = await contract.getPendingRequests(patientAddress);

    // Get details for each request
    const requests = await Promise.all(
      requestIds.map(async (requestId) => {
        const request = await contract.getAccessRequest(requestId);
        return {
          requestId,
          requester: request.requester,
          timestamp: Number(request.timestamp),
          isPending: request.isPending,
          isGranted: request.isGranted
        };
      })
    );

    res.json({
      success: true,
      requests: requests.filter(r => r.isPending)
    });
  } catch (error) {
    console.error('Get pending requests error:', error);
    res.status(500).json({ error: 'Failed to get pending requests' });
  }
});

/**
 * Check if doctor has access to patient records
 * GET /api/access/check
 * Query: patientAddress, doctorAddress
 */
router.get('/check', async (req, res) => {
  try {
    const { patientAddress, doctorAddress } = req.query;

    if (!patientAddress || !doctorAddress) {
      return res.status(400).json({ 
        error: 'Patient and doctor addresses required' 
      });
    }

    const contract = getContract();
    const hasAccess = await contract.hasAccess(patientAddress, doctorAddress);

    res.json({
      success: true,
      hasAccess
    });
  } catch (error) {
    console.error('Check access error:', error);
    res.status(500).json({ error: 'Failed to check access' });
  }
});

export default router;

