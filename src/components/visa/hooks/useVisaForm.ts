
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, validateEmail, validatePhone, validateName } from '@/utils/securityUtils';

interface VisaFormData {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  nationality: string;
  
  // Travel Information
  destination: string;
  purpose: string;
  travelDate: string;
  departureCity: string;
}

interface UseVisaFormProps {
  type: 'short-stay' | 'long-stay';
  preSelectedCountry?: string;
  onComplete?: () => void;
}

export const useVisaForm = ({ type, preSelectedCountry, onComplete }: UseVisaFormProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<VisaFormData>({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    destination: preSelectedCountry || '',
    purpose: '',
    travelDate: '',
    departureCity: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;

  const handleInputChange = (field: keyof VisaFormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Destination
        return formData.destination.trim() !== '';
      case 1: // Purpose
        return formData.purpose.trim() !== '';
      case 2: // Travel Date
        return formData.travelDate.trim() !== '';
      case 3: // Departure City
        return formData.departureCity.trim() !== '';
      case 4: // Nationality
        return formData.nationality.trim() !== '';
      case 5: // Personal Info
        return validateName(formData.name) && 
               validateEmail(formData.email) && 
               validatePhone(formData.phone);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    } else {
      toast({
        title: "Please complete all required fields",
        variant: "destructive"
      });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
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

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      toast({
        title: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('=== VISA FORM SUBMISSION START ===');
      console.log('Form type:', type);
      console.log('Form data:', formData);

      // Insert into the appropriate visa leads table
      const tableName = type === 'short-stay' ? 'short_visas_leads' : 'long_visas_leads';
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        destination_country: formData.destination,
        departure_city: formData.departureCity,
        ...(type === 'short-stay' 
          ? { purpose: formData.purpose }
          : { visa_category: formData.purpose }
        )
      };

      console.log('Saving to table:', tableName, submissionData);

      const { data, error } = await supabase
        .from(tableName)
        .insert([submissionData])
        .select();

      if (error) {
        console.error('❌ Database save failed:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('✅ Visa form saved successfully:', data);

      // Track the submission
      await trackActivity('visa_form_submit', { 
        form_type: type, 
        destination: formData.destination,
        submission_data: submissionData 
      });

      // Also save to main form_submissions table for unified tracking
      await supabase.from('form_submissions').insert({
        form_type: `visa-${type}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        destination: formData.destination,
        travel_date: formData.travelDate,
        travel_purpose: formData.purpose,
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
        referrer: document.referrer
      });

      // Send welcome email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            name: formData.name,
            email: formData.email,
            formType: `visa-${type}`,
            destination: formData.destination
          }
        });
      } catch (emailError) {
        console.warn('Welcome email failed (non-critical):', emailError);
      }

      toast({
        title: "Application Started!",
        description: "We'll contact you within 24 hours to discuss your visa application.",
      });

      onComplete?.();

    } catch (error: any) {
      console.error('❌ Visa form submission failed:', error);
      
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    currentStep,
    totalSteps,
    isSubmitting,
    handleInputChange,
    handleNext,
    handlePrev,
    handleSubmit,
    validateCurrentStep,
    trackActivity
  };
};
