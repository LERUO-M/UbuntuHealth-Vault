# Ubuntu Health Vault - Setup Guide

This guide will walk you through setting up the Ubuntu Health Vault system from scratch.

## Prerequisites

Before you begin, ensure you have:

- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] MetaMask wallet installed
- [ ] Base Sepolia testnet configured in MetaMask
- [ ] Base Sepolia ETH from [faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

## Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

## Step 2: Get API Keys

### 2.1 WalletConnect Project ID
1. Go to https://cloud.walletconnect.com
2. Create a new project
3. Copy your Project ID

### 2.2 Africa's Talking API
1. Sign up at https://africastalking.com
2. Create a new app
3. Get your API Key and Username
4. Set up a USSD shortcode (e.g., *134*HEALTH#)

### 2.3 Storacha (web3.storage)
1. Sign up at https://web3.storage
2. Create a space
3. Note your space DID

### 2.4 BaseScan API Key (Optional)
1. Go to https://basescan.org
2. Create an account
3. Generate an API key for contract verification

## Step 3: Configure Environment Variables

### 3.1 Smart Contracts

Create `contracts/.env`:
```env
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_wallet_private_key_here
BASESCAN_API_KEY=your_basescan_api_key
```

⚠️ **Never commit your private key!**

### 3.2 Backend

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development

BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
HEALTH_VAULT_CONTRACT_ADDRESS=will_be_filled_after_deployment
PRIVATE_KEY=your_wallet_private_key

W3UP_EMAIL=your_email@example.com
W3UP_SPACE_DID=your_space_did

AT_API_KEY=your_africas_talking_api_key
AT_USERNAME=your_africas_talking_username
AT_SHORTCODE=your_ussd_shortcode

ENCRYPTION_KEY=your_32_character_encryption_key_here_12345

ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3.3 Frontend

Create `frontend/.env`:
```env
VITE_CONTRACT_ADDRESS=will_be_filled_after_deployment
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_API_URL=http://localhost:5000
```

## Step 4: Deploy Smart Contracts

```bash
cd contracts

# Compile contracts
npm run compile

# Run tests (optional but recommended)
npm test

# Deploy to Base Sepolia
npm run deploy

# Copy the deployed contract address
# Update HEALTH_VAULT_CONTRACT_ADDRESS in backend/.env
# Update VITE_CONTRACT_ADDRESS in frontend/.env
```

## Step 5: Initialize IPFS Client

The backend uses Storacha (web3.storage) for IPFS storage. On first run:

1. The system will prompt you to verify your email
2. Check your email and click the verification link
3. The client will be authorized

## Step 6: Configure Africa's Talking USSD

1. Log in to Africa's Talking dashboard
2. Go to USSD → Create Channel
3. Set the callback URL to: `https://your-domain.com/api/ussd`
4. For local testing, use ngrok:
   ```bash
   ngrok http 5000
   # Use the ngrok URL as callback
   ```

## Step 7: Start Development Servers

From the root directory:

```bash
# Start both frontend and backend
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Step 8: Test the Application

### 8.1 Connect Wallet
1. Open http://localhost:5173
2. Click "Connect Wallet"
3. Select MetaMask
4. Ensure you're on Base Sepolia network

### 8.2 Patient Flow
1. Go to Patient Portal
2. Register your phone number (+27XXXXXXXXX)
3. Upload a test medical record (PDF or image)
4. Confirm the transaction in MetaMask
5. Wait for confirmation

### 8.3 Doctor Flow
1. Open a new incognito window or use a different wallet
2. Go to Doctor Portal
3. Enter patient's wallet address
4. Request access
5. Patient will receive SMS notification

### 8.4 USSD Flow (Requires Africa's Talking setup)
1. Dial *134*HEALTH# from registered phone
2. Navigate the menu
3. Grant or revoke access

## Troubleshooting

### Contract Deployment Fails
- Ensure you have enough Base Sepolia ETH
- Check your RPC URL is correct
- Verify your private key is valid

### IPFS Upload Fails
- Verify your W3UP credentials
- Check email verification
- Ensure file size is under 10MB

### USSD Not Working
- Verify callback URL is accessible
- Check Africa's Talking API credentials
- Ensure phone number is in correct format (+27...)

### Transaction Fails
- Check you're on Base Sepolia network
- Ensure you have enough ETH for gas
- Verify contract address is correct

## Production Deployment

### Backend
1. Deploy to a cloud provider (AWS, Google Cloud, Heroku)
2. Set up environment variables
3. Configure SSL/HTTPS
4. Set up monitoring and logging

### Frontend
1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy to Vercel, Netlify, or similar
3. Update CORS settings in backend

### Smart Contracts
1. Deploy to Base Mainnet
2. Verify contracts on BaseScan
3. Update contract addresses in frontend and backend

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use strong encryption keys (32+ characters)
- [ ] Enable rate limiting in production
- [ ] Set up proper CORS policies
- [ ] Use HTTPS in production
- [ ] Regularly update dependencies
- [ ] Audit smart contracts before mainnet deployment
- [ ] Implement proper access controls
- [ ] Set up monitoring and alerts
- [ ] Regular security audits

## Next Steps

1. Customize the UI with your branding
2. Add more medical record types
3. Implement advanced access controls
4. Add analytics and reporting
5. Integrate with existing healthcare systems
6. Conduct security audit
7. Get user feedback
8. Scale infrastructure

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the logs
3. Open an issue on GitHub
4. Contact support@ubuntuhealthvault.co.za

---

**Happy Building! 🚀**

