
import React from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

interface VisaFormData {
  name: string;
  email: string;
  visaType: string;
  nationality: string;
  travelPurpose: string;
  departureDate: string;
  returnDate: string;
  previousVisas: string;
  specialCircumstances: string;
}

interface VisaApplicationFormProps {
  formData: VisaFormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const VisaApplicationForm: React.FC<VisaApplicationFormProps> = ({
  formData,
  onInputChange,
  onSubmit
}) => {
  return (
    <UnifiedTravelForm 
      type="visa-application"
      title="Visa Application Form"
    />
  );
};

export default VisaApplicationForm;
