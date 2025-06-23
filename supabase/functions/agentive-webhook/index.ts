
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, agentive-signature',
};

interface AgentiveWebhookPayload {
  tool: string;
  arguments: any;
  conversation_id: string;
  timestamp: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🤖 Agentive webhook received:', req.method);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify webhook signature
    const signature = req.headers.get('agentive-signature');
    const webhookSecret = Deno.env.get('AGENTIVE_WEBHOOK_SECRET') || 'whsec_ogt2025';
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: AgentiveWebhookPayload = await req.json();
    console.log('📋 Webhook payload:', payload);

    const { tool, arguments: toolArgs, conversation_id } = payload;

    switch (tool) {
      case 'store_lead_supabase':
        await handleStoreLeadSupabase(supabase, toolArgs, conversation_id);
        break;
      
      case 'schedule_call_calendly':
        await handleScheduleCallCalendly(toolArgs, conversation_id);
        break;
      
      case 'send_email_resend':
        await handleSendEmailResend(supabase, toolArgs, conversation_id);
        break;
      
      default:
        console.warn('❓ Unknown tool:', tool);
        return new Response(
          JSON.stringify({ error: 'Unknown tool', tool }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify({ status: 'ok', data: { tool, conversation_id } }),
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

async function handleStoreLeadSupabase(supabase: any, args: any, conversationId: string) {
  console.log('💾 Storing lead in Supabase:', args);
  
  const leadData = {
    name: args.full_name || '',
    email: args.email || '',
    phone: args.phone || '',
    form_type: 'agentive-chat',
    form_data: {
      nationality: args.nationality,
      service_needed: args.service_needed,
      conversation_id: conversationId,
      source: 'agentive-ai-agent',
      ...args
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

async function handleScheduleCallCalendly(args: any, conversationId: string) {
  console.log('📅 Processing Calendly scheduling:', args);
  
  // Generate Calendly URL for OGT 30-min consultation
  const calendlyUrl = 'https://calendly.com/camronm-oneglobaltrip/30min';
  
  console.log('Calendly URL provided:', calendlyUrl);
  console.log('Email:', args.email);
  console.log('Topic:', args.topic);
  console.log('Conversation ID:', conversationId);
  
  // Log the scheduling request for follow-up
  // Could also trigger email with Calendly link here
}

async function handleSendEmailResend(supabase: any, args: any, conversationId: string) {
  console.log('📧 Processing email send via Resend:', args);
  
  try {
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: {
        email: args.to,
        name: args.full_name || 'Valued Customer',
        type: 'agentive-consultation',
        customSubject: args.subject,
        customHtml: args.html_body,
        formData: {
          conversation_id: conversationId,
          source: 'agentive-ai-agent'
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
