
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, DollarSign, Calendar } from 'lucide-react';

interface StartTripStep3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StartTripStep3 = ({ formData, updateFormData }: StartTripStep3Props) => {
  const destinations = [
    { id: 'france', name: 'France', flag: '🇫🇷', color: 'from-blue-500 to-red-500' },
    { id: 'germany', name: 'Germany', flag: '🇩🇪', color: 'from-red-500 to-yellow-500' },
    { id: 'italy', name: 'Italy', flag: '🇮🇹', color: 'from-green-500 to-red-500' },
    { id: 'spain', name: 'Spain', flag: '🇪🇸', color: 'from-red-500 to-yellow-500' },
    { id: 'netherlands', name: 'Netherlands', flag: '🇳🇱', color: 'from-red-500 to-blue-500' },
    { id: 'greece', name: 'Greece', flag: '🇬🇷', color: 'from-blue-500 to-white' },
    { id: 'portugal', name: 'Portugal', flag: '🇵🇹', color: 'from-green-500 to-red-500' },
    { id: 'switzerland', name: 'Switzerland', flag: '🇨🇭', color: 'from-red-500 to-white' },
    { id: 'austria', name: 'Austria', flag: '🇦🇹', color: 'from-red-500 to-white' },
    { id: 'belgium', name: 'Belgium', flag: '🇧🇪', color: 'from-black to-yellow' },
    { id: 'denmark', name: 'Denmark', flag: '🇩🇰', color: 'from-red-500 to-white' },
    { id: 'sweden', name: 'Sweden', flag: '🇸🇪', color: 'from-blue-500 to-yellow-500' }
  ];

  const budgetRanges = [
    { id: 'budget', label: 'Budget Explorer', range: '$1,000 - $2,500', icon: '💰', color: 'from-green-500 to-emerald-500', description: 'Smart spending, great experiences' },
    { id: 'mid', label: 'Comfortable Journey', range: '$2,500 - $5,000', icon: '🌟', color: 'from-blue-500 to-indigo-500', description: 'Balance of comfort and value' },
    { id: 'luxury', label: 'Luxury Experience', range: '$5,000 - $10,000', icon: '💎', color: 'from-purple-500 to-pink-500', description: 'Premium comfort and service' },
    { id: 'premium', label: 'Ultra-Premium', range: '$10,000+', icon: '👑', color: 'from-yellow-500 to-orange-500', description: 'The finest money can buy' }
  ];

  const handleDestinationToggle = (destinationId: string) => {
    const currentDestinations = formData.destinations || [];
    const isSelected = currentDestinations.includes(destinationId);
    
    if (isSelected) {
      updateFormData('destinations', currentDestinations.filter((d: string) => d !== destinationId));
    } else {
      updateFormData('destinations', [...currentDestinations, destinationId]);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900">Where Do You Want to Explore?</h3>
        <p className="text-lg text-gray-600">Select your dream destinations and set your budget</p>
      </div>

      {/* Destinations Selection */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Choose Your Destinations
        </h4>
        <p className="text-gray-600">Select one or more countries you'd like to visit</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {destinations.map((destination) => {
            const isSelected = formData.destinations?.includes(destination.id);
            
            return (
              <Card 
                key={destination.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => handleDestinationToggle(destination.id)}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-2xl mb-2">{destination.flag}</div>
                  <h5 className="font-semibold text-gray-900 text-sm">{destination.name}</h5>
                  {isSelected && (
                    <div className="mt-2">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Budget Selection */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600" />
          What's Your Budget Range?
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {budgetRanges.map((budget) => {
            const isSelected = formData.budget === budget.id;
            
            return (
              <Card 
                key={budget.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-green-300 bg-gradient-to-r from-green-50 to-blue-50 border-green-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => updateFormData('budget', budget.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${budget.color} p-3 rounded-lg text-2xl`}>
                      {budget.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{budget.label}</h5>
                      <p className="text-lg font-bold text-green-600">{budget.range}</p>
                      <p className="text-sm text-gray-600">{budget.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-green-600">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Travel Dates */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
          When are you planning to travel?
        </h4>
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <Label htmlFor="travel-dates" className="text-base font-medium mb-2 block">
            Preferred travel dates or time frame
          </Label>
          <Input
            id="travel-dates"
            placeholder="e.g., Summer 2024, December, Next Spring, Flexible..."
            value={formData.travelDates}
            onChange={(e) => updateFormData('travelDates', e.target.value)}
            className="py-3 border-2 border-gray-200 focus:border-purple-500"
          />
          <p className="text-sm text-gray-600 mt-2">
            Don't worry about exact dates - we can help you find the best times to travel!
          </p>
        </div>
      </div>

      {/* Selection Summary */}
      {(formData.destinations?.length > 0 || formData.budget) && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
          <h5 className="font-semibold text-blue-900 mb-3">Your Selection So Far:</h5>
          <div className="space-y-2 text-blue-800">
            {formData.destinations?.length > 0 && (
              <p>
                <span className="font-medium">Destinations:</span> {
                  destinations
                    .filter(d => formData.destinations.includes(d.id))
                    .map(d => d.name)
                    .join(', ')
                }
              </p>
            )}
            {formData.budget && (
              <p>
                <span className="font-medium">Budget:</span> {
                  budgetRanges.find(b => b.id === formData.budget)?.range
                }
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTripStep3;
