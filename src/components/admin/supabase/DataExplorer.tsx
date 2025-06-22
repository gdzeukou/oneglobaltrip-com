
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database, 
  Eye, 
  Edit, 
  Plus, 
  Trash2, 
  Download, 
  Search,
  Shield,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataExplorerProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  onOpenInSupabase: (path: string) => void;
}

interface TableInfo {
  name: string;
  schema: string;
  row_count: number;
  has_rls: boolean;
  columns: ColumnInfo[];
}

interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  default_value: string | null;
}

const DataExplorer: React.FC<DataExplorerProps> = ({ 
  projectUrl, 
  anonKey, 
  serviceRoleKey, 
  onOpenInSupabase 
}) => {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { toast } = useToast();

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/supabase/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectUrl, serviceRoleKey })
      });
      
      const result = await response.json();
      if (result.success) {
        setTables(result.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load tables",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTableData = async (tableName: string) => {
    if (!tableName) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/supabase/table-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectUrl, 
          serviceRoleKey, 
          tableName,
          page: currentPage,
          pageSize,
          search: searchQuery
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setTableData(result.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load table data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (format: 'csv' | 'json') => {
    if (!selectedTable) return;
    
    try {
      const response = await fetch('/api/supabase/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectUrl, 
          serviceRoleKey, 
          tableName: selectedTable,
          format 
        })
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTable}.${format}`;
      a.click();
      
      toast({
        title: "Success",
        description: `Data exported as ${format.toUpperCase()}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive"
      });
    }
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTableInfo = tables.find(t => t.name === selectedTable);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Data Explorer</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadTables}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenInSupabase('/editor')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in Supabase
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tables List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tables & Views</CardTitle>
            <Input
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredTables.map((table) => (
                <div
                  key={table.name}
                  className={`p-2 rounded cursor-pointer hover:bg-muted transition-colors ${
                    selectedTable === table.name ? 'bg-muted' : ''
                  }`}
                  onClick={() => {
                    setSelectedTable(table.name);
                    loadTableData(table.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{table.name}</span>
                    {table.has_rls && (
                      <Shield className="h-3 w-3 text-orange-500" title="RLS Enabled" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {table.row_count} rows
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table Data */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                {selectedTable ? `Table: ${selectedTable}` : 'Select a table'}
              </CardTitle>
              {selectedTable && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData('csv')}
                  >
                    <Download className="h-4 w-4" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData('json')}
                  >
                    <Download className="h-4 w-4" />
                    JSON
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedTableInfo && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{selectedTableInfo.columns.length} columns</Badge>
                  <Badge variant="outline">{selectedTableInfo.row_count} rows</Badge>
                  {selectedTableInfo.has_rls && (
                    <Badge variant="outline" className="text-orange-600">
                      <Shield className="h-3 w-3 mr-1" />
                      RLS Enabled
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {tableData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {selectedTableInfo?.columns.map((col) => (
                        <TableHead key={col.name} className="text-xs">
                          <div>
                            <div className="font-medium">{col.name}</div>
                            <div className="text-muted-foreground">{col.type}</div>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        {selectedTableInfo?.columns.map((col) => (
                          <TableCell key={col.name} className="text-xs max-w-32 truncate">
                            {row[col.name]?.toString() || '—'}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {selectedTable ? (loading ? 'Loading...' : 'No data found') : 'Select a table to view data'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataExplorer;
