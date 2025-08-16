import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle, ArrowRight, Globe, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisaRequirement {
  required: boolean;
  type?: string;
  processingTime?: string;
  fee?: string;
  requirements: string[];
  recommendation: string;
}

const SmartVisaChecker = () => {
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [result, setResult] = useState<VisaRequirement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simplified visa data for MVP
  const countries = [
    'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'United States', 'Canada', 
    'United Kingdom', 'India', 'Pakistan', 'Bangladesh', 'Philippines', 'Mexico'
  ];

  const destinations = [
    'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Denmark', 'Sweden',
    'United Kingdom', 'United States', 'Canada', 'Schengen Area'
  ];

  const purposes = [
    'Tourism', 'Business', 'Visiting Family/Friends', 'Conference/Events', 'Medical Treatment'
  ];

  const checkVisaRequirement = () => {
    if (!nationality || !destination || !purpose) return;

    setIsLoading(true);
    
    // Simulate API call with realistic data
    setTimeout(() => {
      let requirement: VisaRequirement;

      // Simplified logic for demo
      if (destination === 'Schengen Area' || ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Denmark', 'Sweden'].includes(destination)) {
        if (['Nigeria', 'Kenya', 'Ghana', 'India', 'Pakistan', 'Bangladesh', 'Philippines'].includes(nationality)) {
          requirement = {
            required: true,
            type: 'Schengen Short-Stay Visa',
            processingTime: '15-30 days',
            fee: '€80 (approx $85)',
            requirements: [
              'Valid passport (6+ months validity)',
              'Completed application form',
              'Recent passport photos',
              'Travel insurance (€30,000 coverage)',
              'Proof of accommodation',
              'Flight itinerary',
              'Financial proof (bank statements)',
              'Employment letter or business registration'
            ],
            recommendation: 'Apply 4-6 weeks before travel. We can help with AI-guided application process.'
          };
        } else {
          requirement = {
            required: false,
            type: 'Visa-exempt',
            requirements: ['Valid passport'],
            recommendation: 'No visa required for short stays up to 90 days!'
          };
        }
      } else if (destination === 'United Kingdom') {
        if (['Nigeria', 'Kenya', 'Ghana', 'India', 'Pakistan', 'Bangladesh', 'Philippines'].includes(nationality)) {
          requirement = {
            required: true,
            type: 'UK Standard Visitor Visa',
            processingTime: '3-6 weeks',
            fee: '£100 (approx $125)',
            requirements: [
              'Valid passport',
              'Online application',
              'Biometric information',
              'Financial evidence',
              'Accommodation proof',
              'Travel itinerary',
              'Employment details'
            ],
            recommendation: 'Apply online and book biometric appointment. We provide complete guidance.'
          };
        } else {
          requirement = {
            required: false,
            type: 'Visa-exempt',
            requirements: ['Valid passport'],
            recommendation: 'No visa required for tourism/business visits up to 6 months!'
          };
        }
      } else {
        requirement = {
          required: true,
          type: 'Tourist/Business Visa',
          processingTime: '1-4 weeks',
          fee: 'Varies by country',
          requirements: [
            'Valid passport',
            'Application form',
            'Supporting documents'
          ],
          recommendation: 'Contact us for specific requirements for this destination.'
        };
      }

      setResult(requirement);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Smart Visa Checker
          </h2>
          <p className="text-lg text-gray-600">
            Get instant visa requirements for your trip in 30 seconds
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Check Visa Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Nationality</label>
                <Select value={nationality} onValueChange={setNationality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Destination</label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Where to?" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map(dest => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Purpose</label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={checkVisaRequirement}
              disabled={!nationality || !destination || !purpose || isLoading}
              className="w-full h-12 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Checking requirements...</span>
                </div>
              ) : (
                <>Check Visa Requirements</>
              )}
            </Button>

            {/* Results */}
            {result && (
              <div className="mt-8 space-y-4">
                <div className={cn(
                  "flex items-center space-x-3 p-4 rounded-lg",
                  result.required 
                    ? "bg-orange-50 text-orange-800 border border-orange-200" 
                    : "bg-green-50 text-green-800 border border-green-200"
                )}>
                  {result.required ? (
                    <AlertCircle className="h-6 w-6" />
                  ) : (
                    <CheckCircle className="h-6 w-6" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {result.required ? 'Visa Required' : 'No Visa Required'}
                    </h3>
                    <p className="text-sm">{result.type}</p>
                  </div>
                </div>

                {result.required && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Processing Time</span>
                      </h4>
                      <p className="text-sm text-gray-600">{result.processingTime}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4" />
                        <span>Visa Fee</span>
                      </h4>
                      <p className="text-sm text-gray-600">{result.fee}</p>
                    </div>
                  </div>
                )}

                <div className="bg-white p-6 rounded-lg border">
                  <h4 className="font-semibold mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {result.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium mb-3">{result.recommendation}</p>
                  <Button className="w-full">
                    Get AI-Powered Visa Assistance
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SmartVisaChecker;