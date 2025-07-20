
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import StartTripStep1 from './StartTripStep1';
import StartTripStep2 from './StartTripStep2';
import StartTripStep3 from './StartTripStep3';
import StartTripStep4 from './StartTripStep4';
import StartTripStep5 from './StartTripStep5';
import { useNavigate } from 'react-router-dom';

interface FormData {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  
  // Trip Vision
  travelType: string;
  travelers: string;
  duration: string;
  
  // Destinations & Budget
  destinations: string[];
  budget: string;
  travelDates: string;
  
  // Interests
  interests: string[];
  travelStyle: string;
  
  // Special Requests
  specialRequests: string;
}

interface StartTripModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StartTripModal = ({ open, onOpenChange }: StartTripModalProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    travelType: '',
    travelers: '',
    duration: '',
    destinations: [],
    budget: '',
    travelDates: '',
    interests: [],
    travelStyle: '',
    specialRequests: ''
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Store form data and navigate to AI chat
    localStorage.setItem('tripPlanningData', JSON.stringify(formData));
    onOpenChange(false);
    navigate('/ai-chat');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.travelType && formData.travelers && formData.duration;
      case 3:
        return formData.destinations.length > 0 && formData.budget;
      case 4:
        return formData.interests.length > 0;
      case 5:
        return true; // Special requests are optional
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StartTripStep1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <StartTripStep2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <StartTripStep3 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <StartTripStep4 formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <StartTripStep5 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <DialogTitle className="sr-only">Plan Your Dream Trip</DialogTitle>
        <DialogDescription className="sr-only">
          Complete your travel preferences to get personalized trip recommendations
        </DialogDescription>
        
        {/* Header */}
        <div className="p-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Plan Your Dream Trip</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Step Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="animate-fade-in pb-6">
            {renderStep()}
          </div>
        </div>

        {/* Footer with Navigation */}
        <div className="p-6 pt-4 border-t bg-white/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center space-x-2"
              >
                <span>Complete & Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartTripModal;
