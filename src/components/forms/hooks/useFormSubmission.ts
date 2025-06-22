
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeFormData, validateEmail, checkRateLimit } from '@/utils/securityUtils';

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

export const useFormSubmission = () => {
  const { toast } = useToast();

  const trackActivity = async (actionType: string, actionData?: any, email?: string) => {
    try {
      await supabase.from('user_activity').insert({
        email: email || 'anonymous',
        page_visited: window.location.pathname,
        action_type: actionType,
        action_data: actionData,
        session_id: sessionStorage.getItem('session_id') || crypto.randomUUID(),
        is_online: true,
        last_seen: new Date().toISOString(),
        ip_address: 'unknown',
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.warn('Activity tracking failed (non-critical):', error);
    }
  };

  const saveFormSubmission = async (type: string, formData: FormData) => {
    console.log('=== FORM SUBMISSION START ===');
    console.log('Form type:', type);
    console.log('Form data:', formData);

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
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      user_id: null
    };

    console.log('Saving to database:', submissionData);

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([submissionData])
      .select();

    if (error) {
      console.error('❌ Database save failed:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('✅ Form saved to database successfully:', data);
    await trackActivity('form_submit', { form_type: type, submission_data: submissionData }, formData.email);
    
    return data;
  };

  const sendWelcomeEmail = async (formData: FormData, type: string) => {
    try {
      console.log('📧 Attempting to send welcome email...');
      
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          name: formData.name,
          email: formData.email,
          formType: type,
          destination: formData.destination,
          travelNeeds: formData.travelNeeds
        }
      });

      if (error) {
        console.warn('⚠️ Welcome email failed (non-critical):', error);
        return false;
      }

      console.log('✅ Welcome email sent successfully');
      return true;
    } catch (error) {
      console.warn('⚠️ Welcome email service unavailable (non-critical):', error);
      return false;
    }
  };

  const validateFormData = (formData: FormData) => {
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name.",
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

    if (!formData.phone.trim()) {
      toast({
        title: "Missing Information", 
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const checkSubmissionRateLimit = async (email: string) => {
    try {
      const canSubmit = await checkRateLimit(email);
      if (!canSubmit) {
        toast({
          title: "Please Wait",
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
    console.error('❌ Critical error in form submission:', error);
    
    let errorMessage = "There was an error submitting your form. Please try again or contact support directly.";
    
    if (error instanceof Error) {
      if (error.message.includes('email')) {
        errorMessage = "Please check your email address and try again.";
      } else if (error.message.includes('required')) {
        errorMessage = error.message;
      } else if (error.message.includes('Database error')) {
        errorMessage = "There was a technical issue saving your information. Please try again in a moment.";
      } else if (error.message.includes('duplicate') || error.message.includes('unique')) {
        errorMessage = "You've already submitted an application with this information.";
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
