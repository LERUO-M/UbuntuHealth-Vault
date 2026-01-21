import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

// Contract ABI (simplified - update with full ABI after deployment)
const HEALTH_VAULT_ABI = [
  "function addRecord(string memory _ipfsHash) external",
  "function revokeRecord(uint256 _recordIndex) external",
  "function requestAccess(address _patient) external returns (bytes32)",
  "function grantAccess(bytes32 _requestId, uint256 _expiryTime) external",
  "function revokeAccess(address _doctor) external",
  "function hasAccess(address _patient, address _doctor) external view returns (bool)",
  "function getPatientRecords(address _patient) external view returns (tuple(string ipfsHash, uint256 timestamp, bool isActive)[])",
  "function getPendingRequests(address _patient) external view returns (bytes32[])",
  "function getAccessRequest(bytes32 _requestId) external view returns (tuple(address requester, uint256 timestamp, bool isPending, bool isGranted, uint256 expiryTime))",
  "event RecordAdded(address indexed patient, string ipfsHash, uint256 timestamp)",
  "event AccessRequested(bytes32 indexed requestId, address indexed patient, address indexed doctor, uint256 timestamp)",
  "event AccessGranted(address indexed patient, address indexed doctor, uint256 expiryTime)",
  "event AccessRevoked(address indexed patient, address indexed doctor)"
];

// Provider setup
const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC_URL);

// Wallet setup (for backend operations)
let wallet;
if (process.env.PRIVATE_KEY) {
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
}

// Contract instance
const getContract = (signerOrProvider = provider) => {
  return new ethers.Contract(
    process.env.HEALTH_VAULT_CONTRACT_ADDRESS,
    HEALTH_VAULT_ABI,
    signerOrProvider
  );
};

// Helper function to get contract with wallet
const getContractWithWallet = () => {
  if (!wallet) {
    throw new Error('Wallet not configured');
  }
  return getContract(wallet);
};

export {
  provider,
  wallet,
  getContract,
  getContractWithWallet,
  HEALTH_VAULT_ABI
};

