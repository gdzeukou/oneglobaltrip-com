
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, agentive-signature, x-agentive-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface AgentiveWebhookPayload {
  tool?: string;
  function_name?: string;
  arguments: any;
  conversation_id: string;
  timestamp: number;
  event_type?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🤖 Agentive webhook received:', req.method, req.url);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log all headers for debugging
    console.log('📋 Request headers:', Object.fromEntries(req.headers.entries()));

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: AgentiveWebhookPayload = await req.json();
    console.log('📋 Webhook payload:', JSON.stringify(payload, null, 2));

    const { tool, function_name, arguments: toolArgs, conversation_id } = payload;
    const toolName = tool || function_name;

    if (!toolName) {
      console.log('ℹ️ No tool specified, treating as chat message');
      return new Response(
        JSON.stringify({ status: 'ok', message: 'Chat message received' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    switch (toolName) {
      case 'store_lead_supabase':
      case 'store_lead':
        await handleStoreLeadSupabase(supabase, toolArgs, conversation_id);
        break;
      
      case 'schedule_call_calendly':
      case 'schedule_call':
        await handleScheduleCallCalendly(toolArgs, conversation_id);
        break;
      
      case 'send_email_resend':
      case 'send_email':
        await handleSendEmailResend(supabase, toolArgs, conversation_id);
        break;
      
      default:
        console.warn('❓ Unknown tool:', toolName);
        return new Response(
          JSON.stringify({ status: 'ok', message: `Unknown tool: ${toolName}` }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify({ status: 'success', data: { tool: toolName, conversation_id } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: 'error',
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

async function handleStoreLeadSupabase(supabase: any, args: any, conversationId: string) {
  console.log('💾 Storing lead in Supabase:', args);
  
  const leadData = {
    name: args.full_name || args.name || '',
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
  
  const calendlyUrl = 'https://calendly.com/camronm-oneglobaltrip/30min';
  
  console.log('✅ Calendly URL provided:', calendlyUrl);
  console.log('📧 Email:', args.email);
  console.log('📝 Topic:', args.topic);
  console.log('🆔 Conversation ID:', conversationId);
}

async function handleSendEmailResend(supabase: any, args: any, conversationId: string) {
  console.log('📧 Processing email send via Resend:', args);
  
  try {
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: {
        email: args.to || args.email,
        name: args.full_name || args.name || 'Valued Customer',
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
