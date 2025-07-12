
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSecureFormSubmission } from './useSecureFormSubmission';
import { useFormState } from './useFormState';
import { useFormValidation } from './useFormValidation';

export const useUnifiedForm = (
  type: 'consultation' | 'visa-application' | 'package-booking',
  preSelectedPackage?: string,
  onComplete?: () => void
) => {
  const { toast } = useToast();
  const formState = useFormState(type, preSelectedPackage);
  const { validateStep, validateFormData } = useFormValidation();

  const {
    trackActivity,
    saveFormSubmission,
    sendWelcomeEmail,
    checkSubmissionRateLimit,
    handleSubmissionError
  } = useSecureFormSubmission();

  const openCalendly = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank', 'width=800,height=700');
  };

  const handleSubmit = async () => {
    console.log('=== SECURE UNIFIED FORM SUBMISSION START ===');

    // Enhanced validation with security checks
    if (!validateFormData(formState.formData)) {
      return;
    }

    // Check rate limit (enhanced security)
    const canSubmit = await checkSubmissionRateLimit(formState.formData.email);
    if (!canSubmit) {
      return;
    }

    formState.setIsSubmitting(true);

    try {
      // Critical: Save to database with enhanced security
      await saveFormSubmission(type, formState.formData);
      console.log('✅ Secure database save successful');

      // Non-critical: Send welcome email
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

      // Trigger completion callback or Calendly
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          openCalendly();
        }
      }, 1000);

      console.log('✅ Secure form submission flow completed successfully');

    } catch (error) {
      handleSubmissionError(error);
    } finally {
      formState.setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    return validateStep(formState.currentStep, formState.formData, type);
  };

  const handleNextStep = () => {
    if (!isStepValid()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all the required information before proceeding to the next step.",
        variant: "destructive"
      });
      return;
    }
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
    trackActivity
  };
};
