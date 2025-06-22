import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PackageSelector from './PackageSelector';
import TravelNeedsSelector from './TravelNeedsSelector';
import FormSteps from './FormSteps';
import PersonalInfoStep from './PersonalInfoStep';
import TravelInfoStep from './TravelInfoStep';
import PreferencesStep from './PreferencesStep';
import ReviewStep from './ReviewStep';
import { supabase } from '@/integrations/supabase/client';

interface UnifiedTravelFormProps {
  type: 'consultation' | 'visa-application' | 'package-booking';
  preSelectedPackage?: string;
  title?: string;
  onComplete?: () => void;
}

const UnifiedTravelForm = ({ type, preSelectedPackage, title, onComplete }: UnifiedTravelFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    
    // Travel Details
    destination: '',
    travelDate: '',
    duration: '',
    travelers: '',
    budget: '',
    
    // Package Selection (for booking type)
    selectedPackages: preSelectedPackage ? [preSelectedPackage] : [] as string[],
    
    // Travel Needs (multi-select)
    travelNeeds: [] as string[],
    otherNeeds: '',
    
    // Additional Information
    specialRequests: '',
    
    // Visa specific (for visa applications)
    nationality: '',
    visaType: '',
    travelPurpose: 'tourism',
    departureDate: '',
    returnDate: ''
  });

  const totalSteps = type === 'package-booking' ? 4 : 3;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTravelNeedsChange = (need: string, checked: boolean) => {
    console.log('handleTravelNeedsChange called with:', { need, checked });
    setFormData(prev => ({
      ...prev,
      travelNeeds: checked 
        ? [...prev.travelNeeds, need]
        : prev.travelNeeds.filter(n => n !== need)
    }));
  };

  const handlePackageSelection = (packageId: string, checked: boolean) => {
    console.log('handlePackageSelection called with:', { packageId, checked });
    setFormData(prev => ({
      ...prev,
      selectedPackages: checked
        ? [...prev.selectedPackages, packageId]
        : prev.selectedPackages.filter(id => id !== packageId)
    }));
  };

  // Track user activity
  const trackActivity = async (actionType: string, actionData?: any) => {
    try {
      await supabase.from('user_activity').insert({
        email: formData.email || 'anonymous',
        page_visited: window.location.pathname,
        action_type: actionType,
        action_data: actionData,
        session_id: sessionStorage.getItem('session_id') || crypto.randomUUID(),
        is_online: true,
        last_seen: new Date().toISOString(),
        ip_address: 'unknown',
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  // Save form submission to database
  const saveFormSubmission = async () => {
    try {
      const submissionData = {
        form_type: type,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        destination: formData.destination,
        travel_date: formData.travelDate,
        duration: formData.duration,
        travelers: formData.travelers,
        budget: formData.budget,
        selected_packages: formData.selectedPackages,
        travel_needs: formData.travelNeeds,
        other_needs: formData.otherNeeds,
        special_requests: formData.specialRequests,
        visa_type: formData.visaType,
        travel_purpose: formData.travelPurpose,
        departure_date: formData.departureDate,
        return_date: formData.returnDate,
        ip_address: 'unknown',
        user_agent: navigator.userAgent,
        referrer: document.referrer
      };

      const { error } = await supabase
        .from('form_submissions')
        .insert([submissionData]);

      if (error) throw error;

      await trackActivity('form_submit', { form_type: type, submission_data: submissionData });
      
    } catch (error) {
      console.error('Error saving form submission:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      trackActivity('form_next_step', { step: currentStep + 1, form_type: type });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      trackActivity('form_prev_step', { step: currentStep - 1, form_type: type });
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await saveFormSubmission();

      // Send welcome email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            name: formData.name,
            email: formData.email,
            formType: type,
            destination: formData.destination,
            travelNeeds: formData.travelNeeds
          }
        });
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
      }

      console.log('Form submitted:', { type, formData });
      
      const messages = {
        'consultation': "Thank you! We'll contact you within 24 hours with personalized recommendations.",
        'visa-application': "Your visa application has been started! We'll review and contact you within 24 hours.",
        'package-booking': "Booking request submitted! We'll contact you within 24 hours to confirm details."
      };

      toast({
        title: "Request Submitted Successfully!",
        description: messages[type]
      });

      if (onComplete) {
        onComplete();
      } else {
        setTimeout(() => {
          navigate('/packages');
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    trackActivity('form_start', { form_type: type });
    
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', crypto.randomUUID());
    }
  }, []);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.email.trim() && formData.phone.trim();
      case 2:
        if (type === 'package-booking') {
          return formData.selectedPackages.length > 0;
        }
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            onInputChange={handleInputChange}
            type={type}
          />
        );

      case 2:
        if (type === 'package-booking') {
          return (
            <div className="space-y-6">
              <PackageSelector
                selectedPackages={formData.selectedPackages}
                onPackageSelection={(packageId: string, checked: string | boolean) => {
                  handlePackageSelection(packageId, Boolean(checked));
                }}
              />
              
              <TravelNeedsSelector
                selectedNeeds={formData.travelNeeds}
                otherNeeds={formData.otherNeeds}
                onNeedChange={(need: string, checked: string | boolean) => {
                  handleTravelNeedsChange(need, Boolean(checked));
                }}
                onOtherNeedsChange={(value) => handleInputChange('otherNeeds', value)}
              />
            </div>
          );
        } else {
          return (
            <TravelInfoStep
              formData={formData}
              onInputChange={handleInputChange}
            />
          );
        }

      case 3:
        if (type === 'package-booking') {
          return (
            <PreferencesStep
              formData={formData}
              onInputChange={handleInputChange}
            />
          );
        } else {
          return (
            <div className="space-y-4">
              <TravelNeedsSelector
                selectedNeeds={formData.travelNeeds}
                otherNeeds={formData.otherNeeds}
                onNeedChange={(need: string, checked: string | boolean) => {
                  handleTravelNeedsChange(need, Boolean(checked));
                }}
                onOtherNeedsChange={(value) => handleInputChange('otherNeeds', value)}
              />
              <PreferencesStep
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>
          );
        }

      case 4:
        return (
          <ReviewStep
            formData={formData}
            type={type}
          />
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    if (type === 'package-booking') {
      switch (currentStep) {
        case 1: return 'Personal Information';
        case 2: return 'Package Selection & Travel Needs';
        case 3: return 'Additional Preferences';
        case 4: return 'Payment & Confirmation';
        default: return '';
      }
    } else {
      switch (currentStep) {
        case 1: return 'Personal Information';
        case 2: return 'Travel Information';
        case 3: return 'Travel Preferences';
        default: return '';
      }
    }
  };

  const getFormTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'consultation':
        return 'Get Your Free Travel Consultation';
      case 'visa-application':
        return 'Start My Visa Application';
      case 'package-booking':
        return 'Start My Personalized Package Right Now';
      default:
        return 'Travel Request Form';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-2 border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="text-center">
          <CardTitle className="text-2xl mb-2">{getFormTitle()}</CardTitle>
          {type === 'consultation' && (
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-blue-100">Trusted by 10,000+ travelers</span>
            </div>
          )}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  i + 1 <= currentStep ? 'bg-yellow-400' : 'bg-blue-400'
                }`}
              />
            ))}
          </div>
          <p className="text-blue-100 mt-2">{getStepTitle()}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {renderStepContent()}
        
        <FormSteps
          currentStep={currentStep}
          totalSteps={totalSteps}
          isStepValid={isStepValid()}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          type={type}
          isSubmitting={isSubmitting}
        />

        <p className="text-sm text-gray-500 text-center mt-4">
          No credit card required • Free consultation • Response within 24 hours
        </p>
      </CardContent>
    </Card>
  );
};

export default UnifiedTravelForm;
