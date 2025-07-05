import { z } from 'zod';

// Comprehensive validation schema for Schengen Visa Application Form
export const schengenFormSchema = z.object({
  // Personal Information
  nationality: z.string().min(1, 'Nationality is required'),
  cityOfBirth: z.string().min(1, 'City of birth is required'),
  countryOfBirth: z.string().min(1, 'Country of birth is required'),
  
  // Passport Details
  passportNumber: z.string()
    .min(3, 'Passport number must be at least 3 characters')
    .max(15, 'Passport number must not exceed 15 characters')
    .regex(/^[A-Z0-9]+$/i, 'Passport number must contain only letters and numbers'),
  
  passportIssueDate: z.string().refine((date) => {
    const issueDate = new Date(date);
    const today = new Date();
    return issueDate <= today;
  }, 'Passport issue date cannot be in the future'),
  
  passportExpiryDate: z.string().refine((date) => {
    const expiryDate = new Date(date);
    const today = new Date();
    return expiryDate > today;
  }, 'Passport must be valid (not expired)'),
  
  issuingAuthority: z.string().optional(),
  
  // Travel Dates
  departureDate: z.string().refine((date) => {
    const depDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return depDate >= tomorrow;
  }, 'Departure date must be at least 24 hours in the future'),
  
  returnDate: z.string(),
  
  // Residency Logic
  residesInOtherCountry: z.boolean(),
  visaPermitNumber: z.string().optional(),
  permitExpiryDate: z.string().optional(),
  
  // Employment Status
  employmentStatus: z.enum(['employed', 'self-employed', 'student', 'retired']),
  employerName: z.string().optional(),
  employerAddress: z.string().optional(),
  employerPhone: z.string().optional(),
  companyName: z.string().optional(),
  businessAddress: z.string().optional(),
  schoolName: z.string().optional(),
  schoolAddress: z.string().optional(),
}).refine((data) => {
  // Travel dates logic
  if (data.returnDate) {
    const depDate = new Date(data.departureDate);
    const retDate = new Date(data.returnDate);
    return retDate > depDate;
  }
  return true;
}, {
  message: 'Return date must be after departure date',
  path: ['returnDate']
}).refine((data) => {
  // Passport validity check (must be valid for at least 3 months beyond departure)
  const expiryDate = new Date(data.passportExpiryDate);
  const depDate = new Date(data.departureDate);
  
  // Proper 3-month calculation avoiding setMonth() issues
  const threeMonthsAfterDep = new Date(depDate.getFullYear(), depDate.getMonth() + 3, depDate.getDate());
  
  return expiryDate >= threeMonthsAfterDep;
}, {
  message: 'Passport must be valid for at least 3 months beyond your departure date',
  path: ['passportExpiryDate']
}).refine((data) => {
  // Residency permit validation
  if (data.residesInOtherCountry) {
    return data.visaPermitNumber && data.permitExpiryDate;
  }
  return true;
}, {
  message: 'Visa/permit number and expiry date are required',
  path: ['visaPermitNumber']
}).refine((data) => {
  // Permit expiry date must be in future
  if (data.residesInOtherCountry && data.permitExpiryDate) {
    const permitExpiry = new Date(data.permitExpiryDate);
    const today = new Date();
    return permitExpiry > today;
  }
  return true;
}, {
  message: 'Permit expiry date must be in the future',
  path: ['permitExpiryDate']
}).refine((data) => {
  // Employment-specific validations
  if (data.employmentStatus === 'employed') {
    return data.employerName && data.employerAddress && data.employerPhone;
  }
  return true;
}, {
  message: 'Employer details are required for employed applicants',
  path: ['employerName']
}).refine((data) => {
  // Student-specific validations
  if (data.employmentStatus === 'student') {
    return data.schoolName && data.schoolAddress;
  }
  return true;
}, {
  message: 'School details are required for students',
  path: ['schoolName']
});

export type SchengenFormData = z.infer<typeof schengenFormSchema>;

// Validation helpers
export const validatePassportNumber = (passportNumber: string): boolean => {
  return /^[A-Z0-9]{3,15}$/i.test(passportNumber);
};

export const validateFutureDate = (date: string, minDaysAhead: number = 1): boolean => {
  const inputDate = new Date(date);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + minDaysAhead);
  return inputDate >= minDate;
};

export const validatePassportValidity = (issueDate: string, expiryDate: string, departureDate: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  const issue = new Date(issueDate);
  const expiry = new Date(expiryDate);
  const departure = new Date(departureDate);
  const today = new Date();
  
  // Check if passport is issued in the past
  if (issue > today) {
    errors.push('Passport issue date cannot be in the future');
  }
  
  // Check if passport is not expired
  if (expiry <= today) {
    errors.push('Passport is expired');
  }
  
  // Check if passport is valid for at least 3 months beyond departure
  // Proper 3-month calculation avoiding setMonth() issues
  const threeMonthsAfterDeparture = new Date(departure.getFullYear(), departure.getMonth() + 3, departure.getDate());
  
  if (expiry < threeMonthsAfterDeparture) {
    errors.push('Passport must be valid for at least 3 months beyond your departure date');
  }
  
  // Check if passport was issued within the last 10 years
  const tenYearsAgo = new Date(today);
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  
  if (issue < tenYearsAgo) {
    errors.push('Passport must have been issued within the last 10 years');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};