
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Globe, Users, Calendar, MapPin, Route } from 'lucide-react';
import CountrySelector from './steps/CountrySelector';
import MultiDestinationSelector from './steps/MultiDestinationSelector';
import MultiDestinationCountrySelector from './steps/MultiDestinationCountrySelector';
import NationalitySelector from './steps/NationalitySelector';
import PurposeSelector from './steps/PurposeSelector';
import DurationSelector from './steps/DurationSelector';
import VisaResults from './results/VisaResults';
import MultiDestinationResults from './results/MultiDestinationResults';

interface Destination {
  country: string;
  purpose: string;
}

interface WizardData {
  tripType: string;
  destination: string;
  destinations: Destination[];
  nationality: string;
  purpose: string;
  duration: string;
}

const VisaWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const canProceed = () => {
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

  const getSteps = () => {
    const baseSteps = [
      { number: 1, title: 'Trip Type', icon: Route, completed: wizardData.tripType !== '' },
    ];

    if (wizardData.tripType === 'multiple') {
      return [
        ...baseSteps,
        { number: 2, title: 'Destinations', icon: MapPin, completed: wizardData.destinations.length > 0 && wizardData.destinations.every(d => d.country && d.purpose) },
        { number: 3, title: 'Nationality', icon: Globe, completed: wizardData.nationality !== '' },
      ];
    }

    return [
      ...baseSteps,
      { number: 2, title: 'Destination', icon: MapPin, completed: wizardData.destination !== '' },
      { number: 3, title: 'Nationality', icon: Globe, completed: wizardData.nationality !== '' },
      { number: 4, title: 'Purpose', icon: Users, completed: wizardData.purpose !== '' },
      { number: 5, title: 'Duration', icon: Calendar, completed: wizardData.duration !== '' },
    ];
  };

  const steps = getSteps();

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
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-6">Your Progress</h3>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = step.number === currentStep;
                  const isCompleted = step.completed;
                  
                  return (
                    <div
                      key={step.number}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-100 border-2 border-blue-500' 
                          : isCompleted 
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                        ${isActive 
                          ? 'bg-blue-500 text-white' 
                          : isCompleted 
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }
                      `}>
                        {isCompleted && !isActive ? '✓' : step.number}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isActive ? 'text-blue-900' : isCompleted ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {step.title}
                        </div>
                      </div>
                      <StepIcon className={`w-4 h-4 ${
                        isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8 min-h-[500px]">
              {!isComplete() ? (
                <>
                  {/* Step Content */}
                  <div className="mb-8">
                    {currentStep === 1 && (
                      <MultiDestinationSelector
                        value={wizardData.tripType}
                        onChange={(value) => updateWizardData('tripType', value)}
                      />
                    )}
                    {currentStep === 2 && wizardData.tripType === 'single' && (
                      <CountrySelector
                        value={wizardData.destination}
                        onChange={(value) => updateWizardData('destination', value)}
                      />
                    )}
                    {currentStep === 2 && wizardData.tripType === 'multiple' && (
                      <MultiDestinationCountrySelector
                        destinations={wizardData.destinations}
                        onChange={(value) => updateWizardData('destinations', value)}
                      />
                    )}
                    {((currentStep === 3 && wizardData.tripType === 'multiple') || 
                      (currentStep === 3 && wizardData.tripType === 'single')) && (
                      <NationalitySelector
                        value={wizardData.nationality}
                        onChange={(value) => updateWizardData('nationality', value)}
                      />
                    )}
                    {currentStep === 4 && wizardData.tripType === 'single' && (
                      <PurposeSelector
                        value={wizardData.purpose}
                        onChange={(value) => updateWizardData('purpose', value)}
                      />
                    )}
                    {currentStep === 5 && wizardData.tripType === 'single' && (
                      <DurationSelector
                        value={wizardData.duration}
                        onChange={(value) => updateWizardData('duration', value)}
                      />
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2"
                    >
                      <span>← Previous</span>
                    </Button>
                    
                    <div className="text-sm text-gray-500">
                      Step {currentStep} of {getMaxSteps()}
                    </div>

                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {wizardData.tripType === 'multiple' ? (
                    <MultiDestinationResults
                      nationality={wizardData.nationality}
                      destinations={wizardData.destinations}
                      onReset={resetWizard}
                    />
                  ) : (
                    <VisaResults 
                      wizardData={wizardData} 
                      onReset={resetWizard}
                    />
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaWizard;
