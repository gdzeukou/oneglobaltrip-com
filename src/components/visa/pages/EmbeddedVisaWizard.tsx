
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Plane,
  AlertTriangle,
  Phone
} from 'lucide-react';
import { useVisaPageContext } from './hooks/useVisaPageContext';
import { checkVisaRequirement, destinationCountries, schengenCountries } from '@/data/visaRequirementsDatabase';
import NationalitySelector from '../wizard/steps/NationalitySelector';

interface EmbeddedVisaWizardProps {
  onStartFullWizard?: () => void;
  onBookConsultation?: () => void;
}

const EmbeddedVisaWizard = ({ onStartFullWizard, onBookConsultation }: EmbeddedVisaWizardProps) => {
  const context = useVisaPageContext();
  const [selectedNationality, setSelectedNationality] = useState('');
  const [showResult, setShowResult] = useState(false);

  const countryInfo = destinationCountries.find(c => c.code === context.country);
  
  useEffect(() => {
    if (selectedNationality) {
      setShowResult(true);
    }
  }, [selectedNationality]);

  const handleNationalityChange = (nationality: string) => {
    setSelectedNationality(nationality);
  };

  const getVisaResult = () => {
    if (!selectedNationality || !context.country) return null;
    
    return checkVisaRequirement(selectedNationality, context.country, 'tourism');
  };

  const visaResult = getVisaResult();

  const handleBookConsultation = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank');
  };

  return (
    <Card className="sticky top-6 border-2 border-blue-200">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Quick Visa Check</h3>
          </div>
          <p className="text-sm text-gray-600">
            Check if you need a visa for {countryInfo?.name || context.country}
          </p>
        </div>

        {!selectedNationality ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-4">
                Select your nationality to get instant visa requirements
              </p>
            </div>
            
            <NationalitySelector
              value={selectedNationality}
              onChange={handleNationalityChange}
            />
            
            <div className="text-center">
              <Button 
                onClick={onStartFullWizard}
                variant="outline" 
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Need Multi-Country Planning?
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Nationality Display */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Your Nationality:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{selectedNationality}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedNationality('');
                      setShowResult(false);
                    }}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </Button>
                </div>
              </div>
            </div>

            {/* Visa Result */}
            {showResult && visaResult && (
              <div className={`rounded-lg p-4 border-2 ${
                visaResult.required 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {visaResult.required ? (
                    <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className={`font-bold mb-2 ${
                      visaResult.required ? 'text-red-800' : 'text-green-800'
                    }`}>
                      {visaResult.required 
                        ? `Visa Required for ${countryInfo?.name}` 
                        : `No Visa Required for ${countryInfo?.name}`
                      }
                    </h4>
                    
                    {visaResult.required ? (
                      <div className="space-y-3">
                        <p className="text-red-700 text-sm">
                          You need a {visaResult.isSchengen ? 'Schengen' : 'tourist'} visa to visit {countryInfo?.name}. 
                          Start your application as soon as possible.
                        </p>
                        
                        {context.isSchengen && (
                          <div className="bg-blue-50 border border-blue-200 rounded p-3">
                            <p className="text-blue-700 text-sm">
                              <strong>Good news!</strong> A Schengen visa allows you to visit all 27 Schengen countries. 
                              Planning to visit multiple countries? Use our full wizard for consulate recommendations.
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => {
                              // Scroll to checklist or start application
                              const checklist = document.getElementById('visa-checklist');
                              if (checklist) {
                                checklist.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            Start Application Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          
                          <Button 
                            variant="outline"
                            className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                            onClick={handleBookConsultation}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Get Expert Help
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-green-700 text-sm">
                          Great news! You can visit {countryInfo?.name} without a visa. 
                          Make sure your passport is valid for at least 6 months.
                        </p>
                        
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              // Navigate to packages or travel planning
                              window.open('/packages', '_blank');
                            }}
                          >
                            <Plane className="w-4 h-4 mr-2" />
                            Explore Travel Packages
                          </Button>
                          
                          <Button 
                            variant="outline"
                            onClick={onStartFullWizard}
                            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                          >
                            Plan Multi-Country Trip
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Complex Case Warning */}
            {context.isSchengen && visaResult?.required && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Planning multiple Schengen countries?</strong> The consulate where you apply depends on your itinerary. 
                    Use our full wizard for personalized recommendations.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmbeddedVisaWizard;
