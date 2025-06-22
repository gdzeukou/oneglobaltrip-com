
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Play, 
  Activity, 
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EdgeFunctionsProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  onOpenInSupabase: (path: string) => void;
}

interface EdgeFunction {
  name: string;
  status: 'active' | 'inactive';
  last_deployed: string;
  invocations_24h: number;
  errors_24h: number;
}

const EdgeFunctions: React.FC<EdgeFunctionsProps> = ({ 
  projectUrl, 
  anonKey, 
  serviceRoleKey, 
  onOpenInSupabase 
}) => {
  const [functions, setFunctions] = useState<EdgeFunction[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFunctions();
  }, []);

  const loadFunctions = async () => {
    setLoading(true);
    try {
      // Mock data for now - in real implementation, this would call the Supabase API
      const mockFunctions: EdgeFunction[] = [
        {
          name: 'send-welcome-email',
          status: 'active',
          last_deployed: '2024-01-15T10:30:00Z',
          invocations_24h: 45,
          errors_24h: 0
        },
        {
          name: 'send-marketing-email',
          status: 'active',
          last_deployed: '2024-01-14T15:45:00Z',
          invocations_24h: 23,
          errors_24h: 2
        },
        {
          name: 'send-automated-email',
          status: 'active',
          last_deployed: '2024-01-13T09:20:00Z',
          invocations_24h: 12,
          errors_24h: 0
        }
      ];
      setFunctions(mockFunctions);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load edge functions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Edge Functions</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadFunctions}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenInSupabase('/functions')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in Supabase
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {functions.map((func) => (
          <Card key={func.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{func.name}</CardTitle>
                <Badge variant={func.status === 'active' ? "default" : "secondary"}>
                  {func.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs text-muted-foreground">
                Last deployed: {formatDate(func.last_deployed)}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>{func.invocations_24h} calls</span>
                </div>
                {func.errors_24h > 0 && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>{func.errors_24h} errors</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="h-3 w-3" />
                  Test
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Code className="h-3 w-3" />
                  Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {functions.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8 text-muted-foreground">
            No edge functions found
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EdgeFunctions;
