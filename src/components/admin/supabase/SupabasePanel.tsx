
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Users, 
  HardDrive, 
  Code, 
  Activity, 
  Settings,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import DataExplorer from './DataExplorer';
import SqlEditor from './SqlEditor';
import AuthManager from './AuthManager';
import StorageBrowser from './StorageBrowser';
import EdgeFunctions from './EdgeFunctions';
import RealtimeLogs from './RealtimeLogs';

interface SupabasePanelProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
}

const SupabasePanel: React.FC<SupabasePanelProps> = ({ projectUrl, anonKey, serviceRoleKey }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('data');

  const projectId = projectUrl.split('//')[1]?.split('.')[0];

  const openInSupabase = (path: string = '') => {
    const baseUrl = `https://supabase.com/dashboard/project/${projectId}`;
    window.open(`${baseUrl}${path}`, '_blank');
  };

  const tabConfig = [
    { id: 'data', label: 'Data Explorer', icon: Database, component: DataExplorer },
    { id: 'sql', label: 'SQL Editor', icon: Code, component: SqlEditor },
    { id: 'auth', label: 'Auth Manager', icon: Users, component: AuthManager },
    { id: 'storage', label: 'Storage', icon: HardDrive, component: StorageBrowser },
    { id: 'functions', label: 'Edge Functions', icon: Code, component: EdgeFunctions },
    { id: 'realtime', label: 'Realtime & Logs', icon: Activity, component: RealtimeLogs }
  ];

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Supabase Management
                <Badge variant="secondary" className="ml-2">Connected</Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openInSupabase();
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                {tabConfig.map(({ id, label, icon: Icon }) => (
                  <TabsTrigger key={id} value={id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabConfig.map(({ id, component: Component }) => (
                <TabsContent key={id} value={id} className="mt-4">
                  <Component 
                    projectUrl={projectUrl}
                    anonKey={anonKey}
                    serviceRoleKey={serviceRoleKey}
                    onOpenInSupabase={openInSupabase}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default SupabasePanel;
