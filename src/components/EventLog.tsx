import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import type { LogEntry } from '@/hooks/useSimulation';

interface EventLogProps {
  logs: LogEntry[];
}

export function EventLog({ logs }: EventLogProps) {
  const getActorColor = (actor: LogEntry['actor']) => {
    switch (actor) {
      case 'A': return 'bg-primary/10 text-primary border-primary/20';
      case 'B': return 'bg-accent/10 text-accent border-accent/20';
      case 'Attacker': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'System': return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-destructive';
      case 'warning': return 'text-orange-600';
      default: return 'text-foreground';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Event Log</CardTitle>
          <Badge variant="outline">{logs.length} events</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/20 p-4">
          {logs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              No events yet. Generate keys and run a simulation to see the process.
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getActorColor(log.actor)}>
                      {log.actor}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {log.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <p className={`text-sm ${getTypeColor(log.type)} leading-relaxed`}>
                    {log.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
