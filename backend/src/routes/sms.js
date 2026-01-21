import express from 'express';
import { sendSMS } from '../config/africastalking.js';

const router = express.Router();

/**
 * Send SMS notification
 * POST /api/sms/send
 * Body: { phoneNumber, message }
 */
router.post('/send', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Phone number and message required' });
    }

    const result = await sendSMS(phoneNumber, message);

    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error('Send SMS error:', error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

/**
 * SMS callback endpoint (for delivery reports)
 * POST /api/sms/callback
 */
router.post('/callback', async (req, res) => {
  try {
    const { id, status, phoneNumber, retryCount } = req.body;

    console.log('SMS Delivery Report:', {
      id,
      status,
      phoneNumber,
      retryCount
    });

    // Handle delivery status
    // In production, update database with delivery status

    res.status(200).send('OK');
  } catch (error) {
    console.error('SMS callback error:', error);
    res.status(500).send('Error');
  }
});

export default router;

