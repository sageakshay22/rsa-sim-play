import { useState, useCallback } from 'react';
import {
  generateRsaKeyPair,
  signMessage,
  verifySignature,
  computeSHA256Hex,
  arrayBufferToBase64,
  corruptSignature,
  type RsaAlgorithm,
  type KeySize,
} from '@/lib/cryptoClient';

export interface LogEntry {
  id: string;
  timestamp: Date;
  actor: 'A' | 'B' | 'System' | 'Attacker';
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface UserKeys {
  publicKey: CryptoKey | null;
  privateKey: CryptoKey | null;
}

export interface SimulationState {
  userAKeys: UserKeys;
  userBKeys: UserKeys;
  message: string;
  algorithm: RsaAlgorithm;
  keySize: KeySize;
  messageHash: string;
  signature: ArrayBuffer | null;
  signatureBase64: string;
  isVerified: boolean | null;
  logs: LogEntry[];
  isSimulating: boolean;
  // Attack toggles
  tamperMessage: boolean;
  swapPublicKey: boolean;
  corruptSignatureBytes: boolean;
}

export function useSimulation() {
  const [state, setState] = useState<SimulationState>({
    userAKeys: { publicKey: null, privateKey: null },
    userBKeys: { publicKey: null, privateKey: null },
    message: 'Hello, this is a secure message!',
    algorithm: 'RSA-PSS',
    keySize: 2048,
    messageHash: '',
    signature: null,
    signatureBase64: '',
    isVerified: null,
    logs: [],
    isSimulating: false,
    tamperMessage: false,
    swapPublicKey: false,
    corruptSignatureBytes: false,
  });

  const addLog = useCallback((
    actor: LogEntry['actor'],
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      actor,
      message,
      type,
    };
    setState(prev => ({ ...prev, logs: [...prev.logs, newLog] }));
  }, []);

  const generateKeys = useCallback(async () => {
    try {
      addLog('System', `Generating ${state.keySize}-bit RSA key pairs using ${state.algorithm}...`, 'info');
      
      const [keyPairA, keyPairB] = await Promise.all([
        generateRsaKeyPair(state.algorithm, state.keySize),
        generateRsaKeyPair(state.algorithm, state.keySize),
      ]);

      setState(prev => ({
        ...prev,
        userAKeys: { publicKey: keyPairA.publicKey, privateKey: keyPairA.privateKey },
        userBKeys: { publicKey: keyPairB.publicKey, privateKey: keyPairB.privateKey },
      }));

      addLog('A', 'Generated key pair (public + private)', 'success');
      addLog('B', 'Generated key pair (public + private)', 'success');
      addLog('System', 'Key generation complete. Both users have their key pairs.', 'success');
    } catch (error) {
      addLog('System', `Key generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }, [state.algorithm, state.keySize, addLog]);

  const runSimulation = useCallback(async () => {
    if (!state.userAKeys.privateKey || !state.userBKeys.publicKey) {
      addLog('System', 'Please generate keys first!', 'error');
      return;
    }

    setState(prev => ({ ...prev, isSimulating: true, isVerified: null }));

    try {
      // Step 1: A computes hash
      addLog('A', `Computing SHA-256 hash of message: "${state.message}"`, 'info');
      const hash = await computeSHA256Hex(state.message);
      setState(prev => ({ ...prev, messageHash: hash }));
      addLog('A', `Hash computed: ${hash.substring(0, 16)}...`, 'success');

      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: A signs the message
      addLog('A', `Signing message with private key using ${state.algorithm}...`, 'info');
      let signature = await signMessage(state.userAKeys.privateKey!, state.message, state.algorithm);
      const originalSignature = signature;
      
      // Apply signature corruption if enabled
      if (state.corruptSignatureBytes) {
        signature = corruptSignature(signature);
        addLog('Attacker', '🔴 Corrupted signature bytes in transit!', 'error');
      }

      const sigBase64 = arrayBufferToBase64(signature);
      setState(prev => ({ ...prev, signature, signatureBase64: sigBase64 }));
      addLog('A', `Signature created: ${sigBase64.substring(0, 32)}...`, 'success');

      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: Transmission (with potential tampering)
      let transmittedMessage = state.message;
      if (state.tamperMessage) {
        transmittedMessage = state.message + ' [TAMPERED]';
        addLog('Attacker', `🔴 Message tampered during transmission! New message: "${transmittedMessage}"`, 'error');
      } else {
        addLog('System', 'Transmitting message and signature from A → B...', 'info');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 4: B receives and computes hash
      addLog('B', `Received message: "${transmittedMessage}"`, 'info');
      addLog('B', 'Computing SHA-256 hash of received message...', 'info');
      const receivedHash = await computeSHA256Hex(transmittedMessage);
      addLog('B', `Hash of received message: ${receivedHash.substring(0, 16)}...`, 'info');

      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 5: B verifies signature
      const publicKeyToUse = state.swapPublicKey ? state.userBKeys.publicKey! : state.userAKeys.publicKey!;
      
      if (state.swapPublicKey) {
        addLog('Attacker', "🔴 Swapped A's public key with B's public key!", 'error');
      }

      addLog('B', `Verifying signature using ${state.swapPublicKey ? "B's (wrong)" : "A's (correct)"} public key...`, 'info');
      const isValid = await verifySignature(publicKeyToUse, transmittedMessage, signature, state.algorithm);

      setState(prev => ({ ...prev, isVerified: isValid }));

      await new Promise(resolve => setTimeout(resolve, 500));

      if (isValid) {
        addLog('B', '✅ Signature is VALID! Message is authentic and untampered.', 'success');
      } else {
        addLog('B', '❌ Signature is INVALID! Message has been tampered, corrupted, or wrong key used.', 'error');
        
        // Explain why verification failed
        if (state.tamperMessage) {
          addLog('System', 'Verification failed because the message was tampered during transmission.', 'warning');
        }
        if (state.corruptSignatureBytes) {
          addLog('System', 'Verification failed because the signature bytes were corrupted.', 'warning');
        }
        if (state.swapPublicKey) {
          addLog('System', 'Verification failed because the wrong public key was used for verification.', 'warning');
        }
      }

    } catch (error) {
      addLog('System', `Simulation failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setState(prev => ({ ...prev, isSimulating: false }));
    }
  }, [state, addLog]);

  const clearLogs = useCallback(() => {
    setState(prev => ({ ...prev, logs: [], isVerified: null, messageHash: '', signatureBase64: '' }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setState(prev => ({ ...prev, message }));
  }, []);

  const updateAlgorithm = useCallback((algorithm: RsaAlgorithm) => {
    setState(prev => ({ ...prev, algorithm }));
  }, []);

  const updateKeySize = useCallback((keySize: KeySize) => {
    setState(prev => ({ ...prev, keySize }));
  }, []);

  const toggleTamperMessage = useCallback(() => {
    setState(prev => ({ ...prev, tamperMessage: !prev.tamperMessage }));
  }, []);

  const toggleSwapPublicKey = useCallback(() => {
    setState(prev => ({ ...prev, swapPublicKey: !prev.swapPublicKey }));
  }, []);

  const toggleCorruptSignature = useCallback(() => {
    setState(prev => ({ ...prev, corruptSignatureBytes: !prev.corruptSignatureBytes }));
  }, []);

  return {
    state,
    generateKeys,
    runSimulation,
    clearLogs,
    updateMessage,
    updateAlgorithm,
    updateKeySize,
    toggleTamperMessage,
    toggleSwapPublicKey,
    toggleCorruptSignature,
  };
}
