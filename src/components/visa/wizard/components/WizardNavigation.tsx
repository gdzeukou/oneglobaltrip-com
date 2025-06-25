
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  maxSteps: number;
  canProceed: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const WizardNavigation = ({ 
  currentStep, 
  maxSteps, 
  canProceed, 
  onPrevStep, 
  onNextStep 
}: WizardNavigationProps) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className="flex items-center space-x-2"
      >
        <span>← Previous</span>
      </Button>
      
      <div className="text-sm text-gray-500">
        Step {currentStep} of {maxSteps}
      </div>

      <Button
        onClick={onNextStep}
        disabled={!canProceed}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default WizardNavigation;
