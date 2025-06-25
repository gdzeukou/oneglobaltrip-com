
import { useState } from 'react';
import { DocumentValidation, DocumentValidationState } from '../types/documentValidation';
import { validateDocument } from '../utils/documentValidationUtils';

export const useDocumentValidation = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [validations, setValidations] = useState<Record<string, DocumentValidation>>({});
  const [validatingFiles, setValidatingFiles] = useState<Record<string, boolean>>({});

  const handleFileUpload = async (uploadedFiles: FileList) => {
    const newFiles = Array.from(uploadedFiles);
    setFiles(prev => [...prev, ...newFiles]);

    for (const file of newFiles) {
      setValidatingFiles(prev => ({ ...prev, [file.name]: true }));
      
      try {
        const validation = await validateDocument(file);
        setValidations(prev => ({ ...prev, [file.name]: validation }));
      } catch (error) {
        setValidations(prev => ({ 
          ...prev, 
          [file.name]: { 
            isValid: false, 
            confidence: 0, 
            issues: ['Validation failed'], 
            suggestions: ['Please try uploading again'] 
          } 
        }));
      } finally {
        setValidatingFiles(prev => ({ ...prev, [file.name]: false }));
      }
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
    setValidations(prev => {
      const newValidations = { ...prev };
      delete newValidations[fileName];
      return newValidations;
    });
  };

  return {
    files,
    validations,
    validatingFiles,
    handleFileUpload,
    removeFile
  };
};
