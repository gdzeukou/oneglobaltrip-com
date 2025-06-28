
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, User } from 'lucide-react';

const QuickVisaWizard = () => {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleQuickCheck = () => {
    if (nationality && destination && purpose) {
      // Navigate to appropriate visa page or show results
      console.log('Quick check:', { nationality, destination, purpose });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Quick Visa Check
        </CardTitle>
        <p className="text-gray-600">Find out what visa you need in 30 seconds</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Your Nationality
            </label>
            <Select onValueChange={setNationality}>
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Destination
            </label>
            <Select onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Where to?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schengen">Schengen Area</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="brazil">Brazil</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Purpose
            </label>
            <Select onValueChange={setPurpose}>
              <SelectTrigger>
                <SelectValue placeholder="Travel purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tourism">Tourism</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="family">Family Visit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleQuickCheck}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={!nationality || !destination || !purpose}
        >
          Check Visa Requirements
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickVisaWizard;
