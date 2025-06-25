
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Plane,
  AlertTriangle,
  Phone,
  Clock
} from 'lucide-react';
import { Package } from '@/types/package';
import { checkVisaRequirement, destinationCountries, schengenCountries } from '@/data/visaRequirementsDatabase';
import NationalitySelector from '../visa/wizard/steps/NationalitySelector';

interface PackageVisaWizardProps {
  packageData: Package;
}

const PackageVisaWizard = ({ packageData }: PackageVisaWizardProps) => {
  const [selectedNationality, setSelectedNationality] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (selectedNationality) {
      setShowResult(true);
    }
  }, [selectedNationality]);

  const handleNationalityChange = (nationality: string) => {
    setSelectedNationality(nationality);
  };

  const getVisaRequirements = () => {
    if (!selectedNationality || !packageData.countries) return [];
    
    return packageData.countries.map(countryCode => {
      const countryInfo = destinationCountries.find(c => c.code === countryCode);
      const requirement = checkVisaRequirement(selectedNationality, countryCode, 'tourism');
      
      // Special handling for UK ETA
      let specialRequirement = null;
      if (countryCode === 'uk' && selectedNationality === 'United States') {
        specialRequirement = {
          type: 'eta',
          message: 'Electronic Travel Authorization (ETA) required - quick online application'
        };
      }
      
      return {
        country: countryCode,
        countryName: countryInfo?.name || countryCode,
        flag: countryInfo?.flag || '🌍',
        requirement,
        specialRequirement
      };
    });
  };

  const visaRequirements = getVisaRequirements();
  const hasAnyVisaRequired = visaRequirements.some(req => req.requirement.required || req.specialRequirement);
  const schengenCountriesInPackage = visaRequirements.filter(req => req.requirement.isSchengen);

  const handleBookConsultation = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank');
  };

  if (!selectedNationality) {
    return (
      <Card className="border-2 border-blue-200">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span>Visa Requirements for This Trip</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-4">
            <p className="text-gray-700 text-sm sm:text-base">
              Check visa requirements for all countries in this package based on your nationality.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-blue-800 text-sm font-medium mb-2">Countries included:</p>
              <div className="flex flex-wrap gap-2">
                {packageData.countries?.map(countryCode => {
                  const countryInfo = destinationCountries.find(c => c.code === countryCode);
                  return (
                    <Badge key={countryCode} variant="outline" className="bg-white">
                      {countryInfo?.flag} {countryInfo?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
            
            <NationalitySelector
              value={selectedNationality}
              onChange={handleNationalityChange}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span>Your Visa Requirements</span>
          </div>
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
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-4">
          {/* Nationality Display */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Your Nationality:</span>
              <span className="font-medium">{selectedNationality}</span>
            </div>
          </div>

          {/* Overall Status */}
          <div className={`rounded-lg p-4 border-2 ${
            hasAnyVisaRequired 
              ? 'bg-yellow-50 border-yellow-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start space-x-3">
              {hasAnyVisaRequired ? (
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-bold mb-2 ${
                  hasAnyVisaRequired ? 'text-yellow-800' : 'text-green-800'
                }`}>
                  {hasAnyVisaRequired 
                    ? 'Documentation Required for Your Trip' 
                    : 'No Visas Required - You\'re All Set!'
                  }
                </h4>
                {!hasAnyVisaRequired && (
                  <p className="text-green-700 text-sm">
                    Great news! You can visit all countries in this package without visas. 
                    Just ensure your passport is valid for at least 6 months.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Country-by-Country Requirements */}
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900">Requirements by Country:</h5>
            {visaRequirements.map((req, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{req.flag}</span>
                    <span className="font-medium">{req.countryName}</span>
                  </div>
                  {req.requirement.required || req.specialRequirement ? (
                    <XCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                {req.specialRequirement ? (
                  <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                    <p className="text-blue-800 text-sm font-medium">
                      {req.specialRequirement.message}
                    </p>
                  </div>
                ) : req.requirement.required ? (
                  <p className="text-red-700 text-sm">
                    {req.requirement.isSchengen ? 'Schengen' : 'Tourist'} visa required
                  </p>
                ) : (
                  <p className="text-green-700 text-sm">No visa required</p>
                )}
              </div>
            ))}
          </div>

          {/* Schengen Optimization */}
          {schengenCountriesInPackage.length > 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h5 className="font-medium text-blue-800 mb-2">💡 Smart Tip:</h5>
              <p className="text-blue-700 text-sm">
                This package includes {schengenCountriesInPackage.length} Schengen countries. 
                One Schengen visa covers all of them! Apply at the consulate of the country 
                where you'll spend the most nights.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {hasAnyVisaRequired && (
            <div className="space-y-2 pt-2">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Scroll to checklist if exists, or navigate to visa services
                  window.open('/visas', '_blank');
                }}
              >
                <Clock className="w-4 h-4 mr-2" />
                Start Visa Applications
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                onClick={handleBookConsultation}
              >
                <Phone className="w-4 h-4 mr-2" />
                Get Expert Visa Assistance
              </Button>
            </div>
          )}

          {!hasAnyVisaRequired && (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // Navigate to packages or travel planning
                const bookingElement = document.querySelector('[data-tab="booking"]');
                if (bookingElement) {
                  bookingElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Plane className="w-4 h-4 mr-2" />
              Start Planning Your Trip
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageVisaWizard;
