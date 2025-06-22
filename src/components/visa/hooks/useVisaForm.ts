
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getFilteredNationalities } from '@/utils/visaRequirements';
import { sanitizeInput, validateEmail } from '@/utils/securityUtils';

interface VisaFormData {
  destinationCountry: string;
  purpose: string;
  travelDate: string;
  departureCity: string;
  nationality: string;
  additionalNeeds: string[];
  name: string;
  email: string;
  phone: string;
}

export const useVisaForm = (type: 'short-stay' | 'long-stay', preSelectedCountry?: string, onComplete?: () => void) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableNationalities, setAvailableNationalities] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<VisaFormData>({
    destinationCountry: preSelectedCountry || '',
    purpose: '',
    travelDate: '',
    departureCity: '',
    nationality: '',
    additionalNeeds: [],
    name: '',
    email: '',
    phone: ''
  });

  const totalSteps = 7;

  // Update available nationalities when destination changes
  useEffect(() => {
    if (formData.destinationCountry) {
      const filteredNationalities = getFilteredNationalities(formData.destinationCountry, type);
      setAvailableNationalities(filteredNationalities);
      console.log(`Updated nationalities for ${formData.destinationCountry}:`, filteredNationalities.length);
      
      // Reset nationality if it's no longer available
      if (formData.nationality && !filteredNationalities.includes(formData.nationality)) {
        setFormData(prev => ({ ...prev, nationality: '' }));
      }
    }
  }, [formData.destinationCountry, type]);

  // Set initial nationalities on component mount
  useEffect(() => {
    const initialNationalities = getFilteredNationalities(formData.destinationCountry || '', type);
    setAvailableNationalities(initialNationalities);
  }, [type, formData.destinationCountry]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAdditionalNeedsChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalNeeds: checked 
        ? [...prev.additionalNeeds, need]
        : prev.additionalNeeds.filter(n => n !== need)
    }));
  };

  const sendWelcomeEmail = async () => {
    try {
      console.log('📧 Attempting to send welcome email...');
      
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          name: formData.name,
          email: formData.email,
          formType: type === 'short-stay' ? 'short-stay-visa' : 'long-stay-visa',
          destination: formData.destinationCountry,
          travelNeeds: formData.additionalNeeds
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

  const handleSubmit = async () => {
    console.log('=== VISA FORM SUBMISSION START ===');
    console.log('Form type:', type);
    console.log('Raw form data:', formData);
    
    setIsSubmitting(true);
    
    try {
      // Enhanced validation with detailed logging
      console.log('=== VALIDATION PHASE ===');
      
      if (!formData.name?.trim()) {
        console.error('Validation failed: Missing name');
        throw new Error('Name is required');
      }
      
      if (!validateEmail(formData.email)) {
        console.error('Validation failed: Invalid email:', formData.email);
        throw new Error('Valid email is required');
      }
      
      if (!formData.phone?.trim()) {
        console.error('Validation failed: Missing phone');
        throw new Error('Phone number is required');
      }
      
      if (!formData.destinationCountry) {
        console.error('Validation failed: Missing destination');
        throw new Error('Destination country is required');
      }
      
      if (!formData.nationality) {
        console.error('Validation failed: Missing nationality');
        throw new Error('Nationality is required');
      }
      
      if (!formData.purpose) {
        console.error('Validation failed: Missing purpose');
        throw new Error('Purpose/category is required');
      }

      console.log('✓ All validations passed');

      // Sanitize data
      console.log('=== SANITIZATION PHASE ===');
      const sanitizedData = {
        purpose: sanitizeInput(formData.purpose, 100),
        departure_city: sanitizeInput(formData.departureCity, 100),
        nationality: sanitizeInput(formData.nationality, 100),
        destination_country: sanitizeInput(formData.destinationCountry, 100),
        name: sanitizeInput(formData.name, 100),
        email: sanitizeInput(formData.email, 254),
        phone: sanitizeInput(formData.phone, 20)
      };

      console.log('Sanitized data:', sanitizedData);

      // Determine table and field based on visa type
      console.log('=== DATABASE PREPARATION ===');
      const tableName = type === 'short-stay' ? 'short_visas_leads' : 'long_visas_leads';
      const purposeField = type === 'short-stay' ? 'purpose' : 'visa_category';
      
      console.log('Target table:', tableName);
      console.log('Purpose field:', purposeField);

      // Prepare final submission data
      const submissionData = {
        [purposeField]: sanitizedData.purpose,
        departure_city: sanitizedData.departure_city,
        nationality: sanitizedData.nationality,
        destination_country: sanitizedData.destination_country,
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone
      };

      console.log('Final submission data:', submissionData);

      // Critical: Save to database (must succeed)
      console.log('=== DATABASE INSERTION ===');
      console.log(`Inserting into table: ${tableName}`);
      
      const { data: insertResult, error: insertError } = await supabase
        .from(tableName)
        .insert([submissionData])
        .select();

      if (insertError) {
        console.error('❌ Database insertion failed');
        console.error('Supabase error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        throw new Error(`Database error: ${insertError.message}`);
      }

      console.log('✅ Database insertion successful:', insertResult);

      // Non-critical: Send welcome email (failure doesn't affect success)
      const emailSent = await sendWelcomeEmail();

      // Success handling
      console.log('=== SUCCESS HANDLING ===');
      
      let successDescription = "We'll review your information and contact you within 24 hours.";
      if (!emailSent) {
        successDescription += " (Note: We'll contact you directly as our email service is temporarily unavailable.)";
      }

      toast({
        title: "Application Started!",
        description: successDescription,
      });

      console.log('✅ Toast notification sent');

      if (onComplete) {
        console.log('✅ Calling onComplete callback');
        onComplete();
      }

      console.log('=== VISA FORM SUBMISSION COMPLETE ===');
      
    } catch (error) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error type:', typeof error);
      console.error('Error instance:', error instanceof Error);
      console.error('Full error object:', error);
      
      // Only show error for actual critical failures (database errors)
      let errorMessage = "Please try again or contact support.";
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        if (error.message.includes('email')) {
          errorMessage = "Please check your email address and try again.";
        } else if (error.message.includes('required')) {
          errorMessage = error.message;
        } else if (error.message.includes('Database error')) {
          errorMessage = "There was a technical issue. Please try again in a moment.";
        } else if (error.message.includes('duplicate') || error.message.includes('unique')) {
          errorMessage = "You've already submitted an application with this information.";
        }
      }

      console.error('Final error message to user:', errorMessage);

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('=== CLEANUP ===');
      setIsSubmitting(false);
      console.log('isSubmitting set to false');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.destinationCountry.length > 0;
      case 2: return formData.purpose.length > 0;
      case 3: return formData.travelDate.length > 0;
      case 4: return formData.departureCity.length > 0;
      case 5: return formData.nationality.length > 0;
      case 6: return formData.name.length > 0;
      case 7: return formData.email.length > 0 && formData.phone.length > 0;
      default: return false;
    }
  };

  return {
    formData,
    setFormData,
    currentStep,
    totalSteps,
    isSubmitting,
    availableNationalities,
    handleNext,
    handlePrev,
    handleAdditionalNeedsChange,
    handleSubmit,
    isStepValid
  };
};
