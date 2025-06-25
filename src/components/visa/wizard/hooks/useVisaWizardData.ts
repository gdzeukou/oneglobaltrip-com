
import { useState } from 'react';

interface Destination {
  country: string;
  purpose: string;
}

export interface WizardData {
  tripType: string;
  destination: string;
  destinations: Destination[];
  nationality: string;
  purpose: string;
  duration: string;
}

export const useVisaWizardData = () => {
  const [wizardData, setWizardData] = useState<WizardData>({
    tripType: '',
    destination: '',
    destinations: [{ country: '', purpose: 'tourism' }],
    nationality: '',
    purpose: '',
    duration: ''
  });

  const updateWizardData = (field: keyof WizardData, value: any) => {
    setWizardData(prev => ({ ...prev, [field]: value }));
  };

  const resetWizardData = () => {
    setWizardData({ 
      tripType: '',
      destination: '', 
      destinations: [{ country: '', purpose: 'tourism' }],
      nationality: '', 
      purpose: '', 
      duration: '' 
    });
  };

  const getMaxSteps = () => {
    return wizardData.tripType === 'multiple' ? 4 : 5;
  };

  const canProceed = (currentStep: number) => {
    switch (currentStep) {
      case 1: return wizardData.tripType !== '';
      case 2: 
        if (wizardData.tripType === 'multiple') {
          return wizardData.destinations.length > 0 && wizardData.destinations.every(d => d.country && d.purpose);
        }
        return wizardData.destination !== '';
      case 3: return wizardData.nationality !== '';
      case 4: 
        if (wizardData.tripType === 'multiple') {
          return true; // Skip purpose/duration for multi-destination
        }
        return wizardData.purpose !== '';
      case 5: return wizardData.duration !== '';
      default: return false;
    }
  };

  const isComplete = () => {
    if (wizardData.tripType === 'multiple') {
      return wizardData.tripType && 
             wizardData.destinations.length > 0 && 
             wizardData.destinations.every(d => d.country && d.purpose) && 
             wizardData.nationality;
    }
    return wizardData.destination && wizardData.nationality && wizardData.purpose && wizardData.duration;
  };

  return {
    wizardData,
    updateWizardData,
    resetWizardData,
    getMaxSteps,
    canProceed,
    isComplete
  };
};
