const fs = require('fs');
const path = require('path');

async function main() {
  console.log("\n📋 Copying contract ABI to frontend and backend...\n");

  // Read the compiled contract
  const contractPath = path.join(__dirname, '../artifacts/contracts/HealthVault.sol/HealthVault.json');
  const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  
  // Extract just the ABI
  const abi = contractJson.abi;
  
  // Paths for frontend and backend
  const frontendAbiPath = path.join(__dirname, '../../frontend/src/contracts/HealthVault.json');
  const backendAbiPath = path.join(__dirname, '../../backend/src/contracts/HealthVault.json');
  
  // Create directories if they don't exist
  const frontendDir = path.dirname(frontendAbiPath);
  const backendDir = path.dirname(backendAbiPath);
  
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }
  
  if (!fs.existsSync(backendDir)) {
    fs.mkdirSync(backendDir, { recursive: true });
  }
  
  // Write ABI files
  fs.writeFileSync(frontendAbiPath, JSON.stringify({ abi }, null, 2));
  fs.writeFileSync(backendAbiPath, JSON.stringify({ abi }, null, 2));
  
  console.log("✅ ABI copied to:");
  console.log("   📁 Frontend:", frontendAbiPath);
  console.log("   📁 Backend:", backendAbiPath);
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

