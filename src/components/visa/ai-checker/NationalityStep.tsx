
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCountries } from '@/utils/visaRequirements';

interface NationalityStepProps {
  nationality: string;
  onSelect: (nationality: string) => void;
  onNext: () => void;
}

const NationalityStep = ({ nationality, onSelect, onNext }: NationalityStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">What's your nationality?</h3>
        <p className="text-gray-600">Select the country that issued your passport</p>
      </div>

      <div className="max-w-md mx-auto">
        <Select value={nationality} onValueChange={onSelect}>
          <SelectTrigger className="h-12 text-left">
            <SelectValue placeholder="Select your nationality" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {allCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {nationality && (
        <div className="text-center">
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default NationalityStep;
