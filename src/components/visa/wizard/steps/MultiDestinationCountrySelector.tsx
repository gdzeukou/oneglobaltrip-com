
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { destinationCountries } from '@/data/visaRequirementsDatabase';
import { Plus, X } from 'lucide-react';

interface Destination {
  country: string;
  purpose: string;
}

interface MultiDestinationCountrySelectorProps {
  destinations: Destination[];
  onChange: (destinations: Destination[]) => void;
}

const purposeOptions = [
  { value: 'tourism', label: 'Tourism' },
  { value: 'business', label: 'Business' },
  { value: 'study', label: 'Study' },
  { value: 'family', label: 'Family Visit' },
  { value: 'conference', label: 'Conference' },
  { value: 'transit', label: 'Transit' },
];

const MultiDestinationCountrySelector = ({ destinations, onChange }: MultiDestinationCountrySelectorProps) => {
  const addDestination = () => {
    onChange([...destinations, { country: '', purpose: 'tourism' }]);
  };

  const removeDestination = (index: number) => {
    onChange(destinations.filter((_, i) => i !== index));
  };

  const updateDestination = (index: number, field: keyof Destination, value: string) => {
    const updated = destinations.map((dest, i) => 
      i === index ? { ...dest, [field]: value } : dest
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Multi-Destination Trip</h3>
        <p className="text-gray-600">Add each country you plan to visit and specify your purpose for each destination</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Your Destinations ({destinations.length})</Label>
          <Button onClick={addDestination} variant="outline" size="sm" className="flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Add Destination</span>
          </Button>
        </div>

        {destinations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Click "Add Destination" to start planning your multi-destination trip</p>
          </div>
        )}

        {destinations.map((destination, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Destination {index + 1}</h4>
              {destinations.length > 1 && (
                <Button
                  onClick={() => removeDestination(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Country/Region</Label>
                <Select value={destination.country} onValueChange={(value) => updateDestination(index, 'country', value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Choose destination..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {destinationCountries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center space-x-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Purpose</Label>
                <Select value={destination.purpose} onValueChange={(value) => updateDestination(index, 'purpose', value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Choose purpose..." />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.map((purpose) => (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {destinations.some(d => d.country && d.purpose) && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-800">
            <span className="font-semibold">Trip Summary:</span>
            <ul className="mt-2 space-y-1">
              {destinations.filter(d => d.country).map((dest, index) => {
                const countryInfo = destinationCountries.find(c => c.code === dest.country);
                return (
                  <li key={index} className="flex items-center space-x-2">
                    <span>{countryInfo?.flag}</span>
                    <span>{countryInfo?.name} - {purposeOptions.find(p => p.value === dest.purpose)?.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiDestinationCountrySelector;
