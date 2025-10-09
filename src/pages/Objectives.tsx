import { Target, CheckCircle } from "lucide-react";

const Objectives = () => {
  const objectives = [
    {
      title: "Understand RSA Digital Signature Fundamentals",
      description: "Learn the basic principles of RSA cryptography and how digital signatures provide authentication, integrity, and non-repudiation.",
    },
    {
      title: "Explore the Hash-then-Sign Paradigm",
      description: "Understand why messages are hashed before signing and how cryptographic hash functions like SHA-256 ensure efficiency and security.",
    },
    {
      title: "Visualize the Signing and Verification Process",
      description: "Use interactive simulations to see how a message is signed by User A and verified by User B in a step-by-step visual representation.",
    },
    {
      title: "Analyze Attack Scenarios",
      description: "Examine three common attack vectors: message tampering, public key swapping, and signature corruption, and understand why they fail.",
    },
    {
      title: "Apply RSA Signatures in Practice",
      description: "Implement RSA digital signatures using Python and the Web Crypto API to gain hands-on experience with real cryptographic operations.",
    },
    {
      title: "Understand Key Generation and Management",
      description: "Learn how RSA key pairs are generated, stored securely, and used in practical applications with varying key sizes (2048, 3072, 4096 bits).",
    },
    {
      title: "Recognize Real-World Applications",
      description: "Identify how RSA digital signatures are used in software distribution, secure communications, blockchain, and electronic contracts.",
    },
    {
      title: "Develop Security Awareness",
      description: "Understand the importance of protecting private keys and recognizing potential vulnerabilities in cryptographic systems.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <Target className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold text-foreground">Learning Objectives</h1>
      </div>
      
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        By the end of this educational module on RSA digital signatures, you will be able to:
      </p>

      <div className="space-y-6">
        {objectives.map((objective, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {index + 1}. {objective.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {objective.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-accent/10 border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Assessment Goals</h2>
        <p className="text-muted-foreground leading-relaxed">
          These objectives align with developing a comprehensive understanding of public-key 
          cryptography, cryptographic protocols, and secure system design. Mastery of these 
          concepts will prepare you for advanced topics in cybersecurity, applied cryptography, 
          and secure software development.
        </p>
      </div>
    </div>
  );
};

export default Objectives;
