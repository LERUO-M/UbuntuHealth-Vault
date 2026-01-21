import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
  console.warn('Warning: ENCRYPTION_KEY not set or too short. Using default (NOT SECURE FOR PRODUCTION)');
}

/**
 * Encrypt data using AES encryption
 * @param {Buffer|string} data - Data to encrypt
 * @returns {string} - Encrypted data as base64 string
 */
function encrypt(data) {
  try {
    const dataString = Buffer.isBuffer(data) ? data.toString('base64') : data;
    const encrypted = CryptoJS.AES.encrypt(dataString, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

/**
 * Decrypt data using AES encryption
 * @param {string} encryptedData - Encrypted data as base64 string
 * @param {boolean} returnBuffer - Whether to return Buffer instead of string
 * @returns {string|Buffer} - Decrypted data
 */
function decrypt(encryptedData, returnBuffer = false) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (returnBuffer) {
      return Buffer.from(decryptedString, 'base64');
    }
    
    return decryptedString;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}

/**
 * Encrypt file buffer
 * @param {Buffer} fileBuffer - File buffer to encrypt
 * @returns {Buffer} - Encrypted file buffer
 */
function encryptFile(fileBuffer) {
  const encrypted = encrypt(fileBuffer);
  return Buffer.from(encrypted, 'utf8');
}

/**
 * Decrypt file buffer
 * @param {Buffer} encryptedBuffer - Encrypted file buffer
 * @returns {Buffer} - Decrypted file buffer
 */
function decryptFile(encryptedBuffer) {
  const encryptedString = encryptedBuffer.toString('utf8');
  return decrypt(encryptedString, true);
}

export {
  encrypt,
  decrypt,
  encryptFile,
  decryptFile
};

