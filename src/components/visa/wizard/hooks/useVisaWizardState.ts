
import { useState } from 'react';
import { useVisaWizardData } from './useVisaWizardData';

export const useVisaWizardState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    wizardData,
    updateWizardData,
    resetWizardData,
    getMaxSteps,
    canProceed,
    isComplete
  } = useVisaWizardData();

  const nextStep = () => {
    if (currentStep < getMaxSteps()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    resetWizardData();
  };

  return {
    currentStep,
    setCurrentStep,
    wizardData,
    updateWizardData,
    resetWizardData,
    getMaxSteps,
    canProceed,
    isComplete,
    nextStep,
    prevStep,
    resetWizard
  };
};
