# ✅ Deployment Checklist

## Pre-Deployment

- [x] Smart contract deployed: `0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160`
- [x] All tests passing (7/7)
- [x] Code pushed to GitHub
- [ ] Environment variables documented
- [ ] Render account created
- [ ] Vercel account created

---

## Backend Deployment (Render)

### 1. Create Web Service
- [ ] Connect GitHub repository
- [ ] ⚠️ **IMPORTANT:** Set root directory to `backend`
- [ ] Set build command: `npm install` (NOT `npm run build`)
- [ ] Set start command: `npm start`
- [ ] Choose free plan

### 2. Environment Variables
Copy these to Render:
```
NODE_ENV=production
PORT=10000
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
HEALTH_VAULT_CONTRACT_ADDRESS=0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
PRIVATE_KEY=d60f6f8e3644466ca10b6595030ad0bbdfccbc51159f79af0b98790b1a1706f9
ENCRYPTION_KEY=your_32_character_encryption_key_here_12345
ALLOWED_ORIGINS=https://your-app.vercel.app
```

### 3. Deploy & Test
- [ ] Click "Create Web Service"
- [ ] Wait for deployment
- [ ] Copy backend URL: `https://________.onrender.com`
- [ ] Test: `curl https://________.onrender.com/health`

---

## Frontend Deployment (Vercel)

### 1. Import Project
- [ ] Connect GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### 2. Environment Variables
Copy these to Vercel:
```
VITE_CONTRACT_ADDRESS=0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
VITE_API_URL=https://your-backend.onrender.com
VITE_REOWN_PROJECT_ID=get_from_cloud.reown.com
```

### 3. Deploy & Test
- [ ] Click "Deploy"
- [ ] Wait for deployment
- [ ] Copy frontend URL: `https://________.vercel.app`
- [ ] Visit URL and test

---

## Post-Deployment

### Update CORS
- [ ] Go back to Render
- [ ] Update `ALLOWED_ORIGINS` with Vercel URL
- [ ] Save and redeploy

### Verify Everything Works
- [ ] Frontend loads correctly
- [ ] Can connect MetaMask wallet
- [ ] Can switch to Base Sepolia network
- [ ] Backend API responds
- [ ] Can interact with smart contract

---

## URLs to Save

**Smart Contract:**
- Address: `0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160`
- Explorer: https://sepolia.basescan.org/address/0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160

**Backend:**
- URL: `https://____________.onrender.com`
- Health Check: `https://____________.onrender.com/health`

**Frontend:**
- URL: `https://____________.vercel.app`

---

## Important Notes

⚠️ **Render Free Tier:**
- Spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- Consider upgrading to $7/month for always-on

✅ **Vercel Free Tier:**
- No cold starts
- Global CDN
- Automatic HTTPS
- Perfect for frontend

🔐 **Security:**
- Never commit `.env` files
- Use environment variables for all secrets
- Keep private keys secure
- Use specific CORS origins (not `*`)

