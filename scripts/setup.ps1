# Ubuntu Health Vault - Quick Setup Script (PowerShell)
# This script helps you set up the project quickly on Windows

Write-Host "🏥 Ubuntu Health Vault - Setup Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "📦 Installing workspace dependencies..." -ForegroundColor Yellow
npm run install:all

Write-Host ""
Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Create .env files from examples
Write-Host "📝 Creating environment files..." -ForegroundColor Yellow

if (-not (Test-Path "contracts\.env")) {
    Copy-Item "contracts\.env.example" "contracts\.env"
    Write-Host "✅ Created contracts\.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  contracts\.env already exists, skipping..." -ForegroundColor Yellow
}

if (-not (Test-Path "backend\.env")) {
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✅ Created backend\.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend\.env already exists, skipping..." -ForegroundColor Yellow
}

if (-not (Test-Path "frontend\.env")) {
    Copy-Item "frontend\.env.example" "frontend\.env"
    Write-Host "✅ Created frontend\.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  frontend\.env already exists, skipping..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configure your environment variables:"
Write-Host "   - Edit contracts\.env with your wallet private key"
Write-Host "   - Edit backend\.env with API keys"
Write-Host "   - Edit frontend\.env with WalletConnect project ID"
Write-Host ""
Write-Host "2. Deploy smart contracts:"
Write-Host "   cd contracts"
Write-Host "   npm run compile"
Write-Host "   npm run deploy"
Write-Host ""
Write-Host "3. Update contract addresses in:"
Write-Host "   - backend\.env (HEALTH_VAULT_CONTRACT_ADDRESS)"
Write-Host "   - frontend\.env (VITE_CONTRACT_ADDRESS)"
Write-Host ""
Write-Host "4. Start development servers:"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "📖 For detailed instructions, see SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Happy Building!" -ForegroundColor Green

