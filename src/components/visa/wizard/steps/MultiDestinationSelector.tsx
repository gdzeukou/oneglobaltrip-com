
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { multiDestinationOptions } from '@/data/visaRequirementsDatabase';

interface MultiDestinationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const MultiDestinationSelector = ({ value, onChange }: MultiDestinationSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">How many destinations?</h3>
        <p className="text-gray-600">Choose whether you're visiting one country or planning a multi-destination trip</p>
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Trip Type</Label>
        <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 gap-4">
          {multiDestinationOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label 
                htmlFor={option.value} 
                className="flex-1 cursor-pointer font-medium text-gray-900"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {value && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-blue-800">
            <span className="font-semibold">Trip type:</span> {
              multiDestinationOptions.find(o => o.value === value)?.label
            }
          </div>
          {value === 'multiple' && (
            <div className="text-sm text-blue-700 mt-2">
              ✨ Great choice! We'll help you navigate visa requirements for each destination and any transit requirements.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiDestinationSelector;
