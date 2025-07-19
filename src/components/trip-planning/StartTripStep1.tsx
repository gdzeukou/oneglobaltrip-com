
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, User, Mail, Phone } from 'lucide-react';

interface StartTripStep1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const StartTripStep1 = ({ formData, updateFormData }: StartTripStep1Props) => {
  return (
    <div className="space-y-8 py-4">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900">Welcome! Let's Create Magic Together</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal AI Travel Agent is ready to craft the perfect trip just for you. 
          Let's start by getting to know each other!
        </p>
      </div>

      {/* AI Agent Naming */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900">Name Your AI Travel Agent</h4>
        </div>
        <p className="text-gray-600 mb-4">Give your AI assistant a name to make your experience more personal!</p>
        <Input
          placeholder="e.g., TravelBuddy, Explorer, Marco..."
          value={formData.agentName}
          onChange={(e) => updateFormData('agentName', e.target.value)}
          className="text-lg py-3 border-2 border-blue-200 focus:border-blue-500"
        />
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
        <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <User className="h-5 w-5 mr-3 text-blue-600" />
          About You
        </h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone" className="text-base font-medium">Phone Number (Optional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {formData.agentName && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-blue-900 font-medium">
                Great! <span className="font-bold">{formData.agentName}</span> is ready to help you plan an amazing trip!
              </p>
              <p className="text-blue-700 text-sm">Let's continue to learn about your travel dreams...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartTripStep1;
