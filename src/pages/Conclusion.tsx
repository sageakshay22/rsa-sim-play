import { CheckCircle, BookOpen, Code2 } from "lucide-react";

const Conclusion = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Conclusion</h1>

      <div className="space-y-8">
        <section>
          <p className="text-lg text-muted-foreground leading-relaxed">
            RSA digital signatures represent a cornerstone of modern cryptography, providing robust 
            mechanisms for authentication, integrity verification, and non-repudiation in digital 
            communications. Through this educational module, we have explored the theoretical 
            foundations, practical implementations, and security considerations of the hash-then-sign 
            paradigm using RSA.
          </p>
        </section>

        <section className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            Key Takeaways
          </h2>
          <ul className="space-y-3 text-muted-foreground ml-8">
            <li className="leading-relaxed">
              <strong className="text-foreground">Mathematical Security:</strong> RSA's security relies on the computational 
              hardness of integer factorization, making it infeasible for attackers to forge signatures 
              without access to the private key.
            </li>
            <li className="leading-relaxed">
              <strong className="text-foreground">Efficiency Through Hashing:</strong> The hash-then-sign paradigm enables 
              efficient signing of arbitrarily large messages by first reducing them to fixed-size 
              cryptographic hashes.
            </li>
            <li className="leading-relaxed">
              <strong className="text-foreground">Attack Resistance:</strong> As demonstrated through our attack scenarios, 
              any tampering with the message, signature, or public key results in verification failure, 
              providing strong integrity guarantees.
            </li>
            <li className="leading-relaxed">
              <strong className="text-foreground">Practical Implementation:</strong> Modern cryptographic libraries like the 
              Web Crypto API and Python's cryptography module make RSA signatures accessible and 
              implementable in real-world applications.
            </li>
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-accent/10 border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Theoretical Understanding</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We have examined the mathematical foundations of RSA, including modular arithmetic, 
              Euler's totient function, and the relationship between public and private keys that 
              enables asymmetric cryptography.
            </p>
          </div>

          <div className="bg-accent/10 border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Practical Skills</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Through hands-on simulations and code examples, we have gained experience with key 
              generation, message signing, signature verification, and analyzing common attack vectors 
              against digital signature systems.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Real-World Impact</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            RSA digital signatures are fundamental to the security infrastructure of the modern internet. 
            They enable:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
            <li>Secure software distribution and updates through code signing</li>
            <li>Trusted communication channels via SSL/TLS certificates</li>
            <li>Blockchain transaction verification and smart contract execution</li>
            <li>Legal validity of electronic documents and contracts</li>
            <li>Email security through S/MIME and PGP protocols</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Looking Forward</h2>
          <p className="text-muted-foreground leading-relaxed">
            As quantum computing advances, the cryptographic community is actively developing 
            post-quantum signature schemes to complement or replace RSA. However, RSA remains widely 
            deployed and continues to secure billions of transactions daily. Understanding RSA provides 
            a solid foundation for exploring modern cryptographic protocols and designing secure systems.
          </p>
        </section>

        <section className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Final Thoughts</h2>
          <p className="text-muted-foreground leading-relaxed">
            Digital signatures exemplify how mathematical theory translates into practical security 
            solutions. By combining asymmetric cryptography with cryptographic hash functions, RSA 
            signatures achieve security properties that would be impossible with symmetric methods alone. 
            As you continue your journey in cybersecurity and cryptography, the principles learned here 
            will serve as building blocks for understanding more advanced topics in secure communication, 
            privacy-preserving technologies, and distributed trust systems.
          </p>
        </section>

        <div className="text-center pt-8">
          <p className="text-muted-foreground italic">
            "In cryptography, we trust in mathematics."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
