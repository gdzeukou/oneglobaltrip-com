
import React from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

interface VisaApplicationFormProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const VisaApplicationForm: React.FC<VisaApplicationFormProps> = () => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Visa Application Process:</h3>
        <ul className="space-y-2 text-yellow-700">
          <li className="flex items-start space-x-2">
            <span className="font-bold">1.</span>
            <span>Complete the application form</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">2.</span>
            <span>We review your requirements</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">3.</span>
            <span>Schedule consultation to discuss details</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">4.</span>
            <span>Begin visa processing</span>
          </li>
        </ul>
      </div>
      
      <UnifiedTravelForm 
        type="visa-application"
        title="Start Your Visa Application"
      />
    </div>
  );
};

export default VisaApplicationForm;
