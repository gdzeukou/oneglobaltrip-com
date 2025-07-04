
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreatePaymentRequest {
  sourceId: string;
  amount: number;
  currency: string;
  bookingId: string;
  idempotencyKey: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: user } = await supabaseClient.auth.getUser(token);

    if (!user.user) {
      throw new Error('Unauthorized');
    }

    const { sourceId, amount, currency, bookingId, idempotencyKey }: CreatePaymentRequest = await req.json();

    // First create an order
    const orderResponse = await fetch(`https://connect.squareup.com/v2/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SQUARE_ACCESS_TOKEN')}`,
        'Content-Type': 'application/json',
        'Square-Version': '2023-10-18',
      },
      body: JSON.stringify({
        idempotency_key: `order_${idempotencyKey}`,
        order: {
          location_id: Deno.env.get('SQUARE_LOCATION_ID'),
          line_items: [
            {
              name: 'Flight Booking',
              quantity: '1',
              base_price_money: {
                amount: Math.round(amount * 100), // Convert to cents
                currency: currency.toUpperCase(),
              },
            },
          ],
        },
      }),
    });

    if (!orderResponse.ok) {
      const orderError = await orderResponse.text();
      console.error('Square order creation failed:', orderError);
      throw new Error(`Order creation failed: ${orderError}`);
    }

    const orderData = await orderResponse.json();
    const orderId = orderData.order.id;

    // Create payment
    const paymentResponse = await fetch(`https://connect.squareup.com/v2/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SQUARE_ACCESS_TOKEN')}`,
        'Content-Type': 'application/json',
        'Square-Version': '2023-10-18',
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount: Math.round(amount * 100),
          currency: currency.toUpperCase(),
        },
        order_id: orderId,
        location_id: Deno.env.get('SQUARE_LOCATION_ID'),
      }),
    });

    if (!paymentResponse.ok) {
      const paymentError = await paymentResponse.text();
      console.error('Square payment creation failed:', paymentError);
      throw new Error(`Payment creation failed: ${paymentError}`);
    }

    const paymentData = await paymentResponse.json();
    console.log('Square payment created:', paymentData);

    // Update booking payment record
    const { error: updateError } = await supabaseClient
      .from('booking_payments')
      .update({
        square_payment_id: paymentData.payment.id,
        square_order_id: orderId,
        square_location_id: Deno.env.get('SQUARE_LOCATION_ID'),
        payment_status: paymentData.payment.status.toLowerCase(),
        payment_date: new Date().toISOString(),
      })
      .eq('booking_id', bookingId)
      .eq('payment_status', 'pending');

    if (updateError) {
      console.error('Failed to update payment record:', updateError);
    }

    // Update flight booking status if payment is completed
    if (paymentData.payment.status === 'COMPLETED') {
      await supabaseClient
        .from('flight_bookings')
        .update({
          booking_status: 'confirmed',
          square_order_id: orderId,
        })
        .eq('id', bookingId);
    }

    return new Response(JSON.stringify({
      success: true,
      payment: paymentData.payment,
      orderId: orderId,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in square-create-payment:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
