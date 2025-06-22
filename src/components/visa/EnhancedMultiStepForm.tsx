
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVisaForm } from './hooks/useVisaForm';
import DestinationStep from './steps/DestinationStep';
import PurposeStep from './steps/PurposeStep';
import TravelDateStep from './steps/TravelDateStep';
import DepartureCityStep from './steps/DepartureCityStep';
import NationalityStep from './steps/NationalityStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ContactInfoStep from './steps/ContactInfoStep';

interface EnhancedMultiStepFormProps {
  type: 'short-stay' | 'long-stay';
  preSelectedCountry?: string;
  onComplete?: () => void;
}

const EnhancedMultiStepForm = ({ type, preSelectedCountry, onComplete }: EnhancedMultiStepFormProps) => {
  const {
    formData,
    setFormData,
    currentStep,
    totalSteps,
    isSubmitting,
    availableNationalities,
    handleNext,
    handlePrev,
    handleAdditionalNeedsChange,
    handleSubmit,
    isStepValid
  } = useVisaForm(type, preSelectedCountry, onComplete);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DestinationStep
            value={formData.destinationCountry}
            onChange={(value) => setFormData({ ...formData, destinationCountry: value })}
          />
        );
      case 2:
        return (
          <PurposeStep
            type={type}
            value={formData.purpose}
            onChange={(value) => setFormData({ ...formData, purpose: value })}
          />
        );
      case 3:
        return (
          <TravelDateStep
            value={formData.travelDate}
            onChange={(value) => setFormData({ ...formData, travelDate: value })}
          />
        );
      case 4:
        return (
          <DepartureCityStep
            value={formData.departureCity}
            onChange={(value) => setFormData({ ...formData, departureCity: value })}
          />
        );
      case 5:
        return (
          <NationalityStep
            value={formData.nationality}
            onChange={(value) => setFormData({ ...formData, nationality: value })}
            availableNationalities={availableNationalities}
            destinationCountry={formData.destinationCountry}
            type={type}
          />
        );
      case 6:
        return (
          <PersonalInfoStep
            name={formData.name}
            onNameChange={(value) => setFormData({ ...formData, name: value })}
            additionalNeeds={formData.additionalNeeds}
            onAdditionalNeedsChange={handleAdditionalNeedsChange}
          />
        );
      case 7:
        return (
          <ContactInfoStep
            email={formData.email}
            phone={formData.phone}
            onEmailChange={(value) => setFormData({ ...formData, email: value })}
            onPhoneChange={(value) => setFormData({ ...formData, phone: value })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {type === 'short-stay' ? 'Short-Stay Visa Application' : 'Long-Stay Visa Application'}
        </CardTitle>
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${
                i + 1 <= currentStep ? 'bg-blue-900' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-blue-900 hover:bg-blue-800"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
            >
              {isSubmitting ? 'Submitting...' : (type === 'short-stay' ? 'Check Requirements' : 'Start Eligibility Check')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMultiStepForm;
