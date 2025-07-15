
import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

interface FormFieldErrorProps {
  error?: string;
  warning?: string;
  className?: string;
}

const FormFieldError = ({ error, warning, className = '' }: FormFieldErrorProps) => {
  if (!error && !warning) return null;

  return (
    <div className={`mt-1 ${className}`}>
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      {warning && !error && (
        <div className="flex items-center space-x-1 text-yellow-600 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>{warning}</span>
        </div>
      )}
    </div>
  );
};

export default FormFieldError;
