# RSA Signature Simulator

An interactive web application that demonstrates RSA digital signatures using the hash-then-sign paradigm. This educational tool visualizes the complete signing and verification process between two users, including various attack scenarios.

## Features

- **Client-Side Cryptography**: All operations use the browser's Web Crypto API (no backend required)
- **RSA Algorithms**: Support for RSA-PSS (recommended) and RSASSA-PKCS1-v1_5
- **Configurable Key Sizes**: 2048, 3072, or 4096-bit keys
- **Visual Simulation**: Animated message transmission between users
- **Attack Scenarios**:
  - Message tampering in transit
  - Public key swapping
  - Signature corruption
- **Key Export**: Download public/private keys in PEM format
- **Signature Export**: Save signatures as Base64 files
- **Event Logging**: Detailed step-by-step process tracking

## Technology Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Cryptography**: Web Crypto API

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:8080
```

### Build for Production

```bash
npm run build
npm run preview
```

## How It Works

### Simulation Flow

1. **Key Generation**: Both User A and User B generate RSA key pairs
2. **Message Hashing**: User A computes SHA-256 hash of the message
3. **Signing**: User A signs the message with their private key
4. **Transmission**: Message and signature are sent to User B (with optional attacks)
5. **Verification**: User B verifies the signature using User A's public key

### Attack Scenarios

#### 1. Tamper Message in Transit
Modifies the message during transmission, causing verification to fail because the hash won't match.

#### 2. Swap Public Key
User B uses the wrong public key (their own instead of A's), demonstrating the importance of key authenticity.

#### 3. Corrupt Signature Bytes
Randomly corrupts bytes in the signature, showing how even small changes break verification.

## Project Structure

```
src/
├── components/          # React UI components
│   ├── Header.tsx      # App header
│   ├── ControlsPanel.tsx   # Simulation controls
│   ├── UserCard.tsx    # User key display
│   ├── EventLog.tsx    # Event logging display
│   └── NetworkAnimation.tsx # Message transmission animation
├── hooks/
│   └── useSimulation.ts # Simulation state management
├── lib/
│   ├── cryptoClient.ts # Web Crypto API utilities
│   └── exporters.ts    # File download utilities
├── pages/
│   └── RsaSimulation.tsx # Main simulation page
└── App.tsx             # Root component
```

## Cryptography Details

### Web Crypto API Operations

- **Key Generation**: `crypto.subtle.generateKey()` with RSA-PSS or RSASSA-PKCS1-v1_5
- **Signing**: `crypto.subtle.sign()` with SHA-256 hash
- **Verification**: `crypto.subtle.verify()` 
- **Key Export**: `crypto.subtle.exportKey()` to SPKI/PKCS8 formats

### Security Notes

⚠️ **Educational Purpose Only**: This simulator is designed for learning. Private keys are only stored in browser memory and should never be used for real cryptographic operations.

⚠️ **Private Key Export**: The ability to download private keys is included for educational demonstration only. In production systems, private keys should never leave secure storage.

## Browser Compatibility

Requires a modern browser with Web Crypto API support:
- Chrome/Edge 79+
- Firefox 75+
- Safari 14+

## Development

### Running Tests

```bash
# Unit tests for crypto utilities
npm test
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## Educational Use Cases

- **Cryptography Courses**: Demonstrate digital signature concepts
- **Security Training**: Show real-world attack scenarios
- **Developer Learning**: Understand Web Crypto API usage
- **PKI Education**: Visualize public key infrastructure basics

## License

This project is built with Lovable and is open for educational use.

## Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Cryptography via [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
