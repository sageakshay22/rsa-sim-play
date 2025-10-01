import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shield, AlertTriangle, Send } from 'lucide-react';

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
          <div className="flex flex-col items-center gap-2 min-w-[100px]">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-all ${
              isSimulating ? 'bg-primary/20 ring-2 ring-primary/40' : 'bg-primary/10'
            }`}>
              <Shield className={`h-8 w-8 text-primary transition-transform ${
                isSimulating ? 'scale-110' : ''
              }`} />
            </div>
            <span className="text-sm font-medium">User A</span>
            <span className="text-xs text-muted-foreground">Sender</span>
          </div>

          {/* Animation Arrow */}
          <div className="relative flex-1 min-w-[200px] px-4">
            <div className="flex items-center justify-center">
              <div className={`flex-1 border-t-2 border-dashed transition-colors ${
                isSimulating ? 'border-primary' : 'border-border'
              }`} />
              <ArrowRight className={`h-8 w-8 mx-2 transition-colors ${
                isSimulating ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <div className={`flex-1 border-t-2 border-dashed transition-colors ${
                isSimulating ? 'border-primary' : 'border-border'
              }`} />
            </div>

            {/* Animated Packet */}
            {isSimulating && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full">
                <div className="animate-slide-right">
                  <div className={`flex items-center gap-2 rounded-lg border px-4 py-2 shadow-lg backdrop-blur-sm ${
                    hasAttack 
                      ? 'bg-destructive/20 border-destructive text-destructive' 
                      : 'bg-success/20 border-success text-success'
                  }`}>
                    {hasAttack ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span className="text-sm font-medium whitespace-nowrap">
                      {hasAttack ? 'Attack Detected' : 'Secure Message'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Status Label */}
            <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap">
              <span className={`text-xs font-medium transition-colors ${
                isSimulating ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {isSimulating ? '📡 Transmitting data...' : 'Ready to transmit'}
              </span>
            </div>
          </div>

          {/* User B */}
          <div className="flex flex-col items-center gap-2 min-w-[100px]">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-all ${
              isSimulating ? 'bg-accent/20 ring-2 ring-accent/40' : 'bg-accent/10'
            }`}>
              <Shield className={`h-8 w-8 text-accent transition-transform ${
                isSimulating ? 'scale-110' : ''
              }`} />
            </div>
            <span className="text-sm font-medium">User B</span>
            <span className="text-xs text-muted-foreground">Receiver</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
