
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Plane, ArrowRight, Package2 } from 'lucide-react';
import { destinationCountries } from '@/data/visaRequirementsDatabase';
import { getDestinationPackagesEnhanced } from '@/utils/enhancedVisaRequirements';

interface NoVisaRequiredResultProps {
  nationality: string;
  destination: string;
  message: string;
  maxStayDays: number;
  onReset: () => void;
}

const NoVisaRequiredResult = ({ 
  nationality, 
  destination, 
  message, 
  maxStayDays, 
  onReset 
}: NoVisaRequiredResultProps) => {
  const destinationInfo = destinationCountries.find(c => c.code === destination);
  const packages = getDestinationPackagesEnhanced(destination);

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          🎉 {message}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge className="bg-green-100 text-green-800">
            {destinationInfo?.flag} {destinationInfo?.name}
          </Badge>
          <Badge variant="outline">
            Up to {maxStayDays} days
          </Badge>
          <Badge variant="outline">
            {nationality}
          </Badge>
        </div>
      </div>

      {/* Travel Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">✈️ Travel Essentials:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Valid passport (6+ months remaining)</li>
          <li>• Proof of return/onward travel</li>
          <li>• Travel insurance recommended</li>
          <li>• Check current entry requirements</li>
        </ul>
      </div>

      {/* Package Recommendations */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-gray-900 flex items-center">
          <Package2 className="w-5 h-5 mr-2 text-blue-600" />
          Hand-Picked {destinationInfo?.name} Packages
        </h4>
        
        <div className="grid gap-4">
          {packages.map((pkg, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900">{pkg.title}</h5>
                    <p className="text-sm text-gray-600">Starting from</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-900">
                      ${pkg.price.toLocaleString()}
                    </div>
                    <Button size="sm" className="mt-2">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          size="lg" 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => window.open('/packages', '_blank')}
        >
          <Plane className="w-5 h-5 mr-2" />
          Explore All {destinationInfo?.name} Packages
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full"
          onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
        >
          Book Free Travel Consultation
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onReset}
          className="w-full text-gray-600"
        >
          Check Another Destination
        </Button>
      </div>
    </div>
  );
};

export default NoVisaRequiredResult;
