
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AgentiveWebhookPayload {
  tool: string;
  data: any;
  sessionId: string;
  userId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🤖 Agentive webhook received:', req.method);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: AgentiveWebhookPayload = await req.json();
    console.log('📋 Webhook payload:', payload);

    const { tool, data, sessionId } = payload;

    switch (tool) {
      case 'store_lead_supabase':
        await handleStoreLeadSupabase(supabase, data, sessionId);
        break;
      
      case 'schedule_call_calendly':
        await handleScheduleCallCalendly(data, sessionId);
        break;
      
      case 'send_email_resend':
        await handleSendEmailResend(data, sessionId);
        break;
      
      default:
        console.warn('❓ Unknown tool:', tool);
        return new Response(
          JSON.stringify({ error: 'Unknown tool', tool }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify({ success: true, tool, sessionId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

async function handleStoreLeadSupabase(supabase: any, data: any, sessionId: string) {
  console.log('💾 Storing lead in Supabase:', data);
  
  const leadData = {
    name: data.name || data.full_name || '',
    email: data.email || '',
    phone: data.phone || data.phone_number || '',
    form_type: 'agentive-chat',
    form_data: {
      nationality: data.nationality,
      travel_destination: data.destination,
      travel_purpose: data.purpose,
      travel_date: data.travel_date,
      session_id: sessionId,
      source: 'agentive-ai-agent',
      ...data
    },
    created_at: new Date().toISOString()
  };

  const { error } = await supabase
    .from('form_submissions')
    .insert([leadData]);

  if (error) {
    console.error('❌ Supabase insert error:', error);
    throw new Error(`Failed to store lead: ${error.message}`);
  }

  console.log('✅ Lead stored successfully');
}

async function handleScheduleCallCalendly(data: any, sessionId: string) {
  console.log('📅 Processing Calendly scheduling:', data);
  
  // For now, just log the Calendly data
  // You can extend this to trigger additional workflows
  console.log('Calendly URL provided:', data.calendly_url);
  console.log('Session ID:', sessionId);
  
  // Could trigger additional email notifications or database updates here
}

async function handleSendEmailResend(data: any, sessionId: string) {
  console.log('📧 Processing email send via Resend:', data);
  
  try {
    // Call the existing send-welcome-email function
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: {
        email: data.email,
        name: data.name,
        type: 'agentive-consultation',
        formData: {
          session_id: sessionId,
          source: 'agentive-ai-agent',
          ...data
        }
      }
    });

    if (error) {
      console.error('❌ Email send error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Email function error:', error);
    throw error;
  }
}

serve(handler);
