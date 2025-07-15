
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FormFieldError from './FormFieldError';

interface PreferencesStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
  warnings?: Record<string, string>;
}

const PreferencesStep = ({ formData, onInputChange, errors = {}, warnings = {} }: PreferencesStepProps) => {
  const budgetRanges = [
    'Under $1,000', '$1,000 - $2,500', '$2,500 - $5,000', 
    '$5,000 - $10,000', '$10,000 - $25,000', 'Over $25,000'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Travel Preferences</h2>
        <p className="text-gray-600 mt-2">Help us personalize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="travelers" className="text-sm font-medium text-gray-700">
            Number of Travelers <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.travelers} onValueChange={(value) => onInputChange('travelers', value)}>
            <SelectTrigger className={`mt-1 ${errors.travelers ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select number of travelers" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1} {i === 0 ? 'person' : 'people'}
                </SelectItem>
              ))}
              <SelectItem value="10+">10+ people</SelectItem>
            </SelectContent>
          </Select>
          <FormFieldError error={errors.travelers} warning={warnings.travelers} />
        </div>

        <div>
          <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
            Budget Range <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.budget} onValueChange={(value) => onInputChange('budget', value)}>
            <SelectTrigger className={`mt-1 ${errors.budget ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormFieldError error={errors.budget} warning={warnings.budget} />
        </div>

        <div>
          <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
            Trip Duration
          </Label>
          <Select value={formData.duration} onValueChange={(value) => onInputChange('duration', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select trip duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3 days">1-3 days</SelectItem>
              <SelectItem value="4-7 days">4-7 days</SelectItem>
              <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
              <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
              <SelectItem value="1-3 months">1-3 months</SelectItem>
              <SelectItem value="3+ months">3+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
            Special Requests or Requirements
          </Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => onInputChange('specialRequests', e.target.value)}
            placeholder="Any specific requirements, dietary restrictions, accessibility needs, etc."
            className="mt-1"
            rows={3}
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Almost done!</strong> Review your information on the next step and submit your request.
        </p>
      </div>
    </div>
  );
};

export default PreferencesStep;
