
import React from 'react';
import { FileText } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { useDocumentValidation } from './hooks/useDocumentValidation';
import { DocumentUploadArea } from './components/DocumentUploadArea';
import { DocumentList } from './components/DocumentList';

export const DocumentValidator = () => {
  const {
    files,
    validations,
    validatingFiles,
    handleFileUpload,
    removeFile
  } = useDocumentValidation();

  return (
    <GlassCard className="p-6">
      <div className="text-center mb-6">
        <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Smart Document Validator
        </h3>
        <p className="text-gray-600">
          Upload your documents and get instant AI-powered validation
        </p>
      </div>

      <DocumentUploadArea onFileUpload={handleFileUpload} />

      <DocumentList 
        files={files}
        validations={validations}
        validatingFiles={validatingFiles}
        onRemoveFile={removeFile}
      />

      {files.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/20">
          <PremiumButton className="w-full" glow>
            Continue with Validated Documents
          </PremiumButton>
        </div>
      )}
    </GlassCard>
  );
};

export default DocumentValidator;
