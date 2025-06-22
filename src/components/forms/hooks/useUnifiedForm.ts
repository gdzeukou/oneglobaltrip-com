
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
      console.error('Error tracking activity:', error);
    }
  };

  const saveFormSubmission = async () => {
    try {
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

      console.log('Saving form submission:', { type, submissionData });

      const { data, error } = await supabase
        .from('form_submissions')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Form submission saved successfully:', data);
      await trackActivity('form_submit', { form_type: type, submission_data: submissionData });
      
    } catch (error) {
      console.error('Error saving form submission:', error);
      throw error;
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
    console.log('UnifiedForm submission started:', { type, formData });

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
      console.warn('Rate limit check failed, continuing:', error);
    }

    setIsSubmitting(true);

    try {
      await saveFormSubmission();

      // Try to send welcome email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            name: formData.name,
            email: formData.email,
            formType: type,
            destination: formData.destination,
            travelNeeds: formData.travelNeeds
          }
        });
      } catch (emailError) {
        console.warn('Welcome email failed:', emailError);
      }

      const messages = {
        'consultation': "Thank you! Your consultation request has been submitted successfully.",
        'visa-application': "Your visa application has been started! We'll review and contact you within 24 hours.",
        'package-booking': "Booking request submitted! We'll contact you within 24 hours to confirm details."
      };

      toast({
        title: "Request Submitted Successfully!",
        description: messages[type]
      });

      // Always trigger Calendly after successful submission
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          openCalendly();
        }
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "There was an error submitting your form. Please try again or contact support.";
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          errorMessage = "Please check your email address and try again.";
        } else if (error.message.includes('Database error')) {
          errorMessage = "There was a technical issue. Please try again in a moment.";
        }
      }

      toast({
        title: "Submission Error",
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
