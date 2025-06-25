
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { stayDurations } from '@/data/visaRequirementsDatabase';

interface DurationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DurationSelector = ({ value, onChange }: DurationSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">How long will you stay?</h3>
        <p className="text-gray-600">Duration affects visa requirements and processing times</p>
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Stay Duration & Frequency</Label>
        <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 gap-4">
          {stayDurations.map((duration) => (
            <div key={duration.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value={duration.value} id={duration.value} />
              <Label 
                htmlFor={duration.value} 
                className="flex-1 cursor-pointer font-medium text-gray-900"
              >
                {duration.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {value && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="text-orange-800">
            <span className="font-semibold">Duration selected:</span> {
              stayDurations.find(d => d.value === value)?.label
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default DurationSelector;
