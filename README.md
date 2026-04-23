# 🚀 Web3 Crypto Wallet - Multi-Chain Blockchain Dapp
<img width="1900" height="912" alt="Screenshot 2026-04-23 142657" src="https://github.com/user-attachments/assets/2747fc63-827a-480f-bd81-53f55e17a1f8" />
<img width="443" height="763" alt="Screenshot 2026-04-23 142758" src="https://github.com/user-attachments/assets/bfece4b5-2418-44e5-bbd9-19e8bd2ea247" />
<img width="1256" height="267" alt="Screenshot 2026-04-23 142810" src="https://github.com/user-attachments/assets/b3e46a8b-3ed7-4738-be51-18288f337f7b" />
A decentralized crypto wallet application supporting multiple blockchain networks with transfer capabilities, transaction management, and comprehensive payment history tracking.

## 🎓 Overview

This is a full-stack blockchain application built with **Stellar Testnet** integration using **Freighter wallet**. The application enables users to connect their wallets, view balances, send XLM payments on Stellar, and maintain a complete transaction history stored on-chain.

**Key Features:**
* Stellar Testnet integration
* Freighter wallet integration for Stellar transactions
* Real-time balance tracking
* Blockchain-based transaction history
* Smart contract integration for data persistence

## Features

### Wallet Management
* ✅ Detects/Prompts wallet installation (Freighter)
* ✅ Connect wallet and display user address
* ✅ Display real-time wallet balance
* ✅ Detect account and network switches
* ✅ Network validation and switching

### Transaction Management
* ✅ Send XLM on Stellar Testnet with Freighter
* ✅ Optional transaction memos/messages
* ✅ Real-time transaction status updates

### Payment History
* ✅ Display complete transfer history
* ✅ View transaction details (sender, recipient, amount, timestamp)
* ✅ Track transaction hashes
* ✅ Query historical payments from blockchain

### User Experience
* ✅ Responsive grid-based UI with SCSS
* ✅ Form validation with Formik
* ✅ Clear error messaging and user feedback
* ✅ Professional component-based architecture
* ✅ Comprehensive test coverage

## Tech Stack

**Frontend:**
* React (Hooks)
* SCSS Modules
* Formik (Form Management & Validation)
* React Testing Library

**Blockchain:**
* Stellar JavaScript SDK
* Freighter Wallet API (Stellar)
* Horizon API (Stellar)

**Smart Contracts:**
* Rust/Soroban (Stellar)

**Build & Testing:**
* React Scripts (Create React App)
* Jest & React Testing Library
* Truffle for contract testing

## 🏗️ Architecture

### System Components

1. **Smart Contract Layer**
   - Stellar Soroban smart contracts (Rust)
   - Stores transaction data on-chain
   - Provides immutable transaction history

2. **Frontend Application (React)**
   - Wallet connection interface via Freighter
   - Transaction form with validation
   - Real-time balance display
   - Transfer history visualization
   - Responsive grid-based UI with SCSS modules

3. **Blockchain Integration**
   - Stellar SDK for XLM transactions
   - Freighter wallet for account management
   - Horizon API for data querying
   - Real-time balance updates

4. **State Management**
   - React Context API with useReducer
   - Web3 context for blockchain state
   - Centralized error handling

## Project Structure

```
web3-crypto-wallet/
├── src/
│   ├── Components/              # Reusable React components
│   │   ├── ConnectWallet/       # Wallet connection UI
│   │   ├── FormUI/              # Form components
│   │   │   ├── SubmitBtn/       # Submit button
│   │   │   └── TextField/       # Text input field
│   │   ├── GridUI/              # Layout system (Grid, Column, ClearFix)
│   │   ├── Header/              # Application header
│   │   ├── TransactionForm/     # Payment form component
│   │   └── TransferHistory/     # Transaction history display
│   ├── Context/
│   │   └── web3/                # Web3 state management
│   │       ├── provider.js      # Context provider
│   │       ├── reducer.js       # State reducer
│   │       ├── types.js         # Action types
│   │       └── utils.js         # Blockchain utilities
│   ├── Pages/
│   │   └── LandingPage/         # Main application page
│   ├── Templates/
│   │   └── Default/             # Default layout template
│   ├── Utils/                   # Utility functions
│   │   └── commonErrorMessages.json
│   ├── ContractUtils/           # Smart contract ABIs & addresses
│   │   └── WalletContract/
│   └── styles/                  # Global SCSS styles
├── stellar-contracts/           # Stellar Soroban contracts
│   └── wallet/
│       └── Cargo.toml           # Rust/Soroban config
├── public/                      # Static files
├── build/                       # Production build output
└── package.json
```

## Getting Started

### Prerequisites

