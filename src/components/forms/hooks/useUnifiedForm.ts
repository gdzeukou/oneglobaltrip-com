
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
    // Enhanced security validation for input changes
    if (typeof field !== 'string') {
      console.warn('Invalid field type in handleInputChange');
      return;
    }

    // Validate specific fields with enhanced security
    if (field === 'email' && typeof value === 'string' && !validateEmail(value) && value !== '') {
      console.warn('Invalid email format');
      return;
    }

    if (field === 'name' && typeof value === 'string' && !validateName(value) && value !== '') {
      console.warn('Invalid name format');
      return;
    }

    if (field === 'phone' && typeof value === 'string' && !validatePhone(value) && value !== '') {
      console.warn('Invalid phone format');
      return;
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
      // Sanitize form data before submission
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
        referrer: document.referrer
      };

      const { error } = await supabase
        .from('form_submissions')
        .insert([submissionData]);

      if (error) throw error;

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
    // Enhanced validation before submission
    if (!validateName(formData.name) || !validateEmail(formData.email) || !validatePhone(formData.phone)) {
      toast({
        title: "Invalid Information",
        description: "Please check your name, email, and phone number for correct format.",
        variant: "destructive"
      });
      return;
    }

    // Check rate limiting
    const canSubmit = await checkRateLimit(formData.email);
    if (!canSubmit) {
      toast({
        title: "Too Many Requests",
        description: "Please wait before submitting another form. Maximum 5 submissions per hour.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await saveFormSubmission();

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
        console.error('Error sending welcome email:', emailError);
      }

      console.log('Form submitted:', { type, formData });
      
      const messages = {
        'consultation': "Thank you! We'll contact you within 24 hours with personalized recommendations.",
        'visa-application': "Your visa application has been started! We'll review and contact you within 24 hours.",
        'package-booking': "Booking request submitted! We'll contact you within 24 hours to confirm details."
      };

      toast({
        title: "Request Submitted Successfully!",
        description: messages[type]
      });

      if (onComplete) {
        onComplete();
      } else {
        setTimeout(() => {
          navigate('/packages');
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return validateName(formData.name) && validateEmail(formData.email) && validatePhone(formData.phone);
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
