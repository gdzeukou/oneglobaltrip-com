
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUnifiedForm } from './hooks/useUnifiedForm';
import FormHeader from './FormHeader';
import StepRenderer from './StepRenderer';
import FormSteps from './FormSteps';

interface UnifiedTravelFormProps {
  type: 'consultation' | 'visa-application' | 'package-booking';
  preSelectedPackage?: string;
  title?: string;
  onComplete?: () => void;
}

const UnifiedTravelForm = ({ type, preSelectedPackage, title, onComplete }: UnifiedTravelFormProps) => {
  const {
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
  } = useUnifiedForm(type, preSelectedPackage, onComplete);

  useEffect(() => {
    trackActivity('form_start', { form_type: type });
    
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', crypto.randomUUID());
    }
  }, [type, trackActivity]);

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
          onTravelNeedsChange={handleTravelNeedsChange}
          onPackageSelection={handlePackageSelection}
        />
        
        <FormSteps
          currentStep={currentStep}
          totalSteps={totalSteps}
          isStepValid={isStepValid()}
          onNext={handleNext}
          onPrev={handlePrev}
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
