
import React from 'react';
import { checkEnhancedVisaRequirement } from '@/utils/enhancedVisaRequirements';
import NoVisaRequiredResult from './NoVisaRequiredResult';
import VisaRequiredResult from './VisaRequiredResult';

interface EnhancedVisaResultsProps {
  wizardData: {
    destination: string;
    nationality: string;
    purpose: string;
    duration: string;
  };
  onReset: () => void;
}

const EnhancedVisaResults = ({ wizardData, onReset }: EnhancedVisaResultsProps) => {
  const visaResult = checkEnhancedVisaRequirement(
    wizardData.nationality,
    wizardData.destination,
    wizardData.purpose,
    wizardData.duration
  );

  if (!visaResult.required && visaResult.showPackages) {
    return (
      <NoVisaRequiredResult
        nationality={wizardData.nationality}
        destination={wizardData.destination}
        message={visaResult.message}
        maxStayDays={visaResult.maxStayDays || 90}
        onReset={onReset}
      />
    );
  }

  return (
    <VisaRequiredResult
      nationality={wizardData.nationality}
      destination={wizardData.destination}
      message={visaResult.message}
      visaType={visaResult.type}
      isSchengen={visaResult.isSchengen || false}
      nationalVisaCategories={visaResult.nationalVisaCategories}
      regionalMovement={visaResult.regionalMovement}
      onReset={onReset}
    />
  );
};

export default EnhancedVisaResults;
