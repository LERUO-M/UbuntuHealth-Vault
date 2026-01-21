import express from 'express';
import multer from 'multer';
import { getContract } from '../config/blockchain.js';
import { uploadToIPFS, retrieveFromIPFS } from '../config/ipfs.js';
import { encryptFile, decryptFile } from '../utils/encryption.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Upload a medical record
 * POST /api/records/upload
 * Body: file (multipart/form-data), patientAddress
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { patientAddress } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    if (!patientAddress) {
      return res.status(400).json({ error: 'Patient address required' });
    }

    // Encrypt the file
    const encryptedFile = encryptFile(file.buffer);

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(encryptedFile, file.originalname);

    // Store hash on blockchain (this would be called from frontend with user's wallet)
    // Here we just return the hash for the frontend to submit
    res.json({
      success: true,
      ipfsHash,
      message: 'File encrypted and uploaded to IPFS. Please confirm transaction in your wallet.'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
});

/**
 * Get patient's medical records
 * GET /api/records/:patientAddress
 */
router.get('/:patientAddress', async (req, res) => {
  try {
    const { patientAddress } = req.params;
    const contract = getContract();

    // Get records from blockchain
    const records = await contract.getPatientRecords(patientAddress);

    // Format records
    const formattedRecords = records.map((record, index) => ({
      index,
      ipfsHash: record.ipfsHash,
      timestamp: Number(record.timestamp),
      isActive: record.isActive
    }));

    res.json({
      success: true,
      records: formattedRecords
    });
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({ error: 'Failed to get records', details: error.message });
  }
});

/**
 * Download and decrypt a medical record
 * GET /api/records/download/:ipfsHash
 * Query: requesterAddress, patientAddress
 */
router.get('/download/:ipfsHash', async (req, res) => {
  try {
    const { ipfsHash } = req.params;
    const { requesterAddress, patientAddress } = req.query;

    if (!requesterAddress || !patientAddress) {
      return res.status(400).json({ error: 'Requester and patient addresses required' });
    }

    // Check access rights
    const contract = getContract();
    const hasAccess = await contract.hasAccess(patientAddress, requesterAddress);

    if (!hasAccess && requesterAddress.toLowerCase() !== patientAddress.toLowerCase()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Retrieve from IPFS
    const encryptedFile = await retrieveFromIPFS(ipfsHash);

    // Decrypt file
    const decryptedFile = decryptFile(encryptedFile);

    // Send file
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="medical-record-${ipfsHash.substring(0, 8)}.pdf"`
    });
    res.send(decryptedFile);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file', details: error.message });
  }
});

export default router;

