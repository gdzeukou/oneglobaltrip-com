
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BookingStepIndicator from '@/components/booking/BookingStepIndicator';
import PackageSelectionStep from '@/components/booking/PackageSelectionStep';
import TravelerInfoStep from '@/components/booking/TravelerInfoStep';
import TravelPreferencesStep from '@/components/booking/TravelPreferencesStep';
import PaymentConfirmationStep from '@/components/booking/PaymentConfirmationStep';
import BookingNavigation from '@/components/booking/BookingNavigation';

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

  const steps = [
    { number: 1, title: 'Package Selection' },
    { number: 2, title: 'Traveler Information' },
    { number: 3, title: 'Travel Preferences' },
    { number: 4, title: 'Payment & Confirmation' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    if (section === 'leadTraveler') {
      setFormData(prev => ({
        ...prev,
        leadTraveler: {
          ...prev.leadTraveler,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
    console.log('Booking submitted:', formData);
    alert('Booking request submitted! We\'ll contact you within 24 hours.');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PackageSelectionStep
            selectedPackage={formData.selectedPackage}
            customizations={formData.customizations}
            onPackageChange={(packageId) => handleInputChange('', 'selectedPackage', packageId)}
            onCustomizationsChange={(customizations) => handleInputChange('', 'customizations', customizations)}
          />
        );
      case 2:
        return (
          <TravelerInfoStep
            travelers={formData.travelers}
            leadTraveler={formData.leadTraveler}
            onTravelersChange={(count) => handleInputChange('', 'travelers', count)}
            onLeadTravelerChange={(field, value) => handleInputChange('leadTraveler', field, value)}
          />
        );
      case 3:
        return (
          <TravelPreferencesStep
            departureDate={formData.departureDate}
            accommodationType={formData.accommodationType}
            specialRequests={formData.specialRequests}
            onDepartureDateChange={(date) => handleInputChange('', 'departureDate', date)}
            onAccommodationTypeChange={(type) => handleInputChange('', 'accommodationType', type)}
            onSpecialRequestsChange={(requests) => handleInputChange('', 'specialRequests', requests)}
          />
        );
      case 4:
        return (
          <PaymentConfirmationStep
            selectedPackage={formData.selectedPackage}
            travelers={formData.travelers}
            leadTraveler={formData.leadTraveler}
            departureDate={formData.departureDate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <BookingStepIndicator currentStep={currentStep} />

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderCurrentStep()}
              
              <BookingNavigation
                currentStep={currentStep}
                onPrevious={handlePrev}
                onNext={handleNext}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
