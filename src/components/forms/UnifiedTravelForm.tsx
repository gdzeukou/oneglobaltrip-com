
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
    formData,
    totalSteps,
    handleInputChange,
    handleTravelNeedsChange,
    handlePackageSelection,
    handleSubmit,
    isStepValid,
    handleNextStep,
    handlePrevStep,
    trackActivity,
    validationErrors,
    validationWarnings
  } = useUnifiedForm(type, preSelectedPackage, onComplete);

  useEffect(() => {
    console.log('UnifiedTravelForm mounted with type:', type);
    trackActivity('form_start', { form_type: type });
    
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', crypto.randomUUID());
    }
  }, [type, trackActivity]);

  useEffect(() => {
    console.log('Form state changed:', {
      currentStep,
      isStepValid: isStepValid(),
      errors: validationErrors,
      warnings: validationWarnings,
      formData
    });
  }, [currentStep, validationErrors, validationWarnings, formData]);

  const secureHandleTravelNeedsChange = (need: string, checked: boolean) => {
    console.log('Travel needs change:', need, checked);
    if (typeof need !== 'string' || typeof checked !== 'boolean') {
      console.warn('Invalid input types for travel needs change');
      return;
    }
    
    const sanitizedNeed = need.trim().slice(0, 100);
    handleTravelNeedsChange(sanitizedNeed, checked);
  };

  const secureHandlePackageSelection = (packageId: string, checked: boolean) => {
    console.log('Package selection change:', packageId, checked);
    if (typeof packageId !== 'string' || typeof checked !== 'boolean') {
      console.warn('Invalid input types for package selection');
      return;
    }
    
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
          errors={validationErrors}
          warnings={validationWarnings}
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
          errors={validationErrors}
        />

        <p className="text-sm text-gray-500 text-center mt-4">
          No credit card required • Free consultation • Response within 24 hours
        </p>
      </CardContent>
    </Card>
  );
};

export default UnifiedTravelForm;
