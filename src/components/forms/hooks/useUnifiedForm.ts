
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeFormData, validateEmail, validatePhone, validateName, checkRateLimit } from '@/utils/securityUtils';

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
    if (typeof field !== 'string') {
      console.warn('Invalid field type in handleInputChange');
      return;
    }

    // More lenient validation - only warn, don't block
    if (field === 'email' && typeof value === 'string' && value !== '' && !validateEmail(value)) {
      console.warn('Email format may be invalid:', value);
    }

    if (field === 'name' && typeof value === 'string' && value !== '' && value.length > 100) {
      console.warn('Name too long, truncating');
      value = value.slice(0, 100);
    }

    if (field === 'phone' && typeof value === 'string' && value !== '' && value.length > 20) {
      console.warn('Phone too long, truncating');
      value = value.slice(0, 20);
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTravelNeedsChange = (need: string, checked: boolean) => {
    console.log('handleTravelNeedsChange called with:', { need, checked });
    
    if (typeof need !== 'string' || typeof checked !== 'boolean') {
      console.warn('Invalid types in handleTravelNeedsChange');
      return;
    }

    setFormData(prev => ({
      ...prev,
      travelNeeds: checked 
        ? [...prev.travelNeeds, need]
        : prev.travelNeeds.filter(n => n !== need)
    }));
  };

  const handlePackageSelection = (packageId: string, checked: boolean) => {
    console.log('handlePackageSelection called with:', { packageId, checked });
    
    if (typeof packageId !== 'string' || typeof checked !== 'boolean') {
      console.warn('Invalid types in handlePackageSelection');
      return;
    }

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
        user_id: null // Allow null for unauthenticated submissions
      };

      const { error } = await supabase
        .from('form_submissions')
        .insert([submissionData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

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

  const handleSubmit = async () => {
    // More lenient validation - check for basic required fields only
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive"
      });
      return;
    }

    // Basic email format check
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check rate limiting with more lenient approach
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
      console.warn('Rate limit check failed, proceeding anyway:', error);
    }

    setIsSubmitting(true);

    try {
      await saveFormSubmission();

      // Try to send welcome email but don't fail if it doesn't work
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
        console.warn('Welcome email failed, continuing anyway:', emailError);
      }

      console.log('Form submitted successfully:', { type, formData });
      
      const messages = {
        'consultation': "Thank you! We'll contact you within 24 hours with personalized recommendations.",
        'visa-application': "Your visa application has been started! We'll review and contact you within 24 hours.",
        'package-booking': "Booking request submitted! We'll contact you within 24 hours to confirm details."
      };

      toast({
        title: "Request Submitted Successfully!",
        description: messages[type]
      });

      // Always call onComplete to trigger Calendly
      if (onComplete) {
        onComplete();
      } else {
        // Small delay then redirect
        setTimeout(() => {
          navigate('/packages');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0 && 
               formData.email.trim().length > 0 && 
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
