
import React from 'react';
import MultiDestinationSelector from './MultiDestinationSelector';

interface StepTripTypeProps {
  value: string;
  onChange: (value: string) => void;
}

const StepTripType = ({ value, onChange }: StepTripTypeProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Trip</h3>
        <p className="text-gray-600">Are you visiting one destination or planning a multi-country adventure?</p>
      </div>
      
      <MultiDestinationSelector value={value} onChange={onChange} />
    </div>
  );
};

export default StepTripType;
