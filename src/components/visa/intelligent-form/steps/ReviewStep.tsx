
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationData } from '../IntelligentVisaForm';
import { VisaType, RequiredDocument, Deal } from '../hooks/useVisaIntelligence';
import { CheckCircle2, Clock, MapPin, DollarSign, Tag, AlertTriangle } from 'lucide-react';

interface ReviewStepProps {
  formData: ApplicationData;
  recommendedVisaType: VisaType | null;
  requiredDocuments: RequiredDocument[];
  estimatedProcessingTime: string;
  applicableDeals: Deal[];
}

const ReviewStep = ({ 
  formData, 
  recommendedVisaType, 
  requiredDocuments, 
  estimatedProcessingTime,
  applicableDeals 
}: ReviewStepProps) => {

  const calculateTotalPrice = () => {
    if (!recommendedVisaType) return 0;
    
    let basePrice = recommendedVisaType.price;
    let totalDiscount = 0;
    
    applicableDeals.forEach(deal => {
      if (deal.type === 'percentage') {
        totalDiscount += (basePrice * deal.discount) / 100;
      } else {
        totalDiscount += deal.discount;
      }
    });
    
    return Math.max(0, basePrice - totalDiscount);
  };

  const calculateDuration = () => {
    if (!formData.departureDate || !formData.returnDate) return 'Not specified';
    const departure = new Date(formData.departureDate);
    const returnDate = new Date(formData.returnDate);
    const diffTime = Math.abs(returnDate.getTime() - departure.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const renderPersonalInfo = () => (
    <Card>
      <CardContent className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Name:</span>
            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <p className="font-medium">{formData.email}</p>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>
            <p className="font-medium">{formData.phone}</p>
          </div>
          <div>
            <span className="text-gray-600">Nationality:</span>
            <p className="font-medium">{formData.nationality}</p>
          </div>
          <div>
            <span className="text-gray-600">Date of Birth:</span>
            <p className="font-medium">{formData.dateOfBirth || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-gray-600">Passport Number:</span>
            <p className="font-medium">{formData.passportNumber}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTravelInfo = () => (
    <Card>
      <CardContent className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Travel Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Destination:</span>
            <p className="font-medium">{formData.destination}</p>
          </div>
          <div>
            <span className="text-gray-600">Purpose:</span>
            <p className="font-medium">{formData.travelPurpose}</p>
          </div>
          <div>
            <span className="text-gray-600">Departure Date:</span>
            <p className="font-medium">{new Date(formData.departureDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-600">Return Date:</span>
            <p className="font-medium">{formData.returnDate ? new Date(formData.returnDate).toLocaleDateString() : 'Not specified'}</p>
          </div>
          <div>
            <span className="text-gray-600">Duration:</span>
            <p className="font-medium">{calculateDuration()}</p>
          </div>
          <div>
            <span className="text-gray-600">Employment:</span>
            <p className="font-medium">{formData.employmentStatus || 'Not specified'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVisaType = () => (
    recommendedVisaType && (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-green-900 mb-2">
                {recommendedVisaType.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">{recommendedVisaType.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">{estimatedProcessingTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    ${calculateTotalPrice()}
                    {applicableDeals.length > 0 && (
                      <span className="line-through ml-2 text-gray-600">
                        ${recommendedVisaType.price}
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {recommendedVisaType.category.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );

  const renderDeals = () => (
    applicableDeals.length > 0 && (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Applied Discounts</h4>
          </div>
          <div className="space-y-3">
            {applicableDeals.map((deal) => (
              <div key={deal.id} className="flex items-start space-x-3">
                <CheckCircle2 className="h-4 w-4 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-900">{deal.title}</p>
                  <p className="text-sm text-blue-800">{deal.description}</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Save: {deal.type === 'percentage' ? `${deal.discount}%` : `$${deal.discount}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  );

  const renderDocuments = () => (
    <Card>
      <CardContent className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Document Checklist</h4>
        <div className="space-y-3">
          {requiredDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center space-x-3">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
              {doc.required && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Review Your Application</h3>
        <p className="text-gray-600 mb-6">
          Please review all information before submitting your visa application.
        </p>
      </div>

      {renderVisaType()}
      {renderDeals()}
      {renderPersonalInfo()}
      {renderTravelInfo()}
      {renderDocuments()}

      {/* Final Price Summary */}
      <Card className="border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Total Cost</h4>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                ${calculateTotalPrice()}
              </div>
              {applicableDeals.length > 0 && (
                <div className="text-sm text-gray-600">
                  You saved: ${recommendedVisaType?.price ? recommendedVisaType.price - calculateTotalPrice() : 0}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Processing time: {estimatedProcessingTime}</p>
            <p>• Price includes: Government fees + Service charges</p>
            <p>• Payment will be processed after document review</p>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Before You Submit</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Double-check all information is accurate and matches your passport</li>
                <li>• Ensure all required documents are uploaded and legible</li>
                <li>• Processing time starts after we receive complete documentation</li>
                <li>• You will receive confirmation and tracking details via email</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;
