# Ubuntu Health Vault - Quick Reference Guide

## 🚀 Quick Commands

### Setup
```bash
# Initial setup (Windows)
.\scripts\setup.ps1

# Initial setup (Linux/Mac)
chmod +x scripts/setup.sh
./scripts/setup.sh

# Manual setup
npm install && npm run install:all
```

### Development
```bash
# Start everything
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend
```

### Smart Contracts
```bash
cd contracts

# Compile
npm run compile

# Test
npm test

# Deploy to Base Sepolia
npm run deploy

# Deploy to local network
npm run deploy:local
```

### Build for Production
```bash
# Build everything
npm run build

# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend

# Build contracts only
npm run build:contracts
```

## 🔑 Environment Variables

### Contracts (.env)
```env
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_api_key
```

### Backend (.env)
```env
PORT=5000
HEALTH_VAULT_CONTRACT_ADDRESS=0x...
AT_API_KEY=your_africas_talking_key
AT_USERNAME=your_username
AT_SHORTCODE=*134*HEALTH#
ENCRYPTION_KEY=32_character_key
```

### Frontend (.env)
```env
VITE_CONTRACT_ADDRESS=0x...
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_API_URL=http://localhost:5000
```

## 📡 API Endpoints

### Records
- `POST /api/records/upload` - Upload medical record
- `GET /api/records/:address` - Get patient records
- `GET /api/records/download/:hash` - Download record

### Access Control
- `POST /api/access/register-phone` - Register phone number
- `POST /api/access/request` - Request access
- `GET /api/access/pending/:address` - Get pending requests
- `GET /api/access/check` - Check access status

### USSD/SMS
- `POST /api/ussd` - USSD callback
- `POST /api/sms/send` - Send SMS
- `POST /api/sms/callback` - SMS delivery report

## 🔐 Smart Contract Functions

### Write Functions
```solidity
addRecord(string ipfsHash)
revokeRecord(uint256 recordIndex)
requestAccess(address patient) returns (bytes32)
grantAccess(bytes32 requestId, uint256 expiryTime)
revokeAccess(address doctor)
```

### Read Functions
```solidity
hasAccess(address patient, address doctor) returns (bool)
getPatientRecords(address patient) returns (MedicalRecord[])
getPendingRequests(address patient) returns (bytes32[])
getAccessRequest(bytes32 requestId) returns (AccessRequest)
```

## 📱 USSD Menu Structure

```
*134*HEALTH#
├── 1. View Pending Access Requests
├── 2. Grant Access
│   ├── Enter Request ID
│   └── Select Duration
│       ├── 1. 24 hours
│       ├── 2. 7 days
│       └── 3. Permanent
├── 3. Revoke Access
├── 4. View My Records
└── 5. Help
```

## 🌐 URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

### Blockchain
- Base Sepolia RPC: https://sepolia.base.org
- Base Sepolia Explorer: https://sepolia.basescan.org
- Base Sepolia Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

### External Services
- WalletConnect: https://cloud.walletconnect.com
- Africa's Talking: https://africastalking.com
- Storacha: https://web3.storage
- BaseScan: https://basescan.org

## 🎨 Design System

### Color Palette (HSL-based)

```css
/* Primary (Teal) */
--primary: 173 80% 40%;
--primary-foreground: 0 0% 100%;

/* Secondary (Amber) */
--secondary: 43 96% 56%;
--secondary-foreground: 26 83% 14%;

/* Accent (Gold) */
--accent: 48 96% 53%;
--accent-foreground: 26 83% 14%;

/* Semantic Colors */
--success: 142 76% 36%;
--warning: 38 92% 50%;
--info: 199 89% 48%;
--destructive: 0 84% 60%;

/* Neutral Colors */
--background: 0 0% 100%;
--foreground: 222 47% 11%;
--card: 0 0% 100%;
--muted: 210 40% 96%;
--border: 214 32% 91%;
```

### Typography

```css
/* Font Families */
font-family: 'Inter', sans-serif;           /* Body text */
font-family: 'Plus Jakarta Sans', sans-serif; /* Headings */
font-family: 'Ubuntu', sans-serif;          /* Fallback */
```

### Component Variants

**Button Variants:**
- `default` - Primary teal button
- `destructive` - Red for dangerous actions
- `outline` - Bordered button
- `secondary` - Amber accent button
- `ghost` - Transparent button
- `link` - Text link style
- `hero` - Large primary CTA
- `heroSecondary` - Large secondary CTA

**Button Sizes:**
- `sm` - Small (h-9)
- `default` - Medium (h-10)
- `lg` - Large (h-11)
- `xl` - Extra large (h-14)
- `icon` - Square icon button

## 🐛 Common Issues & Solutions

### "Cannot find module"
```bash
npm run install:all
```

### "Transaction failed"
- Check you're on Base Sepolia network
- Ensure you have enough ETH for gas
- Verify contract address is correct

### "IPFS upload failed"
- Check W3UP credentials
- Verify email is verified
- Ensure file size < 10MB

### "USSD not working"
- Verify callback URL is accessible
- Check Africa's Talking credentials
- Ensure phone number format: +27XXXXXXXXX

## 📊 File Size Limits

- Medical Records: 10MB max
- Supported Formats: PDF, JPG, PNG
- Encryption Overhead: ~33% increase

## 🔒 Security Best Practices

1. Never commit `.env` files
2. Use strong encryption keys (32+ chars)
3. Rotate API keys regularly
4. Enable 2FA on all services
5. Audit smart contracts before mainnet
6. Use hardware wallets for production
7. Implement rate limiting
8. Monitor for suspicious activity

## 📞 Support Contacts

- Email: support@ubuntuhealthvault.co.za
- USSD: *134*HEALTH#
- GitHub: https://github.com/Thuto42096/UbuntuHealth-Vault

## 🔗 Useful Links

- [Full Documentation](README.md)
- [Setup Guide](SETUP_GUIDE.md)
- [Project Summary](PROJECT_SUMMARY.md)
- [Smart Contract Source](contracts/contracts/HealthVault.sol)

---

**Quick Tip**: Bookmark this page for easy reference during development!

