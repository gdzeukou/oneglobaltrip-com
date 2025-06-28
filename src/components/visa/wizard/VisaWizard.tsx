
import React from 'react';
import { useVisaWizardState } from './hooks/useVisaWizardState';
import WizardHeader from './components/WizardHeader';
import WizardLayout from './components/WizardLayout';
import WizardContent from './components/WizardContent';

const VisaWizard = () => {
  const {
    currentStep,
    wizardData,
    updateWizardData,
    getMaxSteps,
    canProceed,
    isComplete,
    nextStep,
    prevStep,
    resetWizard
  } = useVisaWizardState();

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <WizardHeader />

        <WizardLayout
          currentStep={currentStep}
          tripType={wizardData.tripType}
          destination={wizardData.destination}
          destinations={wizardData.destinations}
          nationality={wizardData.nationality}
          purpose={wizardData.purpose}
          duration={wizardData.duration}
        >
          <WizardContent
            isComplete={Boolean(isComplete())}
            currentStep={currentStep}
            wizardData={wizardData}
            onUpdateData={updateWizardData}
            maxSteps={getMaxSteps()}
            canProceed={canProceed(currentStep)}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            onReset={resetWizard}
          />
        </WizardLayout>
      </div>
    </section>
  );
};

export default VisaWizard;
