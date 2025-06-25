
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { destinationCountries } from '@/data/visaRequirementsDatabase';

interface Destination {
  country: string;
  purpose: string;
}

interface VisaCheck {
  destinations: Array<{ destination: string; required: boolean }>;
}

interface SchengenCountriesCardProps {
  schengenDestinations: Destination[];
  visaCheck: VisaCheck;
  consulateRecommendation: any;
}

const SchengenCountriesCard = ({ 
  schengenDestinations, 
  visaCheck, 
  consulateRecommendation 
}: SchengenCountriesCardProps) => {
  if (schengenDestinations.length === 0) {
    return null;
  }

  const hasMultipleSchengenCountries = schengenDestinations.length > 1;

  return (
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
  );
};

export default SchengenCountriesCard;
