
import React from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

const ConsultationForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">What's Included:</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="font-bold">✓</span>
            <span>30-minute personalized consultation</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">✓</span>
            <span>Custom travel recommendations</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">✓</span>
            <span>Visa requirements assessment</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">✓</span>
            <span>Budget and timeline planning</span>
          </li>
        </ul>
      </div>
      
      <UnifiedTravelForm 
        type="consultation"
        title="Schedule Your Free Consultation"
      />
    </div>
  );
};

export default ConsultationForm;
