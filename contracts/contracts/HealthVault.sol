// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title HealthVault
 * @dev Manages decentralized identities (DIDs) and medical record access control
 */
contract HealthVault is Ownable, ReentrancyGuard {
    
    struct MedicalRecord {
        string ipfsHash;        // IPFS hash of encrypted medical record
        uint256 timestamp;      // When the record was added
        bool isActive;          // Whether the record is active
    }
    
    struct AccessRequest {
        address requester;      // Doctor/clinic requesting access
        uint256 timestamp;      // When the request was made
        bool isPending;         // Whether the request is pending
        bool isGranted;         // Whether access was granted
        uint256 expiryTime;     // When the access expires (0 for permanent)
    }
    
    // Patient DID => Medical Records
    mapping(address => MedicalRecord[]) public patientRecords;
    
    // Patient DID => Doctor DID => Access status
    mapping(address => mapping(address => bool)) public accessGrants;
    
    // Patient DID => Doctor DID => Access expiry timestamp
    mapping(address => mapping(address => uint256)) public accessExpiry;
    
    // Request ID => Access Request
    mapping(bytes32 => AccessRequest) public accessRequests;
    
    // Patient DID => Array of pending request IDs
    mapping(address => bytes32[]) public patientPendingRequests;
    
    // Events
    event RecordAdded(address indexed patient, string ipfsHash, uint256 timestamp);
    event RecordRevoked(address indexed patient, uint256 recordIndex);
    event AccessRequested(bytes32 indexed requestId, address indexed patient, address indexed doctor, uint256 timestamp);
    event AccessGranted(address indexed patient, address indexed doctor, uint256 expiryTime);
    event AccessRevoked(address indexed patient, address indexed doctor);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Add a new medical record for the patient
     * @param _ipfsHash IPFS hash of the encrypted medical record
     */
    function addRecord(string memory _ipfsHash) external {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        patientRecords[msg.sender].push(MedicalRecord({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            isActive: true
        }));
        
        emit RecordAdded(msg.sender, _ipfsHash, block.timestamp);
    }
    
    /**
     * @dev Revoke a medical record
     * @param _recordIndex Index of the record to revoke
     */
    function revokeRecord(uint256 _recordIndex) external {
        require(_recordIndex < patientRecords[msg.sender].length, "Invalid record index");
        require(patientRecords[msg.sender][_recordIndex].isActive, "Record already revoked");
        
        patientRecords[msg.sender][_recordIndex].isActive = false;
        
        emit RecordRevoked(msg.sender, _recordIndex);
    }
    
    /**
     * @dev Request access to a patient's medical records
     * @param _patient Address of the patient
     */
    function requestAccess(address _patient) external returns (bytes32) {
        require(_patient != address(0), "Invalid patient address");
        require(_patient != msg.sender, "Cannot request access to own records");
        
        bytes32 requestId = keccak256(abi.encodePacked(_patient, msg.sender, block.timestamp));
        
        accessRequests[requestId] = AccessRequest({
            requester: msg.sender,
            timestamp: block.timestamp,
            isPending: true,
            isGranted: false,
            expiryTime: 0
        });
        
        patientPendingRequests[_patient].push(requestId);
        
        emit AccessRequested(requestId, _patient, msg.sender, block.timestamp);
        
        return requestId;
    }
    
    /**
     * @dev Grant access to a doctor (called by patient or via USSD)
     * @param _requestId ID of the access request
     * @param _expiryTime Expiry timestamp (0 for permanent access)
     */
    function grantAccess(bytes32 _requestId, uint256 _expiryTime) external {
        AccessRequest storage request = accessRequests[_requestId];
        require(request.isPending, "Request not pending");
        require(request.requester != address(0), "Invalid request");
        
        request.isPending = false;
        request.isGranted = true;
        request.expiryTime = _expiryTime;
        
        accessGrants[msg.sender][request.requester] = true;
        accessExpiry[msg.sender][request.requester] = _expiryTime;
        
        emit AccessGranted(msg.sender, request.requester, _expiryTime);
    }

    /**
     * @dev Revoke access from a doctor
     * @param _doctor Address of the doctor
     */
    function revokeAccess(address _doctor) external {
        require(accessGrants[msg.sender][_doctor], "No access granted");

        accessGrants[msg.sender][_doctor] = false;
        accessExpiry[msg.sender][_doctor] = 0;

        emit AccessRevoked(msg.sender, _doctor);
    }

    /**
     * @dev Check if a doctor has valid access to patient records
     * @param _patient Address of the patient
     * @param _doctor Address of the doctor
     */
    function hasAccess(address _patient, address _doctor) external view returns (bool) {
        if (!accessGrants[_patient][_doctor]) {
            return false;
        }

        uint256 expiry = accessExpiry[_patient][_doctor];
        if (expiry == 0) {
            return true; // Permanent access
        }

        return block.timestamp < expiry;
    }

    /**
     * @dev Get all records for a patient
     * @param _patient Address of the patient
     */
    function getPatientRecords(address _patient) external view returns (MedicalRecord[] memory) {
        return patientRecords[_patient];
    }

    /**
     * @dev Get pending access requests for a patient
     * @param _patient Address of the patient
     */
    function getPendingRequests(address _patient) external view returns (bytes32[] memory) {
        return patientPendingRequests[_patient];
    }

    /**
     * @dev Get access request details
     * @param _requestId ID of the access request
     */
    function getAccessRequest(bytes32 _requestId) external view returns (AccessRequest memory) {
        return accessRequests[_requestId];
    }
}

