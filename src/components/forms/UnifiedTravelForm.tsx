
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUnifiedForm } from './hooks/useUnifiedForm';
import FormHeader from './FormHeader';
import StepRenderer from './StepRenderer';
import FormSteps from './FormSteps';
import { useToast } from '@/hooks/use-toast';

interface UnifiedTravelFormProps {
  type: 'consultation' | 'visa-application' | 'package-booking';
  preSelectedPackage?: string;
  title?: string;
  onComplete?: () => void;
}

const UnifiedTravelForm = ({ type, preSelectedPackage, title, onComplete }: UnifiedTravelFormProps) => {
  const { toast } = useToast();
  const {
    currentStep,
    isSubmitting,
    setIsSubmitting,
    formData,
    totalSteps,
    handleInputChange,
    handleTravelNeedsChange,
    handlePackageSelection,
    handleSubmit,
    isStepValid,
    handleNextStep,
    handlePrevStep,
    trackActivity
  } = useUnifiedForm(type, preSelectedPackage, onComplete);


  useEffect(() => {
    trackActivity('form_start', { form_type: type });
    
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', crypto.randomUUID());
    }
  }, [type, trackActivity]);

  const openCalendly = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank', 'width=800,height=700');
  };



  // Enhanced security wrapper for travel needs change
  const secureHandleTravelNeedsChange = (need: string, checked: boolean) => {
    // Validate input to prevent XSS
    if (typeof need !== 'string' || typeof checked !== 'boolean') {
      console.warn('Invalid input types for travel needs change');
      return;
    }
    
    // Sanitize the need string
    const sanitizedNeed = need.trim().slice(0, 100); // Limit length
    handleTravelNeedsChange(sanitizedNeed, checked);
  };

  // Enhanced security wrapper for package selection
  const secureHandlePackageSelection = (packageId: string, checked: boolean) => {
    // Validate input to prevent tampering
    if (typeof packageId !== 'string' || typeof checked !== 'boolean') {
      console.warn('Invalid input types for package selection');
      return;
    }
    
    // Validate package ID format (UUID-like)
    const uuidRegex = /^[a-zA-Z0-9-_]+$/;
    if (!uuidRegex.test(packageId)) {
      console.warn('Invalid package ID format');
      return;
    }
    
    handlePackageSelection(packageId, checked);
  };


  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-2 border-blue-200">
      <FormHeader
        type={type}
        title={title}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      
      <CardContent className="p-8">
        <StepRenderer
          currentStep={currentStep}
          type={type}
          formData={formData}
          onInputChange={handleInputChange}
          onTravelNeedsChange={secureHandleTravelNeedsChange}
          onPackageSelection={secureHandlePackageSelection}
        />
        
        <FormSteps
          currentStep={currentStep}
          totalSteps={totalSteps}
          isStepValid={isStepValid()}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          onSubmit={handleSubmit}
          type={type}
          isSubmitting={isSubmitting}
        />

        <p className="text-sm text-gray-500 text-center mt-4">
          No credit card required • Free consultation • Response within 24 hours
        </p>
      </CardContent>
    </Card>
  );
};

export default UnifiedTravelForm;
