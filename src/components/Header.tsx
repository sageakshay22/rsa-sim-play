import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RSA Signature Simulator</h1>
            <p className="text-sm text-muted-foreground">
              Interactive hash-then-sign demonstration with attack scenarios
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
