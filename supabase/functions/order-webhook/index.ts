import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method === 'POST') {
      const orderData = await req.json()
      
      console.log('Order webhook triggered:', orderData)

      // Store webhook payload for future automation processing
      const { data, error } = await supabaseClient
        .from('ogt_orders')
        .update({ 
          webhook_sent: true,
          automation_processed: false  // Mark for future processing
        })
        .eq('id', orderData.order_id)

      if (error) {
        console.error('Error updating order:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to process webhook' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Future integrations will hook into this endpoint:
      // - Zapier webhook calls
      // - Airtable record creation
      // - HubSpot contact/deal creation
      // - Email automation triggers
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Webhook received and logged for future automation processing',
          automation_ready: true
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})