
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Zap, 
  FileText,
  ExternalLink,
  Play,
  Pause
} from 'lucide-react';

interface RealtimeLogsProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  onOpenInSupabase: (path: string) => void;
}

const RealtimeLogs: React.FC<RealtimeLogsProps> = ({ 
  projectUrl, 
  anonKey, 
  serviceRoleKey, 
  onOpenInSupabase 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [events] = useState([
    { type: 'INSERT', table: 'form_submissions', timestamp: new Date(), data: { email: 'user@example.com' } },
    { type: 'UPDATE', table: 'user_activity', timestamp: new Date(), data: { last_seen: new Date() } }
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Realtime & Logs</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenInSupabase('/logs')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in Supabase
          </Button>
        </div>
      </div>

      <Tabs defaultValue="realtime">
        <TabsList>
          <TabsTrigger value="realtime">Realtime Events</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Live Events
                </CardTitle>
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsListening(!isListening)}
                >
                  {isListening ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isListening ? 'Stop' : 'Start'} Listening
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isListening ? (
                <div className="space-y-2">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.type}</Badge>
                        <span className="text-sm font-medium">{event.table}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Click "Start Listening" to monitor real-time events
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                System logs functionality coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealtimeLogs;
