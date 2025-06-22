
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormStepsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  type: 'consultation' | 'visa-application' | 'package-booking';
}

const FormSteps = ({ 
  currentStep, 
  totalSteps, 
  isStepValid, 
  onNext, 
  onPrev, 
  onSubmit, 
  type 
}: FormStepsProps) => {
  return (
    <div className="flex justify-between pt-6 mt-6 border-t">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="flex items-center space-x-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNext}
          disabled={!isStepValid}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={!isStepValid}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold flex items-center space-x-2"
        >
          {type === 'package-booking' ? 'Confirm Booking ($0 Down)' : 'Submit Request'}
        </Button>
      )}
    </div>
  );
};

export default FormSteps;
