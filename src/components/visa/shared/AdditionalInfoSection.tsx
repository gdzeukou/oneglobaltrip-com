
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AdditionalInfoSectionProps {
  additionalInfo: string;
  onAdditionalInfoChange: (value: string) => void;
}

const AdditionalInfoSection = ({
  additionalInfo,
  onAdditionalInfoChange
}: AdditionalInfoSectionProps) => {
  return (
    <div>
      <Label htmlFor="additionalInfo">Additional Information</Label>
      <Textarea
        id="additionalInfo"
        placeholder="Any additional details about your travel plans..."
        value={additionalInfo}
        onChange={(e) => onAdditionalInfoChange(e.target.value)}
        rows={3}
      />
    </div>
  );
};

export default AdditionalInfoSection;
