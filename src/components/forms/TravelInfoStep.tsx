
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormFieldError from './FormFieldError';

interface TravelInfoStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
  warnings?: Record<string, string>;
}

const TravelInfoStep = ({ formData, onInputChange, errors = {}, warnings = {} }: TravelInfoStepProps) => {
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Portugal', 'Norway', 'Denmark', 'Finland',
    'Switzerland', 'Brazil', 'Nigeria', 'India', 'UAE', 'Schengen Area'
  ];

  const visaTypes = [
    'Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa', 
    'Transit Visa', 'Family Visit Visa', 'Medical Visa'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Travel Information</h2>
        <p className="text-gray-600 mt-2">Tell us about your travel plans</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destination <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.destination} onValueChange={(value) => onInputChange('destination', value)}>
            <SelectTrigger className={`mt-1 ${errors.destination ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormFieldError error={errors.destination} warning={warnings.destination} />
        </div>

        <div>
          <Label htmlFor="travelDate" className="text-sm font-medium text-gray-700">
            Preferred Travel Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="travelDate"
            type="date"
            value={formData.travelDate}
            onChange={(e) => onInputChange('travelDate', e.target.value)}
            className={`mt-1 ${errors.travelDate ? 'border-red-500' : ''}`}
            min={new Date().toISOString().split('T')[0]}
          />
          <FormFieldError error={errors.travelDate} warning={warnings.travelDate} />
        </div>

        <div>
          <Label htmlFor="visaType" className="text-sm font-medium text-gray-700">
            Visa Type <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.visaType} onValueChange={(value) => onInputChange('visaType', value)}>
            <SelectTrigger className={`mt-1 ${errors.visaType ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select visa type" />
            </SelectTrigger>
            <SelectContent>
              {visaTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormFieldError error={errors.visaType} warning={warnings.visaType} />
        </div>
      </div>
    </div>
  );
};

export default TravelInfoStep;
