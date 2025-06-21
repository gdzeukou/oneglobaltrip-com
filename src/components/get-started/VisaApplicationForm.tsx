
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface VisaFormData {
  name: string;
  email: string;
  visaType: string;
  nationality: string;
  travelPurpose: string;
  departureDate: string;
  returnDate: string;
  previousVisas: string;
  specialCircumstances: string;
}

interface VisaApplicationFormProps {
  formData: VisaFormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const VisaApplicationForm: React.FC<VisaApplicationFormProps> = ({
  formData,
  onInputChange,
  onSubmit
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <FileText className="h-5 w-5" />
          <span>Visa Application Form</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visa-name">Full Name *</Label>
              <Input
                id="visa-name"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="visa-email">Email *</Label>
              <Input
                id="visa-email"
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visaType">Visa Type *</Label>
              <select
                id="visaType"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.visaType}
                onChange={(e) => onInputChange('visaType', e.target.value)}
                required
              >
                <option value="">Select visa type...</option>
                <option value="schengen">Schengen Visa Pack</option>
                <option value="uk">UK Visa Pass</option>
                <option value="brazil">Brazil eVisa</option>
              </select>
            </div>
            <div>
              <Label htmlFor="nationality">Nationality *</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => onInputChange('nationality', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departureDate">Planned Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={(e) => onInputChange('departureDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="returnDate">Planned Return Date</Label>
              <Input
                id="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={(e) => onInputChange('returnDate', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="travelPurpose">Purpose of Travel</Label>
            <select
              id="travelPurpose"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={formData.travelPurpose}
              onChange={(e) => onInputChange('travelPurpose', e.target.value)}
            >
              <option value="tourism">Tourism</option>
              <option value="business">Business</option>
              <option value="family">Family Visit</option>
              <option value="conference">Conference/Event</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="previousVisas">Previous Visa History</Label>
            <Textarea
              id="previousVisas"
              placeholder="Have you applied for visas to these countries before? Any rejections or special circumstances?"
              value={formData.previousVisas}
              onChange={(e) => onInputChange('previousVisas', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="specialCircumstances">Special Circumstances</Label>
            <Textarea
              id="specialCircumstances"
              placeholder="Any special circumstances we should know about? Urgent travel, complex itinerary, etc."
              value={formData.specialCircumstances}
              onChange={(e) => onInputChange('specialCircumstances', e.target.value)}
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700"
          >
            Submit Visa Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisaApplicationForm;
