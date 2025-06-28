
import React from 'react';
import PurposeSelector from './PurposeSelector';

interface StepPurposeProps {
  value: string;
  onChange: (value: string) => void;
}

const StepPurpose = ({ value, onChange }: StepPurposeProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Trip Purpose</h3>
        <p className="text-gray-600">Different purposes may have different visa requirements</p>
      </div>
      
      <PurposeSelector value={value} onChange={onChange} />
    </div>
  );
};

export default StepPurpose;
