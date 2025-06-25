
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { DocumentValidation } from '../types/documentValidation';
import { ValidationResult } from './ValidationResult';

interface DocumentListProps {
  files: File[];
  validations: Record<string, DocumentValidation>;
  validatingFiles: Record<string, boolean>;
  onRemoveFile: (fileName: string) => void;
}

export const DocumentList = ({ 
  files, 
  validations, 
  validatingFiles, 
  onRemoveFile 
}: DocumentListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Uploaded Documents</h4>
      {files.map((file) => {
        const validation = validations[file.name];
        const isValidating = validatingFiles[file.name];

        return (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-900">{file.name}</span>
                  {isValidating ? (
                    <div className="ml-2 animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                  ) : validation ? (
                    validation.isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 ml-2" />
                    )
                  ) : null}
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>

                {validation && <ValidationResult validation={validation} />}
              </div>
              
              <button
                onClick={() => onRemoveFile(file.name)}
                className="text-gray-400 hover:text-red-600 transition-colors ml-4"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
