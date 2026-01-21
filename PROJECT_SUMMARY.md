# Ubuntu Health Vault - Project Summary

## 🎯 Project Overview

**Ubuntu Health Vault** is a blockchain-backed medical ID and patient file storage system that empowers South African patients to own and control their medical data. The system uses USSD/SMS as a remote control mechanism, allowing any South African patient—regardless of smartphone ownership—to manage their medical records.

## 🌟 Key Features

### For Patients
- **Decentralized Identity (DID)**: Link medical records to a blockchain-based identity
- **Encrypted Storage**: All records are encrypted with AES-256 before storage
- **USSD Control**: Manage access via `*134*HEALTH#` on any phone
- **SMS Notifications**: Receive alerts when doctors request access
- **Full Control**: Grant, revoke, or set time-limited access permissions
- **Web Portal**: Modern, clean interface for uploading and managing records

### For Doctors
- **Access Requests**: Request access to patient records via web portal
- **Secure Downloads**: Download and decrypt authorized medical records
- **Transparent Permissions**: Clear visibility into access status
- **Professional Interface**: Clean, efficient workflow

### For the System
- **Blockchain Security**: Immutable access logs on Base Sepolia
- **IPFS Storage**: Decentralized file storage via Storacha
- **No Single Point of Failure**: Distributed architecture
- **Inclusive Design**: Works on feature phones via USSD

## 🏗️ Technical Architecture

### Smart Contracts (Solidity)
- **HealthVault.sol**: Main contract managing DIDs, records, and access control
- **Deployed on**: Base Sepolia (Ethereum L2)
- **Features**:
  - Add/revoke medical records
  - Request/grant/revoke access
  - Time-based access expiry
  - Pending request management

### Backend (Node.js + Express)
- **API Server**: RESTful API for all operations
- **IPFS Integration**: Storacha (web3.storage) for file storage
- **Encryption**: AES-256 encryption/decryption
- **USSD/SMS**: Africa's Talking integration
- **Blockchain**: Ethers.js for smart contract interaction

### Frontend (React + Vite)
- **Modern UI**: TailwindCSS with Ubuntu color scheme
- **Web3 Integration**: RainbowKit + Wagmi for wallet connection
- **Responsive Design**: Mobile-first approach
- **Patient Portal**: Upload records, manage access
- **Doctor Portal**: Request access, view records

## 📁 Project Structure

```
ubuntu-health-vault/
├── contracts/              # Smart contracts
│   ├── contracts/
│   │   └── HealthVault.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── HealthVault.test.js
│   └── hardhat.config.js
│
├── backend/               # Node.js API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── records.js
│   │   │   ├── access.js
│   │   │   ├── ussd.js
│   │   │   └── sms.js
│   │   ├── config/
│   │   │   ├── blockchain.js
│   │   │   ├── ipfs.js
│   │   │   └── africastalking.js
│   │   ├── utils/
│   │   │   └── encryption.js
│   │   └── index.js
│   └── package.json
│
├── frontend/              # React application
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   ├── UploadRecords.jsx
│   │   │   └── AccessRequests.jsx
│   │   ├── config/
│   │   │   ├── wagmi.js
│   │   │   └── contract.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── scripts/               # Setup scripts
│   ├── setup.sh
│   └── setup.ps1
│
├── README.md
├── SETUP_GUIDE.md
└── package.json
```

## 🔐 Security Features

1. **End-to-End Encryption**: Files encrypted before leaving the client
2. **Blockchain Immutability**: Access logs cannot be tampered with
3. **Time-Based Access**: Automatic expiry of permissions
4. **Decentralized Storage**: No single point of failure
5. **User Sovereignty**: Patients have complete control
6. **Secure Key Management**: Private keys never leave user's wallet

## 🌍 South African Context

### Why USSD?
- **Universal Access**: Works on any phone, even basic feature phones
- **No Data Costs**: USSD doesn't require internet connection
- **Familiar Interface**: South Africans are familiar with USSD for banking
- **Inclusive**: Reaches rural and underserved communities

### Ubuntu Philosophy
The name "Ubuntu" reflects the African philosophy "I am because we are" - emphasizing community-focused healthcare where patients, doctors, and the system work together for better health outcomes.

## 🚀 Getting Started

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Thuto42096/UbuntuHealth-Vault.git
cd UbuntuHealth-Vault

# Run setup script (Windows)
.\scripts\setup.ps1

# Or manually
npm install
npm run install:all

# Deploy contracts
cd contracts
npm run compile
npm run deploy

# Start development
cd ..
npm run dev
```

### Detailed Setup
See [SETUP_GUIDE.md](SETUP_GUIDE.md) for comprehensive instructions.

## 📊 Use Cases

1. **Patient Onboarding**: Patient creates account, uploads medical history
2. **Doctor Visit**: Doctor requests access, patient approves via USSD
3. **Emergency Access**: Patient grants temporary access to ER doctor
4. **Specialist Referral**: GP grants access to specialist
5. **Access Revocation**: Patient revokes access after treatment

## 🎨 Design Principles

- **Modern & Clean**: Professional healthcare aesthetic
- **Ubuntu Colors**: Orange (#E95420), Purple (#772953), Aubergine (#5E2750)
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-First**: Responsive design for all devices
- **User-Centric**: Simple, intuitive workflows

## 🔮 Future Enhancements

- [ ] Multi-language support (Zulu, Xhosa, Afrikaans, etc.)
- [ ] Integration with South African healthcare providers
- [ ] AI-powered health insights
- [ ] Telemedicine integration
- [ ] Insurance claim automation
- [ ] Emergency contact notifications
- [ ] Biometric authentication
- [ ] Offline-first mobile app

## 📈 Impact Potential

- **Patients**: Own and control their medical data
- **Doctors**: Faster access to patient history
- **Healthcare System**: Reduced duplicate tests, better continuity of care
- **Society**: More equitable healthcare access

## 🤝 Contributing

We welcome contributions! Areas where you can help:
- UI/UX improvements
- Additional language support
- Security audits
- Documentation
- Testing
- Integration with healthcare systems

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

Ubuntu Health Vault - A South African Startup
Built for the W3NODE HACKATHON

## 🙏 Acknowledgments

- **W3NODE HACKATHON** - For the opportunity
- **Base** - For the L2 blockchain infrastructure
- **Africa's Talking** - For USSD/SMS capabilities
- **Storacha** - For decentralized storage
- **OpenZeppelin** - For secure smart contract libraries

## 📞 Contact

- **Email**: support@ubuntuhealthvault.co.za
- **USSD**: *134*HEALTH#
- **Website**: www.ubuntuhealthvault.co.za

---

**Built with ❤️ in South Africa 🇿🇦**

*"Your health, your data, your control"*

