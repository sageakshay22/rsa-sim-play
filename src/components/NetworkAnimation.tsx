import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, AlertTriangle } from 'lucide-react';

interface NetworkAnimationProps {
  isSimulating: boolean;
  hasAttack: boolean;
}

export function NetworkAnimation({ isSimulating, hasAttack }: NetworkAnimationProps) {
  return (
    <Card className="shadow-card">
      <CardContent className="py-8">
        <div className="flex items-center justify-center gap-4">
          {/* User A */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <span className="text-sm font-medium">User A</span>
            <span className="text-xs text-muted-foreground">Sender</span>
          </div>

          {/* Animation Arrow */}
          <div className="relative flex-1">
            <div className="flex items-center justify-center">
              <div className="flex-1 border-t-2 border-dashed border-border" />
              <ArrowRight className="h-8 w-8 text-muted-foreground mx-2" />
              <div className="flex-1 border-t-2 border-dashed border-border" />
            </div>

            {/* Animated Packet */}
            {isSimulating && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-slide-right">
                <div className={`flex items-center gap-2 rounded-lg border px-3 py-1 shadow-md ${
                  hasAttack 
                    ? 'bg-destructive/10 border-destructive text-destructive' 
                    : 'bg-success/10 border-success text-success'
                }`}>
                  {hasAttack && <AlertTriangle className="h-4 w-4" />}
                  <span className="text-xs font-medium">
                    {hasAttack ? 'Tampered' : 'Secure'}
                  </span>
                </div>
              </div>
            )}

            {/* Status Label */}
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground">
              {isSimulating ? 'Transmitting...' : 'Ready to transmit'}
            </div>
          </div>

          {/* User B */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <span className="text-sm font-medium">User B</span>
            <span className="text-xs text-muted-foreground">Receiver</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
