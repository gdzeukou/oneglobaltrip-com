
import React from 'react';
import CountrySelector from '../steps/CountrySelector';
import MultiDestinationSelector from '../steps/MultiDestinationSelector';
import MultiDestinationCountrySelector from '../steps/MultiDestinationCountrySelector';
import NationalitySelector from '../steps/NationalitySelector';
import PurposeSelector from '../steps/PurposeSelector';
import DurationSelector from '../steps/DurationSelector';
import { WizardData } from '../hooks/useVisaWizardData';

interface WizardStepContentProps {
  currentStep: number;
  wizardData: WizardData;
  onUpdateData: (field: keyof WizardData, value: any) => void;
}

const WizardStepContent = ({ currentStep, wizardData, onUpdateData }: WizardStepContentProps) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <MultiDestinationSelector
            value={wizardData.tripType}
            onChange={(value) => onUpdateData('tripType', value)}
          />
        );
      case 2:
        if (wizardData.tripType === 'single') {
          return (
            <CountrySelector
              value={wizardData.destination}
              onChange={(value) => onUpdateData('destination', value)}
            />
          );
        }
        return (
          <MultiDestinationCountrySelector
            destinations={wizardData.destinations}
            onChange={(value) => onUpdateData('destinations', value)}
          />
        );
      case 3:
        return (
          <NationalitySelector
            value={wizardData.nationality}
            onChange={(value) => onUpdateData('nationality', value)}
          />
        );
      case 4:
        if (wizardData.tripType === 'single') {
          return (
            <PurposeSelector
              value={wizardData.purpose}
              onChange={(value) => onUpdateData('purpose', value)}
            />
          );
        }
        return null;
      case 5:
        if (wizardData.tripType === 'single') {
          return (
            <DurationSelector
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

  return <div className="mb-8">{renderStepContent()}</div>;
};

export default WizardStepContent;
