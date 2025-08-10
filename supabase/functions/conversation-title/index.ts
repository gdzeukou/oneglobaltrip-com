import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing OPENAI_API_KEY or Supabase credentials');
    }

    const { conversationId } = await req.json();
    if (!conversationId) {
      return new Response(JSON.stringify({ error: 'conversationId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: messages, error: fetchErr } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(20);

    if (fetchErr) throw fetchErr;

    const text = (messages || [])
      .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n')
      .slice(0, 4000);

    const titlePrompt = `You are titling a chat conversation succinctly for search. Create a concise 4-7 word title under 40 characters that captures the user's main intent.
- Prefer route-like formatting for flights: "NYC → Paris in Dec"
- For visas: "Germany Visa Questions"
- For itineraries: "Tokyo 5-Day Itinerary"
Rules: No quotes, proper capitalization, no emojis.
Conversation:
${text}
Return ONLY the title.`;

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You generate very short, clear titles.' },
          { role: 'user', content: titlePrompt }
        ],
        temperature: 0.2,
        max_tokens: 32,
      }),
    });

    const aiJson = await aiRes.json();
    const title = (aiJson?.choices?.[0]?.message?.content || 'Voice Chat').trim().replace(/^\"|\"$/g, '');

    await supabase
      .from('chat_conversations')
      .update({ title })
      .eq('id', conversationId);

    return new Response(JSON.stringify({ title }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('conversation-title error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
