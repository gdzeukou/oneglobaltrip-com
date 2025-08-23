
// Enhanced security utilities with comprehensive XSS protection and validation

import DOMPurify from 'dompurify';

// XSS Protection - HTML Sanitization
export const sanitizeHTML = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
};

// Enhanced input validation with XSS protection
export const sanitizeInput = (input: string, maxLength: number = 500): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    // Remove HTML tags completely
    .replace(/<[^>]*>/g, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove on* event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove style tags and content
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove potential data URIs
    .replace(/data:\s*[^;]+;base64,/gi, '')
    // Remove vbscript protocol
    .replace(/vbscript:/gi, '');
};

// Comprehensive email validation
export const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Check basic format
  if (!emailRegex.test(email)) return false;
  
  // Check length (RFC 5321 limit)
  if (email.length > 254) return false;
  
  // Check for common attack patterns
  if (email.includes('<script') || email.includes('javascript:')) return false;
  
  return true;
};

// Enhanced phone validation with better flexibility
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remove all common separators and whitespace for validation
  const cleanPhone = phone.replace(/[\s\-\(\)\+\.\[\]]/g, '');
  
  // Allow international formats - 7-15 digits after cleaning
  const phoneRegex = /^\d{7,15}$/;
  if (!phoneRegex.test(cleanPhone)) return false;
  
  // Check for malicious patterns
  if (phone.includes('<') || phone.includes('>') || phone.includes('script') || phone.includes('javascript')) return false;
  
  return true;
};

// Enhanced name validation
export const validateName = (name: string): boolean => {
  // Allow letters, spaces, hyphens, apostrophes, and dots
  const nameRegex = /^[a-zA-Z\s\-'\.]{1,100}$/;
  if (!nameRegex.test(name.trim())) return false;
  
  // Check for injection patterns
  if (name.includes('<') || name.includes('>') || name.includes('script')) return false;
  
  return true;
};

// Validate travel needs against whitelist
export const validateTravelNeed = (need: string): boolean => {
  const allowedNeeds = [
    'Flights', 'Place to Stay', 'Car Rentals', 'Travel Insurance', 
    'Passport', 'Visa', 'Other'
  ];
  return allowedNeeds.includes(need) || need === '';
};

// Enhanced form data sanitization
export const sanitizeFormData = (data: any) => {
  const sanitized = { ...data };
  
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      // Apply comprehensive sanitization
      sanitized[key] = sanitizeInput(sanitized[key], 1000);
    } else if (Array.isArray(sanitized[key])) {
      // Sanitize array elements
      sanitized[key] = sanitized[key].map((item: any) => 
        typeof item === 'string' ? sanitizeInput(item, 500) : item
      );
    }
  });
  
  return sanitized;
};

// Secure server-side rate limiting check
export const checkRateLimit = async (email: string, endpoint: string = 'form_submission'): Promise<boolean> => {
  try {
    // Import supabase client
    const { supabase } = await import('@/integrations/supabase/client');
    
    // Get IP address (simplified for client-side)
    const ipAddress = 'client_request';
    
    // Use the secure server-side rate limiting function
    const { data, error } = await supabase.rpc('check_form_submission_rate_limit', {
      _ip_address: ipAddress,
      _email: email,
      _max_submissions: 3,
      _time_window_minutes: 60
    });
    
    if (error) {
      console.error('Rate limit check failed:', error);
      return true; // Allow on error to prevent blocking legitimate users
    }
    
    return data === true;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return true; // Allow on error to prevent blocking legitimate users
  }
};

// Content Security Policy helper
export const applyCSP = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://calendly.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://calendly.com;";
  document.head.appendChild(meta);
};

// Input encoding for safe display
export const encodeForHTML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// Generate secure session ID
export const generateSecureSessionId = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
