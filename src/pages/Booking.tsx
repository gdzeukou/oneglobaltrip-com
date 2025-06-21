
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Users, Calendar, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Package Selection
    selectedPackage: packageId || '',
    customizations: '',
    
    // Traveler Information
    leadTraveler: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: ''
    },
    additionalTravelers: [],
    travelers: 1,
    
    // Travel Preferences
    departureDate: '',
    accommodationType: 'standard',
    specialRequests: '',
    
    // Visa Requirements
    visaServices: [],
    
    // Payment
    paymentOption: 'zero-down'
  });

  const packages = [
    { id: '1', name: 'Paris + Santorini Escape', price: 2499 },
    { id: '2', name: 'London-Amsterdam Rail Adventure', price: 3299 },
    { id: '3', name: 'Swiss Alps Luxury Retreat', price: 4299 },
    { id: '4', name: 'Mediterranean Coast Explorer', price: 3899 }
  ];

  const steps = [
    { number: 1, title: 'Package Selection', icon: Calendar },
    { number: 2, title: 'Traveler Information', icon: Users },
    { number: 3, title: 'Travel Preferences', icon: CheckCircle },
    { number: 4, title: 'Payment & Confirmation', icon: CreditCard }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would submit to Supabase
    console.log('Booking submitted:', formData);
    alert('Booking request submitted! We\'ll contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number 
                        ? 'bg-blue-900 border-blue-900 text-white' 
                        : 'border-gray-300 text-gray-300'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-px mx-4 ${
                        currentStep > step.number ? 'bg-blue-900' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Package Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="package">Select Your Package</Label>
                    <select
                      id="package"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                      value={formData.selectedPackage}
                      onChange={(e) => setFormData(prev => ({ ...prev, selectedPackage: e.target.value }))}
                    >
                      <option value="">Choose a package...</option>
                      {packages.map(pkg => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} - From ${pkg.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="customizations">Customization Requests</Label>
                    <Textarea
                      id="customizations"
                      placeholder="Tell us about any special preferences, dietary requirements, or customizations you'd like..."
                      value={formData.customizations}
                      onChange={(e) => setFormData(prev => ({ ...prev, customizations: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Traveler Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <select
                      id="travelers"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                      value={formData.travelers}
                      onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Lead Traveler Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.leadTraveler.firstName}
                          onChange={(e) => handleInputChange('leadTraveler', 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.leadTraveler.lastName}
                          onChange={(e) => handleInputChange('leadTraveler', 'lastName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.leadTraveler.email}
                          onChange={(e) => handleInputChange('leadTraveler', 'email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.leadTraveler.phone}
                          onChange={(e) => handleInputChange('leadTraveler', 'phone', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                          id="nationality"
                          value={formData.leadTraveler.nationality}
                          onChange={(e) => handleInputChange('leadTraveler', 'nationality', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.leadTraveler.dateOfBirth}
                          onChange={(e) => handleInputChange('leadTraveler', 'dateOfBirth', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Travel Preferences */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="departureDate">Preferred Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="accommodationType">Accommodation Preference</Label>
                    <select
                      id="accommodationType"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                      value={formData.accommodationType}
                      onChange={(e) => setFormData(prev => ({ ...prev, accommodationType: e.target.value }))}
                    >
                      <option value="standard">Standard (4-star hotels)</option>
                      <option value="luxury">Luxury (5-star hotels)</option>
                      <option value="boutique">Boutique (Unique properties)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests, celebrations, accessibility needs, etc."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Visa Services Needed</h3>
                    <div className="space-y-3">
                      {['Schengen Visa Pack ($299)', 'UK Visa Pass ($399)', 'Brazil eVisa ($199)'].map((visa) => (
                        <label key={visa} className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span>{visa}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment & Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="h-6 w-6 text-yellow-600" />
                      <h3 className="text-lg font-semibold text-yellow-800">Pay $0 Down Today</h3>
                    </div>
                    <p className="text-yellow-700 mb-4">
                      Reserve your trip with no upfront payment. We'll contact you within 24 hours to confirm your booking and discuss payment options.
                    </p>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <div className="flex items-center justify-between">
                        <span>Today's Payment:</span>
                        <span className="font-bold text-lg">$0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Due at Confirmation:</span>
                        <span>25% of total cost</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Final Payment:</span>
                        <span>30 days before departure</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Package:</span>
                        <span>{packages.find(p => p.id === formData.selectedPackage)?.name || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Travelers:</span>
                        <span>{formData.travelers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead Traveler:</span>
                        <span>{formData.leadTraveler.firstName} {formData.leadTraveler.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{formData.leadTraveler.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Departure Date:</span>
                        <span>{formData.departureDate || 'To be confirmed'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">What Happens Next?</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start space-x-2">
                        <span className="font-bold">1.</span>
                        <span>We'll review your booking request within 2 hours</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold">2.</span>
                        <span>Our travel expert will contact you to discuss details</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold">3.</span>
                        <span>We'll customize your itinerary based on your preferences</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold">4.</span>
                        <span>Begin visa processing (if needed) and finalize bookings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold flex items-center space-x-2"
                  >
                    <span>Confirm Booking ($0 Down)</span>
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
