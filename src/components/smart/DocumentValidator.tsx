
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';

interface DocumentValidation {
  isValid: boolean;
  confidence: number;
  issues: string[];
  suggestions: string[];
}

const validateDocument = (file: File): Promise<DocumentValidation> => {
  return new Promise((resolve) => {
    // Simulate AI validation
    setTimeout(() => {
      const validExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      const isValidType = validExtensions.includes(extension || '');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      let issues: string[] = [];
      let suggestions: string[] = [];
      let confidence = 85;

      if (!isValidType) {
        issues.push('Invalid file format');
        suggestions.push('Please upload PDF, JPG, or PNG files only');
        confidence -= 30;
      }

      if (!isValidSize) {
        issues.push('File size too large');
        suggestions.push('Please compress the file to under 10MB');
        confidence -= 20;
      }

      if (file.size < 50 * 1024) { // Less than 50KB
        issues.push('File size suspiciously small');
        suggestions.push('Ensure the document is clear and readable');
        confidence -= 15;
      }

      // Simulate quality checks
      if (Math.random() > 0.7) {
        issues.push('Image quality may be too low');
        suggestions.push('Try scanning at higher resolution (300 DPI minimum)');
        confidence -= 10;
      }

      resolve({
        isValid: issues.length === 0,
        confidence: Math.max(confidence, 0),
        issues,
        suggestions
      });
    }, 1500);
  });
};

export const DocumentValidator = () => {
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

      {/* Upload Area */}
      <div className="mb-6">
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Click to upload or drag files here</p>
            <p className="text-sm text-gray-500 mt-1">
              Supports PDF, JPG, PNG up to 10MB
            </p>
          </div>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
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

                    {validation && (
                      <div className="space-y-2">
                        {/* Confidence Score */}
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">Confidence:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                validation.confidence >= 80 ? 'bg-green-500' :
                                validation.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${validation.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium ml-2">{validation.confidence}%</span>
                        </div>

                        {/* Issues */}
                        {validation.issues.length > 0 && (
                          <div className="space-y-1">
                            {validation.issues.map((issue, i) => (
                              <div key={i} className="flex items-center text-sm text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                {issue}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Suggestions */}
                        {validation.suggestions.length > 0 && (
                          <div className="space-y-1">
                            {validation.suggestions.map((suggestion, i) => (
                              <div key={i} className="flex items-center text-sm text-yellow-600">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeFile(file.name)}
                    className="text-gray-400 hover:text-red-600 transition-colors ml-4"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

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
