
import React from 'react';
import { CreditCard } from 'lucide-react';
import { packages } from '@/data/packages';

interface ReviewStepProps {
  formData: any;
  type: 'consultation' | 'visa-application' | 'package-booking';
}

const ReviewStep = ({ formData, type }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Your Request</h3>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <CreditCard className="h-6 w-6 text-green-600" />
          <span className="text-xl font-semibold text-green-600">$0 Down Payment Required</span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900">Contact Information</h4>
          <p className="text-gray-700">{formData.name} • {formData.email} • {formData.phone}</p>
        </div>
        
        {type === 'package-booking' && formData.selectedPackages.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900">Selected Packages</h4>
            <ul className="text-gray-700">
              {formData.selectedPackages.map((pkgId: string) => {
                const pkg = packages.find(p => p.id === pkgId);
                return pkg ? <li key={pkgId}>• {pkg.title}</li> : null;
              })}
            </ul>
          </div>
        )}
        
        {formData.destination && (
          <div>
            <h4 className="font-semibold text-gray-900">Travel Details</h4>
            <p className="text-gray-700">
              {formData.destination}
              {formData.duration && ` • ${formData.duration}`}
              {formData.travelers && ` • ${formData.travelers} travelers`}
              {formData.budget && ` • ${formData.budget}`}
            </p>
          </div>
        )}
        
        {formData.travelNeeds.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900">Services Needed</h4>
            <p className="text-gray-700">{formData.travelNeeds.join(', ')}</p>
            {formData.otherNeeds && <p className="text-gray-700 italic">Other: {formData.otherNeeds}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
