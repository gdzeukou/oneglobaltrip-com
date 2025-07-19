
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
    <div className="space-y-6 py-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-6xl mb-4">😍</div>
        <h3 className="text-2xl font-bold text-gray-900">What gets your heart racing?</h3>
        <p className="text-gray-600">Pick all the things that make you smile! 💕</p>
      </div>

      {/* Interests Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 text-center">Your perfect day includes... 🌈</h4>
        
        <div className="space-y-3">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = formData.interests?.includes(interest.id);
            
            return (
              <Card 
                key={interest.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-4 ring-pink-300 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => handleInterestToggle(interest.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${interest.color} p-3 rounded-full`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900">{interest.name}</h5>
                      <p className="text-gray-600">{interest.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-pink-600">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white">😍</span>
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
        <h4 className="text-lg font-semibold text-gray-900 text-center">What's your travel personality? ✨</h4>
        <div className="space-y-3">
          {travelStyles.map((style) => {
            const isSelected = formData.travelStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-4 ring-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => updateFormData('travelStyle', style.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${style.color} p-4 rounded-full text-2xl`}>
                      {style.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900">{style.name}</h5>
                      <p className="text-gray-600">{style.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-blue-600">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white">🎯</span>
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
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
          <div className="text-center space-y-3">
            <div className="text-3xl">💖</div>
            <h5 className="font-bold text-pink-900">Your vibe is amazing!</h5>
            <div className="space-y-2 text-pink-800">
              <p className="text-sm">
                <span className="font-semibold">You love:</span> {
                  interests
                    .filter(i => formData.interests.includes(i.id))
                    .map(i => i.name)
                    .join(', ')
                }
              </p>
              {formData.travelStyle && (
                <p className="text-sm">
                  <span className="font-semibold">Style:</span> {
                    travelStyles.find(s => s.id === formData.travelStyle)?.name
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

export default StartTripStep4;
