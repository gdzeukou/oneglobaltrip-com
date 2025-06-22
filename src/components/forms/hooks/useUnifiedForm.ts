
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormSubmission } from './useFormSubmission';

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

  const {
    trackActivity,
    saveFormSubmission,
    sendWelcomeEmail,
    validateFormData,
    checkSubmissionRateLimit,
    handleSubmissionError
  } = useFormSubmission();

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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackActivity('form_next_step', { step: currentStep + 1, form_type: type }, formData.email);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      trackActivity('form_prev_step', { step: currentStep - 1, form_type: type }, formData.email);
    }
  };

  const openCalendly = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank', 'width=800,height=700');
  };

  const handleSubmit = async () => {
    console.log('=== UNIFIED FORM SUBMISSION START ===');

    // Enhanced validation
    if (!validateFormData(formData)) {
      return;
    }

    // Check rate limit (non-blocking)
    const canSubmit = await checkSubmissionRateLimit(formData.email);
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Critical: Save to database (must succeed)
      await saveFormSubmission(type, formData);
      console.log('✅ Database save successful - form submission complete');

      // Non-critical: Send welcome email (failure doesn't affect success)
      const emailSent = await sendWelcomeEmail(formData, type);

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
      handleSubmissionError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0 && 
               formData.email.includes('@') && 
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
