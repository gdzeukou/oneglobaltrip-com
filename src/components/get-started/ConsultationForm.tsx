
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  travelDates: string;
  destinations: string;
  travelers: string;
  budget: string;
  interests: string;
}

interface ConsultationFormProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({
  formData,
  onInputChange,
  onSubmit
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <Calendar className="h-5 w-5" />
          <span>Schedule Your Free Consultation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="travelers">Number of Travelers</Label>
              <select
                id="travelers"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.travelers}
                onChange={(e) => onInputChange('travelers', e.target.value)}
              >
                <option value="">Select...</option>
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3-4">3-4 Travelers</option>
                <option value="5+">5+ Travelers</option>
              </select>
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <select
                id="budget"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.budget}
                onChange={(e) => onInputChange('budget', e.target.value)}
              >
                <option value="">Select...</option>
                <option value="under-5000">Under $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-20000">$10,000 - $20,000</option>
                <option value="over-20000">Over $20,000</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="destinations">Interested Destinations</Label>
            <Input
              id="destinations"
              placeholder="e.g., Paris, Rome, Barcelona..."
              value={formData.destinations}
              onChange={(e) => onInputChange('destinations', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="travelDates">Travel Dates (if known)</Label>
            <Input
              id="travelDates"
              placeholder="e.g., June 2024, Summer 2024, Flexible"
              value={formData.travelDates}
              onChange={(e) => onInputChange('travelDates', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="interests">Special Interests</Label>
            <Textarea
              id="interests"
              placeholder="Tell us about your interests, preferences, special occasions..."
              value={formData.interests}
              onChange={(e) => onInputChange('interests', e.target.value)}
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
          >
            Schedule Free Consultation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsultationForm;
