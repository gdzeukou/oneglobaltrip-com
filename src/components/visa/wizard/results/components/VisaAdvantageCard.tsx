
import React from 'react';

interface VisaAdvantageCardProps {
  visaType: string;
  isSchengen: boolean;
}

const VisaAdvantageCard = ({ visaType, isSchengen }: VisaAdvantageCardProps) => {
  if (visaType === 'eta') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">💡 eTA Advantage:</h4>
        <p className="text-sm text-green-700">
          Electronic Travel Authorization is quick, cheap, and valid for multiple entries over 5 years!
        </p>
      </div>
    );
  }

  if (['uae-e-visa', 'brazil-e-visa', 'india-e-visa'].includes(visaType)) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">💡 e-Visa Advantage:</h4>
        <p className="text-sm text-green-700">
          Online e-Visa system allows for faster processing without embassy visits!
        </p>
      </div>
    );
  }

  if (visaType === 'nigeria-visa-on-arrival') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Visa on Arrival:</h4>
        <p className="text-sm text-blue-700">
          Apply online for pre-approval, then collect your visa at the airport upon arrival!
        </p>
      </div>
    );
  }

  if (isSchengen && visaType === 'schengen-visa') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Schengen Advantage:</h4>
        <p className="text-sm text-blue-700">
          One Schengen visa (Type C) allows you to visit all 27 Schengen countries! 
          Perfect for exploring multiple European destinations in one trip.
        </p>
      </div>
    );
  }

  return null;
};

export default VisaAdvantageCard;
