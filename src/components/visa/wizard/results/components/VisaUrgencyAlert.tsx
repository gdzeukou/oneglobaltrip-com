
import React from 'react';

interface VisaUrgencyAlertProps {
  visaType: string;
}

const VisaUrgencyAlert = ({ visaType }: VisaUrgencyAlertProps) => {
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

  return (
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
  );
};

export default VisaUrgencyAlert;
