
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowRight, Phone, FileText, Clock, Globe } from 'lucide-react';
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
    if (visaType === 'national-visa' || visaType === 'uk-long-stay') {
      return '/visas/long-stay';
    }
    return '/visas/short-stay';
  };

  const getVisaTypeName = () => {
    switch (visaType) {
      case 'schengen-visa':
        return 'Schengen Visa (Type C)';
      case 'national-visa':
        return isSchengen ? 'National Visa (Type D)' : 'National Visa';
      case 'uk-standard-visitor':
        return 'UK Standard Visitor Visa';
      case 'uk-long-stay':
        return 'UK Long-Stay Visa';
      case 'eta':
        return destination === 'canada' ? 'Canadian eTA' : 'Electronic Travel Authorization';
      case 'canadian-trv':
        return 'Canadian Temporary Resident Visa';
      case 'uae-e-visa':
        return 'UAE e-Visa';
      case 'brazil-e-visa':
        return 'Brazil e-Visa';
      case 'brazil-visa':
        return 'Brazil Tourist Visa';
      case 'india-e-visa':
        return 'India e-Visa';
      case 'india-visa':
        return 'India Tourist Visa';
      case 'nigeria-visa-on-arrival':
        return 'Nigeria Visa on Arrival';
      default:
        return visaType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const getProcessingTime = () => {
    switch (visaType) {
      case 'schengen-visa':
        return '15-20 business days';
      case 'national-visa':
        return '30-60 business days';
      case 'uk-standard-visitor':
        return '3-8 weeks';
      case 'uk-long-stay':
        return '8-12 weeks';
      case 'eta':
        return 'Usually within minutes';
      case 'canadian-trv':
        return '2-4 weeks';
      case 'uae-e-visa':
        return '3-5 working days';
      case 'brazil-e-visa':
        return '5-10 business days';
      case 'brazil-visa':
        return '5-10 business days';
      case 'india-e-visa':
        return '3-7 business days';
      case 'india-visa':
        return '7-15 business days';
      case 'nigeria-visa-on-arrival':
        return '3-7 business days (online pre-approval)';
      default:
        return '7-21 business days';
    }
  };

  const getApplicationMethod = () => {
    switch (visaType) {
      case 'eta':
        return 'Online application only';
      case 'uae-e-visa':
      case 'brazil-e-visa':
      case 'india-e-visa':
        return 'Online e-Visa application';
      case 'nigeria-visa-on-arrival':
        return 'Online pre-approval + airport collection';
      case 'schengen-visa':
        return 'Embassy/Consulate appointment required';
      case 'uk-standard-visitor':
      case 'uk-long-stay':
        return 'Online application + biometrics';
      case 'canadian-trv':
        return 'Online application + biometrics';
      default:
        return 'Embassy/Consulate application';
    }
  };

  const getVisaCost = () => {
    switch (visaType) {
      case 'eta':
        return destination === 'canada' ? '$7 CAD' : 'Low cost';
      case 'schengen-visa':
        return '€80 EUR';
      case 'brazil-e-visa':
        return '~$80 USD';
      case 'india-e-visa':
        return '$25-100 USD';
      case 'uk-standard-visitor':
        return '£100 GBP';
      case 'uae-e-visa':
        return '$100-350 USD';
      default:
        return 'Varies';
    }
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
          <Badge variant="outline">{getVisaTypeName()}</Badge>
        </div>
      </div>

      {/* Visa Details */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-blue-900 mb-1">Processing Time</h4>
          <p className="text-sm text-blue-700">{getProcessingTime()}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <Globe className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-green-900 mb-1">Application Method</h4>
          <p className="text-sm text-green-700">{getApplicationMethod()}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <h4 className="font-semibold text-purple-900 mb-1">Visa Type</h4>
          <p className="text-sm text-purple-700">{getVisaTypeName()}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <span className="text-2xl mb-2 block">💰</span>
          <h4 className="font-semibold text-yellow-900 mb-1">Typical Cost</h4>
          <p className="text-sm text-yellow-700">{getVisaCost()}</p>
        </div>
      </div>

      {/* Special advantages based on visa type */}
      {visaType === 'eta' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">💡 eTA Advantage:</h4>
          <p className="text-sm text-green-700">
            Electronic Travel Authorization is quick, cheap, and valid for multiple entries over 5 years!
          </p>
        </div>
      )}

      {(visaType === 'uae-e-visa' || visaType === 'brazil-e-visa' || visaType === 'india-e-visa') && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">💡 e-Visa Advantage:</h4>
          <p className="text-sm text-green-700">
            Online e-Visa system allows for faster processing without embassy visits!
          </p>
        </div>
      )}

      {visaType === 'nigeria-visa-on-arrival' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Visa on Arrival:</h4>
          <p className="text-sm text-blue-700">
            Apply online for pre-approval, then collect your visa at the airport upon arrival!
          </p>
        </div>
      )}

      {/* Schengen Advantage */}
      {isSchengen && visaType === 'schengen-visa' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Schengen Advantage:</h4>
          <p className="text-sm text-blue-700">
            One Schengen visa (Type C) allows you to visit all 27 Schengen countries! 
            Perfect for exploring multiple European destinations in one trip.
          </p>
        </div>
      )}

      {/* Urgency Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-800 mb-2">⏰ Time-Sensitive:</h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Processing times: {getProcessingTime()}</li>
          <li>• Peak seasons may have longer delays</li>
          <li>• Start your application immediately</li>
          {!['eta', 'uae-e-visa', 'india-e-visa', 'brazil-e-visa'].includes(visaType) && 
            <li>• Rush processing may be available for additional fees</li>}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link to={getVisaRoute()}>
          <Button size="lg" className="w-full bg-red-600 hover:bg-red-700">
            <FileText className="w-5 h-5 mr-2" />
            Start {getVisaTypeName()} Application
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
