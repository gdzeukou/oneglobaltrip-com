
import React from 'react';
import { FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import VisaActionButton from './VisaActionButton';

interface VisaActionButtonsProps {
  visaType: string;
  onReset: () => void;
}

const VisaActionButtons = ({ visaType, onReset }: VisaActionButtonsProps) => {
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
        return 'National Visa (Type D)';
      case 'uk-standard-visitor':
        return 'UK Standard Visitor Visa';
      case 'uk-long-stay':
        return 'UK Long-Stay Visa';
      case 'eta':
        return 'Electronic Travel Authorization';
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

  return (
    <div className="space-y-3">
      <Link to={getVisaRoute()}>
        <VisaActionButton
          size="lg"
          className="bg-red-600 hover:bg-red-700"
          icon={FileText}
        >
          Start {getVisaTypeName()} Application
        </VisaActionButton>
      </Link>
      
      <VisaActionButton
        variant="outline"
        size="lg"
        className="border-orange-600 text-orange-600 hover:bg-orange-50"
        icon={Phone}
        href="https://calendly.com/camronm-oneglobaltrip/30min"
      >
        Get Expert Visa Assistance
      </VisaActionButton>
      
      <div className="grid grid-cols-2 gap-3">
        <VisaActionButton
          variant="outline"
          size="sm"
          icon={FileText}
        >
          Document Checklist
        </VisaActionButton>
        <VisaActionButton
          variant="outline"
          size="sm"
          icon={Phone}
        >
          Processing Times
        </VisaActionButton>
      </div>
      
      <VisaActionButton
        variant="ghost"
        className="text-gray-600"
        icon={Phone}
        onClick={onReset}
      >
        Check Another Destination
      </VisaActionButton>
    </div>
  );
};

export default VisaActionButtons;
