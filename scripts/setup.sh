#!/bin/bash

# Ubuntu Health Vault - Quick Setup Script
# This script helps you set up the project quickly

echo "🏥 Ubuntu Health Vault - Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "📦 Installing workspace dependencies..."
npm run install:all

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env files from examples
echo "📝 Creating environment files..."

if [ ! -f "contracts/.env" ]; then
    cp contracts/.env.example contracts/.env
    echo "✅ Created contracts/.env"
else
    echo "⚠️  contracts/.env already exists, skipping..."
fi

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists, skipping..."
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env"
else
    echo "⚠️  frontend/.env already exists, skipping..."
fi

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure your environment variables:"
echo "   - Edit contracts/.env with your wallet private key"
echo "   - Edit backend/.env with API keys"
echo "   - Edit frontend/.env with WalletConnect project ID"
echo ""
echo "2. Deploy smart contracts:"
echo "   cd contracts"
echo "   npm run compile"
echo "   npm run deploy"
echo ""
echo "3. Update contract addresses in:"
echo "   - backend/.env (HEALTH_VAULT_CONTRACT_ADDRESS)"
echo "   - frontend/.env (VITE_CONTRACT_ADDRESS)"
echo ""
echo "4. Start development servers:"
echo "   npm run dev"
echo ""
echo "📖 For detailed instructions, see SETUP_GUIDE.md"
echo ""
echo "🚀 Happy Building!"

