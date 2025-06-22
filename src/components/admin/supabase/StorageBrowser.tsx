
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HardDrive, 
  Folder, 
  FileText, 
  Image, 
  Upload,
  ExternalLink,
  Eye,
  Download
} from 'lucide-react';

interface StorageBrowserProps {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  onOpenInSupabase: (path: string) => void;
}

const StorageBrowser: React.FC<StorageBrowserProps> = ({ 
  projectUrl, 
  anonKey, 
  serviceRoleKey, 
  onOpenInSupabase 
}) => {
  const [buckets] = useState([
    { name: 'user-documents', public: false, file_count: 23, size: '2.4 MB' },
    { name: 'avatars', public: true, file_count: 45, size: '8.7 MB' }
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Storage Browser</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenInSupabase('/storage/buckets')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in Supabase
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buckets.map((bucket) => (
          <Card key={bucket.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  {bucket.name}
                </CardTitle>
                <Badge variant={bucket.public ? "default" : "secondary"}>
                  {bucket.public ? 'Public' : 'Private'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Files:</span>
                  <span>{bucket.file_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Size:</span>
                  <span>{bucket.size}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    Browse
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Storage browser functionality coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageBrowser;
