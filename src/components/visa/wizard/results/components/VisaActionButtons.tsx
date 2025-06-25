
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  );
};

export default VisaActionButtons;
