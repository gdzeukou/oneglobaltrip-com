
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Save, 
  FolderOpen, 
  Code, 
  Database,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SqlEditorProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  onOpenInSupabase: (path: string) => void;
}

const SqlEditor: React.FC<SqlEditorProps> = ({ 
  projectUrl, 
  anonKey, 
  serviceRoleKey, 
  onOpenInSupabase 
}) => {
  const [query, setQuery] = useState('-- Write your SQL query here\nSELECT * FROM information_schema.tables LIMIT 10;');
  const [results, setResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [environment, setEnvironment] = useState<'dev' | 'prod'>('dev');
  const { toast } = useToast();

  const executeQuery = async () => {
    if (!query.trim()) return;

    setIsExecuting(true);
    setError(null);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/supabase/execute-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectUrl, 
          serviceRoleKey, 
          query: query.trim(),
          environment 
        })
      });
      
      const result = await response.json();
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);

      if (result.success) {
        setResults(result.data || []);
        setColumns(result.columns || []);
        toast({
          title: "Query Executed",
          description: `Completed in ${endTime - startTime}ms`
        });
      } else {
        setError(result.error || 'Unknown error occurred');
        setResults([]);
        setColumns([]);
      }
    } catch (error) {
      setError('Failed to execute query');
      setResults([]);
      setColumns([]);
    } finally {
      setIsExecuting(false);
    }
  };

  const saveQuery = () => {
    // Save to localStorage for now
    const savedQueries = JSON.parse(localStorage.getItem('supabase-saved-queries') || '[]');
    const queryName = prompt('Enter query name:');
    if (queryName) {
      savedQueries.push({ name: queryName, query, date: new Date().toISOString() });
      localStorage.setItem('supabase-saved-queries', JSON.stringify(savedQueries));
      toast({
        title: "Query Saved",
        description: `Saved as "${queryName}"`
      });
    }
  };

  const loadSavedQuery = () => {
    const savedQueries = JSON.parse(localStorage.getItem('supabase-saved-queries') || '[]');
    // For now, just load the first saved query
    if (savedQueries.length > 0) {
      setQuery(savedQueries[0].query);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <h3 className="text-lg font-semibold">SQL Editor</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={environment === 'dev' ? 'default' : 'destructive'}>
            {environment.toUpperCase()}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenInSupabase('/sql')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in Supabase
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Query Editor</TabsTrigger>
          <TabsTrigger value="api">API Playground</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">SQL Query</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={loadSavedQuery}>
                    <FolderOpen className="h-4 w-4" />
                    Load
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveQuery}>
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button 
                    onClick={executeQuery} 
                    disabled={isExecuting}
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                    {isExecuting ? 'Running...' : 'Execute'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write your SQL query here..."
                className="min-h-32 font-mono text-sm"
              />
            </CardContent>
          </Card>

          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <div>
                    <div className="font-medium">Query Error</div>
                    <div className="text-sm opacity-90">{error}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {results.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Query Results</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{results.length} rows</span>
                    {executionTime && <span>• {executionTime}ms</span>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map((column) => (
                          <TableHead key={column}>{column}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.slice(0, 100).map((row, index) => (
                        <TableRow key={index}>
                          {columns.map((column) => (
                            <TableCell key={column} className="max-w-48 truncate">
                              {typeof row[column] === 'object' 
                                ? JSON.stringify(row[column]) 
                                : row[column]?.toString() || '—'
                              }
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {results.length > 100 && (
                    <div className="text-center text-sm text-muted-foreground py-2">
                      Showing first 100 rows of {results.length} results
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center text-muted-foreground">
                API Playground coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SqlEditor;
