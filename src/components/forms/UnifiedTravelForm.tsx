
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
    <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm relative overflow-hidden group">
      {/* Enhanced gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <FormHeader
        type={type}
        title={title}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
      
      <CardContent className="relative z-10 p-8">
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
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          type={type}
          isSubmitting={isSubmitting}
        />

        <div className="text-center mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
          <p className="text-sm text-green-700 font-medium flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>No credit card required • Free consultation • Response within 24 hours</span>
          </p>
        </div>
      </CardContent>
      
      {/* Hover shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
    </Card>
  );
};

export default UnifiedTravelForm;
