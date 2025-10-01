import { Header } from '@/components/Header';
import { ControlsPanel } from '@/components/ControlsPanel';
import { UserCard } from '@/components/UserCard';
import { EventLog } from '@/components/EventLog';
import { NetworkAnimation } from '@/components/NetworkAnimation';
import { useSimulation } from '@/hooks/useSimulation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadSignature } from '@/lib/exporters';

export default function RsaSimulation() {
  const {
    state,
    generateKeys,
    runSimulation,
    clearLogs,
    updateMessage,
    updateAlgorithm,
    updateKeySize,
    toggleTamperMessage,
    toggleSwapPublicKey,
    toggleCorruptSignature,
  } = useSimulation();

  const hasKeys = !!(state.userAKeys.publicKey && state.userBKeys.publicKey);
  const hasAttacks = state.tamperMessage || state.swapPublicKey || state.corruptSignatureBytes;

  const handleDownloadSignature = () => {
    if (state.signatureBase64) {
      downloadSignature(state.signatureBase64, 'signature.txt');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <ControlsPanel
              message={state.message}
              algorithm={state.algorithm}
              keySize={state.keySize}
              tamperMessage={state.tamperMessage}
              swapPublicKey={state.swapPublicKey}
              corruptSignature={state.corruptSignatureBytes}
              isSimulating={state.isSimulating}
              hasKeys={hasKeys}
              onMessageChange={updateMessage}
              onAlgorithmChange={updateAlgorithm}
              onKeySizeChange={updateKeySize}
              onToggleTamper={toggleTamperMessage}
              onToggleSwap={toggleSwapPublicKey}
              onToggleCorrupt={toggleCorruptSignature}
              onGenerateKeys={generateKeys}
              onRunSimulation={runSimulation}
              onClearLogs={clearLogs}
            />
          </div>

          {/* User Cards and Animation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Network Animation */}
            <NetworkAnimation isSimulating={state.isSimulating} hasAttack={hasAttacks} />

            {/* User Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserCard
                userName="A"
                userKeys={state.userAKeys}
                messageHash={state.messageHash}
                signatureBase64={state.signatureBase64}
                isSender
              />
              <UserCard
                userName="B"
                userKeys={state.userBKeys}
                isVerified={state.isVerified}
                isSender={false}
              />
            </div>

            {/* Download Signature Button */}
            {state.signatureBase64 && (
              <div className="flex justify-center">
                <Button onClick={handleDownloadSignature} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Signature File
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Event Log */}
        <EventLog logs={state.logs} />
      </main>
    </div>
  );
}
