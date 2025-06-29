
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send, 
  CheckCircle,
  Sparkles,
  Loader2
} from 'lucide-react';

// Components
import PersonalInfoStep from './steps/PersonalInfoStep';
import TravelDetailsStep from './steps/TravelDetailsStep';
import DocumentsStep from './steps/DocumentsStep';
import BiometricsStep from './steps/BiometricsStep';
import ReviewStep from './steps/ReviewStep';

// Hooks
import { useVisaIntelligence } from './hooks/useVisaIntelligence';
import { useApplicationProgress } from './hooks/useApplicationProgress';

export interface ApplicationData {
  // Personal Information
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
  accommodationDetails: string;
  
  // Dynamic fields for intelligent questions
  dynamicFields: Record<string, any>;
  
  // Application meta
  visaType: string;
  applicationReference?: string;
}

const STEPS = [
  { title: 'Personal Info', description: 'Basic details' },
  { title: 'Travel Details', description: 'Trip information' },
  { title: 'Documents', description: 'Required documents' },
  { title: 'Biometrics', description: 'Appointment booking' },
  { title: 'Review', description: 'Final review' }
];

const IntelligentVisaForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    destination: '',
    travelPurpose: 'tourism',
    departureDate: '',
    returnDate: '',
    accommodationDetails: '',
    dynamicFields: {},
    visaType: ''
  });

  // Hooks
  const { dynamicQuestions, analyzeFormData } = useVisaIntelligence(formData);
  const { saveProgress, loadProgress, isAutoSaving } = useApplicationProgress(user?.id);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress) {
      setFormData(savedProgress.formData);
      setCurrentStep(savedProgress.currentStep);
      
      toast({
        title: "Progress Restored",
        description: "Your previous application progress has been loaded."
      });
    }
  }, [loadProgress, toast]);

  // Auto-save progress
  useEffect(() => {
    if (user?.id && Object.keys(formData).some(key => formData[key as keyof ApplicationData])) {
      const timeoutId = setTimeout(() => {
        saveProgress(formData, currentStep);
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [formData, currentStep, user?.id, saveProgress]);

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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && 
                 formData.phone && formData.nationality && formData.passportNumber);
      case 2:
        return !!(formData.destination && formData.travelPurpose && 
                 formData.departureDate);
      case 3:
      case 4:
        return true; // Documents and biometrics are optional at this stage
      case 5:
        return validateStep(1) && validateStep(2);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const determineVisaType = (data: ApplicationData): string => {
    const { destination, travelPurpose, nationality } = data;
    
    // Simple visa type determination logic
    if (destination.toLowerCase().includes('schengen') || 
        ['germany', 'france', 'italy', 'spain', 'netherlands'].some(country => 
          destination.toLowerCase().includes(country.toLowerCase()))) {
      return 'Schengen Tourist Visa';
    }
    
    if (destination.toLowerCase().includes('uk') || destination.toLowerCase().includes('united kingdom')) {
      return 'UK Visitor Visa';
    }
    
    if (destination.toLowerCase().includes('usa') || destination.toLowerCase().includes('united states')) {
      return 'US Tourist Visa (B-2)';
    }
    
    return `${destination} ${travelPurpose === 'tourism' ? 'Tourist' : 'Visitor'} Visa`;
  };

  const saveToDatabase = async (isDraft = false) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your application.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const visaType = determineVisaType(formData);
      const applicationData = {
        user_id: user.id,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        nationality: formData.nationality,
        visa_type: visaType,
        travel_purpose: formData.travelPurpose,
        departure_date: formData.departureDate || null,
        return_date: formData.returnDate || null,
        status: isDraft ? 'draft' : 'submitted',
        application_data: {
          personalInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            passportNumber: formData.passportNumber,
            passportExpiry: formData.passportExpiry
          },
          travelDetails: {
            destination: formData.destination,
            accommodationDetails: formData.accommodationDetails
          },
          dynamicFields: formData.dynamicFields
        },
        submitted_at: isDraft ? null : new Date().toISOString()
      };

      let result;
      if (applicationId) {
        // Update existing application
        result = await supabase
          .from('visa_applications')
          .update(applicationData)
          .eq('id', applicationId)
          .eq('user_id', user.id)
          .select()
          .single();
      } else {
        // Create new application
        result = await supabase
          .from('visa_applications')
          .insert(applicationData)
          .select()
          .single();
      }

      if (result.error) throw result.error;
      
      if (!applicationId) {
        setApplicationId(result.data.id);
        setFormData(prev => ({
          ...prev,
          applicationReference: result.data.application_reference
        }));
      }

      return true;
    } catch (error) {
      console.error('Error saving application:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save application. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    const success = await saveToDatabase(true);
    if (success) {
      toast({
        title: "Draft Saved",
        description: "Your application has been saved as a draft."
      });
    }
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast({
        title: "Incomplete Application",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const success = await saveToDatabase(false);
    
    if (success) {
      // Analyze the application for AI insights
      await analyzeFormData();
      
      toast({
        title: "Application Submitted!",
        description: "Your visa application has been submitted successfully. You'll receive updates via email.",
        duration: 5000
      });

      // Clear saved progress
      sessionStorage.removeItem(`visa_application_progress_${user?.id}`);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
    
    setIsSubmitting(false);
  };

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            onInputChange={handleInputChange}
            dynamicQuestions={dynamicQuestions}
            onDynamicFieldChange={handleDynamicFieldChange}
          />
        );
      case 2:
        return (
          <TravelDetailsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <DocumentsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <BiometricsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <ReviewStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Intelligent Visa Application</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered form adapts to your specific needs, asking only relevant questions 
            and providing personalized guidance throughout the process.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
            </h2>
            <div className="flex items-center space-x-2">
              {isAutoSaving && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Saving...</span>
                </div>
              )}
              <Badge variant="outline">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">{STEPS[currentStep - 1].description}</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Save Draft</span>
            </Button>

            {currentStep === STEPS.length ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !validateStep(5)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>Submit Application</span>
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Application Reference */}
        {formData.applicationReference && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Application Reference: <span className="font-mono font-semibold">{formData.applicationReference}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligentVisaForm;
