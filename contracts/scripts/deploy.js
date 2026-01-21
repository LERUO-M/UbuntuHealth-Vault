const hre = require("hardhat");

async function main() {
  console.log("Deploying HealthVault contract to Base Sepolia...");

  const HealthVault = await hre.ethers.getContractFactory("HealthVault");
  const healthVault = await HealthVault.deploy();

  await healthVault.waitForDeployment();

  const address = await healthVault.getAddress();
  console.log(`HealthVault deployed to: ${address}`);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await healthVault.deploymentTransaction().wait(5);

  // Verify contract on BaseScan
  if (process.env.BASESCAN_API_KEY) {
    console.log("Verifying contract on BaseScan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }

  console.log("\n=== Deployment Summary ===");
  console.log(`Network: ${hre.network.name}`);
  console.log(`Contract Address: ${address}`);
  console.log("==========================\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

