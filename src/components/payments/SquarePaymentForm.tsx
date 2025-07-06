
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SquarePaymentFormProps {
  amount: number;
  currency: string;
  bookingId: string;
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
}

declare global {
  interface Window {
    Square: any;
  }
}

const SquarePaymentForm = ({
  amount,
  currency,
  bookingId,
  onPaymentSuccess,
  onPaymentError
}: SquarePaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [squarePayments, setSquarePayments] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeSquare = async () => {
      try {
        if (!window.Square) {
          // Load Square Web Payments SDK
          const script = document.createElement('script');
          script.src = 'https://sandbox.web.squarecdn.com/v1/square.js'; // Use production URL for live
          script.async = true;
          script.onload = async () => {
            await setupSquarePayments();
          };
          document.head.appendChild(script);
        } else {
          await setupSquarePayments();
        }
      } catch (error) {
        console.error('Failed to initialize Square:', error);
        onPaymentError('Failed to load payment system');
      }
    };

    const setupSquarePayments = async () => {
      try {
        const payments = window.Square.payments(
          process.env.NODE_ENV === 'production' 
            ? 'sq0idp-wGVapF8sNt9PLLIaVFCuUA' // Use environment variable in production
            : 'sandbox-sq0idb-wGVapF8sNt9PLLIaVFCuUA' // Sandbox app ID
        );
        
        setSquarePayments(payments);

        const cardPayment = await payments.card();
        await cardPayment.attach('#card-container');
        setCard(cardPayment);
      } catch (error) {
        console.error('Failed to setup Square payments:', error);
        onPaymentError('Failed to setup payment form');
      }
    };

    initializeSquare();

    return () => {
      if (card) {
        card.destroy();
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!card || !squarePayments) {
      onPaymentError('Payment system not ready');
      return;
    }

    setIsLoading(true);

    try {
      const result = await card.tokenize();
      
      if (result.status === 'OK') {
        const token = result.token;
        
        // Call our edge function to process payment
        const { data, error } = await supabase.functions.invoke('square-create-payment', {
          body: {
            sourceId: token,
            amount: amount,
            currency: currency,
            bookingId: bookingId,
            idempotencyKey: `${bookingId}_${Date.now()}`,
          },
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          toast({
            title: "Payment Successful!",
            description: "Your booking has been confirmed.",
          });
          onPaymentSuccess(data);
        } else {
          throw new Error(data.error || 'Payment failed');
        }
      } else {
        throw new Error(result.errors?.[0]?.detail || 'Card tokenization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error.message || 'Payment processing failed';
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
      onPaymentError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Secure Payment</span>
          </div>
          <p className="text-sm text-blue-700">
            Your payment is processed securely through Square
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-lg font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
              }).format(amount)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div id="card-container" className="min-h-[100px] border rounded-lg p-4 bg-white">
            {/* Square Web Payments SDK will render the card form here */}
          </div>

          {!squarePayments && (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Loading payment form...</span>
            </div>
          )}

          <Button
            onClick={handlePayment}
            disabled={isLoading || !squarePayments || !card}
            className="w-full"
          >
            {isLoading ? 'Processing...' : `Pay ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency,
            }).format(amount)}`}
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Powered by Square - Your payment information is encrypted and secure
        </div>
      </CardContent>
    </Card>
  );
};

export default SquarePaymentForm;
