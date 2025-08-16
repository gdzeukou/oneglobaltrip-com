import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      message, 
      chatHistory = [], 
      userEmail, 
      sessionId,
      leadCaptureStep = 0 
    } = await req.json();

    console.log('AI Chat request:', { message, chatHistory: chatHistory.length, userEmail, sessionId, leadCaptureStep });

    // Determine system prompt based on lead capture stage
    let systemPrompt = `You are an expert AI travel assistant for One Global Trip, specializing in visa assistance and travel planning.

CORE PERSONALITY:
- Friendly, professional, and knowledgeable
- Ask smart questions to understand user needs
- Be conversational but focused on helping with visas and travel

BUSINESS FOCUS:
- Our main service is AI-powered visa assistance with 98% success rate
- We help with visa applications, document verification, and embassy requirements
- We also provide trip planning and concierge services

PROGRESSIVE LEAD CAPTURE STRATEGY:
${leadCaptureStep === 0 ? `
- This is the first interaction - be helpful and engaging
- After 2-3 exchanges, naturally ask for their email to "send personalized visa requirements"
` : leadCaptureStep === 1 ? `
- User has provided email - now focus on understanding their specific travel needs
- Ask about destination, travel dates, nationality for personalized assistance
- After providing helpful info, suggest our visa assistance service
` : `
- User is engaged - focus on converting to paid service
- Highlight our 98% success rate and AI-guided application process
- Suggest they start their visa application with our assistance
`}

KEY SERVICES TO MENTION:
- Instant visa requirements checker
- AI-guided visa application assistance ($15 per application)
- Document verification and embassy updates
- Travel planning and concierge services

Keep responses concise (2-3 sentences max) and always end with a relevant question or call-to-action.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: message }
    ];

    console.log('Sending to OpenAI with model: gpt-5-2025-08-07');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: messages,
        max_completion_tokens: 300,
        // Note: temperature parameter not supported for GPT-5
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response generated:', aiResponse.substring(0, 100) + '...');

    // Track conversation in database
    if (sessionId) {
      try {
        // Store chat interaction for analytics
        await supabase.from('user_activity').insert({
          session_id: sessionId,
          action_type: 'ai_chat',
          action_data: {
            user_message: message,
            ai_response: aiResponse,
            lead_capture_step: leadCaptureStep,
            user_email: userEmail
          },
          email: userEmail || 'anonymous@anonymous.com',
          page_visited: '/chat'
        });
      } catch (dbError) {
        console.error('Database tracking error:', dbError);
        // Don't fail the request if tracking fails
      }
    }

    // Determine if we should prompt for lead capture
    let shouldCaptureEmail = false;
    let shouldCapturePhone = false;
    
    if (leadCaptureStep === 0 && chatHistory.length >= 3) {
      shouldCaptureEmail = true;
    } else if (leadCaptureStep === 1 && userEmail && chatHistory.length >= 6) {
      shouldCapturePhone = true;
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      shouldCaptureEmail,
      shouldCapturePhone,
      nextLeadStep: shouldCaptureEmail ? 1 : shouldCapturePhone ? 2 : leadCaptureStep
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologize, but I\'m having trouble right now. Please try again in a moment.',
      response: 'I apologize, but I\'m having trouble right now. Please try again in a moment.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});