
import React from 'react';
import { WizardData } from '../hooks/useVisaWizardData';
import StepTripType from '../steps/StepTripType';
import StepDestination from '../steps/StepDestination';
import StepNationality from '../steps/StepNationality';
import StepPurpose from '../steps/StepPurpose';
import StepDuration from '../steps/StepDuration';

interface WizardStepManagerProps {
  currentStep: number;
  wizardData: WizardData;
  onUpdateData: (field: keyof WizardData, value: any) => void;
}

const WizardStepManager = ({ currentStep, wizardData, onUpdateData }: WizardStepManagerProps) => {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepTripType
            value={wizardData.tripType}
            onChange={(value) => onUpdateData('tripType', value)}
          />
        );
      case 2:
        return (
          <StepDestination
            tripType={wizardData.tripType}
            destination={wizardData.destination}
            destinations={wizardData.destinations}
            onDestinationChange={(value) => onUpdateData('destination', value)}
            onDestinationsChange={(value) => onUpdateData('destinations', value)}
          />
        );
      case 3:
        return (
          <StepNationality
            value={wizardData.nationality}
            onChange={(value) => onUpdateData('nationality', value)}
          />
        );
      case 4:
        if (wizardData.tripType === 'single') {
          return (
            <StepPurpose
              value={wizardData.purpose}
              onChange={(value) => onUpdateData('purpose', value)}
            />
          );
        }
        return null;
      case 5:
        if (wizardData.tripType === 'single') {
          return (
            <StepDuration
              value={wizardData.duration}
              onChange={(value) => onUpdateData('duration', value)}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return <div className="mb-8">{renderStep()}</div>;
};

export default WizardStepManager;
