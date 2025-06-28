
import React from 'react';
import WizardStepManager from './WizardStepManager';
import { WizardData } from '../hooks/useVisaWizardData';

interface WizardStepContentProps {
  currentStep: number;
  wizardData: WizardData;
  onUpdateData: (field: keyof WizardData, value: any) => void;
}

const WizardStepContent = ({ currentStep, wizardData, onUpdateData }: WizardStepContentProps) => {
  return (
    <WizardStepManager
      currentStep={currentStep}
      wizardData={wizardData}
      onUpdateData={onUpdateData}
    />
  );
};

export default WizardStepContent;
