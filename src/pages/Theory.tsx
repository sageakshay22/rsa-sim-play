const Theory = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Theory of RSA Digital Signatures
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. RSA Key Generation</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            RSA key generation involves the following mathematical steps:
          </p>
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div>
              <p className="font-mono text-sm mb-2 text-foreground">1. Choose two large prime numbers: <strong>p</strong> and <strong>q</strong></p>
            </div>
            <div>
              <p className="font-mono text-sm mb-2 text-foreground">2. Compute modulus: <strong>n = p × q</strong></p>
            </div>
            <div>
              <p className="font-mono text-sm mb-2 text-foreground">3. Compute Euler's totient: <strong>φ(n) = (p-1) × (q-1)</strong></p>
            </div>
            <div>
              <p className="font-mono text-sm mb-2 text-foreground">4. Choose public exponent: <strong>e</strong> (commonly 65537)</p>
              <p className="text-xs text-muted-foreground ml-4">where 1 &lt; e &lt; φ(n) and gcd(e, φ(n)) = 1</p>
            </div>
            <div>
              <p className="font-mono text-sm mb-2 text-foreground">5. Compute private exponent: <strong>d ≡ e<sup>-1</sup> (mod φ(n))</strong></p>
            </div>
          </div>
          <div className="mt-4 bg-accent/10 border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Key Pair:</strong><br />
              Public Key: (e, n)<br />
              Private Key: (d, n)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Hash Functions</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Before signing, the message is hashed using a cryptographic hash function like SHA-256:
          </p>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="font-mono text-sm text-foreground mb-3">
              <strong>h = H(M)</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-3">where:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• M is the original message</li>
              <li>• H is the hash function (e.g., SHA-256)</li>
              <li>• h is the fixed-size hash digest (256 bits for SHA-256)</li>
            </ul>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Properties of Cryptographic Hash Functions:</strong>
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• <strong className="text-foreground">Deterministic:</strong> Same input always produces same output</li>
              <li>• <strong className="text-foreground">One-way:</strong> Computationally infeasible to reverse</li>
              <li>• <strong className="text-foreground">Collision-resistant:</strong> Hard to find two inputs with same hash</li>
              <li>• <strong className="text-foreground">Avalanche effect:</strong> Small input change drastically changes output</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Signature Generation</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The sender (User A) creates a signature using their private key:
          </p>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="font-mono text-sm text-foreground mb-4">
              <strong>σ = h<sup>d</sup> mod n</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-3">where:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• σ (sigma) is the digital signature</li>
              <li>• h is the hash of the message</li>
              <li>• d is the private exponent (User A's private key)</li>
              <li>• n is the modulus</li>
            </ul>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            In practice, padding schemes like RSA-PSS (Probabilistic Signature Scheme) or 
            RSASSA-PKCS1-v1_5 are used to add security against certain attacks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Signature Verification</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The receiver (User B) verifies the signature using the sender's public key:
          </p>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="font-mono text-sm text-foreground mb-4">
              <strong>h' = σ<sup>e</sup> mod n</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-3">where:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• h' is the recovered hash</li>
              <li>• σ is the received signature</li>
              <li>• e is the public exponent (User A's public key)</li>
              <li>• n is the modulus</li>
            </ul>
          </div>
          <div className="mt-4 bg-accent/10 border border-border rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-2">Verification Process:</p>
            <ol className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>1. Compute the hash of the received message: h<sub>B</sub> = H(M)</li>
              <li>2. Decrypt the signature using sender's public key: h' = σ<sup>e</sup> mod n</li>
              <li>3. Compare h' with h<sub>B</sub></li>
              <li>4. If h' = h<sub>B</sub>, signature is <strong className="text-green-600">VALID</strong></li>
              <li>5. If h' ≠ h<sub>B</sub>, signature is <strong className="text-destructive">INVALID</strong></li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Security Properties</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Only the holder of the private key can create a valid signature, proving the 
                message originated from User A.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                Any modification to the message changes its hash, causing verification to fail. 
                Even a single bit change is detectable.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Non-repudiation</h3>
              <p className="text-sm text-muted-foreground">
                Since only User A has the private key, they cannot deny signing the message. 
                The signature serves as mathematical proof of authorship.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Mathematical Foundation</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            RSA security relies on the computational hardness of:
          </p>
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div>
              <p className="font-semibold text-foreground">Integer Factorization Problem</p>
              <p className="text-sm text-muted-foreground">
                Given n = p × q, it is computationally infeasible to find p and q when they are 
                large primes (typically 1024+ bits each for 2048-bit keys).
              </p>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-foreground">RSA Problem</p>
              <p className="text-sm text-muted-foreground">
                Given (n, e) and a ciphertext c, it is hard to compute m such that m<sup>e</sup> ≡ c (mod n) 
                without knowing the private key d.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-accent/10 border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Key Takeaway</h2>
          <p className="text-muted-foreground leading-relaxed">
            RSA digital signatures leverage the mathematical relationship between public and private 
            keys, combined with cryptographic hash functions, to provide strong guarantees of 
            authenticity, integrity, and non-repudiation. The security depends on the difficulty of 
            factoring large numbers and the proper implementation of padding schemes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Theory;
