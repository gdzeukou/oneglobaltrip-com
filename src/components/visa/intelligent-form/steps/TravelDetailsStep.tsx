
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ApplicationData } from '../IntelligentVisaForm';
import { VisaType, DynamicQuestion } from '../hooks/useVisaIntelligence';
import { destinationCountries, tripPurposes } from '@/data/visaRequirementsDatabase';
import { CheckCircle, MapPin, Clock, DollarSign } from 'lucide-react';

interface TravelDetailsStepProps {
  formData: ApplicationData;
  onInputChange: (field: string, value: any) => void;
  recommendedVisaType: VisaType | null;
  dynamicQuestions: DynamicQuestion[];
  onDynamicFieldChange: (field: string, value: any) => void;
}

const TravelDetailsStep = ({ 
  formData, 
  onInputChange, 
  recommendedVisaType,
  dynamicQuestions,
  onDynamicFieldChange 
}: TravelDetailsStepProps) => {

  const calculateDuration = () => {
    if (formData.departureDate && formData.returnDate) {
      const departure = new Date(formData.departureDate);
      const returnDate = new Date(formData.returnDate);
      const diffTime = Math.abs(returnDate.getTime() - departure.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      onInputChange('duration', diffDays);
      return diffDays;
    }
    return 0;
  };

  React.useEffect(() => {
    calculateDuration();
  }, [formData.departureDate, formData.returnDate]);

  const renderDynamicQuestion = (question: DynamicQuestion) => {
    if (question.condition && !question.condition(formData)) {
      return null;
    }

    switch (question.type) {
      case 'select':
        return (
          <div key={question.id}>
            <Label htmlFor={question.id}>{question.question}</Label>
            <Select
              value={formData.dynamicFields[question.id] || ''}
              onValueChange={(value) => onDynamicFieldChange(question.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={question.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={question.id}
              checked={formData.dynamicFields[question.id] || false}
              onChange={(e) => onDynamicFieldChange(question.id, e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <Label htmlFor={question.id}>{question.question}</Label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Details</h3>
        <p className="text-gray-600 mb-6">
          Tell us about your travel plans so we can recommend the best visa option.
        </p>
      </div>

      {/* Recommended Visa Type */}
      {recommendedVisaType && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  Recommended: {recommendedVisaType.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">{recommendedVisaType.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">{recommendedVisaType.processingTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {recommendedVisaType.price === 0 ? 'Free' : `$${recommendedVisaType.price}`}
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="destination">Destination Country *</Label>
          <Select
            value={formData.destination}
            onValueChange={(value) => onInputChange('destination', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {destinationCountries.map((country) => (
                <SelectItem key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="travelPurpose">Purpose of Travel *</Label>
          <Select
            value={formData.travelPurpose}
            onValueChange={(value) => onInputChange('travelPurpose', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              {tripPurposes.map((purpose) => (
                <SelectItem key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="departureDate">Departure Date *</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => onInputChange('departureDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <Label htmlFor="returnDate">Return Date *</Label>
          <Input
            id="returnDate"
            type="date"
            value={formData.returnDate}
            onChange={(e) => onInputChange('returnDate', e.target.value)}
            min={formData.departureDate || new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <Label htmlFor="employmentStatus">Employment Status</Label>
          <Select
            value={formData.employmentStatus}
            onValueChange={(value) => onInputChange('employmentStatus', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self-employed">Self-Employed</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="monthlyIncome">Monthly Income (USD)</Label>
          <Select
            value={formData.monthlyIncome}
            onValueChange={(value) => onInputChange('monthlyIncome', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-1000">Under $1,000</SelectItem>
              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="over-10000">Over $10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.duration > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-medium">
            Trip Duration: {formData.duration} days
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="accommodationDetails">Accommodation Details</Label>
        <Textarea
          id="accommodationDetails"
          value={formData.accommodationDetails}
          onChange={(e) => onInputChange('accommodationDetails', e.target.value)}
          placeholder="Hotel name, address, or host details..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="travelHistory">Previous Travel History</Label>
        <Textarea
          id="travelHistory"
          value={formData.travelHistory}
          onChange={(e) => onInputChange('travelHistory', e.target.value)}
          placeholder="List countries you've visited in the past 5 years..."
          rows={3}
        />
      </div>

      {/* Dynamic Questions */}
      {dynamicQuestions.length > 0 && (
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Country-Specific Requirements</h4>
          <div className="space-y-4">
            {dynamicQuestions.map(renderDynamicQuestion)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelDetailsStep;
