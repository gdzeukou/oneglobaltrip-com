
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Briefcase, Heart, GraduationCap, Stethoscope, Plane } from 'lucide-react';

interface StartTripStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StartTripStep2 = ({ formData, updateFormData }: StartTripStep2Props) => {
  const travelTypes = [
    { id: 'leisure', label: 'Leisure & Tourism', icon: Heart, color: 'from-pink-500 to-rose-500', description: 'Relaxation and exploration' },
    { id: 'business', label: 'Business Travel', icon: Briefcase, color: 'from-blue-500 to-indigo-500', description: 'Work and networking' },
    { id: 'family', label: 'Family Visit', icon: Users, color: 'from-green-500 to-emerald-500', description: 'Visiting loved ones' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'from-purple-500 to-violet-500', description: 'Learning and studying' },
    { id: 'medical', label: 'Medical', icon: Stethoscope, color: 'from-red-500 to-orange-500', description: 'Health and treatment' }
  ];

  const travelerCounts = [
    { id: '1', label: 'Just Me', icon: '👤', description: 'Solo adventure' },
    { id: '2', label: 'Couple', icon: '👫', description: 'Romantic getaway' },
    { id: '3-4', label: 'Small Group', icon: '👨‍👩‍👧', description: '3-4 people' },
    { id: '5+', label: 'Large Group', icon: '👨‍👩‍👧‍👦', description: '5+ travelers' }
  ];

  const durations = [
    { id: '1-3', label: '1-3 Days', icon: '⚡', description: 'Quick getaway' },
    { id: '4-7', label: '4-7 Days', icon: '🌟', description: 'Perfect week' },
    { id: '1-2', label: '1-2 Weeks', icon: '🌍', description: 'Explore deeply' },
    { id: '3-4', label: '3-4 Weeks', icon: '🏔️', description: 'Extended journey' },
    { id: '1month+', label: '1+ Month', icon: '🌌', description: 'Life-changing experience' }
  ];

  return (
    <div className="space-y-6 py-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-6xl mb-4">✈️</div>
        <h3 className="text-2xl font-bold text-gray-900">What's your vibe? 🌟</h3>
        <p className="text-gray-600">Swipe through and pick what feels right!</p>
      </div>

      {/* Travel Type Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 text-center">What brings you joy? 💫</h4>
        <div className="space-y-3">
          {travelTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.travelType === type.id;
            
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-4 ring-pink-300 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => updateFormData('travelType', type.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${type.color} p-4 rounded-full`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 text-lg">{type.label}</h5>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-pink-600">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">💕</span>
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

      {/* Number of Travelers */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 text-center">Who's coming along? 👫</h4>
        <div className="grid grid-cols-2 gap-3">
          {travelerCounts.map((count) => {
            const isSelected = formData.travelers === count.id;
            
            return (
              <Card 
                key={count.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => updateFormData('travelers', count.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{count.icon}</div>
                  <h5 className="font-bold text-gray-900">{count.label}</h5>
                  <p className="text-sm text-gray-600">{count.description}</p>
                  {isSelected && (
                    <div className="mt-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-white">💙</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Trip Duration */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 text-center">How long do you want to escape? ⏰</h4>
        <div className="grid grid-cols-1 gap-3">
          {durations.map((duration) => {
            const isSelected = formData.duration === duration.id;
            
            return (
              <Card 
                key={duration.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-4 ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-lg' 
                    : 'hover:shadow-md hover:border-gray-300 bg-white'
                }`}
                onClick={() => updateFormData('duration', duration.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{duration.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900">{duration.label}</h5>
                      <p className="text-gray-600">{duration.description}</p>
                    </div>
                    {isSelected && (
                      <div className="text-purple-600">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white">✨</span>
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
    </div>
  );
};

export default StartTripStep2;
