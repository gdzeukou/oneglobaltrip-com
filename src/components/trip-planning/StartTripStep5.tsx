
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, MessageCircle, CheckCircle, Plane } from 'lucide-react';

interface StartTripStep5Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StartTripStep5 = ({ formData, updateFormData }: StartTripStep5Props) => {
  const specialRequestSuggestions = [
    "Accessibility needs or mobility requirements",
    "Dietary restrictions or food allergies", 
    "Special occasions (anniversary, birthday, honeymoon)",
    "Specific activities you must do or want to avoid",
    "Language preferences for guides",
    "Budget considerations for specific experiences",
    "Transportation preferences",
    "Accommodation specific needs"
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900">Almost Ready for Your Adventure!</h3>
        <p className="text-lg text-gray-600">Any special touches to make your trip perfect?</p>
      </div>

      {/* AI Agent Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-blue-900 mb-2">
              Meet {formData.agentName || 'Your AI Travel Agent'}!
            </h4>
            <p className="text-blue-800 mb-4">
              I'm excited to help you plan this amazing trip! Based on what you've shared, I can already envision some incredible experiences for you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-blue-800">
                    <strong>Trip Type:</strong> {formData.travelType || 'Not specified'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-blue-800">
                    <strong>Duration:</strong> {formData.duration || 'Flexible'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-blue-800">
                    <strong>Travelers:</strong> {formData.travelers || 'Not specified'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-blue-800">
                    <strong>Budget:</strong> {formData.budget || 'Flexible'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-blue-800">
                    <strong>Destinations:</strong> {formData.destinations?.length || 0} selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-blue-800">
                    <strong>Interests:</strong> {formData.interests?.length || 0} selected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
          Special Requests or Requirements
        </h4>
        
        <Card className="border-2 border-purple-200">
          <CardContent className="p-6">
            <Label htmlFor="special-requests" className="text-base font-medium mb-4 block">
              Tell us anything else that would make your trip special
            </Label>
            <Textarea
              id="special-requests"
              placeholder="Share any special needs, preferences, or dreams for this trip..."
              value={formData.specialRequests}
              onChange={(e) => updateFormData('specialRequests', e.target.value)}
              rows={6}
              className="border-2 border-purple-200 focus:border-purple-500 resize-none"
            />
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Need inspiration? Consider mentioning:</p>
              <div className="grid md:grid-cols-2 gap-2">
                {specialRequestSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What Happens Next */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
        <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center">
          <Plane className="h-6 w-6 mr-2" />
          What Happens Next?
        </h4>
        <div className="space-y-3 text-green-800">
          <div className="flex items-start space-x-3">
            <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
            <p><strong>{formData.agentName || 'Your AI agent'}</strong> will analyze your preferences and create personalized recommendations</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
            <p>You'll get detailed itineraries, visa guidance, and travel tips tailored just for you</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
            <p>Chat with your AI agent anytime to refine plans, ask questions, or get real-time help</p>
          </div>
        </div>
      </div>

      {/* Ready to Start */}
      <div className="text-center bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Start Planning with {formData.agentName || 'Your AI Agent'}?
        </h4>
        <p className="text-gray-600 text-lg">
          Click the button below to begin your personalized travel planning experience!
        </p>
      </div>
    </div>
  );
};

export default StartTripStep5;
