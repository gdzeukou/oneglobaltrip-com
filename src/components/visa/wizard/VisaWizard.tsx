
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useVisaWizardData } from './hooks/useVisaWizardData';
import WizardProgressSteps from './components/WizardProgressSteps';
import WizardNavigation from './components/WizardNavigation';
import WizardStepContent from './components/WizardStepContent';
import WizardResults from './components/WizardResults';

const VisaWizard = () => {
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

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Enhanced Visa Wizard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan single or multi-destination trips with confidence. Get personalized visa requirements, 
            transit guidance, and start your applications instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <WizardProgressSteps
              currentStep={currentStep}
              tripType={wizardData.tripType}
              destination={wizardData.destination}
              destinations={wizardData.destinations}
              nationality={wizardData.nationality}
              purpose={wizardData.purpose}
              duration={wizardData.duration}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8 min-h-[500px]">
              {!isComplete() ? (
                <>
                  <WizardStepContent
                    currentStep={currentStep}
                    wizardData={wizardData}
                    onUpdateData={updateWizardData}
                  />

                  <WizardNavigation
                    currentStep={currentStep}
                    maxSteps={getMaxSteps()}
                    canProceed={canProceed(currentStep)}
                    onPrevStep={prevStep}
                    onNextStep={nextStep}
                  />
                </>
              ) : (
                <WizardResults 
                  wizardData={wizardData}
                  onReset={resetWizard}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaWizard;
