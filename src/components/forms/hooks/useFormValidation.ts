
import { validateEmail, validatePhone, validateName } from '@/utils/securityUtils';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  duration: string;
  travelers: string;
  budget: string;
  selectedPackages: string[];
  travelNeeds: string[];
  otherNeeds: string;
  specialRequests: string;
  nationality: string;
  visaType: string;
  travelPurpose: string;
  departureDate: string;
  returnDate: string;
}

export const useFormValidation = () => {
  const validateStep = (step: number, formData: FormData, type: string) => {
    switch (step) {
      case 1:
        return (
          validateName(formData.name) && 
          validateEmail(formData.email) && 
          validatePhone(formData.phone)
        );
      case 2:
        if (type === 'package-booking') {
          return formData.selectedPackages.length > 0;
        }
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const validateFormData = (formData: FormData) => {
    if (!validateName(formData.name)) {
      console.error('Invalid name format');
      return false;
    }
    
    if (!validateEmail(formData.email)) {
      console.error('Invalid email format');
      return false;
    }
    
    if (!validatePhone(formData.phone)) {
      console.error('Invalid phone format');
      return false;
    }
    
    return true;
  };

  return {
    validateStep,
    validateFormData
  };
};
