
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DurationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const enhancedStayDurations = [
  { value: 'single-short', label: 'Up to 30 days (single entry)', description: 'Perfect for short vacations' },
  { value: 'single-medium', label: '31-90 days (single entry)', description: 'Extended travel or business trips' },
  { value: 'multiple-short', label: 'Up to 90 days (multiple entries)', description: 'Multiple trips within 90 days total' },
  { value: 'multiple-long', label: 'More than 90 days (multiple entries)', description: 'Long-term travel plans' },
  { value: 'long-stay', label: 'More than 90 days (residence/work)', description: 'Work, study, or long-term residence' }
];

const DurationSelector = ({ value, onChange }: DurationSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">How long will you stay?</h3>
        <p className="text-gray-600">Duration affects visa requirements and processing times</p>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> For Schengen Area, 90 days is the key threshold between 
            short-stay visas (Type C) and long-stay national visas (Type D).
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Stay Duration & Frequency</Label>
        <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 gap-4">
          {enhancedStayDurations.map((duration) => (
            <div key={duration.value} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value={duration.value} id={duration.value} className="mt-1" />
              <Label 
                htmlFor={duration.value} 
                className="flex-1 cursor-pointer"
              >
                <div className="font-medium text-gray-900 mb-1">{duration.label}</div>
                <div className="text-sm text-gray-600">{duration.description}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {value && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="text-orange-800">
            <span className="font-semibold">Duration selected:</span> {
              enhancedStayDurations.find(d => d.value === value)?.label
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default DurationSelector;
