
import React from 'react';
import DurationSelector from './DurationSelector';

interface StepDurationProps {
  value: string;
  onChange: (value: string) => void;
}

const StepDuration = ({ value, onChange }: StepDurationProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Trip Duration</h3>
        <p className="text-gray-600">How long will you be traveling?</p>
      </div>
      
      <DurationSelector value={value} onChange={onChange} />
    </div>
  );
};

export default StepDuration;
