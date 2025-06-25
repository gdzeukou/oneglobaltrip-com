
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  Clock, 
  CreditCard, 
  FileText, 
  Fingerprint, 
  ExternalLink,
  User,
  AlertTriangle
} from 'lucide-react';
import { useVisaPageContext } from './hooks/useVisaPageContext';
import { useVisaRequirements, VisaRequirement, FeeBreakdown } from './hooks/useVisaRequirements';

interface DynamicVisaChecklistProps {
  onStartApplication?: () => void;
}

const DynamicVisaChecklist = ({ onStartApplication }: DynamicVisaChecklistProps) => {
  const context = useVisaPageContext();
  const requirements = useVisaRequirements(context);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  if (!requirements) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            Requirements Not Available
          </h3>
          <p className="text-orange-700">
            Detailed requirements for this visa type are being updated. 
            Please contact our experts for personalized guidance.
          </p>
          <Button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white">
            Get Expert Help
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleItemCheck = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const getItemIcon = (category: string) => {
    switch (category) {
      case 'document': return FileText;
      case 'biometric': return Fingerprint;
      case 'interview': return User;
      case 'fee': return CreditCard;
      default: return FileText;
    }
  };

  const requiredDocuments = requirements.documents;
  const totalItems = requiredDocuments.length + requirements.additionalRequirements.length;
  const checkedCount = checkedItems.size;
  const completionRate = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const totalFees = requirements.fees.reduce((sum, fee) => {
    if (fee.currency === 'USD') return sum + fee.amount;
    if (fee.currency === 'EUR') return sum + (fee.amount * 1.1); // Rough conversion
    if (fee.currency === 'GBP') return sum + (fee.amount * 1.25);
    if (fee.currency === 'CAD') return sum + (fee.amount * 0.75);
    return sum + fee.amount;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-blue-900">
              Your Visa Checklist
            </h3>
            <Badge variant={completionRate === 100 ? 'default' : 'secondary'}>
              {checkedCount}/{totalItems} Complete
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                <strong>Progress:</strong> {Math.round(completionRate)}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                <strong>Processing:</strong> {requirements.processingTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                <strong>Est. Cost:</strong> ~${Math.round(totalFees)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Required Documents
          </h4>
          <div className="space-y-3">
            {requiredDocuments.map((item) => {
              const ItemIcon = getItemIcon(item.category);
              const isChecked = checkedItems.has(item.id);
              
              return (
                <div 
                  key={item.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    isChecked 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Checkbox
                    id={item.id}
                    checked={isChecked}
                    onCheckedChange={() => handleItemCheck(item.id)}
                    className="mt-1"
                  />
                  <ItemIcon className={`w-5 h-5 mt-0.5 ${
                    isChecked ? 'text-green-600' : 'text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <label 
                      htmlFor={item.id}
                      className={`font-medium cursor-pointer ${
                        isChecked ? 'text-green-800 line-through' : 'text-gray-900'
                      }`}
                    >
                      {item.title}
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Requirements */}
      {requirements.additionalRequirements.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              🔐 Additional Requirements
            </h4>
            <div className="space-y-3">
              {requirements.additionalRequirements.map((item) => {
                const ItemIcon = getItemIcon(item.category);
                const isChecked = checkedItems.has(item.id);
                
                return (
                  <div 
                    key={item.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      isChecked 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <Checkbox
                      id={item.id}
                      checked={isChecked}
                      onCheckedChange={() => handleItemCheck(item.id)}
                      className="mt-1"
                    />
                    <ItemIcon className={`w-5 h-5 mt-0.5 ${
                      isChecked ? 'text-green-600' : 'text-orange-600'
                    }`} />
                    <div className="flex-1">
                      <label 
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${
                          isChecked ? 'text-green-800 line-through' : 'text-orange-800'
                        }`}
                      >
                        {item.title}
                      </label>
                      <p className="text-sm text-orange-700 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fee Breakdown */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-green-800 mb-4">
            💰 Fee Breakdown
          </h4>
          <div className="space-y-2">
            {requirements.fees.map((fee, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className={`${fee.optional ? 'text-green-600' : 'text-green-800'}`}>
                  {fee.description} {fee.optional && '(Optional)'}
                </span>
                <span className="font-semibold text-green-800">
                  {fee.amount} {fee.currency}
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-green-200">
              <div className="flex justify-between items-center text-lg font-bold text-green-900">
                <span>Estimated Total (USD):</span>
                <span>${Math.round(totalFees)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={onStartApplication}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          Start Your Application
        </Button>
        {requirements.bookingUrl && (
          <Button 
            variant="outline"
            onClick={() => window.open(requirements.bookingUrl, '_blank')}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        )}
      </div>
    </div>
  );
};

export default DynamicVisaChecklist;
