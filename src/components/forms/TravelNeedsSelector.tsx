
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface TravelNeedsSelectorProps {
  selectedNeeds: string[];
  otherNeeds: string;
  onNeedChange: (need: string, checked: boolean) => void;
  onOtherNeedsChange: (value: string) => void;
}

const travelNeedsOptions = [
  'Flights',
  'Place to Stay', 
  'Car Rentals',
  'Travel Insurance',
  'Passport',
  'Visa',
  'Other'
];

const TravelNeedsSelector = ({ 
  selectedNeeds, 
  otherNeeds, 
  onNeedChange, 
  onOtherNeedsChange 
}: TravelNeedsSelectorProps) => {
  return (
    <div>
      <Label className="text-base font-medium">What do you still need for your trip? (Select all that apply)</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {travelNeedsOptions.map((need) => (
          <div key={need} className="flex items-center space-x-2">
            <Checkbox
              id={need}
              checked={selectedNeeds.includes(need)}
              onCheckedChange={(checked) => onNeedChange(need, checked as boolean)}
            />
            <Label htmlFor={need} className="cursor-pointer text-sm">{need}</Label>
          </div>
        ))}
      </div>
      {selectedNeeds.includes('Other') && (
        <div className="mt-4">
          <Label htmlFor="otherNeeds" className="text-base font-medium">Please specify:</Label>
          <Input
            id="otherNeeds"
            placeholder="Please describe what else you need..."
            value={otherNeeds}
            onChange={(e) => onOtherNeedsChange(e.target.value)}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default TravelNeedsSelector;