* **Node.js** v14 or higher
* **npm** or **yarn**
* **Browser Extensions:**
  - [Freighter](https://freighter.app/) (for Stellar)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web3-crypto-wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Configuration

### Stellar Network Setup

1. **Install Freighter**
   - Visit [freighter.app](https://freighter.app/)
   - Install the browser extension
   - Create or import a Stellar account

2. **Switch to Testnet**
   - Open Freighter settings
   - Select "Stellar Testnet" as your network

3. **Fund Your Account**
   - Visit [Stellar Laboratory Account Creator](https://laboratory.stellar.org/#account-creator?network=test)
   - Fund your account with test XLM

## Running the Application

### Development Server

```bash
npm start
```

* Opens the app at `http://localhost:3000`
* Hot reload enabled for quick development

### Testing

**Run React component tests:**
```bash
npm test
```

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

## Smart Contract Deployment

### Deploy Stellar Contracts

```bash
cd stellar-contracts/wallet
cargo build --release
```

## Blockchain Integration Details

### Stellar Integration

**Configuration:**
* Network: Stellar Testnet
* Horizon URL: `https://horizon-testnet.stellar.org`
* Native Asset: XLM
* Wallet: Freighter

**Key Files:**
* `src/Context/web3/utils.js` - Stellar transaction logic
* `src/Components/TransactionForm/` - Payment form for XLM
* `stellar-contracts/wallet/` - Soroban smart contracts

## Component Usage

### ConnectWallet
Manages wallet connection and displays the connected address and balance.

```jsx
import ConnectWallet from './Components/ConnectWallet';
<ConnectWallet />
```

### TransactionForm
Handles payment form with Formik validation.

```jsx
import TransactionForm from './Components/TransactionForm';
<TransactionForm />
```

### TransferHistory
Displays all transfers retrieved from the blockchain.

```jsx
import TransferHistory from './Components/TransferHistory';
<TransferHistory />
```

### GridUI Components
Responsive layout system.

```jsx
import { Grid, Column, ClearFix } from './Components/GridUI';
```

## State Management

The app uses React Context API with reducer pattern for Web3 state:

**Location:** `src/Context/web3/`

**State Actions:**
* `CONNECT_WALLET` - Establish wallet connection
* `DISCONNECT_WALLET` - Disconnect wallet
* `SET_ACCOUNT` - Update current account
* `SET_BALANCE` - Update wallet balance
* `SWITCH_CHAIN` - Change blockchain network
* `SET_TRANSACTIONS` - Update transaction history
* `SET_ERROR` - Set error message
* `CLEAR_ERROR` - Clear error state

## Error Handling

The app provides user-friendly error messages for:
* Wallet not installed
* Invalid network/chain
* Insufficient balance
* Invalid recipient address
* Transaction failures
* Connection errors

Error messages are defined in `src/Utils/commonErrorMessages.json`

## Security Best Practices

⚠️ **Important Security Notes:**

* ❌ **Never** commit private keys or seed phrases to git
* ❌ **Never** share your private key with anyone
* ✅ Use environment variables for sensitive data
* ✅ Test extensively on testnet before mainnet deployment
* ✅ Verify contract addresses before interaction
* ✅ Keep wallet extensions and browser updated
* ✅ Use hardware wallets for mainnet (Ledger, Trezor)

## Troubleshooting

### "Wallet not detected"
* Ensure Freighter is installed
* Check browser extension settings
* Refresh the page

### "Wrong network"
* Switch to Stellar Testnet (Freighter)
* Check network selection in wallet extension

### "Transaction failed"
* Verify sufficient balance
* Check recipient address format
* Check transaction memo length (Stellar max 28 chars)

### "Contract not found"
* Verify smart contract is properly deployed
* Ensure contract interaction is correct
* Check Stellar testnet connection

## Resources

* [Stellar Documentation](https://developers.stellar.org/)
* [React Documentation](https://react.dev/)
* [Freighter Documentation](https://freighter.app/)
* [Horizon API Docs](https://developers.stellar.org/api/)

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License
## 📝 License

This project is developed for educational purposes.

## 👥 Contributors

**Team Members:**
* Shobhit Aryan
* Tanmay Anand

**Educational Institution:** Dayananda Sagar College of Engineering

**Course:** Blockchain Development / Web3 Development
This project is developed for educational purposes.

## 👥 Contributors

**Team Members:**
* Shobhit Aryan
* Tanmay Anand

**Educational Institution:** Dayananda Sagar College of Engineering

**Course:** Blockchain Development / Web3 Development

## 📞 Support

For issues, questions, or support:
## 📞 Support

For issues, questions, or support:

* 📧 Email: shobhitaryan2003@gmail.com or tanmayanand840@gmail.com
* 🐛 [Report Issues](https://github.com/Shobhit1729Aryan/CryptoCurrency-Wallet/issues)
* 💬 [Discussions](https://github.com/Shobhit1729Aryan/CryptoCurrency-Wallet/discussions)

---

**⚠️ Disclaimer:** This is a development/test application for educational purposes. Use with caution on mainnet. Always thoroughly test on testnet first. Not for production use without security audits.
**⚠️ Disclaimer:** This is a development/test application for educational purposes. Use with caution on mainnet. Always thoroughly test on testnet first. Not for production use without security audits.
