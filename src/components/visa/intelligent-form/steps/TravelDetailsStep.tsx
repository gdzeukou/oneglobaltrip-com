
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationData } from '../IntelligentVisaForm';
import { allCountries } from '@/utils/visaRequirements';

interface TravelDetailsStepProps {
  formData: ApplicationData;
  onInputChange: (field: string, value: any) => void;
}

const TravelDetailsStep = ({ formData, onInputChange }: TravelDetailsStepProps) => {
  const travelPurposes = [
    'tourism',
    'business',
    'family_visit',
    'medical',
    'education',
    'conference',
    'transit',
    'other'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Details</h3>
        <p className="text-gray-600 mb-6">
          Tell us about your planned trip so we can provide the most accurate visa requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="destination">Destination Country *</Label>
          <Select
            value={formData.destination}
            onValueChange={(value) => onInputChange('destination', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
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

        <div>
          <Label htmlFor="travelPurpose">Purpose of Travel *</Label>
          <Select
            value={formData.travelPurpose}
            onValueChange={(value) => onInputChange('travelPurpose', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              {travelPurposes.map((purpose) => (
                <SelectItem key={purpose} value={purpose}>
                  {purpose.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="departureDate">Departure Date *</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => onInputChange('departureDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <Label htmlFor="returnDate">Return Date</Label>
          <Input
            id="returnDate"
            type="date"
            value={formData.returnDate}
            onChange={(e) => onInputChange('returnDate', e.target.value)}
            min={formData.departureDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="accommodationDetails">Accommodation Details</Label>
        <Textarea
          id="accommodationDetails"
          value={formData.accommodationDetails}
          onChange={(e) => onInputChange('accommodationDetails', e.target.value)}
          placeholder="Provide details about where you'll be staying (hotel name, address, host details, etc.)"
          rows={4}
        />
        <p className="text-sm text-gray-500 mt-1">
          This information may be required for your visa application
        </p>
      </div>
    </div>
  );
};

export default TravelDetailsStep;
