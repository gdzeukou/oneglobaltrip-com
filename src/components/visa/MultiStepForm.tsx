
import { useState, useEffect } from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

interface MultiStepFormProps {
  type: 'short-stay' | 'long-stay';
  preSelectedCountry?: string;
  onComplete?: () => void;
}

const MultiStepForm = ({ type, preSelectedCountry, onComplete }: MultiStepFormProps) => {
  return (
    <UnifiedTravelForm 
      type="visa-application"
      title={type === 'short-stay' ? 'Short-Stay Visa Application' : 'Long-Stay Visa Application'}
      onComplete={onComplete}
    />
  );
};

export default MultiStepForm;
