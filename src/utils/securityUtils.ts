
// Enhanced security utilities for input validation and sanitization

export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const validateEmail = (email: string): boolean => {
  // More lenient email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

export const validatePhone = (phone: string): boolean => {
  // More lenient phone validation
  const phoneRegex = /^[\d\s\-\(\)\+]{7,20}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(phone) && cleanPhone.length >= 7;
};

export const validateName = (name: string): boolean => {
  // More lenient name validation
  const nameRegex = /^[a-zA-Z\s\-'\.]{1,100}$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 1;
};

export const validatePackageId = (packageId: string): boolean => {
  const packageIdRegex = /^[a-zA-Z0-9-_\s]{1,50}$/;
  return packageIdRegex.test(packageId);
};

export const validateTravelNeed = (need: string): boolean => {
  const allowedNeeds = [
    'Flights', 'Place to Stay', 'Car Rentals', 'Travel Insurance', 
    'Passport', 'Visa', 'Other'
  ];
  return allowedNeeds.includes(need) || need === '';
};

export const sanitizeFormData = (formData: any): any => {
  const sanitized = { ...formData };
  
  // Sanitize string fields
  if (sanitized.name) sanitized.name = sanitizeInput(sanitized.name, 100);
  if (sanitized.email) sanitized.email = sanitizeInput(sanitized.email, 254);
  if (sanitized.phone) sanitized.phone = sanitizeInput(sanitized.phone, 20);
  if (sanitized.destination) sanitized.destination = sanitizeInput(sanitized.destination, 100);
  if (sanitized.nationality) sanitized.nationality = sanitizeInput(sanitized.nationality, 50);
  if (sanitized.specialRequests) sanitized.specialRequests = sanitizeInput(sanitized.specialRequests, 2000);
  if (sanitized.otherNeeds) sanitized.otherNeeds = sanitizeInput(sanitized.otherNeeds, 500);
  
  // Validate and sanitize arrays
  if (sanitized.travelNeeds && Array.isArray(sanitized.travelNeeds)) {
    sanitized.travelNeeds = sanitized.travelNeeds.filter(need => validateTravelNeed(need));
  }
  
  if (sanitized.selectedPackages && Array.isArray(sanitized.selectedPackages)) {
    sanitized.selectedPackages = sanitized.selectedPackages.filter(pkg => validatePackageId(pkg));
  }
  
  return sanitized;
};

export const checkRateLimit = async (email: string, ipAddress: string = 'unknown'): Promise<boolean> => {
  try {
    // Simple client-side rate limiting check
    const storageKey = `rate_limit_${email}_${ipAddress}`;
    const stored = localStorage.getItem(storageKey);
    
    if (!stored) {
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        firstSubmission: Date.now()
      }));
      return true;
    }
    
    const data = JSON.parse(stored);
    const hourAgo = Date.now() - (60 * 60 * 1000); // 1 hour
    
    if (data.firstSubmission < hourAgo) {
      // Reset counter
      localStorage.setItem(storageKey, JSON.stringify({
        count: 1,
        firstSubmission: Date.now()
      }));
      return true;
    }
    
    if (data.count >= 10) { // Increased limit to be more lenient
      return false;
    }
    
    data.count++;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn('Rate limit check failed:', error);
    return true; // Allow on error
  }
};
