# 🚀 Deployment Information

## Smart Contract Deployment

**Network:** Base Sepolia Testnet  
**Contract Address:** `0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160`  
**Deployer Address:** `0x6dd0A0a894dC8632a177dFC13be0bDAdD08036CA`  
**Deployment Date:** January 23, 2026

---

## 🔗 Links

- **BaseScan Explorer:** https://sepolia.basescan.org/address/0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
- **Network:** Base Sepolia (Chain ID: 84532)
- **RPC URL:** https://sepolia.base.org

---

## ✅ Completed Steps

- [x] Smart contract compiled
- [x] All tests passing (7/7)
- [x] Contract deployed to Base Sepolia
- [x] ABI copied to frontend and backend
- [ ] Contract verified on Etherscan
- [ ] Backend `.env` updated with contract address
- [ ] Frontend `.env` updated with contract address

---

## 📋 Next Steps

### 1. Verify Contract on Etherscan

```bash
cd contracts
npx hardhat verify --network baseSepolia 0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
```

**Requirements:**
- Etherscan API key in `contracts/.env`
- Get your API key from: https://etherscan.io/myapikey

---

### 2. Update Backend Configuration

Edit `backend/.env`:

```bash
# Blockchain Configuration
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
HEALTH_VAULT_CONTRACT_ADDRESS=0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
PRIVATE_KEY=d60f6f8e3644466ca10b6595030ad0bbdfccbc51159f79af0b98790b1a1706f9
```

---

### 3. Update Frontend Configuration

Edit `frontend/.env`:

```bash
# Contract Address
VITE_CONTRACT_ADDRESS=0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160

# API URL
VITE_API_URL=http://localhost:5000

# Reown Project ID (get from https://cloud.reown.com)
VITE_REOWN_PROJECT_ID=your_project_id_here
```

---

### 4. Test the Application

Start the development servers:

```bash
# From project root
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🔐 Security Notes

⚠️ **IMPORTANT:** This deployment uses a testnet wallet for development only.

**Testnet Wallet:**
- Address: `0x6dd0A0a894dC8632a177dFC13be0bDAdD08036CA`
- **NEVER use this wallet on mainnet**
- **NEVER commit `.env` files to git**

**For Production Deployment:**
1. Create a new wallet specifically for production
2. Use a hardware wallet or secure key management system
3. Deploy to Base Mainnet (not Sepolia)
4. Conduct a security audit
5. Set up monitoring and alerts

---

## 📊 Contract Functions

The deployed HealthVault contract includes:

**Medical Records:**
- `addRecord(string ipfsHash)` - Add a medical record
- `revokeRecord(uint256 recordIndex)` - Revoke a record
- `getPatientRecords(address patient)` - Get all patient records

**Access Control:**
- `requestAccess(address patient)` - Doctor requests access
- `grantAccess(bytes32 requestId, uint256 expiryTime)` - Patient grants access
- `revokeAccess(address doctor)` - Patient revokes access
- `hasAccess(address patient, address doctor)` - Check if doctor has access
- `getPendingRequests(address patient)` - Get pending access requests

---

## 🛠️ Useful Commands

```bash
# Check deployer wallet balance
npx hardhat run --network baseSepolia scripts/check-balance.js

# Verify contract
npx hardhat verify --network baseSepolia 0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160

# Copy ABI to frontend/backend
node scripts/copy-abi.js

# Run tests
npm test

# Compile contracts
npm run compile
```

---

## 📞 Support

- **Base Documentation:** https://docs.base.org
- **Base Discord:** https://discord.gg/buildonbase
- **Hardhat Documentation:** https://hardhat.org/docs

