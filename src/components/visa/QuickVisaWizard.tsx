
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User, Loader2 } from 'lucide-react';
import AutocompleteSelect from './wizard/components/AutocompleteSelect';
import VisaResultsCard from './wizard/components/VisaResultsCard';
import { checkVisaRequirement, getTravelPurposes, getCountryOptions } from '@/utils/enhancedVisaChecker';

const QuickVisaWizard = () => {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const countryOptions = getCountryOptions();
  const purposeOptions = getTravelPurposes();

  const handleQuickCheck = async () => {
    if (nationality && destination && purpose) {
      setIsLoading(true);
      
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const visaResult = checkVisaRequirement(nationality, destination, purpose);
      setResult(visaResult);
      setIsLoading(false);
    }
  };

  const handleApplyNow = () => {
    // Navigate to appropriate visa application page
    if (result?.isSchengen) {
      window.open('/visa-countries/schengen-short-stay', '_blank');
    } else if (destination === 'United States') {
      window.open('https://ceac.state.gov/genniv/', '_blank');
    } else if (destination === 'United Kingdom') {
      window.open('https://www.gov.uk/standard-visitor-visa', '_blank');
    } else {
      // Default to short-stay visas page
      window.open('/short-stay-visas', '_blank');
    }
  };

  const handleGetConsultation = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank');
  };

  const resetForm = () => {
    setNationality('');
    setDestination('');
    setPurpose('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <MapPin className="h-6 w-6 text-blue-500" />
            Quick Visa Check
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Find out what visa you need in seconds - now with comprehensive global coverage
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4 text-blue-500" />
                Your Nationality
              </label>
              <AutocompleteSelect
                options={countryOptions}
                value={nationality}
                onValueChange={setNationality}
                placeholder="Select your nationality"
                searchPlaceholder="Search countries..."
                emptyMessage="No countries found."
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 text-green-500" />
                Destination
              </label>
              <AutocompleteSelect
                options={countryOptions}
                value={destination}
                onValueChange={setDestination}
                placeholder="Where to?"
                searchPlaceholder="Search destinations..."
                emptyMessage="No destinations found."
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-purple-500" />
                Purpose
              </label>
              <AutocompleteSelect
                options={purposeOptions}
                value={purpose}
                onValueChange={setPurpose}
                placeholder="Travel purpose"
                searchPlaceholder="Search purposes..."
                emptyMessage="No purposes found."
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleQuickCheck}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              disabled={!nationality || !destination || !purpose || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking Requirements...
                </>
              ) : (
                'Check Visa Requirements'
              )}
            </Button>
            
            {result && (
              <Button 
                onClick={resetForm}
                variant="outline"
                className="sm:w-auto"
              >
                New Search
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="animate-fade-in">
          <VisaResultsCard
            result={result}
            nationality={nationality}
            destination={destination}
            purpose={purposeOptions.find(p => p.value === purpose)?.label || purpose}
            onApplyNow={handleApplyNow}
            onGetConsultation={handleGetConsultation}
          />
        </div>
      )}
    </div>
  );
};

export default QuickVisaWizard;
