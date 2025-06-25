
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowRight, Phone, FileText } from 'lucide-react';
import { destinationCountries } from '@/data/visaRequirementsDatabase';
import { Link } from 'react-router-dom';

interface VisaRequiredResultProps {
  nationality: string;
  destination: string;
  message: string;
  visaType: string;
  isSchengen: boolean;
  onReset: () => void;
}

const VisaRequiredResult = ({ 
  nationality, 
  destination, 
  message, 
  visaType, 
  isSchengen,
  onReset 
}: VisaRequiredResultProps) => {
  const destinationInfo = destinationCountries.find(c => c.code === destination);

  const getVisaRoute = () => {
    if (visaType === 'long-stay-visa' || visaType === 'national-visa') {
      return '/visas/long-stay';
    }
    return '/visas/short-stay';
  };

  return (
    <div className="space-y-6">
      {/* Warning Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-orange-800 mb-2">
          ⚠️ Visa Required
        </h3>
        <p className="text-lg text-gray-700 mb-4">{message}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge className="bg-orange-100 text-orange-800">
            {destinationInfo?.flag} {destinationInfo?.name}
          </Badge>
          <Badge variant="outline">{nationality}</Badge>
          <Badge variant="outline">{visaType.replace('-', ' ')}</Badge>
        </div>
      </div>

      {/* Urgency Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-800 mb-2">⏰ Time-Sensitive:</h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Processing times: 15-30 business days minimum</li>
          <li>• Peak seasons may have longer delays</li>
          <li>• Start your application immediately</li>
          <li>• Rush processing may be available for additional fees</li>
        </ul>
      </div>

      {/* Schengen Advantage */}
      {isSchengen && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Schengen Advantage:</h4>
          <p className="text-sm text-blue-700">
            One Schengen visa allows you to visit all 27 Schengen countries! 
            Perfect for exploring multiple European destinations in one trip.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link to={getVisaRoute()}>
          <Button size="lg" className="w-full bg-red-600 hover:bg-red-700">
            <FileText className="w-5 h-5 mr-2" />
            Start Visa Application Now
          </Button>
        </Link>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
          onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
        >
          <Phone className="w-5 h-5 mr-2" />
          Get Expert Visa Assistance
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Document Checklist
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Processing Times
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={onReset}
          className="w-full text-gray-600"
        >
          Check Another Destination
        </Button>
      </div>

      {/* Success Rate */}
      <div className="text-center bg-gray-50 rounded-lg p-4">
        <div className="text-2xl font-bold text-green-600">98%</div>
        <div className="text-sm text-gray-600">Success Rate</div>
        <div className="text-xs text-gray-500 mt-1">
          Over 10,000 successful applications processed
        </div>
      </div>
    </div>
  );
};

export default VisaRequiredResult;
