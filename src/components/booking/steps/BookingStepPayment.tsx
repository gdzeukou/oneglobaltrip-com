
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { BookingFormData } from '@/types/booking';

interface BookingStepPaymentProps {
  formData: BookingFormData;
  totalAmount: number;
  onComplete: (paymentData: any) => void;
  onBack: () => void;
}

const BookingStepPayment = ({ formData, totalAmount, onComplete, onBack }: BookingStepPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment data
      const paymentData = {
        paymentId: `pay_${Date.now()}`,
        orderId: `order_${Date.now()}`,
        amount: totalAmount,
        status: 'completed'
      };
      
      onComplete(paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Secure Payment</h2>
        <p className="text-muted-foreground">Complete your booking with our secure payment system.</p>
      </div>

      {/* Order Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>{formData.selectedPlan.name}</span>
            <span>${formData.selectedPlan.price}</span>
          </div>

          {formData.selectedAddOns && formData.selectedAddOns.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Add-ons</div>
                {formData.selectedAddOns.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.addOn.name} {item.quantity > 1 && `×${item.quantity}`}
                    </span>
                    <span>${item.addOn.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <div className="text-muted-foreground mb-4">
              <Shield className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">
                Secure payment processing powered by Square
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Note: In the demo, payment is simulated for testing purposes.
              In production, this would integrate with Square payment processing.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <Lock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-800">
            <div className="font-medium mb-1">Secure & Protected</div>
            <div>Your payment information is encrypted and secure. We never store your card details.</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button 
          onClick={handlePayment} 
          className="flex-1"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Complete Payment - $${totalAmount}`}
        </Button>
      </div>
    </div>
  );
};

export default BookingStepPayment;
