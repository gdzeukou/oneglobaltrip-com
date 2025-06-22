
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
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

export const useUnifiedForm = (
  type: 'consultation' | 'visa-application' | 'package-booking',
  preSelectedPackage?: string,
  onComplete?: () => void
) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    duration: '',
    travelers: '',
    budget: '',
    selectedPackages: preSelectedPackage ? [preSelectedPackage] : [],
    travelNeeds: [],
    otherNeeds: '',
    specialRequests: '',
    nationality: '',
    visaType: '',
    travelPurpose: 'tourism',
    departureDate: '',
    returnDate: ''
  });

  const totalSteps = type === 'package-booking' ? 4 : 3;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTravelNeedsChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      travelNeeds: checked 
        ? [...prev.travelNeeds, need]
        : prev.travelNeeds.filter(n => n !== need)
    }));
  };

  const handlePackageSelection = (packageId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: checked
        ? [...prev.selectedPackages, packageId]
        : prev.selectedPackages.filter(id => id !== packageId)
    }));
  };

  const trackActivity = async (actionType: string, actionData?: any) => {
    try {
      await supabase.from('user_activity').insert({
        email: formData.email || 'anonymous',
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

  const saveFormSubmission = async () => {
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
    await trackActivity('form_submit', { form_type: type, submission_data: submissionData });
    
    return data;
  };

  const sendWelcomeEmail = async () => {
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackActivity('form_next_step', { step: currentStep + 1, form_type: type });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      trackActivity('form_prev_step', { step: currentStep - 1, form_type: type });
    }
  };

  const openCalendly = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank', 'width=800,height=700');
  };

  const handleSubmit = async () => {
    console.log('=== UNIFIED FORM SUBMISSION START ===');

    // Enhanced validation
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Missing Information", 
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return;
    }

    // Check rate limit (non-blocking)
    try {
      const canSubmit = await checkRateLimit(formData.email);
      if (!canSubmit) {
        toast({
          title: "Please Wait",
          description: "You've submitted several forms recently. Please wait before submitting another.",
          variant: "destructive"
        });
        return;
      }
    } catch (error) {
      console.warn('Rate limit check failed (continuing):', error);
    }

    setIsSubmitting(true);

    try {
      // Critical: Save to database (must succeed)
      await saveFormSubmission();
      console.log('✅ Database save successful - form submission complete');

      // Non-critical: Send welcome email (failure doesn't affect success)
      const emailSent = await sendWelcomeEmail();

      // Show success message
      const messages = {
        'consultation': "Thank you! Your consultation request has been submitted successfully.",
        'visa-application': "Your visa application has been started! We'll review and contact you within 24 hours.",
        'package-booking': "Booking request submitted! We'll contact you within 24 hours to confirm details."
      };

      let successDescription = messages[type];
      if (!emailSent) {
        successDescription += " (Note: We'll contact you directly as our email service is temporarily unavailable.)";
      }

      toast({
        title: "Request Submitted Successfully!",
        description: successDescription
      });

      // Trigger completion callback or Calendly
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          openCalendly();
        }
      }, 1000);

      console.log('✅ Form submission flow completed successfully');

    } catch (error) {
      console.error('❌ Critical error in form submission:', error);
      
      // Only show error for actual submission failures (database errors)
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0 && 
               validateEmail(formData.email) && 
               formData.phone.trim().length > 0;
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

  return {
    formData,
    currentStep,
    totalSteps,
    isSubmitting,
    handleInputChange,
    handleTravelNeedsChange,
    handlePackageSelection,
    handleNext,
    handlePrev,
    handleSubmit,
    isStepValid,
    trackActivity
  };
};
