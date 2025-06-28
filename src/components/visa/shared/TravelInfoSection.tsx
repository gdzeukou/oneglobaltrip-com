
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

interface TravelInfoSectionProps {
  destination: string;
  travelDate: string;
  purpose: string;
  onDestinationChange: (value: string) => void;
  onTravelDateChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
}

const TravelInfoSection = ({
  destination,
  travelDate,
  purpose,
  onDestinationChange,
  onTravelDateChange,
  onPurposeChange
}: TravelInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-gray-500" />
        <h3 className="font-medium">Travel Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="destination">Destination *</Label>
          <Select 
            value={destination}
            onValueChange={onDestinationChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schengen">Schengen Area</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="brazil">Brazil</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="travelDate">Intended Travel Date *</Label>
          <Input
            id="travelDate"
            type="date"
            value={travelDate}
            onChange={(e) => onTravelDateChange(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="purpose">Purpose of Travel *</Label>
        <Select onValueChange={onPurposeChange} value={purpose}>
          <SelectTrigger>
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tourism">Tourism</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="family">Family Visit</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TravelInfoSection;
