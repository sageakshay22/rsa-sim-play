/**
 * Utilities for exporting keys and signatures as downloadable files
 */

/**
 * Download a text file
 */
export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download signature as base64 file
 */
export function downloadSignature(signatureBase64: string, filename: string = 'signature.txt'): void {
  downloadTextFile(signatureBase64, filename);
}

/**
 * Download public key PEM
 */
export function downloadPublicKey(pem: string, user: string): void {
  downloadTextFile(pem, `${user}_public_key.pem`);
}

/**
 * Download private key PEM (with warning)
 */
export function downloadPrivateKey(pem: string, user: string): void {
  downloadTextFile(pem, `${user}_private_key.pem`);
}
