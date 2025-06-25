
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { tripPurposes } from '@/data/visaRequirementsDatabase';

interface PurposeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PurposeSelector = ({ value, onChange }: PurposeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">What's the purpose of your trip?</h3>
        <p className="text-gray-600">Different purposes may have different visa requirements</p>
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Trip Purpose</Label>
        <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 gap-4">
          {tripPurposes.map((purpose) => (
            <div key={purpose.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value={purpose.value} id={purpose.value} />
              <Label 
                htmlFor={purpose.value} 
                className="flex-1 cursor-pointer font-medium text-gray-900"
              >
                {purpose.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {value && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-purple-800">
            <span className="font-semibold">Purpose selected:</span> {
              tripPurposes.find(p => p.value === value)?.label
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default PurposeSelector;
