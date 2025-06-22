
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserDocument {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  document_type: string;
  uploaded_at: string;
}

interface DocumentsListProps {
  refreshTrigger?: number;
}

const DocumentsList = ({ refreshTrigger }: DocumentsListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user, refreshTrigger]);

  const handleDownload = async (doc: UserDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-documents')
        .download(doc.file_path);

      if (error) {
        throw error;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = doc.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the document",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (doc: UserDocument) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user-documents')
        .remove([doc.file_path]);

      if (storageError) {
        throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', doc.id);

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Document deleted",
        description: "The document has been removed successfully"
      });

      fetchDocuments();

    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the document",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
        <p className="text-gray-600">Upload your travel documents for safekeeping</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">{doc.file_name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="capitalize">
                      {doc.document_type.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {formatFileSize(doc.file_size)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(doc.uploaded_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(doc)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(doc)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsList;
