
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { MultiDestinationVisaCheck, ConsulateRecommendation } from '@/data/visaRequirementsDatabase';

interface Destination {
  country: string;
  purpose: string;
}

interface SchengenCountriesCardProps {
  schengenDestinations: Destination[];
  visaCheck: MultiDestinationVisaCheck;
  consulateRecommendation: ConsulateRecommendation | null;
}

const SchengenCountriesCard = ({ schengenDestinations, visaCheck, consulateRecommendation }: SchengenCountriesCardProps) => {
  if (schengenDestinations.length === 0) {
    return null;
  }

  return (
    <Card className={`border-2 ${visaCheck.schengenVisaRequired ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {visaCheck.schengenVisaRequired ? (
            <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
          )}
          <h4 className="font-bold text-lg">
            Schengen Countries ({schengenDestinations.length})
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {schengenDestinations.map((dest, index) => (
            <div key={index} className="flex items-center p-3 bg-white rounded border">
              <div>
                <div className="font-medium">{dest.country}</div>
                <div className="text-sm text-gray-600">{dest.purpose}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`p-4 rounded-lg ${visaCheck.schengenVisaRequired ? 'bg-orange-100' : 'bg-green-100'}`}>
          <p className="text-sm">
            {visaCheck.schengenVisaRequired 
              ? 'Single Schengen visa required for all these destinations'
              : 'No visa required for any of these Schengen destinations'
            }
          </p>
          {consulateRecommendation && (
            <p className="text-sm mt-2">
              <strong>Recommended consulate:</strong> {consulateRecommendation.primaryConsulate.countryName}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchengenCountriesCard;
