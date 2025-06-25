
import React from 'react';
import { Clock, Globe, FileText } from 'lucide-react';

interface VisaDetailsCardsProps {
  visaType: string;
  destination: string;
}

const VisaDetailsCards = ({ visaType, destination }: VisaDetailsCardsProps) => {
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

  const getVisaTypeName = () => {
    switch (visaType) {
      case 'schengen-visa':
        return 'Schengen Visa (Type C)';
      case 'national-visa':
        return 'National Visa (Type D)';
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
  );
};

export default VisaDetailsCards;
