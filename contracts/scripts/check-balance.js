const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const address = await deployer.getAddress();
  const balance = await hre.ethers.provider.getBalance(address);
  
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("💰 Wallet Balance Check");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📍 Address:", address);
  console.log("💵 Balance:", hre.ethers.formatEther(balance), "ETH");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  if (balance === 0n) {
    console.log("⚠️  You have 0 ETH. You need testnet ETH to deploy!");
    console.log("\n🚰 Get testnet ETH from a faucet:");
    console.log("   • Coinbase: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet");
    console.log("   • Alchemy: https://www.alchemy.com/faucets/base-sepolia");
    console.log("   • QuickNode: https://faucet.quicknode.com/base/sepolia");
    console.log("\n📋 Your address:", address);
    console.log("\n");
  } else {
    console.log("✅ You have sufficient funds to deploy!");
    console.log("   Run: npm run deploy\n");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

