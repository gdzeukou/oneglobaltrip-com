
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { MultiDestinationVisaCheck } from '@/data/visaRequirementsDatabase';

interface Destination {
  country: string;
  purpose: string;
}

interface NonSchengenCountriesCardsProps {
  nonSchengenDestinations: Destination[];
  visaCheck: MultiDestinationVisaCheck;
}

const NonSchengenCountriesCards = ({ nonSchengenDestinations, visaCheck }: NonSchengenCountriesCardsProps) => {
  if (nonSchengenDestinations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {nonSchengenDestinations.map((dest, index) => {
        const requiresVisa = visaCheck.individualVisasRequired.includes(dest.country);
        
        return (
          <Card key={index} className={`border-2 ${requiresVisa ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}`}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {requiresVisa ? (
                  <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                )}
                <h4 className="font-bold text-lg">{dest.country}</h4>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600">Purpose: {dest.purpose}</div>
              </div>

              <div className={`p-4 rounded-lg ${requiresVisa ? 'bg-orange-100' : 'bg-green-100'}`}>
                <p className="text-sm">
                  {requiresVisa 
                    ? `Separate visa required for ${dest.country}`
                    : `No visa required for ${dest.country}`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NonSchengenCountriesCards;
