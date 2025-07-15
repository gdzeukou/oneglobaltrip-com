
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useUserAgent } from '@/hooks/useUserAgent';

interface FormStepsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  type: 'consultation' | 'visa-application' | 'package-booking';
  isSubmitting?: boolean;
  errors?: Record<string, string>;
}

const FormSteps = ({ 
  currentStep, 
  totalSteps, 
  isStepValid, 
  onNext, 
  onPrev, 
  onSubmit, 
  type,
  isSubmitting = false,
  errors = {}
}: FormStepsProps) => {
  const { agent } = useUserAgent();
  
  const handleNext = () => {
    console.log('FormSteps: Next button clicked, isStepValid:', isStepValid, 'errors:', errors);
    if (!isStepValid) {
      console.log('FormSteps: Step validation failed, showing errors');
      return;
    }
    console.log('FormSteps: Calling onNext');
    onNext();
  };

  const handlePrev = () => {
    console.log('FormSteps: Previous button clicked');
    onPrev();
  };

  const handleSubmit = () => {
    console.log('FormSteps: Submit button clicked, isSubmitting:', isSubmitting);
    if (isSubmitting) return;
    onSubmit();
  };

  // Show validation errors
  const hasErrors = Object.keys(errors).length > 0;
  
  return (
    <div className="space-y-4">
      {/* Error Summary */}
      {hasErrors && !isStepValid && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between pt-6 mt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={!isStepValid}
            className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center space-x-2 ${
              !isStepValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid || isSubmitting}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold flex items-center space-x-2"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>
              {isSubmitting ? 'Submitting...' : (
                type === 'package-booking' 
                  ? 'Confirm Booking ($0 Down)' 
                  : `Tell "${agent?.name || 'AI Travel Agent'}" to Plan this Trip for You`
              )}
            </span>
          </Button>
        )}
      </div>

      {/* Step indicator */}
      <div className="flex justify-center space-x-2 pt-4">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-colors ${
              i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FormSteps;
