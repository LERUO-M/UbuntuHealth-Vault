const { ethers } = require("hardhat");

async function main() {
  console.log("\n🔐 Generating a new Ethereum wallet for development...\n");
  
  // Create a random wallet
  const wallet = ethers.Wallet.createRandom();
  
  console.log("✅ Wallet created successfully!\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📍 Address:", wallet.address);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔑 Private Key:", wallet.privateKey);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📝 Mnemonic Phrase:");
  console.log(wallet.mnemonic.phrase);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  console.log("⚠️  IMPORTANT SECURITY NOTES:");
  console.log("   1. Save your mnemonic phrase in a SAFE place");
  console.log("   2. NEVER share your private key or mnemonic");
  console.log("   3. NEVER commit your .env file to git");
  console.log("   4. Use this wallet for TESTNET ONLY\n");
  
  console.log("📋 Next Steps:");
  console.log("   1. Copy the private key above");
  console.log("   2. Add it to contracts/.env:");
  console.log("      PRIVATE_KEY=" + wallet.privateKey.substring(2)); // Remove 0x prefix
  console.log("   3. Get testnet ETH from a faucet:");
  console.log("      https://www.coinbase.com/faucets/base-ethereum-goerli-faucet");
  console.log("   4. Send Base Sepolia ETH to:", wallet.address);
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

