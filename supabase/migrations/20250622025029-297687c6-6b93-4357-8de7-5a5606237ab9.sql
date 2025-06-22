
-- Create a storage bucket for user documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-documents', 
  'user-documents', 
  false, 
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Create a table to track user documents
CREATE TABLE public.user_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  document_type TEXT, -- e.g., 'passport', 'visa', 'photo', 'other'
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_documents table
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_documents
CREATE POLICY "Users can view their own documents" 
  ON public.user_documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own documents" 
  ON public.user_documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON public.user_documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
  ON public.user_documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for storage
CREATE POLICY "Users can upload their own documents to storage"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents from storage"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents from storage"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_user_documents_updated_at
  BEFORE UPDATE ON public.user_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
