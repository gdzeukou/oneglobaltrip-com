
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
  // More robust email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
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

export const sanitizeFormData = (data: any) => {
  const sanitized = { ...data };
  
  // Sanitize string fields to prevent XSS
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      // Remove potentially dangerous characters but keep basic punctuation
      sanitized[key] = sanitized[key]
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .slice(0, 500); // Limit length
    }
  });
  
  return sanitized;
};

export const checkRateLimit = async (email: string): Promise<boolean> => {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    // Get submissions from the last hour for this email
    const recentSubmissions = JSON.parse(localStorage.getItem('recent_submissions') || '[]');
    const emailSubmissions = recentSubmissions
      .filter((sub: any) => sub.email === email && new Date(sub.timestamp) > oneHourAgo);
    
    // Allow up to 3 submissions per hour
    if (emailSubmissions.length >= 3) {
      console.log('Rate limit exceeded for email:', email);
      return false;
    }
    
    // Add current submission to tracking
    recentSubmissions.push({
      email,
      timestamp: now.toISOString()
    });
    
    // Keep only last 24 hours of data
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const filteredSubmissions = recentSubmissions
      .filter((sub: any) => new Date(sub.timestamp) > oneDayAgo);
    
    localStorage.setItem('recent_submissions', JSON.stringify(filteredSubmissions));
    
    return true;
  } catch (error) {
    console.warn('Rate limit check failed (non-critical):', error);
    // Don't block submission if rate limiting fails
    return true;
  }
};
