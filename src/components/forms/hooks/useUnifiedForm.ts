
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSecureFormSubmission } from './useSecureFormSubmission';
import { useFormState } from './useFormState';
import { useImprovedFormValidation } from './useImprovedFormValidation';

export const useUnifiedForm = (
  type: 'consultation' | 'visa-application' | 'package-booking',
  preSelectedPackage?: string,
  onComplete?: () => void
) => {
  const { toast } = useToast();
  const formState = useFormState(type, preSelectedPackage);
  const { validateStep, validateFormData } = useImprovedFormValidation();
  const [validationResult, setValidationResult] = useState({ isValid: true, errors: {}, warnings: {} });

  const {
    trackActivity,
    saveFormSubmission,
    sendWelcomeEmail,
    checkSubmissionRateLimit,
    handleSubmissionError
  } = useSecureFormSubmission();

  // Load saved form data on mount
  useEffect(() => {
    formState.loadFormData();
  }, []);

  // Validate current step whenever form data or step changes
  useEffect(() => {
    const result = validateStep(formState.currentStep, formState.formData, type);
    // Only update if validation result actually changed to prevent infinite loops
    setValidationResult(prev => {
      if (JSON.stringify(prev) === JSON.stringify(result)) {
        return prev;
      }
      console.log('Validation updated for step', formState.currentStep, ':', result);
      return result;
    });
  }, [formState.currentStep, formState.formData, type, validateStep]);

  const openCalendly = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank', 'width=800,height=700');
  };

  const handleSubmit = async () => {
    console.log('=== UNIFIED FORM SUBMISSION START ===');
    console.log('Form type:', type);
    console.log('Is submitting already?', formState.isSubmitting);
    console.log('Current form data:', formState.formData);
    console.log('Form validation state:', validationResult);

    // Final validation
    const finalValidation = validateFormData(formState.formData);
    if (!finalValidation.isValid) {
      console.log('Final validation failed:', finalValidation.errors);
      toast({
        title: "Please complete all required fields",
        description: "Check the form for any missing or invalid information.",
        variant: "destructive"
      });
      return;
    }

    // Check rate limit
    const canSubmit = await checkSubmissionRateLimit(formState.formData.email);
    if (!canSubmit) {
      return;
    }

    formState.setIsSubmitting(true);

    try {
      // Save to database
      await saveFormSubmission(type, formState.formData);
      console.log('✅ Database save successful');

      // Send welcome email (non-critical)
      const emailSent = await sendWelcomeEmail(formState.formData, type);

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

      // Clear saved form data
      localStorage.removeItem(`form_data_${type}`);

      // Trigger completion callback or Calendly
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          openCalendly();
        }
      }, 1000);

      console.log('✅ Form submission completed successfully');

    } catch (error) {
      console.error('Form submission error:', error);
      handleSubmissionError(error);
    } finally {
      formState.setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    return validationResult.isValid;
  };

  const handleNextStep = () => {
    console.log('handleNextStep called, current validation:', validationResult);
    
    if (!validationResult.isValid) {
      // Show specific error toast
      const errorMessages = Object.values(validationResult.errors).filter((msg): msg is string => typeof msg === 'string');
      const firstError = errorMessages.length > 0 ? errorMessages[0] : "Fill in all the required information before proceeding.";
      
      toast({
        title: "Please complete all required fields",
        description: firstError,
        variant: "destructive"
      });
      return;
    }
    
    console.log('Validation passed, moving to next step');
    formState.handleNext();
    trackActivity('form_next_step', { step: formState.currentStep + 1, form_type: type }, formState.formData.email);
  };

  const handlePrevStep = () => {
    formState.handlePrev();
    trackActivity('form_prev_step', { step: formState.currentStep - 1, form_type: type }, formState.formData.email);
  };

  return {
    ...formState,
    handleSubmit,
    isStepValid,
    handleNextStep,
    handlePrevStep,
    trackActivity,
    validationErrors: validationResult.errors,
    validationWarnings: validationResult.warnings
  };
};
