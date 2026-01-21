export const HEALTH_VAULT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x...';

export const HEALTH_VAULT_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "_ipfsHash", "type": "string"}],
    "name": "addRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_recordIndex", "type": "uint256"}],
    "name": "revokeRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
    "name": "requestAccess",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "_requestId", "type": "bytes32"},
      {"internalType": "uint256", "name": "_expiryTime", "type": "uint256"}
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_doctor", "type": "address"}],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_patient", "type": "address"},
      {"internalType": "address", "name": "_doctor", "type": "address"}
    ],
    "name": "hasAccess",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
    "name": "getPatientRecords",
    "outputs": [{
      "components": [
        {"internalType": "string", "name": "ipfsHash", "type": "string"},
        {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
        {"internalType": "bool", "name": "isActive", "type": "bool"}
      ],
      "internalType": "struct HealthVault.MedicalRecord[]",
      "name": "",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_patient", "type": "address"}],
    "name": "getPendingRequests",
    "outputs": [{"internalType": "bytes32[]", "name": "", "type": "bytes32[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "_requestId", "type": "bytes32"}],
    "name": "getAccessRequest",
    "outputs": [{
      "components": [
        {"internalType": "address", "name": "requester", "type": "address"},
        {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
        {"internalType": "bool", "name": "isPending", "type": "bool"},
        {"internalType": "bool", "name": "isGranted", "type": "bool"},
        {"internalType": "uint256", "name": "expiryTime", "type": "uint256"}
      ],
      "internalType": "struct HealthVault.AccessRequest",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "patient", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "ipfsHash", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "bytes32", "name": "requestId", "type": "bytes32"},
      {"indexed": true, "internalType": "address", "name": "patient", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "doctor", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "AccessRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "patient", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "doctor", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "expiryTime", "type": "uint256"}
    ],
    "name": "AccessGranted",
    "type": "event"
  }
];

