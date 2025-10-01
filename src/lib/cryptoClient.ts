/**
 * Client-side RSA cryptography utilities using Web Crypto API
 * Supports RSA-PSS and RSASSA-PKCS1-v1_5 for signing/verification
 */

export type RsaAlgorithm = 'RSA-PSS' | 'RSASSA-PKCS1-v1_5';
export type KeySize = 2048 | 3072 | 4096;

/**
 * Generate an RSA key pair for signing/verification
 */
export async function generateRsaKeyPair(
  algorithm: RsaAlgorithm = 'RSA-PSS',
  modulusLength: KeySize = 2048
): Promise<CryptoKeyPair> {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: algorithm,
        modulusLength,
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: 'SHA-256',
      },
      true, // extractable
      ['sign', 'verify']
    );
    return keyPair;
  } catch (error) {
    throw new Error(`Failed to generate key pair: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Export a public key to PEM format
 */
export async function exportPublicKeyPEM(publicKey: CryptoKey): Promise<string> {
  try {
    const exported = await window.crypto.subtle.exportKey('spki', publicKey);
    return pemEncode(exported, 'PUBLIC KEY');
  } catch (error) {
    throw new Error(`Failed to export public key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Export a private key to PEM format
 */
export async function exportPrivateKeyPEM(privateKey: CryptoKey): Promise<string> {
  try {
    const exported = await window.crypto.subtle.exportKey('pkcs8', privateKey);
    return pemEncode(exported, 'PRIVATE KEY');
  } catch (error) {
    throw new Error(`Failed to export private key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Compute SHA-256 hash of a message and return as hex string
 */
export async function computeSHA256Hex(message: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
  } catch (error) {
    throw new Error(`Failed to compute hash: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Sign a message using RSA private key
 * @param privateKey - The private key to sign with
 * @param message - The message to sign
 * @param method - The signing algorithm
 * @returns The signature as ArrayBuffer
 */
export async function signMessage(
  privateKey: CryptoKey,
  message: string,
  method: RsaAlgorithm = 'RSA-PSS'
): Promise<ArrayBuffer> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const algorithm: RsaPssParams | AlgorithmIdentifier = 
      method === 'RSA-PSS'
        ? {
            name: 'RSA-PSS',
            saltLength: 32, // recommended salt length
          }
        : {
            name: 'RSASSA-PKCS1-v1_5',
          };

    const signature = await window.crypto.subtle.sign(algorithm, privateKey, data);
    return signature;
  } catch (error) {
    throw new Error(`Failed to sign message: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Verify a signature using RSA public key
 * @param publicKey - The public key to verify with
 * @param message - The original message
 * @param signature - The signature to verify
 * @param method - The signing algorithm used
 * @returns true if signature is valid, false otherwise
 */
export async function verifySignature(
  publicKey: CryptoKey,
  message: string,
  signature: ArrayBuffer,
  method: RsaAlgorithm = 'RSA-PSS'
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const algorithm: RsaPssParams | AlgorithmIdentifier = 
      method === 'RSA-PSS'
        ? {
            name: 'RSA-PSS',
            saltLength: 32,
          }
        : {
            name: 'RSASSA-PKCS1-v1_5',
          };

    const isValid = await window.crypto.subtle.verify(algorithm, publicKey, signature, data);
    return isValid;
  } catch (error) {
    // Verification errors typically mean invalid signature
    return false;
  }
}

/**
 * Convert ArrayBuffer to Base64 string
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Convert Base64 string to ArrayBuffer
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Encode binary data to PEM format
 */
function pemEncode(buffer: ArrayBuffer, label: string): string {
  const base64 = arrayBufferToBase64(buffer);
  const lines: string[] = [];
  
  lines.push(`-----BEGIN ${label}-----`);
  
  // Split into 64-character lines
  for (let i = 0; i < base64.length; i += 64) {
    lines.push(base64.substring(i, i + 64));
  }
  
  lines.push(`-----END ${label}-----`);
  
  return lines.join('\n');
}

/**
 * Convert ArrayBuffer to hex string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Corrupt a signature by flipping random bits
 */
export function corruptSignature(signature: ArrayBuffer): ArrayBuffer {
  const bytes = new Uint8Array(signature);
  const corrupted = new Uint8Array(bytes);
  
  // Flip 3 random bytes
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * corrupted.length);
    corrupted[index] ^= 0xFF; // Flip all bits
  }
  
  return corrupted.buffer;
}
