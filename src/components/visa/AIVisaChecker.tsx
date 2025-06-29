
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StepIndicator from './ai-checker/StepIndicator';
import NationalityStep from './ai-checker/NationalityStep';
import LocationStep from './ai-checker/LocationStep';
import USAVisaStatusStep from './ai-checker/USAVisaStatusStep';
import TravelDetailsStep from './ai-checker/TravelDetailsStep';
import AIResultsStep from './ai-checker/AIResultsStep';

const AIVisaChecker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Form data
  const [nationality, setNationality] = useState('');
  const [applyingFrom, setApplyingFrom] = useState('');
  const [usaVisaStatus, setUsaVisaStatus] = useState('');
  const [travelPurpose, setTravelPurpose] = useState('');
  const [duration, setDuration] = useState('');

  const getStepTitles = () => {
    const baseSteps = ['Nationality', 'Location'];
    if (applyingFrom === 'USA') {
      baseSteps.push('USA Status');
    }
    baseSteps.push('Travel', 'Results');
    return baseSteps;
  };

  const getTotalSteps = () => {
    return applyingFrom === 'USA' ? 5 : 4;
  };

  const handleNext = () => {
    if (currentStep < getTotalSteps() - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setNationality('');
    setApplyingFrom('');
    setUsaVisaStatus('');
    setTravelPurpose('');
    setDuration('');
    setResult(null);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setCurrentStep(getTotalSteps() - 1);

    try {
      const { data, error } = await supabase.functions.invoke('visa-eligibility-ai', {
        body: {
          nationality,
          applyingFrom,
          usaVisaStatus: applyingFrom === 'USA' ? usaVisaStatus : undefined,
          travelPurpose,
          duration
        }
      });

      if (error) throw error;
      setResult(data);
    } catch (error) {
      console.error('Error analyzing visa eligibility:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    if (applyingFrom === 'USA') {
      // USA flow: Nationality -> Location -> USA Status -> Travel -> Results
      switch (currentStep) {
        case 0:
          return (
            <NationalityStep
              nationality={nationality}
              onSelect={setNationality}
              onNext={handleNext}
            />
          );
        case 1:
          return (
            <LocationStep
              applyingFrom={applyingFrom}
              onSelect={setApplyingFrom}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 2:
          return (
            <USAVisaStatusStep
              usaVisaStatus={usaVisaStatus}
              onSelect={setUsaVisaStatus}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 3:
          return (
            <TravelDetailsStep
              travelPurpose={travelPurpose}
              duration={duration}
              onSelectPurpose={setTravelPurpose}
              onSelectDuration={setDuration}
              onNext={handleAnalyze}
              onBack={handleBack}
            />
          );
        case 4:
          return (
            <AIResultsStep
              result={result}
              loading={loading}
              onBack={handleBack}
              onStartOver={handleStartOver}
            />
          );
        default:
          return null;
      }
    } else {
      // Non-USA flow: Nationality -> Location -> Travel -> Results
      switch (currentStep) {
        case 0:
          return (
            <NationalityStep
              nationality={nationality}
              onSelect={setNationality}
              onNext={handleNext}
            />
          );
        case 1:
          return (
            <LocationStep
              applyingFrom={applyingFrom}
              onSelect={setApplyingFrom}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        case 2:
          return (
            <TravelDetailsStep
              travelPurpose={travelPurpose}
              duration={duration}
              onSelectPurpose={setTravelPurpose}
              onSelectDuration={setDuration}
              onNext={handleAnalyze}
              onBack={handleBack}
            />
          );
        case 3:
          return (
            <AIResultsStep
              result={result}
              loading={loading}
              onBack={handleBack}
              onStartOver={handleStartOver}
            />
          );
        default:
          return null;
      }
    }
  };

  if (!isOpen) {
    return (
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
            <CardContent className="relative p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Visa Eligibility Check
              </h2>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Get instant, personalized visa guidance powered by artificial intelligence. 
                Know your eligibility in under 2 minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>USA visa status check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Instant AI analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Personalized requirements</span>
                </div>
              </div>
              <Button 
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Check My Eligibility
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="relative">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Visa Eligibility Check</h2>
            </div>

            <StepIndicator
              currentStep={currentStep}
              totalSteps={getTotalSteps()}
              stepTitles={getStepTitles()}
            />

            {renderCurrentStep()}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIVisaChecker;
