
import { validateEmail } from '@/utils/validation';

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

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export const useImprovedFormValidation = () => {
  // More flexible phone validation
  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) return false;
    
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Must have at least 7 digits and at most 15 digits (international standard)
    const digitCount = cleanPhone.replace(/\+/g, '').length;
    return digitCount >= 7 && digitCount <= 15;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && name.trim().length <= 100;
  };

  const validateStep = (step: number, formData: FormData, type: string): ValidationResult => {
    const errors: Record<string, string> = {};
    const warnings: Record<string, string> = {};

    console.log('Validating step:', step, 'for type:', type, 'with data:', formData);

    switch (step) {
      case 1:
        // Personal information step
        if (!validateName(formData.name)) {
          errors.name = 'Please enter a valid name (2-100 characters)';
        }
        
        if (!validateEmail(formData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        
        if (!validatePhone(formData.phone)) {
          errors.phone = 'Please enter a valid phone number (7-15 digits)';
        } else if (formData.phone.length < 10) {
          warnings.phone = 'Phone number seems short, but we\'ll accept it';
        }
        break;

      case 2:
        if (type === 'consultation') {
          if (!formData.destination.trim()) {
            errors.destination = 'Please select a destination';
          }
          if (!formData.travelDate.trim()) {
            errors.travelDate = 'Please select a travel date';
          }
        } else if (type === 'visa-application') {
          if (!formData.nationality.trim()) {
            errors.nationality = 'Please select your nationality';
          }
          if (!formData.destination.trim()) {
            errors.destination = 'Please select destination country';
          }
          if (!formData.visaType.trim()) {
            errors.visaType = 'Please select visa type';
          }
        } else if (type === 'package-booking') {
          if (formData.selectedPackages.length === 0) {
            errors.selectedPackages = 'Please select at least one package';
          }
        }
        break;

      case 3:
        if (type === 'consultation') {
          if (!formData.travelers.trim()) {
            errors.travelers = 'Please specify number of travelers';
          }
          if (!formData.budget.trim()) {
            errors.budget = 'Please select a budget range';
          }
        } else if (type === 'visa-application') {
          if (!formData.departureDate.trim()) {
            errors.departureDate = 'Please select departure date';
          }
        } else if (type === 'package-booking') {
          if (!formData.destination.trim()) {
            errors.destination = 'Please select a destination';
          }
          if (!formData.travelDate.trim()) {
            errors.travelDate = 'Please select travel date';
          }
        }
        break;

      case 4:
        if (type === 'package-booking') {
          if (!formData.travelers.trim()) {
            errors.travelers = 'Please specify number of travelers';
          }
          if (!formData.budget.trim()) {
            errors.budget = 'Please select a budget range';
          }
        }
        break;
    }

    const isValid = Object.keys(errors).length === 0;
    
    console.log('Validation result for step', step, ':', { isValid, errors, warnings });
    
    return { isValid, errors, warnings };
  };

  const validateFormData = (formData: FormData): ValidationResult => {
    const errors: Record<string, string> = {};
    
    if (!validateName(formData.name)) {
      errors.name = 'Please enter a valid name';
    }
    
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    const isValid = Object.keys(errors).length === 0;
    
    return { isValid, errors, warnings: {} };
  };

  return {
    validateStep,
    validateFormData,
    validatePhone,
    validateName
  };
};
