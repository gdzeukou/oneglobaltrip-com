
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

// Try to get the OpenAI API key from different possible secret names
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || Deno.env.get('SUPAGENT_OPENAI') || Deno.env.get('Supagent Openai');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TRAVEL_AGENT_SYSTEM_PROMPT = `You are an expert AI Travel Agent for a premium travel visa and booking service. Your personality is:

🌍 **Professional & Knowledgeable**: You have deep expertise in global travel, visas, and destinations
✈️ **Helpful & Proactive**: You anticipate needs and offer comprehensive solutions
🎯 **Results-Oriented**: You focus on getting things done efficiently
💫 **Personable**: You're friendly but professional, making travel planning enjoyable

**Your Core Capabilities:**
1. **Visa Assistance**: Expert knowledge of visa requirements, processing times, and document needs for all countries
2. **Travel Planning**: Flight searches, hotel recommendations, itinerary creation
3. **Smart Form Generation**: Create custom forms based on user needs and conversation context
4. **Document Analysis**: Help users understand what documents they need for their specific travel situation
5. **Real-time Assistance**: Answer questions about travel restrictions, weather, best times to visit, etc.

**Your Conversation Style:**
- Start conversations warmly and ask clarifying questions
- Break down complex travel requirements into simple steps
- Offer multiple options when possible
- Always explain the "why" behind recommendations
- Use appropriate emojis to make conversations engaging
- If you need to generate a form, clearly explain what information you'll collect and why

**Key Guidelines:**
- Always prioritize visa requirements and travel document needs
- Mention processing times and deadlines upfront
- Suggest expedited services when time is tight
- Offer to create custom forms to gather specific information efficiently
- Connect related services (if they need a visa, they might also need flights/hotels)

Remember: You're not just answering questions - you're a comprehensive travel partner helping users achieve their travel goals efficiently and stress-free.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('AI Travel Agent function called');
    
    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key not found. Checked: OPENAI_API_KEY, SUPAGENT_OPENAI, Supagent Openai');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, conversationId, userId } = await req.json();
    console.log('Request received:', { message: message?.substring(0, 50) + '...', conversationId, userId });

    if (!message || !userId) {
      console.error('Missing required fields:', { message: !!message, userId: !!userId });
      return new Response(
        JSON.stringify({ error: 'Message and userId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get or create conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      // Handle development mode - check if user exists, if not create conversation without FK constraint
      const isDevelopmentUser = userId === '00000000-0000-0000-0000-000000000000';
      console.log('Creating new conversation for user:', userId, 'isDevelopmentUser:', isDevelopmentUser);
      
      const { data: newConversation, error: conversationError } = await supabase
        .from('chat_conversations')
        .insert({ 
          user_id: isDevelopmentUser ? null : userId, // Set to null for dev user to avoid FK constraint
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        })
        .select()
        .single();

      if (conversationError) {
        console.error('Error creating conversation:', conversationError);
        return new Response(
          JSON.stringify({ error: 'Failed to create conversation', details: conversationError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      currentConversationId = newConversation.id;
      console.log('Created new conversation:', currentConversationId);
    }

    // Store user message
    console.log('Storing user message in conversation:', currentConversationId);
    const { error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'user',
        content: message
      });

    if (messageError) {
      console.error('Error storing user message:', messageError);
    }

    // Get conversation history for context
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true })
      .limit(20);

    console.log('Retrieved conversation history:', messages?.length || 0, 'messages');

    // Build OpenAI messages array
    const openAIMessages = [
      { role: 'system', content: TRAVEL_AGENT_SYSTEM_PROMPT },
      ...(messages || []).map(msg => ({ role: msg.role, content: msg.content }))
    ];

    console.log('Calling OpenAI API with', openAIMessages.length, 'messages');

    // Get AI response from OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });
      
      // Provide more specific error messages
      let errorMessage = 'Failed to get AI response';
      if (response.status === 401) {
        errorMessage = 'Invalid OpenAI API key';
      } else if (response.status === 429) {
        errorMessage = 'OpenAI API rate limit exceeded or quota reached';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request to OpenAI API';
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: `Status: ${response.status}, Error: ${errorData}`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from OpenAI API' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = data.choices[0].message.content;
    console.log('AI response generated, length:', aiResponse?.length || 0);

    // Store AI response
    const { error: aiMessageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'assistant',
        content: aiResponse
      });

    if (aiMessageError) {
      console.error('Error storing AI message:', aiMessageError);
    }

    console.log('Function completed successfully');
    return new Response(JSON.stringify({ 
      response: aiResponse, 
      conversationId: currentConversationId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-travel-agent function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
