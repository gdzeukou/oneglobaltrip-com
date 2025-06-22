
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateFileType, validateFileSize, ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE, sanitizeInput } from '@/utils/validation';

interface DocumentUploadProps {
  onUploadSuccess?: () => void;
}

const DocumentUpload = ({ onUploadSuccess }: DocumentUploadProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!validateFileType(selectedFile, ALLOWED_DOCUMENT_TYPES)) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF, image, or Word document",
          variant: "destructive"
        });
        return;
      }

      // Validate file size
      if (!validateFileSize(selectedFile, MAX_FILE_SIZE)) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !documentType || !user) {
      toast({
        title: "Missing information",
        description: "Please select a file and document type",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Additional validation
      if (!validateFileType(file, ALLOWED_DOCUMENT_TYPES)) {
        throw new Error('Invalid file type');
      }

      if (!validateFileSize(file, MAX_FILE_SIZE)) {
        throw new Error('File too large');
      }

      // Create secure file path with sanitized filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const sanitizedName = sanitizeInput(file.name.replace(/[^a-zA-Z0-9.-]/g, '_'));
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('user-documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Save document metadata to database with sanitized inputs
      const { error: dbError } = await supabase
        .from('user_documents')
        .insert({
          user_id: user.id,
          file_name: sanitizeInput(file.name),
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          document_type: sanitizeInput(documentType)
        });

      if (dbError) {
        // Clean up uploaded file if database insert fails
        await supabase.storage
          .from('user-documents')
          .remove([filePath]);
        throw dbError;
      }

      toast({
        title: "Upload successful",
        description: "Your document has been uploaded successfully"
      });

      // Reset form
      setFile(null);
      setDocumentType('');
      setOpen(false);
      onUploadSuccess?.();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "Upload failed",
        description: `There was an error uploading your document: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="document-type">Document Type</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
            />
            {file && (
              <div className="mt-2 p-2 bg-gray-50 rounded flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleUpload}
              disabled={!file || !documentType || uploading}
              className="flex-1"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUpload;
