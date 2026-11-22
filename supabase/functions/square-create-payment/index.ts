
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { handleCreatePayment, PaymentRecord, Store } from './handler.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Service role: the function reads and updates order rows itself and checks
  // ownership explicitly, instead of trusting anything the browser can write.
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const store: Store = {
    async getOgtOrder(id) {
      const { data, error } = await supabase
        .from('ogt_orders')
        .select('id, user_id, plan_type, addons, payment_status')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async getFlightBooking(id) {
      const { data, error } = await supabase
        .from('flight_bookings')
        .select('id, user_id, total_amount, currency, origin_airport, destination_airport, booking_reference')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },

    async flightBookingIsPaid(bookingId) {
      const { data, error } = await supabase
        .from('booking_payments')
        .select('id')
        .eq('booking_id', bookingId)
        .eq('payment_status', 'completed')
        .limit(1);
      if (error) throw error;
      return (data?.length ?? 0) > 0;
    },

    async recordOgtPayment(orderId, payment: PaymentRecord) {
      const completed = payment.status === 'COMPLETED';
      const { error } = await supabase
        .from('ogt_orders')
        .update({
          square_payment_id: payment.squarePaymentId,
          square_order_id: payment.squareOrderId,
          total_amount: payment.amountCents / 100,
          currency: payment.currency,
          ...(completed
            ? { payment_status: 'completed', order_status: 'confirmed', confirmed_at: new Date().toISOString() }
            : {}),
        })
        .eq('id', orderId);
      if (error) throw error;
    },

    async recordFlightPayment(bookingId, payment: PaymentRecord) {
      const fields = {
        square_payment_id: payment.squarePaymentId,
        square_order_id: payment.squareOrderId,
        square_location_id: payment.squareLocationId,
        payment_status: payment.status.toLowerCase(),
        payment_date: new Date().toISOString(),
        amount: payment.amountCents / 100,
        currency: payment.currency,
      };

      const { data: updated, error: updateError } = await supabase
        .from('booking_payments')
        .update(fields)
        .eq('booking_id', bookingId)
        .eq('payment_status', 'pending')
        .select('id');
      if (updateError) throw updateError;

      if (!updated?.length) {
        const { error: insertError } = await supabase
          .from('booking_payments')
          .insert({ booking_id: bookingId, payment_method: 'square', ...fields });
        if (insertError) throw insertError;
      }

      if (payment.status === 'COMPLETED') {
        const { error } = await supabase
          .from('flight_bookings')
          .update({ booking_status: 'confirmed', square_order_id: payment.squareOrderId })
          .eq('id', bookingId);
        if (error) throw error;
      }
    },
  };

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // handled as a missing body below
  }

  const result = await handleCreatePayment(req.headers.get('Authorization'), body, {
    async getUserId(token) {
      const { data } = await supabase.auth.getUser(token);
      return data?.user?.id ?? null;
    },
    store,
    fetch,
    square: {
      accessToken: Deno.env.get('SQUARE_ACCESS_TOKEN') ?? '',
      locationId: Deno.env.get('SQUARE_LOCATION_ID') ?? '',
      baseUrl: 'https://connect.squareup.com',
    },
  });

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
};

serve(handler);
