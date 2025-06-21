import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getFilteredNationalities } from '@/utils/visaRequirements';

interface EnhancedMultiStepFormProps {
  type: 'short-stay' | 'long-stay';
  preSelectedCountry?: string;
  onComplete?: () => void;
}

const EnhancedMultiStepForm = ({ type, preSelectedCountry, onComplete }: EnhancedMultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableNationalities, setAvailableNationalities] = useState<string[]>([]);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    destinationCountry: preSelectedCountry || '',
    purpose: '',
    travelDate: '',
    departureCity: '',
    nationality: '',
    additionalNeeds: [] as string[],
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const totalSteps = 8;

  const shortStayPurposes = [
    'Tourism',
    'Family/Friends',
    'Academic Trip',
    'Work/Business',
    'Religious',
    'Athletic Event',
    'Conference'
  ];

  const longStayCategories = [
    'Residency',
    'Work',
    'Retirement',
    'Study',
    'Digital Nomad'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Spain', 'Italy', 'Netherlands', 'Portugal', 'Norway', 'Denmark', 'Finland',
    'Switzerland', 'Brazil', 'Nigeria', 'India', 'UAE', 'Schengen Area'
  ];

  const additionalNeedsOptions = [
    'Flight booking',
    'Hotel reservation',
    'Car rental',
    'Bus/Train tickets',
    'Travel insurance',
    'Airport transfer'
  ];

  // Update available nationalities when destination changes
  useEffect(() => {
    if (formData.destinationCountry) {
      const filteredNationalities = getFilteredNationalities(formData.destinationCountry, type);
      setAvailableNationalities(filteredNationalities);
      console.log(`Updated nationalities for ${formData.destinationCountry}:`, filteredNationalities.length);
      
      // Reset nationality if it's no longer available
      if (formData.nationality && !filteredNationalities.includes(formData.nationality)) {
        setFormData(prev => ({ ...prev, nationality: '' }));
      }
    }
  }, [formData.destinationCountry, type]);

  // Set initial nationalities on component mount
  useEffect(() => {
    const initialNationalities = getFilteredNationalities(formData.destinationCountry || '', type);
    setAvailableNationalities(initialNationalities);
  }, [type, formData.destinationCountry]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAdditionalNeedsChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalNeeds: checked 
        ? [...prev.additionalNeeds, need]
        : prev.additionalNeeds.filter(n => n !== need)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const tableName = type === 'short-stay' ? 'short_visas_leads' : 'long_visas_leads';
      const dataField = type === 'short-stay' ? 'purpose' : 'visa_category';
      
      const { error } = await supabase
        .from(tableName)
        .insert([
          {
            [dataField]: formData.purpose,
            departure_city: formData.departureCity,
            nationality: formData.nationality,
            destination_country: formData.destinationCountry,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone
          }
        ]);

      if (error) throw error;

      toast({
        title: "Application Started!",
        description: "We'll review your information and contact you within 24 hours.",
      });

      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.destinationCountry.length > 0;
      case 2: return formData.purpose.length > 0;
      case 3: return formData.travelDate.length > 0;
      case 4: return formData.departureCity.length > 0;
      case 5: return formData.nationality.length > 0;
      case 6: return true; // Additional needs is optional
      case 7: return formData.firstName.length > 0 && formData.lastName.length > 0;
      case 8: return formData.email.length > 0 && formData.phone.length > 0;
      default: return false;
    }
  };

  const getStepInfo = () => {
    if (currentStep === 5 && formData.destinationCountry === 'Schengen Area' && type === 'short-stay') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Only showing nationalities that require a Schengen visa. Citizens of Schengen countries and visa-exempt countries (US, UK, Canada, etc.) don't need short-stay visas.
            </p>
          </div>
        </div>
      );
    }
    return null;
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
        {/* Step 1: Primary Destination */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Primary Destination Country</Label>
            <Select
              value={formData.destinationCountry}
              onValueChange={(value) => setFormData({ ...formData, destinationCountry: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Step 2: Category/Purpose */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              {type === 'short-stay' ? 'Select Visa Purpose' : 'Select Visa Category'}
            </Label>
            <RadioGroup
              value={formData.purpose}
              onValueChange={(value) => setFormData({ ...formData, purpose: value })}
              className="grid grid-cols-2 gap-4"
            >
              {(type === 'short-stay' ? shortStayPurposes : longStayCategories).map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Travel Date */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <Label htmlFor="travelDate" className="text-lg font-semibold">
              When do you need to be there?
            </Label>
            <Input
              id="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            />
          </div>
        )}

        {/* Step 4: Departure City */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <Label htmlFor="departureCity" className="text-lg font-semibold">
              Where are you traveling from?
            </Label>
            <Input
              id="departureCity"
              placeholder="Enter your departure city"
              value={formData.departureCity}
              onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
            />
          </div>
        )}

        {/* Step 5: Nationality */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What's your nationality?</Label>
            {getStepInfo()}
            <Select
              value={formData.nationality}
              onValueChange={(value) => setFormData({ ...formData, nationality: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {availableNationalities.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Step 6: Additional Needs */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">What else do you still need? (Optional)</Label>
            <div className="grid grid-cols-2 gap-4">
              {additionalNeedsOptions.map((need) => (
                <div key={need} className="flex items-center space-x-2">
                  <Checkbox
                    id={need}
                    checked={formData.additionalNeeds.includes(need)}
                    onCheckedChange={(checked) => handleAdditionalNeedsChange(need, checked as boolean)}
                  />
                  <Label htmlFor={need} className="cursor-pointer text-sm">{need}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Name Information */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Your Name</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Contact Information */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Contact Information</Label>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

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
