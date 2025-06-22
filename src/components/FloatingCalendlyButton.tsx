
import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import CalendlyWidget from './CalendlyWidget';

const FloatingCalendlyButton = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 animate-pulse"
          aria-label="Open consultation booking"
        >
          <Calendar className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-2xl border-2 border-blue-200 p-4 max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-blue-900 text-sm">Book Your FREE Consultation</h3>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Minimize"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-gray-600 mb-4">
        Get expert travel & visa guidance in just 30 minutes
      </p>
      <CalendlyWidget 
        buttonText="Book Now - It's FREE!"
        className="w-full"
      />
    </div>
  );
};

export default FloatingCalendlyButton;
