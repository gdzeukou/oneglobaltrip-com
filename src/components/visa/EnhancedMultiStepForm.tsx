
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
    currentStep,
    totalSteps,
    isSubmitting,
    handleInputChange,
    handleNext,
    handlePrev,
    handleSubmit,
    validateCurrentStep
  } = useVisaForm({ type, preSelectedCountry, onComplete });

  // Available nationalities for the nationality step
  const availableNationalities = [
    'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Argentine', 'Armenian', 'Australian',
    'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Belarusian', 'Belgian',
    'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian', 'Bulgarian',
    'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African',
    'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban',
    'Cypriot', 'Czech', 'Danish', 'Djiboutian', 'Dominican', 'Dutch', 'East Timorese', 'Ecuadorean', 'Egyptian',
    'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French',
    'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan',
    'Guinean', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian', 'Icelander', 'Indian', 'Indonesian',
    'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani',
    'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan',
    'Liechtensteiner', 'Lithuanian', 'Luxembourer', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan',
    'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monacan',
    'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican', 'Namibian', 'Nauruan', 'Nepalese', 'New Zealander',
    'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Panamanian',
    'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan',
    'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi', 'Scottish', 'Senegalese', 'Serbian',
    'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African',
    'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese',
    'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian or Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan',
    'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DestinationStep
            value={formData.destination}
            onChange={(value) => handleInputChange('destination', value)}
          />
        );
      case 1:
        return (
          <PurposeStep
            type={type}
            value={formData.purpose}
            onChange={(value) => handleInputChange('purpose', value)}
          />
        );
      case 2:
        return (
          <TravelDateStep
            value={formData.travelDate}
            onChange={(value) => handleInputChange('travelDate', value)}
          />
        );
      case 3:
        return (
          <DepartureCityStep
            value={formData.departureCity}
            onChange={(value) => handleInputChange('departureCity', value)}
          />
        );
      case 4:
        return (
          <NationalityStep
            value={formData.nationality}
            onChange={(value) => handleInputChange('nationality', value)}
            availableNationalities={availableNationalities}
            destinationCountry={formData.destination}
            type={type}
          />
        );
      case 5:
        return (
          <div className="space-y-6">
            <PersonalInfoStep
              name={formData.name}
              onNameChange={(value) => handleInputChange('name', value)}
              additionalNeeds={[]}
              onAdditionalNeedsChange={() => {}}
            />
            <ContactInfoStep
              email={formData.email}
              phone={formData.phone}
              onEmailChange={(value) => handleInputChange('email', value)}
              onPhoneChange={(value) => handleInputChange('phone', value)}
            />
          </div>
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
                i <= currentStep ? 'bg-blue-900' : 'bg-gray-200'
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
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!validateCurrentStep()}
              className="bg-blue-900 hover:bg-blue-800"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!validateCurrentStep() || isSubmitting}
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
