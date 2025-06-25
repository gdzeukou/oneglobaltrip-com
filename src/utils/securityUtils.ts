// Updated security utilities with enhanced protection
import { 
  sanitizeInput as enhancedSanitizeInput,
  validateEmail as enhancedValidateEmail,
  validateName as enhancedValidateName,
  validatePhone as enhancedValidatePhone,
  sanitizeFormData as enhancedSanitizeFormData,
  checkRateLimit as enhancedCheckRateLimit
} from './enhancedSecurityUtils';

// Export enhanced versions
export const sanitizeInput = enhancedSanitizeInput;
export const validateEmail = enhancedValidateEmail;
export const validateName = enhancedValidateName;
export const validatePhone = enhancedValidatePhone;
export const sanitizeFormData = enhancedSanitizeFormData;
export const checkRateLimit = enhancedCheckRateLimit;

// Keep existing functions for backwards compatibility
export const validateTravelNeed = (need: string): boolean => {
  const allowedNeeds = [
    'Flights', 'Place to Stay', 'Car Rentals', 'Travel Insurance', 
    'Passport', 'Visa', 'Other'
  ];
  return allowedNeeds.includes(need) || need === '';
};

export const validatePackageId = (packageId: string): boolean => {
  const packageIdRegex = /^[a-zA-Z0-9-_\s]{1,50}$/;
  return packageIdRegex.test(packageId);
};
