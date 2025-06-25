
import React from 'react';
import { Upload } from 'lucide-react';

interface DocumentUploadAreaProps {
  onFileUpload: (files: FileList) => void;
}

export const DocumentUploadArea = ({ onFileUpload }: DocumentUploadAreaProps) => {
  return (
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
          onChange={(e) => e.target.files && onFileUpload(e.target.files)}
        />
      </label>
    </div>
  );
};
