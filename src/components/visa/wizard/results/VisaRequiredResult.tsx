
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { destinationCountries } from '@/data/visaRequirementsDatabase';
import VisaDetailsCards from './components/VisaDetailsCards';
import VisaAdvantageCard from './components/VisaAdvantageCard';
import VisaUrgencyAlert from './components/VisaUrgencyAlert';
import VisaActionButtons from './components/VisaActionButtons';
import VisaSuccessRate from './components/VisaSuccessRate';
import NationalVisaCategories from './components/NationalVisaCategories';

interface VisaRequiredResultProps {
  nationality: string;
  destination: string;
  message: string;
  visaType: string;
  isSchengen: boolean;
  nationalVisaCategories?: any[];
  regionalMovement?: any;
  onReset: () => void;
}

const VisaRequiredResult = ({ 
  nationality, 
  destination, 
  message, 
  visaType, 
  isSchengen,
  nationalVisaCategories,
  regionalMovement,
  onReset 
}: VisaRequiredResultProps) => {
  const destinationInfo = destinationCountries.find(c => c.code === destination);
  const isNationalVisa = visaType === 'national-visa' || visaType.includes('long-stay');

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
      case 'usa-long-stay':
        return 'US Long-Stay Visa';
      case 'canada-long-stay':
        return 'Canada Long-Stay Visa';
      case 'uae-long-stay':
        return 'UAE Long-Stay Visa';
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
          {isNationalVisa ? '🏛️ National Visa Required' : '⚠️ Visa Required'}
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

      {/* National Visa Categories for long-stay visas */}
      {isNationalVisa && nationalVisaCategories && (
        <NationalVisaCategories 
          categories={nationalVisaCategories}
          destination={destination}
          purpose="long-stay"
        />
      )}

      {/* Regional Movement Rules for Schengen Type D */}
      {regionalMovement && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">🌍 Regional Movement Rights</h4>
          <p className="text-sm text-blue-700 mb-2">{regionalMovement.description}</p>
          <div className="text-xs text-blue-600">
            <div>• <strong>Travel allowance:</strong> {regionalMovement.allowedTravel}</div>
            <div>• <strong>Restrictions:</strong> {regionalMovement.restrictions}</div>
          </div>
        </div>
      )}

      {/* Standard visa details for short-stay visas */}
      {!isNationalVisa && (
        <>
          <VisaDetailsCards visaType={visaType} destination={destination} />
          <VisaAdvantageCard visaType={visaType} isSchengen={isSchengen} />
          <VisaUrgencyAlert visaType={visaType} />
        </>
      )}

      {/* Action Buttons */}
      <VisaActionButtons visaType={visaType} onReset={onReset} />

      {/* Success Rate */}
      <VisaSuccessRate />
    </div>
  );
};

export default VisaRequiredResult;
