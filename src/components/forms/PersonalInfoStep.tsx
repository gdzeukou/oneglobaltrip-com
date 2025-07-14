
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneInputEnhanced } from '@/components/ui/phone-input-enhanced';

interface PersonalInfoStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  type: 'consultation' | 'visa-application' | 'package-booking';
}

const PersonalInfoStep = ({ formData, onInputChange, type }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>
      <PhoneInputEnhanced
        value={formData.phone}
        onChange={(value) => onInputChange('phone', value)}
        label="Phone Number"
        required
        className="mt-1"
      />
      {type === 'visa-application' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nationality" className="text-base font-medium">Nationality *</Label>
            <Input
              id="nationality"
              value={formData.nationality}
              onChange={(e) => onInputChange('nationality', e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="visaType" className="text-base font-medium">Visa Type</Label>
            <Select onValueChange={(value) => onInputChange('visaType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schengen">Schengen Visa</SelectItem>
                <SelectItem value="uk">UK Visa</SelectItem>
                <SelectItem value="brazil">Brazil eVisa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoStep;
