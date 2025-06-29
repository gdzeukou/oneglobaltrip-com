
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LocationStepProps {
  applyingFrom: string;
  onSelect: (location: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationStep = ({ applyingFrom, onSelect, onNext, onBack }: LocationStepProps) => {
  const locations = [
    { value: 'USA', label: 'United States', flag: '🇺🇸', description: 'Applying from within the USA' },
    { value: 'home-country', label: 'My Home Country', flag: '🏠', description: 'Applying from my passport country' },
    { value: 'other', label: 'Another Country', flag: '🌍', description: 'Applying from a third country' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Where are you applying from?</h3>
        <p className="text-gray-600">This affects which consulate you'll need to use</p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {locations.map((location) => (
          <Card 
            key={location.value}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              applyingFrom === location.value ? 'ring-2 ring-blue-600 shadow-lg' : ''
            }`}
            onClick={() => onSelect(location.value)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{location.flag}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{location.label}</h4>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  applyingFrom === location.value 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-6 py-3"
        >
          Back
        </Button>
        {applyingFrom && (
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default LocationStep;
