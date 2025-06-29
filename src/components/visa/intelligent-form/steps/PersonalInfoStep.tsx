
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApplicationData } from '../IntelligentVisaForm';
import { DynamicQuestion } from '../hooks/useVisaIntelligence';
import { allCountries } from '@/utils/visaRequirements';

interface PersonalInfoStepProps {
  formData: ApplicationData;
  onInputChange: (field: string, value: any) => void;
  dynamicQuestions: DynamicQuestion[];
  onDynamicFieldChange: (field: string, value: any) => void;
}

const PersonalInfoStep = ({ 
  formData, 
  onInputChange, 
  dynamicQuestions, 
  onDynamicFieldChange 
}: PersonalInfoStepProps) => {
  
  const renderDynamicQuestion = (question: DynamicQuestion) => {
    if (question.condition && !question.condition(formData)) {
      return null;
    }

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id}>
            <Label htmlFor={question.id}>{question.question}</Label>
            <Input
              id={question.id}
              value={formData.dynamicFields[question.id] || ''}
              onChange={(e) => onDynamicFieldChange(question.id, e.target.value)}
              required={question.required}
            />
          </div>
        );
      
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
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
        <p className="text-gray-600 mb-6">
          Please provide your personal details as they appear on your passport.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            placeholder="As on passport"
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            placeholder="As on passport"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="nationality">Nationality *</Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) => onInputChange('nationality', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {allCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="passportNumber">Passport Number *</Label>
          <Input
            id="passportNumber"
            value={formData.passportNumber}
            onChange={(e) => onInputChange('passportNumber', e.target.value)}
            placeholder="A12345678"
            required
          />
        </div>

        <div>
          <Label htmlFor="passportExpiry">Passport Expiry Date *</Label>
          <Input
            id="passportExpiry"
            type="date"
            value={formData.passportExpiry}
            onChange={(e) => onInputChange('passportExpiry', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Dynamic Questions */}
      {dynamicQuestions.length > 0 && (
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dynamicQuestions.map(renderDynamicQuestion)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoStep;
