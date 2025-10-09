const Introduction = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-foreground">
        Introduction to RSA Digital Signatures
      </h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">What are Digital Signatures?</h2>
          <p className="leading-relaxed">
            Digital signatures are cryptographic mechanisms that provide authentication, integrity, 
            and non-repudiation for digital messages and documents. They serve as the electronic 
            equivalent of handwritten signatures, but with much stronger security guarantees.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">RSA Digital Signatures</h2>
          <p className="leading-relaxed mb-4">
            RSA (Rivest-Shamir-Adleman) is one of the most widely used public-key cryptosystems 
            for digital signatures. It was invented in 1977 and remains a cornerstone of modern 
            cryptography. RSA digital signatures use asymmetric cryptography, involving a pair of 
            keys:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-foreground">Private Key:</strong> Known only to the signer, used to create signatures</li>
            <li><strong className="text-foreground">Public Key:</strong> Shared with everyone, used to verify signatures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Hash-then-Sign Paradigm</h2>
          <p className="leading-relaxed">
            In practice, RSA signatures use the "hash-then-sign" approach. Instead of signing the 
            entire message (which may be large), we first compute a cryptographic hash of the message 
            using algorithms like SHA-256. This hash is then signed, providing efficiency while 
            maintaining security. Any change to the original message will result in a completely 
            different hash, making tampering detectable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Why are Digital Signatures Important?</h2>
          <p className="leading-relaxed mb-4">
            Digital signatures are fundamental to secure communication in the digital age:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-foreground">Authentication:</strong> Verify the identity of the sender</li>
            <li><strong className="text-foreground">Integrity:</strong> Ensure the message hasn't been altered</li>
            <li><strong className="text-foreground">Non-repudiation:</strong> Prevent the sender from denying they sent the message</li>
          </ul>
        </section>

        <section className="bg-accent/10 p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Real-World Applications</h2>
          <p className="leading-relaxed">
            RSA digital signatures are used extensively in software distribution, email security 
            (S/MIME), SSL/TLS certificates, blockchain technologies, electronic contracts, and 
            secure messaging systems. Understanding how they work is essential for anyone involved 
            in cybersecurity, software development, or information security.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Introduction;
