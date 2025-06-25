
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Globe, Users, Calendar, MapPin } from 'lucide-react';
import CountrySelector from './steps/CountrySelector';
import NationalitySelector from './steps/NationalitySelector';
import PurposeSelector from './steps/PurposeSelector';
import DurationSelector from './steps/DurationSelector';
import VisaResults from './results/VisaResults';

interface WizardData {
  destination: string;
  nationality: string;
  purpose: string;
  duration: string;
}

const VisaWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    destination: '',
    nationality: '',
    purpose: '',
    duration: ''
  });

  const updateWizardData = (field: keyof WizardData, value: string) => {
    setWizardData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
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
    setWizardData({ destination: '', nationality: '', purpose: '', duration: '' });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return wizardData.destination !== '';
      case 2: return wizardData.nationality !== '';
      case 3: return wizardData.purpose !== '';
      case 4: return wizardData.duration !== '';
      default: return false;
    }
  };

  const isComplete = wizardData.destination && wizardData.nationality && wizardData.purpose && wizardData.duration;

  const steps = [
    { number: 1, title: 'Destination', icon: MapPin, completed: wizardData.destination !== '' },
    { number: 2, title: 'Nationality', icon: Globe, completed: wizardData.nationality !== '' },
    { number: 3, title: 'Purpose', icon: Users, completed: wizardData.purpose !== '' },
    { number: 4, title: 'Duration', icon: Calendar, completed: wizardData.duration !== '' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visa Wizard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find out instantly if you need a visa for your destination. Get personalized requirements and start your application in minutes.
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
              {!isComplete ? (
                <>
                  {/* Step Content */}
                  <div className="mb-8">
                    {currentStep === 1 && (
                      <CountrySelector
                        value={wizardData.destination}
                        onChange={(value) => updateWizardData('destination', value)}
                      />
                    )}
                    {currentStep === 2 && (
                      <NationalitySelector
                        value={wizardData.nationality}
                        onChange={(value) => updateWizardData('nationality', value)}
                      />
                    )}
                    {currentStep === 3 && (
                      <PurposeSelector
                        value={wizardData.purpose}
                        onChange={(value) => updateWizardData('purpose', value)}
                      />
                    )}
                    {currentStep === 4 && (
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
                      Step {currentStep} of 4
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
                <VisaResults 
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
