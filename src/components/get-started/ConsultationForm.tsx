
import React from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

interface FormData {
  name: string;
  email: string;
  phone: string;
  travelDates: string;
  destinations: string;
  travelers: string;
  budget: string;
  interests: string;
}

interface ConsultationFormProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({
  formData,
  onInputChange,
  onSubmit
}) => {
  return (
    <UnifiedTravelForm 
      type="consultation"
      title="Schedule Your Free Consultation"
    />
  );
};

export default ConsultationForm;
