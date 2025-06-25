
import React from 'react';

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback = ({ message = "Loading..." }: LoadingFallbackProps) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-lg font-medium text-gray-700">{message}</p>
      <p className="text-sm text-gray-500 mt-2">Preparing your experience...</p>
    </div>
  </div>
);

export default LoadingFallback;
