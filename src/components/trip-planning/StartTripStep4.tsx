
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Utensils, ShoppingBag, Music, Mountain, Book, Palette, Building, Waves, Heart } from 'lucide-react';

interface StartTripStep4Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StartTripStep4 = ({ formData, updateFormData }: StartTripStep4Props) => {
  const interests = [
    { id: 'cultural', name: 'Cultural Sites', icon: Building, color: 'from-amber-500 to-orange-500', description: 'Museums, temples, heritage sites' },
    { id: 'food', name: 'Food & Wine', icon: Utensils, color: 'from-red-500 to-pink-500', description: 'Local cuisine and dining experiences' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'from-purple-500 to-indigo-500', description: 'Markets, boutiques, local crafts' },
    { id: 'nightlife', name: 'Nightlife', icon: Music, color: 'from-blue-500 to-purple-500', description: 'Bars, clubs, entertainment' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: 'from-green-500 to-emerald-500', description: 'Hiking, sports, outdoor activities' },
    { id: 'nature', name: 'Nature', icon: Waves, color: 'from-teal-500 to-green-500', description: 'Parks, beaches, natural wonders' },
    { id: 'history', name: 'History', icon: Book, color: 'from-brown-500 to-amber-500', description: 'Historical sites and stories' },
    { id: 'art', name: 'Art', icon: Palette, color: 'from-pink-500 to-rose-500', description: 'Galleries, street art, creativity' },
    { id: 'photography', name: 'Photography', icon: Camera, color: 'from-gray-500 to-slate-500', description: 'Perfect spots for amazing photos' },
    { id: 'relaxation', name: 'Relaxation', icon: Heart, color: 'from-rose-500 to-pink-500', description: 'Spas, wellness, peaceful moments' }
  ];

  const travelStyles = [
    { id: 'backpacker', name: 'Budget Backpacker', icon: '🎒', description: 'Hostels, street food, local transport', color: 'from-green-500 to-teal-500' },
    { id: 'comfort', name: 'Comfort Traveler', icon: '🏨', description: 'Mid-range hotels, guided tours, convenience', color: 'from-blue-500 to-indigo-500' },
    { id: 'luxury', name: 'Luxury Explorer', icon: '✨', description: 'Premium accommodations, fine dining, VIP experiences', color: 'from-purple-500 to-pink-500' },
    { id: 'authentic', name: 'Cultural Immersion', icon: '🌍', description: 'Local experiences, authentic connections, off-beaten-path', color: 'from-orange-500 to-red-500' }
  ];

  const handleInterestToggle = (interestId: string) => {
    const currentInterests = formData.interests || [];
    const isSelected = currentInterests.includes(interestId);
    
    if (isSelected) {
      updateFormData('interests', currentInterests.filter((i: string) => i !== interestId));
    } else {
      updateFormData('interests', [...currentInterests, interestId]);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <Heart className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900">What Makes You Excited?</h3>
        <p className="text-lg text-gray-600">Tell us about your interests so we can craft the perfect experiences</p>
      </div>

      {/* Interests Selection */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">Select Your Interests</h4>
        <p className="text-gray-600">Choose as many as you'd like - the more we know, the better we can help!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = formData.interests?.includes(interest.id);
            
            return (
              <Card 
                key={interest.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => handleInterestToggle(interest.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${interest.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{interest.name}</h5>
                      <p className="text-sm text-gray-600">{interest.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-blue-600">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
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

      {/* Travel Style */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">What's Your Travel Style?</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {travelStyles.map((style) => {
            const isSelected = formData.travelStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-green-300 bg-gradient-to-r from-green-50 to-blue-50 border-green-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => updateFormData('travelStyle', style.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${style.color} p-3 rounded-lg text-2xl`}>
                      {style.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{style.name}</h5>
                      <p className="text-sm text-gray-600">{style.description}</p>
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

      {/* Selection Summary */}
      {formData.interests?.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
          <h5 className="font-semibold text-blue-900 mb-3">Your Travel Personality:</h5>
          <div className="space-y-2 text-blue-800">
            <p>
              <span className="font-medium">You're interested in:</span> {
                interests
                  .filter(i => formData.interests.includes(i.id))
                  .map(i => i.name)
                  .join(', ')
              }
            </p>
            {formData.travelStyle && (
              <p>
                <span className="font-medium">Travel style:</span> {
                  travelStyles.find(s => s.id === formData.travelStyle)?.name
                }
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTripStep4;
