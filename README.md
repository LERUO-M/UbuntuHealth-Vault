# Ubuntu Health Vault 🏥🔐

> Blockchain-backed medical ID and patient file storage system with USSD/SMS control

**Built for the W3NODE HACKATHON**

Ubuntu Health Vault empowers South African patients to own and control their medical data through blockchain technology, with accessibility via USSD/SMS for universal access.

## 🌟 Features

- **Decentralized Identity (DID)**: Link medical records to blockchain-based identity
- **Encrypted Storage**: Medical records encrypted and stored on IPFS (Storacha)
- **USSD/SMS Control**: Manage access via *134*HEALTH# - no smartphone required
- **Access Control**: Grant/revoke doctor access with time-based permissions
- **Blockchain Security**: Immutable access logs on Base Sepolia
- **Modern Web App**: Clean, professional React interface

## 🏗️ Architecture

```
┌─────────────────┐
│   React App     │  ← Patient & Doctor Portals
│   (Frontend)    │
└────────┬────────┘
         │
┌────────▼────────┐
│   Node.js API   │  ← Backend API
│   (Backend)     │
└─┬──────┬───────┬┘
  │      │       │
  │      │       └──────────┐
  │      │                  │
┌─▼──────▼─┐    ┌──────────▼────────┐
│  Base    │    │  Africa's Talking │
│ Sepolia  │    │   (USSD/SMS)      │
│Blockchain│    └───────────────────┘
└──────────┘
     │
┌────▼─────┐
│   IPFS   │  ← Encrypted file storage
│(Storacha)│
└──────────┘
```

## 🛠️ Tech Stack

- **Frontend**: React + Vite, TailwindCSS, shadcn/ui, Reown AppKit, Wagmi, Framer Motion
- **Backend**: Node.js + Express
- **Blockchain**: Base Sepolia (Ethereum L2)
- **Smart Contracts**: Solidity + Hardhat
- **Storage**: IPFS via Storacha (web3.storage)
- **USSD/SMS**: Africa's Talking API
- **Encryption**: AES-256

## 📦 Project Structure

```
ubuntu-health-vault/
├── frontend/          # React web application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   │   ├── button.jsx
│   │   │   │   └── card.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── NetworkVisualization.jsx
│   │   │   ├── WorkflowSection.jsx
│   │   │   ├── PortalsSection.jsx
│   │   │   ├── TechStackSection.jsx
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   └── DoctorDashboard.jsx
│   │   ├── lib/
│   │   │   └── utils.js      # Utility functions
│   │   ├── config/
│   │   └── App.jsx
│   ├── tailwind.config.js    # Tailwind + design tokens
│   ├── index.css             # Global styles & CSS variables
│   └── package.json
├── backend/           # Node.js API server
│   ├── src/
│   │   ├── routes/
│   │   ├── config/
│   │   └── index.js
│   └── package.json
├── contracts/         # Smart contracts
│   ├── contracts/
│   │   └── HealthVault.sol
│   ├── scripts/
│   └── hardhat.config.js
└── package.json       # Root workspace config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Base Sepolia testnet ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thuto42096/UbuntuHealth-Vault.git
   cd UbuntuHealth-Vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Configure environment variables**

   **Contracts** (`contracts/.env`):
   ```bash
   cp contracts/.env.example contracts/.env
   # Edit contracts/.env with your values
   ```

   **Backend** (`backend/.env`):
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your values
   ```

   **Frontend** (`frontend/.env`):
   ```bash
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your values
   ```

4. **Deploy Smart Contracts**
   ```bash
   cd contracts
   npm run compile
   npm run deploy
   # Copy the deployed contract address to backend/.env and frontend/.env
   ```

5. **Start the development servers**
   ```bash
   # From root directory
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📱 USSD Usage

Patients can manage their medical records via USSD by dialing:

```
*134*HEALTH#
```

### USSD Menu:
1. View Pending Access Requests
2. Grant Access
3. Revoke Access
4. View My Records
5. Help

## 🔐 Security Features

- **End-to-End Encryption**: All medical records are encrypted before upload
- **Blockchain Immutability**: Access logs cannot be tampered with
- **Time-Based Access**: Grant temporary access that auto-expires
- **Decentralized Storage**: No single point of failure
- **User Control**: Patients have complete control over their data

## 🧪 Testing

### Smart Contracts
```bash
cd contracts
npm test
```

### Run Local Blockchain
```bash
cd contracts
npx hardhat node
```

## 📝 API Endpoints

### Records
- `POST /api/records/upload` - Upload medical record
- `GET /api/records/:patientAddress` - Get patient records
- `GET /api/records/download/:ipfsHash` - Download record

### Access Control
- `POST /api/access/register-phone` - Register phone for USSD
- `POST /api/access/request` - Request access to records
- `GET /api/access/pending/:patientAddress` - Get pending requests
- `GET /api/access/check` - Check access status

### USSD/SMS
- `POST /api/ussd` - USSD callback endpoint
- `POST /api/sms/send` - Send SMS notification

## 🌍 South African Context

Ubuntu Health Vault is designed specifically for South Africa:

- **USSD Access**: Works on any phone, even basic feature phones
- **Affordable**: No data costs for USSD interactions
- **Inclusive**: Accessible to all South Africans regardless of smartphone ownership
- **Ubuntu Philosophy**: "I am because we are" - community-focused healthcare

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 👥 Team

Ubuntu Health Vault - A South African Startup

## 🙏 Acknowledgments

- W3NODE HACKATHON
- Base (Coinbase L2)
- Africa's Talking
- Storacha (web3.storage)
- OpenZeppelin

## 📞 Support

- Email: support@ubuntuhealthvault.co.za
- USSD: *134*HEALTH#
- Website: www.ubuntuhealthvault.co.za

---

**Built with ❤️ in South Africa 🇿🇦**
