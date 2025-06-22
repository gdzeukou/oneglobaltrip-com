
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Star, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { packages } from '@/data/packages';

interface UnifiedTravelFormProps {
  type: 'consultation' | 'visa-application' | 'package-booking';
  preSelectedPackage?: string;
  title?: string;
  onComplete?: () => void;
}

const UnifiedTravelForm = ({ type, preSelectedPackage, title, onComplete }: UnifiedTravelFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    
    // Travel Details
    destination: '',
    travelDate: '',
    duration: '',
    travelers: '',
    budget: '',
    
    // Package Selection (for booking type)
    selectedPackages: preSelectedPackage ? [preSelectedPackage] : [] as string[],
    
    // Travel Needs (multi-select)
    travelNeeds: [] as string[],
    otherNeeds: '',
    
    // Additional Information
    specialRequests: '',
    
    // Visa specific (for visa applications)
    nationality: '',
    visaType: '',
    travelPurpose: 'tourism',
    departureDate: '',
    returnDate: ''
  });

  const travelNeedsOptions = [
    'Flights',
    'Place to Stay', 
    'Car Rentals',
    'Travel Insurance',
    'Passport',
    'Visa',
    'Other'
  ];

  const totalSteps = type === 'package-booking' ? 4 : 3;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTravelNeedsChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      travelNeeds: checked 
        ? [...prev.travelNeeds, need]
        : prev.travelNeeds.filter(n => n !== need)
    }));
  };

  const handlePackageSelection = (packageId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: checked
        ? [...prev.selectedPackages, packageId]
        : prev.selectedPackages.filter(id => id !== packageId)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { type, formData });
    
    const messages = {
      'consultation': "Thank you! We'll contact you within 24 hours with personalized recommendations.",
      'visa-application': "Your visa application has been started! We'll review and contact you within 24 hours.",
      'package-booking': "Booking request submitted! We'll contact you within 24 hours to confirm details."
    };

    toast({
      title: "Request Submitted Successfully!",
      description: messages[type]
    });

    if (onComplete) {
      onComplete();
    } else {
      // Navigate to appropriate page after submission
      setTimeout(() => {
        navigate('/packages');
      }, 1000);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        if (type === 'package-booking') {
          return formData.selectedPackages.length > 0;
        }
        return formData.destination;
      case 3:
        return true; // Travel preferences are optional
      case 4:
        return true; // Final confirmation step
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
                required
              />
            </div>
            {type === 'visa-application' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nationality" className="text-base font-medium">Nationality *</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="visaType" className="text-base font-medium">Visa Type</Label>
                  <Select onValueChange={(value) => handleInputChange('visaType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="schengen">Schengen Visa</SelectItem>
                      <SelectItem value="uk">UK Visa</SelectItem>
                      <SelectItem value="brazil">Brazil eVisa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        if (type === 'package-booking') {
          return (
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Select the package(s) you're interested in: *</Label>
                <div className="grid grid-cols-1 gap-3 mt-3 max-h-60 overflow-y-auto">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={pkg.id}
                        checked={formData.selectedPackages.includes(pkg.id)}
                        onCheckedChange={(checked) => handlePackageSelection(pkg.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={pkg.id} className="cursor-pointer font-medium">{pkg.title}</Label>
                        <p className="text-sm text-gray-600">{pkg.country} - {pkg.duration} - From ${pkg.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination" className="text-base font-medium">Dream Destination *</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, Tokyo, New York"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="travelDate" className="text-base font-medium">Preferred Travel Date</Label>
                  <Input
                    id="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => handleInputChange('travelDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration" className="text-base font-medium">Trip Duration</Label>
                  <Select onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3 days">1-3 days</SelectItem>
                      <SelectItem value="4-7 days">4-7 days</SelectItem>
                      <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3+ months">3+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="travelers" className="text-base font-medium">Number of Travelers</Label>
                  <Select onValueChange={(value) => handleInputChange('travelers', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Just me</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3-4">3-4 people</SelectItem>
                      <SelectItem value="5+">5+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="budget" className="text-base font-medium">Budget Range (USD)</Label>
                <Select onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under $1,000">Under $1,000</SelectItem>
                    <SelectItem value="$1,000 - $3,000">$1,000 - $3,000</SelectItem>
                    <SelectItem value="$3,000 - $5,000">$3,000 - $5,000</SelectItem>
                    <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="$10,000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        }

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">What do you still need for your trip? (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                {travelNeedsOptions.map((need) => (
                  <div key={need} className="flex items-center space-x-2">
                    <Checkbox
                      id={need}
                      checked={formData.travelNeeds.includes(need)}
                      onCheckedChange={(checked) => handleTravelNeedsChange(need, checked as boolean)}
                    />
                    <Label htmlFor={need} className="cursor-pointer text-sm">{need}</Label>
                  </div>
                ))}
              </div>
              {formData.travelNeeds.includes('Other') && (
                <div className="mt-4">
                  <Label htmlFor="otherNeeds" className="text-base font-medium">Please specify:</Label>
                  <Input
                    id="otherNeeds"
                    placeholder="Please describe what else you need..."
                    value={formData.otherNeeds}
                    onChange={(e) => handleInputChange('otherNeeds', e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="specialRequests" className="text-base font-medium">Special Requests or Additional Information</Label>
              <Textarea
                id="specialRequests"
                placeholder="Tell us about any special requirements, dietary restrictions, accessibility needs, or other preferences..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Your Request</h3>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <CreditCard className="h-6 w-6 text-green-600" />
                <span className="text-xl font-semibold text-green-600">$0 Down Payment Required</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                <p className="text-gray-700">{formData.name} • {formData.email} • {formData.phone}</p>
              </div>
              
              {type === 'package-booking' && formData.selectedPackages.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900">Selected Packages</h4>
                  <ul className="text-gray-700">
                    {formData.selectedPackages.map(pkgId => {
                      const pkg = packages.find(p => p.id === pkgId);
                      return pkg ? <li key={pkgId}>• {pkg.title}</li> : null;
                    })}
                  </ul>
                </div>
              )}
              
              {formData.destination && (
                <div>
                  <h4 className="font-semibold text-gray-900">Travel Details</h4>
                  <p className="text-gray-700">
                    {formData.destination}
                    {formData.duration && ` • ${formData.duration}`}
                    {formData.travelers && ` • ${formData.travelers} travelers`}
                    {formData.budget && ` • ${formData.budget}`}
                  </p>
                </div>
              )}
              
              {formData.travelNeeds.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900">Services Needed</h4>
                  <p className="text-gray-700">{formData.travelNeeds.join(', ')}</p>
                  {formData.otherNeeds && <p className="text-gray-700 italic">Other: {formData.otherNeeds}</p>}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    if (type === 'package-booking') {
      switch (currentStep) {
        case 1: return 'Personal Information';
        case 2: return 'Package Selection';
        case 3: return 'Travel Preferences';
        case 4: return 'Payment & Confirmation';
        default: return '';
      }
    } else {
      switch (currentStep) {
        case 1: return 'Personal Information';
        case 2: return 'Travel Information';
        case 3: return 'Travel Preferences';
        default: return '';
      }
    }
  };

  const getFormTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'consultation':
        return 'Get Your Free Travel Consultation';
      case 'visa-application':
        return 'Start My Visa Application';
      case 'package-booking':
        return 'Start My Personalized Package Right Now';
      default:
        return 'Travel Request Form';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-2 border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="text-center">
          <CardTitle className="text-2xl mb-2">{getFormTitle()}</CardTitle>
          {type === 'consultation' && (
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-blue-100">Trusted by 10,000+ travelers</span>
            </div>
          )}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  i + 1 <= currentStep ? 'bg-yellow-400' : 'bg-blue-400'
                }`}
              />
            ))}
          </div>
          <p className="text-blue-100 mt-2">{getStepTitle()}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {renderStepContent()}
        
        <div className="flex justify-between pt-6 mt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold flex items-center space-x-2"
            >
              {type === 'package-booking' ? 'Confirm Booking ($0 Down)' : 'Submit Request'}
            </Button>
          )}
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          No credit card required • Free consultation • Response within 24 hours
        </p>
      </CardContent>
    </Card>
  );
};

export default UnifiedTravelForm;
