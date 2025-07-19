
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
    <div className="space-y-6 py-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-6xl mb-4">🌍</div>
        <h3 className="text-2xl font-bold text-gray-900">Let's plan your escape! ✈️</h3>
        <p className="text-gray-600">Pick your dream spots and budget</p>
      </div>

      {/* Destinations Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 text-center">Where should we take you? 🗺️</h4>
        <p className="text-gray-600 text-center text-sm">Swipe through and pick your favorites!</p>
        
        <div className="grid grid-cols-3 gap-3">
          {destinations.map((destination) => {
            const isSelected = formData.destinations?.includes(destination.id);
            
            return (
              <Card 
                key={destination.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-pink-300 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => handleDestinationToggle(destination.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{destination.flag}</div>
                  <h5 className="font-bold text-gray-900 text-xs">{destination.name}</h5>
                  {isSelected && (
                    <div className="mt-2">
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-white">💕</span>
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
        <h4 className="text-lg font-semibold text-gray-900 text-center">What's your vibe? 💸</h4>
        <div className="space-y-3">
          {budgetRanges.map((budget) => {
            const isSelected = formData.budget === budget.id;
            
            return (
              <Card 
                key={budget.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-4 ring-green-300 bg-gradient-to-r from-green-50 to-blue-50 border-green-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => updateFormData('budget', budget.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${budget.color} p-3 rounded-full text-2xl`}>
                      {budget.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900">{budget.label}</h5>
                      <p className="text-lg font-bold text-green-600">{budget.range}</p>
                      <p className="text-gray-600">{budget.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-green-600">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white">💚</span>
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
        <h4 className="text-lg font-semibold text-gray-900 text-center">When do you want to escape? 📅</h4>
        <Card className="overflow-hidden hover:shadow-lg transition-all bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-3xl">📅</div>
              <Input
                placeholder="When are you thinking? ✨"
                value={formData.travelDates}
                onChange={(e) => updateFormData('travelDates', e.target.value)}
                className="text-center text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-full"
              />
              <p className="text-sm text-purple-700">
                Summer vibes? Winter magic? We'll find the perfect time! 🌟
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selection Summary */}
      {(formData.destinations?.length > 0 || formData.budget) && (
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
          <div className="text-center space-y-3">
            <div className="text-3xl">🎯</div>
            <h5 className="font-bold text-pink-900">Looking good so far!</h5>
            <div className="space-y-2 text-pink-800">
              {formData.destinations?.length > 0 && (
                <p className="text-sm">
                  <span className="font-semibold">Dream spots:</span> {
                    destinations
                      .filter(d => formData.destinations.includes(d.id))
                      .map(d => d.name)
                      .join(', ')
                  }
                </p>
              )}
              {formData.budget && (
                <p className="text-sm">
                  <span className="font-semibold">Budget vibes:</span> {
                    budgetRanges.find(b => b.id === formData.budget)?.range
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTripStep3;
