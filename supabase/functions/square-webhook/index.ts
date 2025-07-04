
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-square-signature',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const body = await req.text();
    const signature = req.headers.get('x-square-signature');
    const webhookSignatureKey = Deno.env.get('SQUARE_WEBHOOK_SIGNATURE_KEY');

    // Verify webhook signature
    if (signature && webhookSignatureKey) {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(webhookSignatureKey);
      const msgData = encoder.encode(body);
      
      const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const expectedSignature = await crypto.subtle.sign('HMAC', key, msgData);
      const expectedSignatureHex = Array.from(new Uint8Array(expectedSignature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      if (signature !== expectedSignatureHex) {
        console.error('Invalid webhook signature');
        return new Response('Invalid signature', { status: 401 });
      }
    }

    const webhookData = JSON.parse(body);
    console.log('Square webhook received:', webhookData);

    // Store webhook for processing
    const { error: webhookError } = await supabaseClient
      .from('square_webhooks')
      .insert({
        webhook_id: webhookData.event_id || crypto.randomUUID(),
        event_type: webhookData.type,
        event_data: webhookData,
      });

    if (webhookError) {
      console.error('Failed to store webhook:', webhookError);
    }

    // Process payment events
    if (webhookData.type === 'payment.updated' && webhookData.data) {
      const payment = webhookData.data.object.payment;
      
      // Update payment status in database
      const { error: updateError } = await supabaseClient
        .from('booking_payments')
        .update({
          payment_status: payment.status.toLowerCase(),
          updated_at: new Date().toISOString(),
        })
        .eq('square_payment_id', payment.id);

      if (updateError) {
        console.error('Failed to update payment status:', updateError);
      }

      // Update booking status if payment completed
      if (payment.status === 'COMPLETED') {
        const { data: paymentRecord } = await supabaseClient
          .from('booking_payments')
          .select('booking_id')
          .eq('square_payment_id', payment.id)
          .single();

        if (paymentRecord) {
          await supabaseClient
            .from('flight_bookings')
            .update({ booking_status: 'confirmed' })
            .eq('id', paymentRecord.booking_id);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in square-webhook:', error);
    return new Response(JSON.stringify({
      error: error.message,
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
