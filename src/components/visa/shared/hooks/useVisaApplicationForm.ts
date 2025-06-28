
import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  destination: string;
  travelDate: string;
  purpose: string;
  additionalInfo: string;
}

export const useVisaApplicationForm = (defaultDestination: string = '') => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    destination: defaultDestination,
    travelDate: '',
    purpose: '',
    additionalInfo: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationality: '',
      destination: defaultDestination,
      travelDate: '',
      purpose: '',
      additionalInfo: ''
    });
  };

  return {
    formData,
    handleChange,
    resetForm
  };
};
