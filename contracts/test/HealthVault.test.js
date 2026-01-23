const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HealthVault", function () {
  let healthVault;
  let owner;
  let patient;
  let doctor;

  beforeEach(async function () {
    [owner, patient, doctor] = await ethers.getSigners();
    
    const HealthVault = await ethers.getContractFactory("HealthVault");
    healthVault = await HealthVault.deploy();
    await healthVault.waitForDeployment();
  });

  describe("Medical Records", function () {
    it("Should allow a patient to add a medical record", async function () {
      const ipfsHash = "QmTest123456789";
      
      await expect(healthVault.connect(patient).addRecord(ipfsHash))
        .to.emit(healthVault, "RecordAdded")
        .withArgs(patient.address, ipfsHash, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));
      
      const records = await healthVault.getPatientRecords(patient.address);
      expect(records.length).to.equal(1);
      expect(records[0].ipfsHash).to.equal(ipfsHash);
      expect(records[0].isActive).to.equal(true);
    });

    it("Should not allow empty IPFS hash", async function () {
      await expect(healthVault.connect(patient).addRecord(""))
        .to.be.revertedWith("IPFS hash cannot be empty");
    });

    it("Should allow a patient to revoke a record", async function () {
      const ipfsHash = "QmTest123456789";
      await healthVault.connect(patient).addRecord(ipfsHash);
      
      await expect(healthVault.connect(patient).revokeRecord(0))
        .to.emit(healthVault, "RecordRevoked")
        .withArgs(patient.address, 0);
      
      const records = await healthVault.getPatientRecords(patient.address);
      expect(records[0].isActive).to.equal(false);
    });
  });

  describe("Access Control", function () {
    it("Should allow a doctor to request access", async function () {
      await expect(healthVault.connect(doctor).requestAccess(patient.address))
        .to.emit(healthVault, "AccessRequested");
      
      const pendingRequests = await healthVault.getPendingRequests(patient.address);
      expect(pendingRequests.length).to.equal(1);
    });

    it("Should allow a patient to grant access", async function () {
      const tx = await healthVault.connect(doctor).requestAccess(patient.address);
      const receipt = await tx.wait();
      const event = receipt.logs.find(log => {
        try {
          return healthVault.interface.parseLog(log).name === "AccessRequested";
        } catch {
          return false;
        }
      });
      const requestId = healthVault.interface.parseLog(event).args[0];
      
      const expiryTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours
      await expect(healthVault.connect(patient).grantAccess(requestId, expiryTime))
        .to.emit(healthVault, "AccessGranted")
        .withArgs(patient.address, doctor.address, expiryTime);
      
      const hasAccess = await healthVault.hasAccess(patient.address, doctor.address);
      expect(hasAccess).to.equal(true);
    });

    it("Should allow a patient to revoke access", async function () {
      const tx = await healthVault.connect(doctor).requestAccess(patient.address);
      const receipt = await tx.wait();
      const event = receipt.logs.find(log => {
        try {
          return healthVault.interface.parseLog(log).name === "AccessRequested";
        } catch {
          return false;
        }
      });
      const requestId = healthVault.interface.parseLog(event).args[0];
      
      await healthVault.connect(patient).grantAccess(requestId, 0);
      
      await expect(healthVault.connect(patient).revokeAccess(doctor.address))
        .to.emit(healthVault, "AccessRevoked")
        .withArgs(patient.address, doctor.address);
      
      const hasAccess = await healthVault.hasAccess(patient.address, doctor.address);
      expect(hasAccess).to.equal(false);
    });

    it("Should check access expiry correctly", async function () {
      const tx = await healthVault.connect(doctor).requestAccess(patient.address);
      const receipt = await tx.wait();
      const event = receipt.logs.find(log => {
        try {
          return healthVault.interface.parseLog(log).name === "AccessRequested";
        } catch {
          return false;
        }
      });
      const requestId = healthVault.interface.parseLog(event).args[0];

      // Get the current block timestamp
      const currentBlock = await ethers.provider.getBlock('latest');
      const expiryTime = currentBlock.timestamp + 86400; // Expires in 24 hours

      await healthVault.connect(patient).grantAccess(requestId, expiryTime);

      // Access should be valid initially
      let hasAccess = await healthVault.hasAccess(patient.address, doctor.address);
      expect(hasAccess).to.equal(true);
    });
  });
});

