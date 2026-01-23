# 🚀 Deployment Guide - Render + Vercel

This guide walks you through deploying the Ubuntu Health Vault application with:
- **Backend** on Render.com (Node.js API)
- **Frontend** on Vercel.com (React/Vite)

---

## 📋 Prerequisites

- [x] Smart contract deployed to Base Sepolia
- [x] GitHub repository with your code
- [ ] Render.com account (free)
- [ ] Vercel.com account (free)
- [ ] Environment variables ready

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended for auto-deploy)
3. Authorize Render to access your repository

### Step 2: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `LERUO-M/UbuntuHealth-Vault`
3. Configure the service:
   - **Name:** `ubuntu-health-vault-api`
   - **Region:** Oregon (or closest to you)
   - **Branch:** `main`
   - **Root Directory:** `backend` ⚠️ **IMPORTANT!**
   - **Runtime:** Node
   - **Build Command:** `npm install` (NOT `npm run build`)
   - **Start Command:** `npm start`
   - **Plan:** Free
   - **Auto-Deploy:** Yes

### Step 3: Add Environment Variables

In Render dashboard, go to **Environment** tab and add:

**Required Variables:**
```bash
NODE_ENV=production
PORT=10000
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
HEALTH_VAULT_CONTRACT_ADDRESS=0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
PRIVATE_KEY=d60f6f8e3644466ca10b6595030ad0bbdfccbc51159f79af0b98790b1a1706f9
ENCRYPTION_KEY=your_32_character_encryption_key_here_12345
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

**Optional Variables (for SMS/USSD features):**
```bash
AT_API_KEY=your_africas_talking_api_key
AT_USERNAME=your_africas_talking_username
AT_SHORTCODE=your_ussd_shortcode
W3UP_EMAIL=your_email@example.com
W3UP_SPACE_DID=your_space_did_here
```

**Important:**
- Update `ALLOWED_ORIGINS` after deploying frontend!
- SMS/USSD features will be disabled if Africa's Talking credentials are not provided

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your API will be live at: `https://ubuntu-health-vault-api.onrender.com`

**Note:** Copy this URL - you'll need it for the frontend!

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repository

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import `LERUO-M/UbuntuHealth-Vault`
3. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

```bash
VITE_CONTRACT_ADDRESS=0x9582Ef0BDaDfca9F44D0CF9DCA4c333Dd013C160
VITE_API_URL=https://ubuntu-health-vault-api.onrender.com
VITE_REOWN_PROJECT_ID=your_reown_project_id_here
```

**Get Reown Project ID:**
1. Go to https://cloud.reown.com
2. Create account and new project
3. Copy the Project ID

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Your app will be live at: `https://ubuntu-health-vault.vercel.app`

---

## 🔄 Part 3: Update CORS Settings

### Update Backend ALLOWED_ORIGINS

1. Go back to Render dashboard
2. Navigate to your web service
3. Go to **Environment** tab
4. Update `ALLOWED_ORIGINS`:
   ```
   https://ubuntu-health-vault.vercel.app,https://your-custom-domain.com
   ```
5. Save changes (this will trigger a redeploy)

---

## ✅ Part 4: Verify Deployment

### Test Backend API

```bash
curl https://ubuntu-health-vault-api.onrender.com/health
```

Should return: `{"status": "ok"}`

### Test Frontend

1. Visit your Vercel URL
2. Connect your MetaMask wallet
3. Switch to Base Sepolia network
4. Try uploading a medical record

---

## 🌐 Part 5: Custom Domains (Optional)

### Add Custom Domain to Vercel

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain (e.g., `healthvault.yourdomain.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Add Custom Domain to Render

1. Go to Render service → **Settings** → **Custom Domain**
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Update CORS After Custom Domain

Update `ALLOWED_ORIGINS` in Render to include your custom domain:
```
https://healthvault.yourdomain.com
```

---

## 🔐 Security Checklist

- [ ] All environment variables are set correctly
- [ ] CORS is configured with specific origins (not `*`)
- [ ] Private keys are stored as environment variables (not in code)
- [ ] `.env` files are in `.gitignore`
- [ ] HTTPS is enabled (automatic on Render & Vercel)
- [ ] Rate limiting is enabled in backend
- [ ] Helmet.js is configured for security headers

---

## 📊 Monitoring & Logs

### Render Logs

1. Go to your service dashboard
2. Click **"Logs"** tab
3. View real-time logs and errors

### Vercel Logs

1. Go to your project dashboard
2. Click **"Deployments"**
3. Click on a deployment → **"View Function Logs"**

---

## 🔄 Auto-Deploy Setup

Both platforms support automatic deployment:

### Render Auto-Deploy

- Automatically deploys when you push to `main` branch
- Configure in **Settings** → **Build & Deploy**

### Vercel Auto-Deploy

- Automatically deploys on every push
- Preview deployments for pull requests
- Configure in **Settings** → **Git**

---

## 💰 Cost Breakdown

### Free Tier Limits

**Render Free Tier:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic SSL
- ⚠️ Spins down after 15 min of inactivity (cold starts)
- ⚠️ 512 MB RAM

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ No cold starts

### Upgrade Options

If you need more:
- **Render:** $7/month for always-on service
- **Vercel:** $20/month for Pro features

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Service won't start
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure `npm start` works locally

**Problem:** CORS errors
- Update `ALLOWED_ORIGINS` with exact frontend URL
- Include `https://` in the URL
- Redeploy after changing environment variables

### Frontend Issues

**Problem:** Can't connect to backend
- Verify `VITE_API_URL` is correct
- Check if backend is running (visit `/health` endpoint)
- Check browser console for errors

**Problem:** Contract not found
- Verify `VITE_CONTRACT_ADDRESS` is correct
- Ensure you're on Base Sepolia network in MetaMask
- Check contract exists on BaseScan

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Base Docs:** https://docs.base.org
- **Project Issues:** https://github.com/LERUO-M/UbuntuHealth-Vault/issues

---

## 🎯 Next Steps After Deployment

1. [ ] Test all features in production
2. [ ] Set up monitoring (e.g., Sentry, LogRocket)
3. [ ] Configure custom domains
4. [ ] Set up analytics (e.g., Google Analytics, Plausible)
5. [ ] Create user documentation
6. [ ] Plan for scaling (upgrade from free tier if needed)

