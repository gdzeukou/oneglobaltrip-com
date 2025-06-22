
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupabaseConfigProps {
  onConfigSaved: (config: SupabaseConfig) => void;
}

interface SupabaseConfig {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
}

const SupabaseConfig: React.FC<SupabaseConfigProps> = ({ onConfigSaved }) => {
  const [config, setConfig] = useState<SupabaseConfig>({
    projectUrl: '',
    anonKey: '',
    serviceRoleKey: ''
  });
  const [showKeys, setShowKeys] = useState({
    anonKey: false,
    serviceRoleKey: false
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const testConnection = async () => {
    if (!config.projectUrl || !config.anonKey) {
      setErrorMessage('Project URL and Anon Key are required');
      setConnectionStatus('error');
      return;
    }

    setIsTestingConnection(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/supabase/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setConnectionStatus('success');
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Supabase project"
        });
      } else {
        setConnectionStatus('error');
        setErrorMessage(result.error || 'Connection failed');
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage('Failed to test connection');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const saveConfig = () => {
    if (connectionStatus === 'success') {
      onConfigSaved(config);
      toast({
        title: "Configuration Saved",
        description: "Supabase configuration has been saved securely"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectUrl">Project URL</Label>
          <Input
            id="projectUrl"
            placeholder="https://your-project.supabase.co"
            value={config.projectUrl}
            onChange={(e) => setConfig(prev => ({ ...prev, projectUrl: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="anonKey">Anonymous Key</Label>
          <div className="relative">
            <Input
              id="anonKey"
              type={showKeys.anonKey ? 'text' : 'password'}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={config.anonKey}
              onChange={(e) => setConfig(prev => ({ ...prev, anonKey: e.target.value }))}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowKeys(prev => ({ ...prev, anonKey: !prev.anonKey }))}
            >
              {showKeys.anonKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceRoleKey">Service Role Key</Label>
          <div className="relative">
            <Input
              id="serviceRoleKey"
              type={showKeys.serviceRoleKey ? 'text' : 'password'}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={config.serviceRoleKey}
              onChange={(e) => setConfig(prev => ({ ...prev, serviceRoleKey: e.target.value }))}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowKeys(prev => ({ ...prev, serviceRoleKey: !prev.serviceRoleKey }))}
            >
              {showKeys.serviceRoleKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {connectionStatus === 'error' && errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {connectionStatus === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Connection test successful!</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            onClick={testConnection}
            disabled={isTestingConnection || !config.projectUrl || !config.anonKey}
            variant="outline"
          >
            {isTestingConnection ? 'Testing...' : 'Test Connection'}
          </Button>
          
          <Button
            onClick={saveConfig}
            disabled={connectionStatus !== 'success'}
          >
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseConfig;
