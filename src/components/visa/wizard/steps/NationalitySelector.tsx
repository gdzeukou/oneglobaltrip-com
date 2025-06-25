
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCountries } from '@/utils/visaRequirements';

interface NationalitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const NationalitySelector = ({ value, onChange }: NationalitySelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">What's your nationality?</h3>
        <p className="text-gray-600">Select the country that issued your passport</p>
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Your Nationality</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full h-12 text-lg">
            <SelectValue placeholder="Choose your nationality..." />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {allCountries.map((country) => (
              <SelectItem key={country} value={country} className="py-2">
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-800">
            <span className="font-semibold">Nationality confirmed:</span> {value}
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalitySelector;
