
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User, Clock, Loader2 } from 'lucide-react';
import AutocompleteSelect from './wizard/components/AutocompleteSelect';
import DurationSelector from './wizard/components/DurationSelector';
import VisaResultsCard from './wizard/components/VisaResultsCard';
import { checkVisaRequirement, getTravelPurposes, getCountryOptions } from '@/utils/enhancedVisaChecker';

const QuickVisaWizard = () => {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const countryOptions = getCountryOptions();
  const purposeOptions = getTravelPurposes();

  const handleQuickCheck = async () => {
    if (nationality && destination && purpose && duration) {
      setIsLoading(true);
      
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const visaResult = checkVisaRequirement(nationality, destination, purpose, duration);
      setResult(visaResult);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNationality('');
    setDestination('');
    setPurpose('');
    setDuration('');
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="h-4 w-4 text-orange-500" />
                Duration
              </label>
              <DurationSelector
                value={duration}
                onValueChange={setDuration}
                placeholder="How long?"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleQuickCheck}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              disabled={!nationality || !destination || !purpose || !duration || isLoading}
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
            duration={duration}
          />
        </div>
      )}
    </div>
  );
};

export default QuickVisaWizard;
