
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Shield, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoStep from './steps/PersonalInfoStep';
import TravelDetailsStep from './steps/TravelDetailsStep';
import DocumentsStep from './steps/DocumentsStep';
import BiometricsStep from './steps/BiometricsStep';
import ReviewStep from './steps/ReviewStep';
import { useVisaIntelligence } from './hooks/useVisaIntelligence';
import { useApplicationProgress } from './hooks/useApplicationProgress';

export interface ApplicationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  
  // Travel Details
  destination: string;
  travelPurpose: string;
  departureDate: string;
  returnDate: string;
  duration: number;
  previousVisas: string[];
  
  // Additional Info
  employmentStatus: string;
  monthlyIncome: string;
  accommodationDetails: string;
  travelHistory: string;
  
  // Dynamic fields based on visa type
  dynamicFields: Record<string, any>;
}

const IntelligentVisaForm = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    destination: '',
    travelPurpose: '',
    departureDate: '',
    returnDate: '',
    duration: 0,
    previousVisas: [],
    employmentStatus: '',
    monthlyIncome: '',
    accommodationDetails: '',
    travelHistory: '',
    dynamicFields: {}
  });

  // Get intelligence and progress hooks
  const {
    recommendedVisaType,
    requiredDocuments,
    biometricRequired,
    estimatedProcessingTime,
    applicableDeals,
    dynamicQuestions,
    isLoading: intelligenceLoading
  } = useVisaIntelligence(formData);

  const {
    saveProgress,
    loadProgress,
    getCompletionPercentage,
    isAutoSaving
  } = useApplicationProgress(user?.id);

  // Load saved progress on mount
  useEffect(() => {
    if (user) {
      const savedData = loadProgress();
      if (savedData) {
        setFormData(savedData.formData);
        setCurrentStep(savedData.currentStep);
        toast({
          title: "Welcome back!",
          description: "We've restored your application progress.",
        });
      } else {
        // Pre-fill from user profile
        setFormData(prev => ({
          ...prev,
          firstName: user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.last_name || '',
          email: user.email || '',
          nationality: user.user_metadata?.nationality || ''
        }));
      }
    }
  }, [user, loadProgress, toast]);

  // Auto-save progress
  useEffect(() => {
    if (user && (formData.firstName || formData.email)) {
      saveProgress(formData, currentStep);
    }
  }, [formData, currentStep, user, saveProgress]);

  // Get originating intent from session storage
  useEffect(() => {
    const originatingIntent = sessionStorage.getItem('visa_application_intent');
    if (originatingIntent) {
      const intent = JSON.parse(originatingIntent);
      setFormData(prev => ({
        ...prev,
        destination: intent.destination || prev.destination,
        travelPurpose: intent.purpose || prev.travelPurpose
      }));
      sessionStorage.removeItem('visa_application_intent');
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to start your visa application. We'll save your progress and personalize your experience.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    { title: 'Personal Info', icon: '👤' },
    { title: 'Travel Details', icon: '✈️' },
    { title: 'Documents', icon: '📄' },
    ...(biometricRequired ? [{ title: 'Biometrics', icon: '🔒' }] : []),
    { title: 'Review', icon: '✅' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDynamicFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        [field]: value
      }
    }));
  };

  const renderCurrentStep = () => {
    const stepIndex = biometricRequired ? currentStep : currentStep >= 3 ? currentStep + 1 : currentStep;
    
    switch (stepIndex) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            onInputChange={handleInputChange}
            dynamicQuestions={dynamicQuestions.personal}
            onDynamicFieldChange={handleDynamicFieldChange}
          />
        );
      case 1:
        return (
          <TravelDetailsStep
            formData={formData}
            onInputChange={handleInputChange}
            recommendedVisaType={recommendedVisaType}
            dynamicQuestions={dynamicQuestions.travel}
            onDynamicFieldChange={handleDynamicFieldChange}
          />
        );
      case 2:
        return (
          <DocumentsStep
            formData={formData}
            onInputChange={handleInputChange}
            requiredDocuments={requiredDocuments}
            dynamicQuestions={dynamicQuestions.documents}
            onDynamicFieldChange={handleDynamicFieldChange}
          />
        );
      case 3:
        return biometricRequired ? (
          <BiometricsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        ) : (
          <ReviewStep
            formData={formData}
            recommendedVisaType={recommendedVisaType}
            requiredDocuments={requiredDocuments}
            estimatedProcessingTime={estimatedProcessingTime}
            applicableDeals={applicableDeals}
          />
        );
      case 4:
        return (
          <ReviewStep
            formData={formData}
            recommendedVisaType={recommendedVisaType}
            requiredDocuments={requiredDocuments}
            estimatedProcessingTime={estimatedProcessingTime}
            applicableDeals={applicableDeals}
          />
        );
      default:
        return null;
    }
  };

  const completionPercentage = getCompletionPercentage(formData, currentStep, steps.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Intelligent Visa Application</h1>
                  <p className="text-gray-600">Personalized for your journey</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-lg font-semibold text-blue-600">{completionPercentage}%</div>
              </div>
            </div>
            
            <Progress value={completionPercentage} className="mb-4" />
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                {recommendedVisaType && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <MapPin className="h-4 w-4" />
                    <span>{recommendedVisaType.name}</span>
                  </div>
                )}
                {estimatedProcessingTime && (
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Clock className="h-4 w-4" />
                    <span>{estimatedProcessingTime}</span>
                  </div>
                )}
              </div>
              {isAutoSaving && (
                <span className="text-gray-500">Saving...</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Steps Navigation */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  index === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index < currentStep 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                }`}>
                  <span className="text-lg">{step.icon}</span>
                  <span className="font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 transition-all ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            {intelligenceLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your requirements...</p>
              </div>
            ) : (
              renderCurrentStep()
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === steps.length - 1 ? 'Submit Application' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntelligentVisaForm;
