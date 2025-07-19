
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
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <Plane className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900">What's Your Dream trip Vibe?</h3>
        <p className="text-lg text-gray-600">Tell us about the type of journey you're envisioning</p>
      </div>

      {/* Travel Type Selection */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">Travel Purpose</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {travelTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.travelType === type.id;
            
            return (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-blue-300 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => updateFormData('travelType', type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${type.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{type.label}</h5>
                      <p className="text-sm text-gray-600">{type.description}</p>
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

      {/* Number of Travelers */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">How Many Travelers?</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {travelerCounts.map((count) => {
            const isSelected = formData.travelers === count.id;
            
            return (
              <Card 
                key={count.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-green-300 bg-gradient-to-r from-green-50 to-blue-50 border-green-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => updateFormData('travelers', count.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{count.icon}</div>
                  <h5 className="font-semibold text-gray-900">{count.label}</h5>
                  <p className="text-xs text-gray-600">{count.description}</p>
                  {isSelected && (
                    <div className="mt-2">
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mx-auto">
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

      {/* Trip Duration */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">How Long is Your Adventure?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {durations.map((duration) => {
            const isSelected = formData.duration === duration.id;
            
            return (
              <Card 
                key={duration.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300' 
                    : 'hover:shadow-lg hover:border-gray-300'
                }`}
                onClick={() => updateFormData('duration', duration.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{duration.icon}</div>
                  <h5 className="font-semibold text-gray-900 text-sm">{duration.label}</h5>
                  <p className="text-xs text-gray-600">{duration.description}</p>
                  {isSelected && (
                    <div className="mt-2">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
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
    </div>
  );
};

export default StartTripStep2;
