# 🔄 Migration to Reown AppKit

This document outlines the migration from RainbowKit to Reown AppKit (formerly WalletConnect).

## ✅ What Changed

### 1. **Package Dependencies**
- ❌ Removed: `@rainbow-me/rainbowkit`
- ✅ Added: `@reown/appkit` and `@reown/appkit-adapter-wagmi`

### 2. **Configuration (`src/config/wagmi.js`)**
- Replaced `getDefaultConfig` from RainbowKit with `WagmiAdapter` from Reown
- Networks now imported from `@reown/appkit/networks`
- Added metadata configuration for better app identification

### 3. **Provider Setup (`src/main.jsx`)**
- Removed `RainbowKitProvider` wrapper
- Added `createAppKit()` call to initialize the modal
- Configured custom theme with Ubuntu orange accent color (#E95420)
- Simplified provider structure

### 4. **Connect Button (`src/components/Layout.jsx`)**
- Replaced `<ConnectButton />` from RainbowKit
- Created custom button using `useAppKit()` and `useAccount()` hooks
- Maintains same visual style with Ubuntu branding

### 5. **Environment Variables (`.env.example`)**
- Renamed: `VITE_WALLETCONNECT_PROJECT_ID` → `VITE_REOWN_PROJECT_ID`
- Updated URL reference: `cloud.walletconnect.com` → `cloud.reown.com`

## 🚀 Installation Steps

Run the following command in the `frontend` directory:

```bash
npm install
```

This will install the new Reown AppKit packages as specified in `package.json`.

## 🔑 Getting Your Reown Project ID

1. Visit [https://cloud.reown.com](https://cloud.reown.com)
2. Create a new project or use an existing one
3. Copy your Project ID
4. Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

5. Update the `.env` file with your actual Project ID:

```env
VITE_REOWN_PROJECT_ID=your_actual_project_id_here
```

## 🎨 Features Retained

All existing functionality is preserved:
- ✅ Wallet connection (MetaMask, WalletConnect, Coinbase, etc.)
- ✅ Account display and management
- ✅ Network switching (Base Sepolia)
- ✅ Custom Ubuntu orange branding
- ✅ Mobile responsive design
- ✅ All Wagmi hooks work the same way

## 🆕 New Features Available

Reown AppKit provides additional features you can explore:
- Enhanced wallet discovery
- Improved mobile experience
- Better analytics (enabled by default)
- More customization options
- Future-proof updates from Reown

## 🧪 Testing

After installation, test the following:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test wallet connection:**
   - Click "Connect Wallet" button
   - Verify modal opens correctly
   - Connect with your preferred wallet
   - Verify address displays correctly

3. **Test wallet interactions:**
   - Navigate to Patient/Doctor portals
   - Verify smart contract interactions work
   - Test transaction signing

## 📚 Additional Resources

- [Reown AppKit Documentation](https://docs.reown.com/appkit/react/core/installation)
- [Reown Dashboard](https://cloud.reown.com)
- [Migration Guide](https://docs.reown.com/appkit/migration)

## 🐛 Troubleshooting

### Issue: "Module not found" errors
**Solution:** Run `npm install` to ensure all packages are installed.

### Issue: Modal doesn't open
**Solution:** Verify your `VITE_REOWN_PROJECT_ID` is set correctly in `.env`.

### Issue: Styling looks different
**Solution:** The custom theme is configured in `main.jsx`. Adjust `themeVariables` as needed.

## 💡 Next Steps

Consider exploring these Reown AppKit features:
- Email & Social logins
- Smart Account integration
- On-ramp functionality
- Multi-chain support

---

**Migration completed on:** 2026-01-22
**Migrated by:** Augment Agent

