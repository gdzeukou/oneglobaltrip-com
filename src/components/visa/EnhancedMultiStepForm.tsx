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
import { sanitizeInput, validateEmail, validatePhone } from '@/utils/securityUtils';

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
    name: '',
    email: '',
    phone: ''
  });

  const totalSteps = 7;

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
    console.log('=== VISA FORM SUBMISSION START ===');
    console.log('Form type:', type);
    console.log('Raw form data:', formData);
    
    setIsSubmitting(true);
    
    try {
      // Enhanced validation with detailed logging
      console.log('=== VALIDATION PHASE ===');
      
      if (!formData.name?.trim()) {
        console.error('Validation failed: Missing name');
        throw new Error('Name is required');
      }
      
      if (!validateEmail(formData.email)) {
        console.error('Validation failed: Invalid email:', formData.email);
        throw new Error('Valid email is required');
      }
      
      if (!formData.phone?.trim()) {
        console.error('Validation failed: Missing phone');
        throw new Error('Phone number is required');
      }
      
      if (!formData.destinationCountry) {
        console.error('Validation failed: Missing destination');
        throw new Error('Destination country is required');
      }
      
      if (!formData.nationality) {
        console.error('Validation failed: Missing nationality');
        throw new Error('Nationality is required');
      }
      
      if (!formData.purpose) {
        console.error('Validation failed: Missing purpose');
        throw new Error('Purpose/category is required');
      }

      console.log('✓ All validations passed');

      // Sanitize data
      console.log('=== SANITIZATION PHASE ===');
      const sanitizedData = {
        purpose: sanitizeInput(formData.purpose, 100),
        departure_city: sanitizeInput(formData.departureCity, 100),
        nationality: sanitizeInput(formData.nationality, 100),
        destination_country: sanitizeInput(formData.destinationCountry, 100),
        name: sanitizeInput(formData.name, 100),
        email: sanitizeInput(formData.email, 254),
        phone: sanitizeInput(formData.phone, 20)
      };

      console.log('Sanitized data:', sanitizedData);

      // Determine table and field based on visa type
      console.log('=== DATABASE PREPARATION ===');
      const tableName = type === 'short-stay' ? 'short_visas_leads' : 'long_visas_leads';
      const purposeField = type === 'short-stay' ? 'purpose' : 'visa_category';
      
      console.log('Target table:', tableName);
      console.log('Purpose field:', purposeField);

      // Prepare final submission data
      const submissionData = {
        [purposeField]: sanitizedData.purpose,
        departure_city: sanitizedData.departure_city,
        nationality: sanitizedData.nationality,
        destination_country: sanitizedData.destination_country,
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone
      };

      console.log('Final submission data:', submissionData);

      // Attempt database insertion
      console.log('=== DATABASE INSERTION ===');
      console.log(`Inserting into table: ${tableName}`);
      
      const { data: insertResult, error: insertError } = await supabase
        .from(tableName)
        .insert([submissionData])
        .select();

      if (insertError) {
        console.error('❌ Database insertion failed');
        console.error('Supabase error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        throw new Error(`Database error: ${insertError.message}`);
      }

      console.log('✅ Database insertion successful:', insertResult);

      // Success handling
      console.log('=== SUCCESS HANDLING ===');
      toast({
        title: "Application Started!",
        description: "We'll review your information and contact you within 24 hours.",
      });

      console.log('✅ Toast notification sent');

      if (onComplete) {
        console.log('✅ Calling onComplete callback');
        onComplete();
      }

      console.log('=== VISA FORM SUBMISSION COMPLETE ===');
      
    } catch (error) {
      console.error('=== FORM SUBMISSION ERROR ===');
      console.error('Error type:', typeof error);
      console.error('Error instance:', error instanceof Error);
      console.error('Full error object:', error);
      
      let errorMessage = "Please try again or contact support.";
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        if (error.message.includes('email')) {
          errorMessage = "Please check your email address and try again.";
        } else if (error.message.includes('required')) {
          errorMessage = error.message;
        } else if (error.message.includes('Database error')) {
          errorMessage = "There was a technical issue. Please try again in a moment.";
        } else if (error.message.includes('duplicate') || error.message.includes('unique')) {
          errorMessage = "You've already submitted an application with this information.";
        }
      }

      console.error('Final error message to user:', errorMessage);

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('=== CLEANUP ===');
      setIsSubmitting(false);
      console.log('isSubmitting set to false');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.destinationCountry.length > 0;
      case 2: return formData.purpose.length > 0;
      case 3: return formData.travelDate.length > 0;
      case 4: return formData.departureCity.length > 0;
      case 5: return formData.nationality.length > 0;
      case 6: return formData.name.length > 0;
      case 7: return formData.email.length > 0 && formData.phone.length > 0;
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

        {/* Step 6: Name and Additional Needs */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-lg font-semibold">Your Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
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
          </div>
        )}

        {/* Step 7: Contact Information */}
        {currentStep === 7 && (
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
