
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInputEnhanced } from '@/components/ui/phone-input-enhanced';
import FormFieldError from './FormFieldError';

interface PersonalInfoStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  type: 'consultation' | 'visa-application' | 'package-booking';
  errors?: Record<string, string>;
  warnings?: Record<string, string>;
}

const PersonalInfoStep = ({ formData, onInputChange, type, errors = {}, warnings = {} }: PersonalInfoStepProps) => {
  const handleInputChange = (field: string, value: string) => {
    onInputChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600 mt-2">Please provide your contact details</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={`mt-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          <FormFieldError error={errors.name} warning={warnings.name} />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
            className={`mt-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          <FormFieldError error={errors.email} warning={warnings.email} />
        </div>

        <div>
          <PhoneInputEnhanced
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            label="Phone Number"
            required
            error={errors.phone}
            className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
          />
          <FormFieldError error={errors.phone} warning={warnings.phone} />
        </div>

        {type === 'visa-application' && (
          <div>
            <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
              Nationality <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nationality"
              type="text"
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              placeholder="Your nationality"
              className={`mt-1 ${errors.nationality ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            <FormFieldError error={errors.nationality} warning={warnings.nationality} />
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your information is secure and will only be used to process your {type === 'consultation' ? 'consultation request' : type === 'visa-application' ? 'visa application' : 'booking'}.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
