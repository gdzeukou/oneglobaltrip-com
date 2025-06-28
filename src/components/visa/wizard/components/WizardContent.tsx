
import React from 'react';
import WizardStepContent from './WizardStepContent';
import WizardNavigation from './WizardNavigation';
import WizardResults from './WizardResults';

interface WizardContentProps {
  isComplete: boolean;
  currentStep: number;
  wizardData: any;
  onUpdateData: (field: string, value: any) => void;
  maxSteps: number;
  canProceed: boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onReset: () => void;
}

const WizardContent = ({
  isComplete,
  currentStep,
  wizardData,
  onUpdateData,
  maxSteps,
  canProceed,
  onPrevStep,
  onNextStep,
  onReset
}: WizardContentProps) => {
  if (isComplete) {
    return (
      <WizardResults 
        wizardData={wizardData}
        onReset={onReset}
      />
    );
  }

  return (
    <>
      <WizardStepContent
        currentStep={currentStep}
        wizardData={wizardData}
        onUpdateData={onUpdateData}
      />

      <WizardNavigation
        currentStep={currentStep}
        maxSteps={maxSteps}
        canProceed={canProceed}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
      />
    </>
  );
};

export default WizardContent;
