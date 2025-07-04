import { Shield, CheckCircle } from 'lucide-react';
import PaymentStep from '@/components/payments/PaymentStep';

interface LeadTraveler {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

interface PaymentConfirmationStepProps {
  selectedPackage: string;
  travelers: number;
  leadTraveler: LeadTraveler;
  departureDate: string;
  bookingId?: string;
  totalAmount?: number;
}

const PaymentConfirmationStep = ({
  selectedPackage,
  travelers,
  leadTraveler,
  departureDate,
  bookingId,
  totalAmount = 0
}: PaymentConfirmationStepProps) => {
  const packages = [
    { id: '1', name: 'Paris + Santorini Escape', price: 2499 },
    { id: '2', name: 'London-Amsterdam Rail Adventure', price: 3299 },
    { id: '3', name: 'Swiss Alps Luxury Retreat', price: 4299 },
    { id: '4', name: 'Mediterranean Coast Explorer', price: 3899 }
  ];

  const selectedPackageData = packages.find(p => p.id === selectedPackage);
  const packageTotal = selectedPackageData ? selectedPackageData.price * travelers : totalAmount;

  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('Payment successful:', paymentResult);
    // Handle successful payment - redirect to confirmation page
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // Handle payment error - show error message
  };

  // If we have booking ID and amount, show payment form
  if (bookingId && (totalAmount > 0 || selectedPackageData)) {
    return (
      <PaymentStep
        bookingData={{
          id: bookingId,
          totalAmount: packageTotal,
          currency: 'USD',
          packageName: selectedPackageData?.name,
          travelers: travelers,
        }}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    );
  }

  // Otherwise show the existing $0 down payment info
  return (
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
            <span>{packages.find(p => p.id === selectedPackage)?.name || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span>Travelers:</span>
            <span>{travelers}</span>
          </div>
          <div className="flex justify-between">
            <span>Lead Traveler:</span>
            <span>{leadTraveler.firstName} {leadTraveler.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span>{leadTraveler.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Departure Date:</span>
            <span>{departureDate || 'To be confirmed'}</span>
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
  );
};

export default PaymentConfirmationStep;
