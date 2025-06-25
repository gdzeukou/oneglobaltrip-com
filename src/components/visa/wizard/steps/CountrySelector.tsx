
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { destinationCountries } from '@/data/visaRequirementsDatabase';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CountrySelector = ({ value, onChange }: CountrySelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Where are you planning to travel?</h3>
        <p className="text-gray-600">Select your primary destination country or region</p>
      </div>
      
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Destination Country/Region</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full h-12 text-lg">
            <SelectValue placeholder="Choose your destination..." />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {destinationCountries.map((country) => (
              <SelectItem key={country.code} value={country.code} className="py-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{country.flag}</span>
                  <span className="font-medium">{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">
              {destinationCountries.find(c => c.code === value)?.flag}
            </span>
            <span className="font-semibold text-blue-900">
              Great choice! {destinationCountries.find(c => c.code === value)?.name} selected.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
