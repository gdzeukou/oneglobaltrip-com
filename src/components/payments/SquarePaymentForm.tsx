import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { squareConfig, SquareConfig } from '@/lib/squareConfig';

interface SquarePaymentFormProps {
  /** What the customer is shown. The server charges its own price and refuses if this differs. */
  amount: number;
  currency: string;
  /** Id of the pending ogt_orders row (or flight booking) being paid for. */
  bookingId: string;
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError?: (error: string) => void;
  onProcessingChange?: (processing: boolean) => void;
}

declare global {
  interface Window {
    Square: any;
  }
}

let sdkPromise: Promise<void> | null = null;

function loadSquareSdk(config: SquareConfig): Promise<void> {
  if (window.Square) return Promise.resolve();
  if (!sdkPromise) {
    sdkPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = config.sdkUrl;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        sdkPromise = null;
        script.remove();
        reject(new Error('Could not load the payment form'));
      };
      document.head.appendChild(script);
    });
  }
  return sdkPromise;
}

/** supabase-js hides the function's JSON error body behind a generic message. */
async function functionErrorMessage(error: any): Promise<string> {
  try {
    const body = await error?.context?.json?.();
    if (body?.error && typeof body.error === 'string') return body.error;
  } catch {
    // fall through to the generic message
  }
  return error?.message || 'Payment processing failed';
}

const SquarePaymentForm = ({
  amount,
  currency,
  bookingId,
  onPaymentSuccess,
  onPaymentError,
  onProcessingChange,
}: SquarePaymentFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

  useEffect(() => {
    if (!squareConfig) return;
    let cancelled = false;

    (async () => {
      try {
        await loadSquareSdk(squareConfig);
        if (cancelled || !containerRef.current) return;
        const payments = window.Square.payments(squareConfig.applicationId, squareConfig.locationId);
        const card = await payments.card();
        if (cancelled || !containerRef.current) {
          card.destroy();
          return;
        }
        await card.attach(containerRef.current);
        if (cancelled) {
          card.destroy();
          return;
        }
        cardRef.current = card;
        setReady(true);
      } catch (err) {
        console.error('Failed to set up Square payments:', err);
        if (!cancelled) setError('The payment form could not be loaded. Refresh the page and try again.');
      }
    })();

    return () => {
      cancelled = true;
      cardRef.current?.destroy();
      cardRef.current = null;
    };
  }, []);

  const fail = (message: string) => {
    setError(message);
    onPaymentError?.(message);
  };

  const handlePayment = async () => {
    const card = cardRef.current;
    if (!card || !squareConfig || isLoading) return;

    setIsLoading(true);
    onProcessingChange?.(true);
    setError(null);

    try {
      const result = await card.tokenize();
      if (result.status !== 'OK') {
        throw new Error(result.errors?.[0]?.message || 'Check your card details and try again.');
      }

      const { data, error: invokeError } = await supabase.functions.invoke('square-create-payment', {
        body: {
          sourceId: result.token,
          amount,
          currency,
          bookingId,
          environment: squareConfig.environment,
          // One key per card token: a declined card can be retried with a new
          // key, and the server refuses a second charge on a paid order.
          idempotencyKey: crypto.randomUUID(),
        },
      });

      if (invokeError) throw new Error(await functionErrorMessage(invokeError));
      if (!data?.success) throw new Error(data?.error || 'Payment failed');

      // The order is only marked paid when Square reports COMPLETED.
      if (data.payment?.status !== 'COMPLETED') {
        throw new Error(
          'Your payment was received but is not confirmed yet. Do not pay again. We will email you once it clears, or contact support with your order reference.',
        );
      }

      onPaymentSuccess(data);
    } catch (err: any) {
      console.error('Payment error:', err);
      fail(err?.message || 'Payment processing failed');
    } finally {
      setIsLoading(false);
      onProcessingChange?.(false);
    }
  };

  if (!squareConfig) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2 text-amber-700">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Online payment is not available right now. You have not been charged. Please contact
              support@oneglobaltrip.com to complete your booking.
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="min-h-[100px] border rounded-lg p-4 bg-white" />

        {!ready && !error && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Loading payment form...</span>
          </div>
        )}

        {error && (
          <div role="alert" className="flex items-start gap-2 text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <Button onClick={handlePayment} disabled={isLoading || !ready} className="w-full">
          {isLoading ? 'Processing...' : `Pay ${formattedAmount}`}
        </Button>

        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          Card details go straight to Square. We never see or store them.
          {squareConfig.environment === 'sandbox' && <span className="font-semibold"> Test mode.</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default SquarePaymentForm;
