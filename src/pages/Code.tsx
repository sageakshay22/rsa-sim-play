import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Code = () => {
  const [copied, setCopied] = useState(false);

  const pythonCode = `from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.backends import default_backend
import hashlib


# ---------------- Key Generation ----------------
def generate_rsa_keypair(key_size=2048):
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=key_size,
        backend=default_backend()
    )
    return private_key, private_key.public_key()


# ---------------- Signing ----------------
def sign_message_rsa_pss(private_key, message: bytes) -> bytes:
    signature = private_key.sign(
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    return signature


# ---------------- Verification ----------------
def verify_signature_rsa_pss(public_key, message: bytes, signature: bytes) -> bool:
    try:
        public_key.verify(
            signature,
            message,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return True
    except Exception:
        return False


# ---------------- Save / Load Keys ----------------
def save_private_key_pem(private_key, filename: str, passphrase: bytes = None):
    encryption_algo = (
        serialization.BestAvailableEncryption(passphrase) if passphrase else serialization.NoEncryption()
    )
    pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=encryption_algo
    )
    with open(filename, "wb") as f:
        f.write(pem)


def save_public_key_pem(public_key, filename: str):
    pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    with open(filename, "wb") as f:
        f.write(pem)


def load_private_key_pem(filename: str, passphrase: bytes = None):
    with open(filename, "rb") as f:
        pem = f.read()
    return serialization.load_pem_private_key(pem, password=passphrase, backend=default_backend())


def load_public_key_pem(filename: str):
    with open(filename, "rb") as f:
        pem = f.read()
    return serialization.load_pem_public_key(pem, backend=default_backend())


# ---------------- Demo ----------------
if __name__ == "__main__":
    # take user input
    user_msg = input("Enter a message to authenticate: ")
    msg = user_msg.encode()
    print("\\nOriginal Message:", user_msg)

    # Show SHA-256 hash
    digest = hashlib.sha256(msg).hexdigest()
    print("SHA-256 Hash:", digest)

    # Generate key pair
    priv, pub = generate_rsa_keypair()
    print("\\nRSA keypair generated (2048 bits).")

    # Sign message
    signature = sign_message_rsa_pss(priv, msg)
    print("\\nSignature (hex, first 80 chars):", signature.hex()[:80] + "...")

    # Verify correct message
    ok = verify_signature_rsa_pss(pub, msg, signature)
    print("Verification (original message):", "VALID ✓" if ok else "INVALID ✗")

    # Verify tampered message
    tampered = msg + b" hacked!"
    ok2 = verify_signature_rsa_pss(pub, tampered, signature)
    print("Verification (tampered message):", "VALID ✓" if ok2 else "INVALID ✗")

    # Save and reload keys
    save_private_key_pem(priv, "rsa_private.pem")
    save_public_key_pem(pub, "rsa_public.pem")
    priv2 = load_private_key_pem("rsa_private.pem")
    pub2 = load_public_key_pem("rsa_public.pem")

    # Re-sign using loaded keys
    sig2 = sign_message_rsa_pss(priv2, msg)
    ok3 = verify_signature_rsa_pss(pub2, msg, sig2)
    print("\\nVerification after saving & reloading keys:", "VALID ✓" if ok3 else "INVALID ✗")`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-foreground">Python Implementation</h1>
        <Button onClick={handleCopy} variant="outline" size="sm">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </div>

      <div className="space-y-6">
        <section>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This Python implementation demonstrates RSA digital signatures using the <code className="bg-accent px-2 py-1 rounded text-sm">cryptography</code> library. 
            The code includes key generation, signing, verification, and key management operations.
          </p>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Prerequisites</h2>
          <p className="text-sm text-muted-foreground mb-3">Install the required library:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code className="text-sm">pip install cryptography</code>
          </pre>
        </section>

        <section>
          <div className="bg-muted rounded-lg border border-border overflow-hidden">
            <div className="bg-accent/20 px-4 py-2 border-b border-border">
              <span className="text-sm font-medium text-foreground">crypto1.py</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
              <code>{pythonCode}</code>
            </pre>
          </div>
        </section>

        <section className="bg-accent/10 border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Code Explanation</h2>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Key Generation</h3>
            <p className="text-sm text-muted-foreground">
              The <code className="bg-accent px-2 py-1 rounded">generate_rsa_keypair()</code> function creates an RSA key pair 
              with a configurable key size (default 2048 bits) using a public exponent of 65537.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Signing</h3>
            <p className="text-sm text-muted-foreground">
              The <code className="bg-accent px-2 py-1 rounded">sign_message_rsa_pss()</code> function uses RSA-PSS 
              (Probabilistic Signature Scheme) with SHA-256 hashing and MGF1 mask generation function for enhanced security.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Verification</h3>
            <p className="text-sm text-muted-foreground">
              The <code className="bg-accent px-2 py-1 rounded">verify_signature_rsa_pss()</code> function attempts to verify 
              the signature and returns True if valid, False otherwise. Invalid signatures raise exceptions that are caught.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Key Management</h3>
            <p className="text-sm text-muted-foreground">
              Functions for saving and loading keys in PEM format are provided. Private keys can be optionally encrypted 
              with a passphrase for additional security.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Demo Usage</h3>
            <p className="text-sm text-muted-foreground">
              The main block demonstrates the complete workflow: taking user input, hashing, signing, verifying with 
              both original and tampered messages, and testing key persistence through save/load operations.
            </p>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Expected Output Example</h2>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
{`Enter a message to authenticate: Hello, World!

Original Message: Hello, World!
SHA-256 Hash: dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f

RSA keypair generated (2048 bits).

Signature (hex, first 80 chars): 8f3a2c1b7e9d4a5f6c8b2e1d9a7c5b3e8f1a4c6d9b2e5a7c1f4b8d3e6a9c2f5b8e1a4c7d9b...

Verification (original message): VALID ✓
Verification (tampered message): INVALID ✗

Verification after saving & reloading keys: VALID ✓`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Code;
