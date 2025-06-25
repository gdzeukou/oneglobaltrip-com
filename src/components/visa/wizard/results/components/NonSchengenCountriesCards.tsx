
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { destinationCountries } from '@/data/visaRequirementsDatabase';
import { Link } from 'react-router-dom';

interface Destination {
  country: string;
  purpose: string;
}

interface VisaCheck {
  destinations: Array<{ destination: string; required: boolean }>;
}

interface NonSchengenCountriesCardsProps {
  nonSchengenDestinations: Destination[];
  visaCheck: VisaCheck;
}

const NonSchengenCountriesCards = ({ 
  nonSchengenDestinations, 
  visaCheck 
}: NonSchengenCountriesCardsProps) => {
  return (
    <>
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
    </>
  );
};

export default NonSchengenCountriesCards;
