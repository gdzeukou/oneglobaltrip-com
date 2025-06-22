
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PreferencesStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const PreferencesStep = ({ formData, onInputChange }: PreferencesStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="specialRequests" className="text-base font-medium">Special Requests or Additional Information</Label>
        <Textarea
          id="specialRequests"
          placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or other preferences..."
          value={formData.specialRequests}
          onChange={(e) => onInputChange('specialRequests', e.target.value)}
          rows={4}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default PreferencesStep;
