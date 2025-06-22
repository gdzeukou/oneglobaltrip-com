
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TravelInfoStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const TravelInfoStep = ({ formData, onInputChange }: TravelInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="destination" className="text-base font-medium">Dream Destination</Label>
          <Input
            id="destination"
            placeholder="e.g., Paris, Tokyo, New York"
            value={formData.destination}
            onChange={(e) => onInputChange('destination', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="travelDate" className="text-base font-medium">Preferred Travel Date</Label>
          <Input
            id="travelDate"
            type="date"
            value={formData.travelDate}
            onChange={(e) => onInputChange('travelDate', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration" className="text-base font-medium">Trip Duration</Label>
          <Select onValueChange={(value) => onInputChange('duration', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3 days">1-3 days</SelectItem>
              <SelectItem value="4-7 days">4-7 days</SelectItem>
              <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
              <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
              <SelectItem value="1-3 months">1-3 months</SelectItem>
              <SelectItem value="3+ months">3+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="travelers" className="text-base font-medium">Number of Travelers</Label>
          <Select onValueChange={(value) => onInputChange('travelers', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select travelers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Just me</SelectItem>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="3-4">3-4 people</SelectItem>
              <SelectItem value="5+">5+ people</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="budget" className="text-base font-medium">Budget Range (USD)</Label>
        <Select onValueChange={(value) => onInputChange('budget', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Under $1,000">Under $1,000</SelectItem>
            <SelectItem value="$1,000 - $3,000">$1,000 - $3,000</SelectItem>
            <SelectItem value="$3,000 - $5,000">$3,000 - $5,000</SelectItem>
            <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
            <SelectItem value="$10,000+">$10,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TravelInfoStep;
