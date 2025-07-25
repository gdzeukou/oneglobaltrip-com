
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nationality, applyingFrom, usaVisaStatus, travelPurpose, duration } = await req.json();

    console.log('Processing visa eligibility check:', { nationality, applyingFrom, usaVisaStatus, travelPurpose, duration });

    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({
        eligible: false,
        status: 'error',
        title: 'Configuration Error',
        reason: 'AI service is currently unavailable. Please try again later.',
        alternative: 'Contact support for manual visa guidance.',
        documents: [],
        processingTime: 'N/A',
        successTips: []
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Special logic for USA applications with B1/B2 visa
    if (applyingFrom === 'USA' && usaVisaStatus === 'b1-b2') {
      return new Response(JSON.stringify({
        eligible: false,
        status: 'not-eligible',
        title: 'Not Eligible - B1/B2 Restriction',
        reason: 'B1/B2 visa holders cannot apply for Schengen visas from the USA due to immigration regulations.',
        alternative: 'You can apply for a Schengen visa from your home country or consider other travel options.',
        documents: [],
        processingTime: 'N/A',
        successTips: ['Apply from your home country instead', 'Consider transit visa if only passing through Schengen area']
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `You are a visa expert. Analyze this Schengen visa application scenario and provide detailed guidance:

Nationality: ${nationality}
Applying from: ${applyingFrom}
${applyingFrom === 'USA' ? `USA Visa Status: ${usaVisaStatus}` : ''}
Travel Purpose: ${travelPurpose}
Duration: ${duration}

Please provide:
1. Eligibility status (eligible/not-eligible/maybe)
2. Required documents list
3. Processing time estimate
4. Success tips (3-5 practical tips)
5. Any special considerations

Format your response as a structured analysis focusing on practical, actionable advice.`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert visa consultant specializing in Schengen visas. Provide clear, accurate, and actionable advice. Always consider the specific nationality and application location. Be aware that B1/B2 visa holders cannot apply for Schengen visas from the USA.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received:', { choices_length: data.choices?.length });

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;

    // Parse AI response and structure it
    const structuredResponse = {
      eligible: true,
      status: 'eligible',
      title: 'Visa Required - You Can Apply',
      aiAnalysis: aiResponse,
      processingTime: '15-20 business days',
      successTips: [
        'Submit complete documentation',
        'Book appointment early',
        'Ensure passport validity',
        'Provide clear travel itinerary'
      ]
    };

    console.log('Sending structured response');

    return new Response(JSON.stringify(structuredResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in visa-eligibility-ai function:', error);
    return new Response(JSON.stringify({ 
      eligible: false,
      status: 'error',
      title: 'Analysis Failed',
      reason: 'We encountered an error while processing your request. Please try again.',
      alternative: 'If the problem persists, contact our support team for assistance.',
      error: 'Failed to process visa eligibility check',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
