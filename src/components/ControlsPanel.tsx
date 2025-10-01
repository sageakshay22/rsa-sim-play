import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Play, Trash2, AlertTriangle } from 'lucide-react';
import type { RsaAlgorithm, KeySize } from '@/lib/cryptoClient';

interface ControlsPanelProps {
  message: string;
  algorithm: RsaAlgorithm;
  keySize: KeySize;
  tamperMessage: boolean;
  swapPublicKey: boolean;
  corruptSignature: boolean;
  isSimulating: boolean;
  hasKeys: boolean;
  onMessageChange: (message: string) => void;
  onAlgorithmChange: (algorithm: RsaAlgorithm) => void;
  onKeySizeChange: (keySize: KeySize) => void;
  onToggleTamper: () => void;
  onToggleSwap: () => void;
  onToggleCorrupt: () => void;
  onGenerateKeys: () => void;
  onRunSimulation: () => void;
  onClearLogs: () => void;
}

export function ControlsPanel({
  message,
  algorithm,
  keySize,
  tamperMessage,
  swapPublicKey,
  corruptSignature,
  isSimulating,
  hasKeys,
  onMessageChange,
  onAlgorithmChange,
  onKeySizeChange,
  onToggleTamper,
  onToggleSwap,
  onToggleCorrupt,
  onGenerateKeys,
  onRunSimulation,
  onClearLogs,
}: ControlsPanelProps) {
  const hasAttacks = tamperMessage || swapPublicKey || corruptSignature;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Simulation Controls</CardTitle>
        <CardDescription>Configure the signing simulation and attack scenarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Input */}
        <div className="space-y-2">
          <Label htmlFor="message">Message to Sign</Label>
          <Input
            id="message"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Enter message..."
            disabled={isSimulating}
          />
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-2">
          <Label htmlFor="algorithm">Signature Algorithm</Label>
          <Select value={algorithm} onValueChange={(v) => onAlgorithmChange(v as RsaAlgorithm)} disabled={isSimulating}>
            <SelectTrigger id="algorithm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RSA-PSS">RSA-PSS (Recommended)</SelectItem>
              <SelectItem value="RSASSA-PKCS1-v1_5">RSASSA-PKCS1-v1_5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Size Selection */}
        <div className="space-y-2">
          <Label htmlFor="keysize">Key Size (bits)</Label>
          <Select value={keySize.toString()} onValueChange={(v) => onKeySizeChange(parseInt(v) as KeySize)} disabled={isSimulating}>
            <SelectTrigger id="keysize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2048">2048 bits</SelectItem>
              <SelectItem value="3072">3072 bits</SelectItem>
              <SelectItem value="4096">4096 bits (Most Secure)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Attack Scenarios */}
        <div className="space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-destructive">
            <AlertTriangle className="h-4 w-4" />
            Attack Scenarios
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="tamper" className="text-sm">
                Tamper Message in Transit
              </Label>
              <Switch id="tamper" checked={tamperMessage} onCheckedChange={onToggleTamper} disabled={isSimulating} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="swap" className="text-sm">
                Swap Public Key at Receiver
              </Label>
              <Switch id="swap" checked={swapPublicKey} onCheckedChange={onToggleSwap} disabled={isSimulating} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="corrupt" className="text-sm">
                Corrupt Signature Bytes
              </Label>
              <Switch id="corrupt" checked={corruptSignature} onCheckedChange={onToggleCorrupt} disabled={isSimulating} />
            </div>
          </div>

          {hasAttacks && (
            <p className="text-xs text-destructive">
              ⚠️ Attack mode enabled - verification will fail
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button onClick={onGenerateKeys} disabled={isSimulating} className="w-full" size="lg">
            <KeyRound className="mr-2 h-4 w-4" />
            Generate Keys
          </Button>

          <Button 
            onClick={onRunSimulation} 
            disabled={!hasKeys || isSimulating} 
            className="w-full" 
            variant="default"
            size="lg"
          >
            <Play className="mr-2 h-4 w-4" />
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </Button>

          <Button onClick={onClearLogs} disabled={isSimulating} variant="outline" size="sm" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
