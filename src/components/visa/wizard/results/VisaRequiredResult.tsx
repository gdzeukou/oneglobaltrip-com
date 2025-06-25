
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { destinationCountries } from '@/data/visaRequirementsDatabase';
import VisaDetailsCards from './components/VisaDetailsCards';
import VisaAdvantageCard from './components/VisaAdvantageCard';
import VisaUrgencyAlert from './components/VisaUrgencyAlert';
import VisaActionButtons from './components/VisaActionButtons';
import VisaSuccessRate from './components/VisaSuccessRate';

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
      <VisaDetailsCards visaType={visaType} destination={destination} />

      {/* Special advantages based on visa type */}
      <VisaAdvantageCard visaType={visaType} isSchengen={isSchengen} />

      {/* Urgency Alert */}
      <VisaUrgencyAlert visaType={visaType} />

      {/* Action Buttons */}
      <VisaActionButtons visaType={visaType} onReset={onReset} />

      {/* Success Rate */}
      <VisaSuccessRate />
    </div>
  );
};

export default VisaRequiredResult;
