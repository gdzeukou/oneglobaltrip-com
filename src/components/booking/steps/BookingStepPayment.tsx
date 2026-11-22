import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock, AlertCircle } from 'lucide-react';
import { BookingFormData } from '@/types/booking';
import SquarePaymentForm from '@/components/payments/SquarePaymentForm';

export interface PendingOrder {
  id: string;
  orderReference: string;
}

interface BookingStepPaymentProps {
  formData: BookingFormData;
  totalAmount: number;
  /** Creates (or returns the already created) unpaid order for the current cart. */
  ensureOrder: () => Promise<PendingOrder>;
  /** Called only after the payment function confirms a completed charge. */
  onPaid: (order: PendingOrder) => void;
  onBack: () => void;
}

const BookingStepPayment = ({ formData, totalAmount, ensureOrder, onPaid, onBack }: BookingStepPaymentProps) => {
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // The order row has to exist before the card form: the payment function
  // prices and charges an order id, never an amount sent by the browser.
  useEffect(() => {
    let cancelled = false;
    setOrderError(null);
    ensureOrder()
      .then((created) => {
        if (!cancelled) setOrder(created);
      })
      .catch((error) => {
        console.error('Could not create order:', error);
        if (!cancelled) setOrderError('We could not start your order. You have not been charged.');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

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

      {/* Payment */}
      <div className="mb-6">
        {order ? (
          <SquarePaymentForm
            amount={totalAmount}
            currency="USD"
            bookingId={order.id}
            onPaymentSuccess={() => onPaid(order)}
            onProcessingChange={setIsProcessing}
          />
        ) : orderError ? (
          <div role="alert" className="flex items-center justify-between gap-4 rounded-lg border border-destructive/30 p-4">
            <div className="flex items-start gap-2 text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{orderError}</span>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setAttempt((n) => n + 1)}>
              Try again
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Preparing your order...</div>
        )}
      </div>

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

      <Button type="button" variant="outline" onClick={onBack} disabled={isProcessing}>
        Back
      </Button>
    </div>
  );
};

export default BookingStepPayment;
