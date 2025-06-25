
import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DocumentValidation } from '../types/documentValidation';

interface ValidationResultProps {
  validation: DocumentValidation;
}

export const ValidationResult = ({ validation }: ValidationResultProps) => {
  return (
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
  );
};
