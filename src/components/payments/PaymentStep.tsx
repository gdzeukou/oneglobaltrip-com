
import React from 'react';
import SquarePaymentForm from './SquarePaymentForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface PaymentStepProps {
  bookingData: {
    id: string;
    totalAmount: number;
    currency: string;
    packageName?: string;
    travelers: number;
  };
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
}

const PaymentStep = ({ bookingData, onPaymentSuccess, onPaymentError }: PaymentStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
        <p className="text-gray-600">
          Secure your booking with our encrypted payment system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookingData.packageName && (
              <div className="flex justify-between">
                <span>Package:</span>
                <span className="font-medium">{bookingData.packageName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Travelers:</span>
              <span className="font-medium">{bookingData.travelers}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: bookingData.currency,
                }).format(bookingData.totalAmount)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <SquarePaymentForm
          amount={bookingData.totalAmount}
          currency={bookingData.currency}
          bookingId={bookingData.id}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
      </div>

      {/* Security Features */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 mb-2">Your Payment is Protected</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• SSL encrypted transaction</li>
              <li>• PCI DSS compliant processing</li>
              <li>• Fraud protection enabled</li>
              <li>• No card details stored on our servers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
