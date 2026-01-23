import AfricasTalking from 'africastalking';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Africa's Talking only if credentials are provided
let africastalking, sms, ussd;

if (process.env.AT_API_KEY && process.env.AT_USERNAME) {
  try {
    africastalking = AfricasTalking({
      apiKey: process.env.AT_API_KEY,
      username: process.env.AT_USERNAME
    });

    // Get SMS and USSD services
    sms = africastalking.SMS;
    ussd = africastalking.USSD;

    console.log('✅ Africa\'s Talking initialized successfully');
  } catch (error) {
    console.error('⚠️ Failed to initialize Africa\'s Talking:', error.message);
  }
} else {
  console.warn('⚠️ Africa\'s Talking credentials not found. SMS/USSD features will be disabled.');
}

/**
 * Send SMS notification
 * @param {string} phoneNumber - Recipient phone number (format: +27...)
 * @param {string} message - SMS message
 */
async function sendSMS(phoneNumber, message) {
  if (!sms) {
    console.warn('SMS service not configured. Skipping SMS to:', phoneNumber);
    return {
      success: false,
      message: 'SMS service not configured',
      SMSMessageData: { Recipients: [] }
    };
  }

  try {
    const result = await sms.send({
      to: [phoneNumber],
      message: message,
      from: process.env.AT_SHORTCODE
    });

    console.log('SMS sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

/**
 * Send access request notification via SMS
 * @param {string} phoneNumber - Patient's phone number
 * @param {string} doctorName - Name of the requesting doctor
 * @param {string} requestId - Access request ID
 */
async function sendAccessRequestNotification(phoneNumber, doctorName, requestId) {
  const message = `Ubuntu Health Vault: Dr. ${doctorName} has requested access to your medical records. ` +
    `Reply with *134*HEALTH# to approve or deny. Request ID: ${requestId.substring(0, 8)}`;
  
  return sendSMS(phoneNumber, message);
}

/**
 * Send access granted confirmation via SMS
 * @param {string} phoneNumber - Doctor's phone number
 * @param {string} patientName - Name of the patient
 */
async function sendAccessGrantedNotification(phoneNumber, patientName) {
  const message = `Ubuntu Health Vault: ${patientName} has granted you access to their medical records. ` +
    `Login to the portal to view.`;
  
  return sendSMS(phoneNumber, message);
}

/**
 * Send access revoked notification via SMS
 * @param {string} phoneNumber - Doctor's phone number
 * @param {string} patientName - Name of the patient
 */
async function sendAccessRevokedNotification(phoneNumber, patientName) {
  const message = `Ubuntu Health Vault: ${patientName} has revoked your access to their medical records.`;
  
  return sendSMS(phoneNumber, message);
}

export {
  sms,
  ussd,
  sendSMS,
  sendAccessRequestNotification,
  sendAccessGrantedNotification,
  sendAccessRevokedNotification
};

