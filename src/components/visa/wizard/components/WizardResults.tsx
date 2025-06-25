
import React from 'react';
import VisaResults from '../results/VisaResults';
import EnhancedVisaResults from '../results/EnhancedVisaResults';
import MultiDestinationResults from '../results/MultiDestinationResults';
import { WizardData } from '../hooks/useVisaWizardData';

interface WizardResultsProps {
  wizardData: WizardData;
  onReset: () => void;
}

const WizardResults = ({ wizardData, onReset }: WizardResultsProps) => {
  if (wizardData.tripType === 'multiple') {
    return (
      <MultiDestinationResults
        nationality={wizardData.nationality}
        destinations={wizardData.destinations}
        onReset={onReset}
      />
    );
  }

  // Use enhanced results for single destination trips
  return (
    <EnhancedVisaResults 
      wizardData={wizardData} 
      onReset={onReset}
    />
  );
};

export default WizardResults;
