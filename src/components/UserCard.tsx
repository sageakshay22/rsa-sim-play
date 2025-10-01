import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Key, Download, CheckCircle, XCircle } from 'lucide-react';
import { exportPublicKeyPEM, exportPrivateKeyPEM } from '@/lib/cryptoClient';
import { downloadPublicKey, downloadPrivateKey } from '@/lib/exporters';
import type { UserKeys } from '@/hooks/useSimulation';

interface UserCardProps {
  userName: 'A' | 'B';
  userKeys: UserKeys;
  messageHash?: string;
  signatureBase64?: string;
  isVerified?: boolean | null;
  isSender?: boolean;
}

export function UserCard({
  userName,
  userKeys,
  messageHash,
  signatureBase64,
  isVerified,
  isSender,
}: UserCardProps) {
  const hasKeys = userKeys.publicKey && userKeys.privateKey;

  const handleDownloadPublic = async () => {
    if (userKeys.publicKey) {
      const pem = await exportPublicKeyPEM(userKeys.publicKey);
      downloadPublicKey(pem, `User${userName}`);
    }
  };

  const handleDownloadPrivate = async () => {
    if (userKeys.privateKey) {
      const pem = await exportPrivateKeyPEM(userKeys.privateKey);
      downloadPrivateKey(pem, `User${userName}`);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
              userName === 'A' ? 'bg-primary/10' : 'bg-accent/10'
            }`}>
              <User className={`h-5 w-5 ${userName === 'A' ? 'text-primary' : 'text-accent'}`} />
            </div>
            <CardTitle className="text-lg">User {userName}</CardTitle>
          </div>
          {hasKeys && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <Key className="mr-1 h-3 w-3" />
              Keys Ready
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Public Key:</span>
            <span className={hasKeys ? 'text-success font-medium' : 'text-muted-foreground'}>
              {hasKeys ? 'Generated' : 'Not generated'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Private Key:</span>
            <span className={hasKeys ? 'text-success font-medium' : 'text-muted-foreground'}>
              {hasKeys ? 'Generated' : 'Not generated'}
            </span>
          </div>
        </div>

        {/* Export Buttons */}
        {hasKeys && (
          <div className="space-y-2">
            <Button onClick={handleDownloadPublic} variant="outline" size="sm" className="w-full">
              <Download className="mr-2 h-3 w-3" />
              Export Public Key
            </Button>
            <Button onClick={handleDownloadPrivate} variant="outline" size="sm" className="w-full">
              <Download className="mr-2 h-3 w-3" />
              Export Private Key
            </Button>
          </div>
        )}

        {/* Sender Info */}
        {isSender && messageHash && (
          <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
            <div className="text-xs font-medium text-muted-foreground uppercase">Message Hash (SHA-256)</div>
            <div className="font-mono text-xs break-all text-foreground">{messageHash.substring(0, 32)}...</div>
          </div>
        )}

        {isSender && signatureBase64 && (
          <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
            <div className="text-xs font-medium text-muted-foreground uppercase">Signature (Base64)</div>
            <div className="font-mono text-xs break-all text-foreground">{signatureBase64.substring(0, 32)}...</div>
          </div>
        )}

        {/* Receiver Info */}
        {!isSender && isVerified !== null && (
          <div className={`space-y-2 rounded-lg border p-3 ${
            isVerified 
              ? 'bg-success/10 border-success/20' 
              : 'bg-destructive/10 border-destructive/20'
          }`}>
            <div className="flex items-center gap-2">
              {isVerified ? (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium text-success">Signature Valid</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="font-medium text-destructive">Signature Invalid</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isVerified 
                ? 'The message is authentic and has not been tampered with.'
                : 'The message has been tampered, signature corrupted, or wrong key used.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
