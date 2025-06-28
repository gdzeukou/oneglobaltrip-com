
import React from 'react';
import NationalitySelector from './NationalitySelector';

interface StepNationalityProps {
  value: string;
  onChange: (value: string) => void;
}

const StepNationality = ({ value, onChange }: StepNationalityProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Passport Details</h3>
        <p className="text-gray-600">This helps us determine your visa requirements</p>
      </div>
      
      <NationalitySelector value={value} onChange={onChange} />
    </div>
  );
};

export default StepNationality;
