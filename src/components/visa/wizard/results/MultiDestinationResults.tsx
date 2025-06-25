
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight, MapPin, Users } from 'lucide-react';
import { 
  checkMultiDestinationVisaRequirement, 
  getSchengenConsulateRecommendation,
  destinationCountries,
  schengenCountries,
  SchengenTripData
} from '@/data/visaRequirementsDatabase';
import { Link } from 'react-router-dom';
import SchengenTripPlanner from '../steps/SchengenTripPlanner';
import ConsulateRecommendation from './ConsulateRecommendation';

interface Destination {
  country: string;
  purpose: string;
}

interface MultiDestinationResultsProps {
  nationality: string;
  destinations: Destination[];
  onReset: () => void;
}

const MultiDestinationResults = ({ nationality, destinations, onReset }: MultiDestinationResultsProps) => {
  const [schengenTripData, setSchengenTripData] = useState<Partial<SchengenTripData>>({});
  const [showSchengenPlanner, setShowSchengenPlanner] = useState(false);

  const countries = destinations.map(d => d.country);
  const purposes = destinations.map(d => d.purpose);
  const visaCheck = checkMultiDestinationVisaRequirement(nationality, countries, purposes);

  // Check if there are Schengen countries
  const schengenDestinations = destinations.filter(d => 
    schengenCountries.includes(d.country)
  );
  const nonSchengenDestinations = destinations.filter(d => 
    !schengenCountries.includes(d.country)
  );

  const hasMultipleSchengenCountries = schengenDestinations.length > 1;
  const schengenPurpose = schengenDestinations[0]?.purpose || 'tourism';

  // Generate consulate recommendation if we have complete Schengen trip data
  const consulateRecommendation = hasMultipleSchengenCountries && 
    schengenTripData.selectedCountries && 
    schengenTripData.entryPoint
    ? getSchengenConsulateRecommendation({
        selectedCountries: schengenTripData.selectedCountries,
        nightsDistribution: schengenTripData.nightsDistribution || {},
        businessLocation: schengenTripData.businessLocation,
        entryPoint: schengenTripData.entryPoint,
        purpose: schengenPurpose
      })
    : null;

  const handleBookConsultation = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Your Multi-Destination Visa Requirements
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Nationality: {nationality}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{destinations.length} Destinations</span>
          </Badge>
        </div>
      </div>

      {/* Schengen Trip Planning */}
      {hasMultipleSchengenCountries && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold text-blue-900 mb-2">
                🇪🇺 Multiple Schengen Countries Detected
              </h4>
              <p className="text-blue-700">
                You need only one Schengen visa, but we need to determine the correct consulate for your application.
              </p>
            </div>

            {!showSchengenPlanner ? (
              <div className="text-center">
                <Button 
                  onClick={() => setShowSchengenPlanner(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Plan Your Schengen Trip
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <SchengenTripPlanner
                selectedCountries={schengenDestinations.map(d => d.country)}
                tripData={schengenTripData}
                purpose={schengenPurpose}
                onChange={setSchengenTripData}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Consulate Recommendation */}
      {consulateRecommendation && (
        <ConsulateRecommendation 
          recommendation={consulateRecommendation}
          onBookConsultation={handleBookConsultation}
        />
      )}

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`border-2 ${visaCheck.allVisaFree ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
          <CardContent className="p-6 text-center">
            {visaCheck.allVisaFree ? (
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            )}
            <h4 className="font-bold text-lg mb-2">
              {visaCheck.allVisaFree ? 'All Visa-Free' : 'Visas Required'}
            </h4>
            <p className="text-sm">
              {visaCheck.allVisaFree 
                ? 'No visas needed for any destination'
                : `${visaCheck.destinations.filter(d => d.required).length} destinations require visas`
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Total Destinations</h4>
            <p className="text-2xl font-bold text-blue-600">{visaCheck.totalDestinations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Schengen Countries</h4>
            <p className="text-2xl font-bold text-purple-600">{schengenDestinations.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results by Destination */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-gray-900">Visa Requirements by Destination</h4>
        
        {/* Schengen Group */}
        {schengenDestinations.length > 0 && (
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold text-blue-900">🇪🇺 Schengen Area</h5>
                <Badge className="bg-blue-100 text-blue-800">
                  {schengenDestinations.length} {schengenDestinations.length === 1 ? 'country' : 'countries'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {schengenDestinations.map((destination, index) => {
                  const countryInfo = destinationCountries.find(c => c.code === destination.country);
                  const visaResult = visaCheck.destinations.find(d => d.destination === destination.country);
                  
                  return (
                    <div key={index} className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl">{countryInfo?.flag}</span>
                        <span className="font-medium">{countryInfo?.name}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Purpose: {destination.purpose}
                      </div>
                      <Badge variant={visaResult?.required ? 'destructive' : 'secondary'}>
                        {visaResult?.required ? 'Visa Required' : 'Visa Free'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Good news!</strong> One Schengen visa allows travel to all Schengen countries. 
                  {hasMultipleSchengenCountries && !consulateRecommendation && 
                    ' Complete the trip planner above to get your consulate recommendation.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Non-Schengen Countries */}
        {nonSchengenDestinations.map((destination, index) => {
          const countryInfo = destinationCountries.find(c => c.code === destination.country);
          const visaResult = visaCheck.destinations.find(d => d.destination === destination.country);
          
          return (
            <Card key={index} className={`border ${visaResult?.required ? 'border-red-200' : 'border-green-200'}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{countryInfo?.flag}</span>
                    <div>
                      <h5 className="text-lg font-semibold">{countryInfo?.name}</h5>
                      <p className="text-sm text-gray-600">Purpose: {destination.purpose}</p>
                    </div>
                  </div>
                  <Badge variant={visaResult?.required ? 'destructive' : 'secondary'}>
                    {visaResult?.required ? 'Visa Required' : 'Visa Free'}
                  </Badge>
                </div>

                {visaResult?.required ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 mb-2">
                      You need a visa for {countryInfo?.name}. Start your application as soon as possible.
                    </p>
                    <Link to="/visas/short-stay">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        Start {countryInfo?.name} Visa Application
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      No visa required for {countryInfo?.name}. Ensure your passport is valid for at least 6 months.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transit Warnings */}
      {visaCheck.transitWarnings.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <h4 className="font-bold text-yellow-800 mb-4">⚠️ Transit Visa Considerations</h4>
            <div className="space-y-2">
              {visaCheck.transitWarnings.map((warning, index) => (
                <div key={index} className="text-yellow-700">
                  • {warning.message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      {visaCheck.hasVisaRequired && (
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6 text-center">
            <h4 className="text-xl font-bold mb-4">Ready to Start Your Applications?</h4>
            <p className="mb-6">
              Don't let visa requirements delay your multi-destination adventure. 
              Our experts can help coordinate all your applications.
            </p>
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold"
                onClick={handleBookConsultation}
              >
                Get Expert Help for All Visas
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="text-sm text-blue-100">
                ✓ Coordinated applications ✓ Timeline management ✓ Document review
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reset Button */}
      <div className="text-center pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Plan Another Trip</span>
        </Button>
      </div>
    </div>
  );
};

export default MultiDestinationResults;
