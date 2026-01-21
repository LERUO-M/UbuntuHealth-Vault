import { create } from '@web3-storage/w3up-client';
import dotenv from 'dotenv';

dotenv.config();

let client;

/**
 * Initialize the W3UP client for Storacha (web3.storage)
 */
async function initIPFSClient() {
  try {
    client = await create();
    
    // Login with email (you'll need to verify via email first)
    // This is typically done once during setup
    if (process.env.W3UP_EMAIL) {
      console.log('IPFS client initialized');
      // Note: In production, you'd use a delegated proof instead of email login
    }
    
    return client;
  } catch (error) {
    console.error('Failed to initialize IPFS client:', error);
    throw error;
  }
}

/**
 * Upload encrypted file to IPFS
 * @param {Buffer} fileBuffer - The encrypted file buffer
 * @param {string} fileName - Name of the file
 * @returns {Promise<string>} - IPFS CID
 */
async function uploadToIPFS(fileBuffer, fileName) {
  try {
    if (!client) {
      await initIPFSClient();
    }
    
    const file = new File([fileBuffer], fileName);
    const cid = await client.uploadFile(file);
    
    console.log(`File uploaded to IPFS: ${cid}`);
    return cid.toString();
  } catch (error) {
    console.error('Failed to upload to IPFS:', error);
    throw error;
  }
}

/**
 * Retrieve file from IPFS
 * @param {string} cid - IPFS CID
 * @returns {Promise<Buffer>} - File buffer
 */
async function retrieveFromIPFS(cid) {
  try {
    // Using public gateway for retrieval
    const response = await fetch(`https://w3s.link/ipfs/${cid}`);
    
    if (!response.ok) {
      throw new Error(`Failed to retrieve file: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to retrieve from IPFS:', error);
    throw error;
  }
}

export {
  initIPFSClient,
  uploadToIPFS,
  retrieveFromIPFS
};

