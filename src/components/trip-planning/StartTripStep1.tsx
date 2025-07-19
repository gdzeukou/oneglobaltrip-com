
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, User, Mail, Phone, Heart } from 'lucide-react';

interface StartTripStep1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StartTripStep1 = ({ formData, updateFormData }: StartTripStep1Props) => {
  return (
    <div className="space-y-6 py-4 max-w-md mx-auto">
      {/* Profile Setup Header */}
      <div className="text-center space-y-4">
        <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-1">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Let's get to know you! 💕</h3>
        <p className="text-gray-600">
          Create your travel profile to find your perfect trip match
        </p>
      </div>

      {/* AI Agent Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-4xl">🤖</div>
            <h4 className="text-lg font-semibold text-gray-900">What should I call your AI travel buddy?</h4>
            <Input
              placeholder="Give me a cute name! ✨"
              value={formData.agentName}
              onChange={(e) => updateFormData('agentName', e.target.value)}
              className="text-center text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-full"
            />
            {formData.agentName && (
              <div className="bg-white/70 rounded-full px-4 py-2">
                <p className="text-purple-700 font-medium">
                  Hey, I'm {formData.agentName}! Ready to find your dream trip? 🌟
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Info Cards */}
      <div className="space-y-4">
        <Card className="overflow-hidden hover:shadow-lg transition-all bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-3xl">👋</div>
              <h4 className="text-lg font-semibold text-gray-900">What's your name?</h4>
              <Input
                placeholder="Your name here"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="text-center text-lg py-3 border-2 border-blue-200 focus:border-blue-500 rounded-full"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-3xl">📧</div>
              <h4 className="text-lg font-semibold text-gray-900">Your email?</h4>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="text-center text-lg py-3 border-2 border-green-200 focus:border-green-500 rounded-full"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-all bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-3xl">📱</div>
              <h4 className="text-lg font-semibold text-gray-900">Phone number? <span className="text-sm text-gray-500">(optional)</span></h4>
              <Input
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="text-center text-lg py-3 border-2 border-orange-200 focus:border-orange-500 rounded-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartTripStep1;
