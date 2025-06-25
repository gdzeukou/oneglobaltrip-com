
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, MapPin, Users } from 'lucide-react';

interface Destination {
  country: string;
  purpose: string;
}

interface VisaCheck {
  allVisaFree: boolean;
  totalDestinations: number;
  destinations: Array<{ destination: string; required: boolean }>;
}

interface OverallStatusCardsProps {
  visaCheck: VisaCheck;
  schengenDestinations: Destination[];
}

const OverallStatusCards = ({ visaCheck, schengenDestinations }: OverallStatusCardsProps) => {
  return (
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
  );
};

export default OverallStatusCards;
