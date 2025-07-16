
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  sanitizeFormData, 
  validateEmail, 
  checkRateLimit,
  validateName,
  validatePhone 
} from '@/utils/enhancedSecurityUtils';

interface FormData {
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

export const useSecureFormSubmission = () => {
  const { toast } = useToast();

  const trackActivity = async (actionType: string, actionData?: any, email?: string) => {
    try {
      // Sanitize activity data before storage
      const sanitizedActionData = sanitizeFormData(actionData || {});
      
      await supabase.from('user_activity').insert({
        email: email || 'anonymous',
        page_visited: window.location.pathname,
        action_type: actionType,
        action_data: sanitizedActionData,
        session_id: sessionStorage.getItem('session_id') || crypto.randomUUID(),
        is_online: true,
        last_seen: new Date().toISOString(),
        ip_address: 'unknown',
        user_agent: navigator.userAgent.slice(0, 500), // Limit length
        user_id: null // Explicitly set to null for anonymous users
      });
    } catch (error) {
      console.warn('Activity tracking failed (non-critical):', error);
    }
  };

  const saveFormSubmission = async (type: string, formData: FormData) => {

    // Enhanced validation
    if (!validateFormData(formData)) {
      throw new Error('Form validation failed');
    }

    // Comprehensive sanitization
    const sanitizedData = sanitizeFormData(formData);
    
    const submissionData = {
      form_type: type,
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      nationality: sanitizedData.nationality,
      destination: sanitizedData.destination,
      travel_date: sanitizedData.travelDate,
      duration: sanitizedData.duration,
      travelers: sanitizedData.travelers,
      budget: sanitizedData.budget,
      selected_packages: sanitizedData.selectedPackages,
      travel_needs: sanitizedData.travelNeeds,
      other_needs: sanitizedData.otherNeeds,
      special_requests: sanitizedData.specialRequests,
      visa_type: sanitizedData.visaType,
      travel_purpose: sanitizedData.travelPurpose,
      departure_date: sanitizedData.departureDate,
      return_date: sanitizedData.returnDate,
      ip_address: 'unknown',
      user_agent: navigator.userAgent.slice(0, 500),
      referrer: document.referrer.slice(0, 500),
      user_id: null
    };

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    await trackActivity('form_submit', { form_type: type }, formData.email);
    
    return data;
  };

  const sendWelcomeEmail = async (formData: FormData, type: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          name: formData.name,
          email: formData.email,
          formType: type,
          destination: formData.destination,
          travelNeeds: formData.travelNeeds
        }
      });

      return !error;
    } catch (error) {
      return false;
    }
  };

  const validateFormData = (formData: FormData) => {
    // Enhanced validation with security checks
    if (!validateName(formData.name)) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name using only letters, spaces, hyphens, and apostrophes.",
        variant: "destructive"
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number", 
        description: "Please enter a valid phone number (7-15 digits). Examples: +1-555-123-4567, (555) 123-4567, or 5551234567",
        variant: "destructive"
      });
      return false;
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [/<script/i, /javascript:/i, /on\w+=/i, /<iframe/i];
    const fieldsToCheck = [formData.name, formData.email, formData.phone, formData.otherNeeds, formData.specialRequests];
    
    for (const field of fieldsToCheck) {
      if (typeof field === 'string') {
        for (const pattern of suspiciousPatterns) {
          if (pattern.test(field)) {
            toast({
              title: "Invalid Input",
              description: "Please remove any HTML tags or script content from your input.",
              variant: "destructive"
            });
            return false;
          }
        }
      }
    }

    return true;
  };

  const checkSubmissionRateLimit = async (email: string) => {
    try {
      const canSubmit = await checkRateLimit(email, 'form_submission');
      if (!canSubmit) {
        toast({
          title: "Too Many Submissions",
          description: "You've submitted several forms recently. Please wait before submitting another.",
          variant: "destructive"
        });
        return false;
      }
      return true;
    } catch (error) {
      console.warn('Rate limit check failed (continuing):', error);
      return true;
    }
  };

  const handleSubmissionError = (error: any) => {
    
    let errorMessage = "There was an error submitting your form. Please try again or contact support directly.";
    
    if (error instanceof Error) {
      if (error.message.includes('email')) {
        errorMessage = "Please check your email address and try again.";
      } else if (error.message.includes('validation')) {
        errorMessage = "Please check your input and remove any invalid characters.";
      } else if (error.message.includes('Database error')) {
        errorMessage = "There was a technical issue saving your information. Please try again in a moment.";
      }
    }

    toast({
      title: "Submission Failed",
      description: errorMessage,
      variant: "destructive",
    });
  };

  return {
    trackActivity,
    saveFormSubmission,
    sendWelcomeEmail,
    validateFormData,
    checkSubmissionRateLimit,
    handleSubmissionError
  };
};
