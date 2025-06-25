
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Globe, FileText } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  type: 'consultation' | 'visa-application' | 'package-booking';
}

const PersonalInfoStep = ({ formData, onInputChange, type }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group relative">
          <Label htmlFor="name" className="text-base font-semibold text-gray-800 mb-3 block">
            Full Name *
          </Label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <User className="h-5 w-5 text-blue-500 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="pl-12 h-14 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-2 border-blue-200/50 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover:border-blue-300"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        <div className="group relative">
          <Label htmlFor="email" className="text-base font-semibold text-gray-800 mb-3 block">
            Email Address *
          </Label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Mail className="h-5 w-5 text-emerald-500 group-focus-within:text-emerald-600 transition-colors duration-300" />
            </div>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className="pl-12 h-14 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-2 border-emerald-200/50 rounded-xl focus:border-emerald-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover:border-emerald-300"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="group relative">
        <Label htmlFor="phone" className="text-base font-semibold text-gray-800 mb-3 block">
          Phone Number *
        </Label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Phone className="h-5 w-5 text-purple-500 group-focus-within:text-purple-600 transition-colors duration-300" />
          </div>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className="pl-12 h-14 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-2 border-purple-200/50 rounded-xl focus:border-purple-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover:border-purple-300"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>
      
      {type === 'visa-application' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative">
            <Label htmlFor="nationality" className="text-base font-semibold text-gray-800 mb-3 block">
              Nationality *
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Globe className="h-5 w-5 text-amber-500 group-focus-within:text-amber-600 transition-colors duration-300" />
              </div>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => onInputChange('nationality', e.target.value)}
                className="pl-12 h-14 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-2 border-amber-200/50 rounded-xl focus:border-amber-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover:border-amber-300"
                placeholder="e.g., American, British"
                required
              />
            </div>
          </div>
          
          <div className="group relative">
            <Label htmlFor="visaType" className="text-base font-semibold text-gray-800 mb-3 block">
              Visa Type
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <FileText className="h-5 w-5 text-indigo-500 group-focus-within:text-indigo-600 transition-colors duration-300" />
              </div>
              <Select onValueChange={(value) => onInputChange('visaType', value)}>
                <SelectTrigger className="pl-12 h-14 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 border-2 border-indigo-200/50 rounded-xl focus:border-indigo-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover:border-indigo-300">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-indigo-200/50 rounded-xl shadow-xl">
                  <SelectItem value="schengen" className="hover:bg-indigo-50 rounded-lg transition-colors duration-200">Schengen Visa</SelectItem>
                  <SelectItem value="uk" className="hover:bg-indigo-50 rounded-lg transition-colors duration-200">UK Visa</SelectItem>
                  <SelectItem value="brazil" className="hover:bg-indigo-50 rounded-lg transition-colors duration-200">Brazil eVisa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoStep;
