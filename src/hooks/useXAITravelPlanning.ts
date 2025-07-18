import { useState } from 'react';
import { useXAI, XAIMessage } from './useXAI';

export interface TravelDestination {
  name: string;
  country: string;
  description: string;
  bestTimeToVisit: string;
  estimatedCost: string;
  visaRequirements: string;
  highlights: string[];
}

export interface TravelItinerary {
  destination: string;
  duration: string;
  activities: Array<{
    day: number;
    title: string;
    description: string;
    location: string;
    estimatedCost?: string;
  }>;
  totalEstimatedCost: string;
  travelTips: string[];
  visaInfo: {
    required: boolean;
    type?: string;
    processingTime?: string;
    requirements?: string[];
  };
}

export interface TravelPlanningRequest {
  destination?: string;
  budget?: string;
  duration?: string;
  interests?: string[];
  travelStyle?: 'budget' | 'mid-range' | 'luxury';
  travelDates?: {
    departure: string;
    return: string;
  };
  travelers?: {
    adults: number;
    children: number;
  };
}

export const useXAITravelPlanning = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sendMessage } = useXAI();

  const getDestinationRecommendations = async (
    preferences: TravelPlanningRequest
  ): Promise<TravelDestination[]> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `As an expert travel advisor powered by xAI Grok, recommend 5 travel destinations based on these preferences:

Budget: ${preferences.budget || 'Not specified'}
Duration: ${preferences.duration || 'Not specified'}
Interests: ${preferences.interests?.join(', ') || 'Not specified'}
Travel Style: ${preferences.travelStyle || 'Not specified'}
Travel Dates: ${preferences.travelDates ? `${preferences.travelDates.departure} to ${preferences.travelDates.return}` : 'Flexible'}
Travelers: ${preferences.travelers ? `${preferences.travelers.adults} adults, ${preferences.travelers.children} children` : 'Not specified'}

Provide detailed recommendations with:
1. Destination name and country
2. Brief description and why it fits their preferences
3. Best time to visit
4. Estimated cost range
5. Visa requirements for travelers
6. Top highlights and attractions

Format as JSON array with objects containing: name, country, description, bestTimeToVisit, estimatedCost, visaRequirements, highlights (array).`;

      const messages: XAIMessage[] = [
        {
          role: 'system',
          content: 'You are an expert travel advisor powered by xAI Grok. Provide intelligent, real-time travel recommendations with accurate visa and cost information. Always respond with valid JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      const response = await sendMessage(messages, {
        model: 'grok-beta',
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content received');
      }

      // Try to parse JSON from the response
      let jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        // If no JSON array found, try to extract from code blocks
        jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonMatch = jsonMatch[1].match(/\[[\s\S]*\]/);
        }
      }

      if (!jsonMatch) {
        throw new Error('Unable to parse destination recommendations from AI response');
      }

      const destinations = JSON.parse(jsonMatch[0]);
      return destinations;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get destination recommendations';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateTravelItinerary = async (
    destination: string,
    preferences: TravelPlanningRequest
  ): Promise<TravelItinerary> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `As an expert travel planner powered by xAI Grok, create a detailed itinerary for ${destination} with these preferences:

Duration: ${preferences.duration || 'Not specified'}
Budget: ${preferences.budget || 'Not specified'}
Interests: ${preferences.interests?.join(', ') || 'General sightseeing'}
Travel Style: ${preferences.travelStyle || 'mid-range'}
Travel Dates: ${preferences.travelDates ? `${preferences.travelDates.departure} to ${preferences.travelDates.return}` : 'Flexible'}
Travelers: ${preferences.travelers ? `${preferences.travelers.adults} adults, ${preferences.travelers.children} children` : '2 adults'}

Create a comprehensive day-by-day itinerary including:
1. Daily activities with locations and descriptions
2. Estimated costs for activities
3. Total estimated trip cost
4. Travel tips and local insights
5. Visa information (requirements, type, processing time)

Format as JSON with: destination, duration, activities (array with day, title, description, location, estimatedCost), totalEstimatedCost, travelTips (array), visaInfo (object with required, type, processingTime, requirements).`;

      const messages: XAIMessage[] = [
        {
          role: 'system',
          content: 'You are an expert travel planner powered by xAI Grok. Create detailed, practical itineraries with accurate costs and visa information. Always respond with valid JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ];

      const response = await sendMessage(messages, {
        model: 'grok-beta',
        temperature: 0.6,
        max_tokens: 2500
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content received');
      }

      // Try to parse JSON from the response
      let jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        // If no JSON object found, try to extract from code blocks
        jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonMatch = jsonMatch[1].match(/\{[\s\S]*\}/);
        }
      }

      if (!jsonMatch) {
        throw new Error('Unable to parse itinerary from AI response');
      }

      const itinerary = JSON.parse(jsonMatch[0]);
      return itinerary;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate travel itinerary';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTravelAdvice = async (query: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const messages: XAIMessage[] = [
        {
          role: 'system',
          content: 'You are an expert travel advisor powered by xAI Grok. Provide helpful, accurate travel advice with real-time insights. Include practical tips, safety information, and current travel conditions when relevant.'
        },
        {
          role: 'user',
          content: query
        }
      ];

      const response = await sendMessage(messages, {
        model: 'grok-beta',
        temperature: 0.7,
        max_tokens: 1000
      });

      const advice = response.choices[0]?.message?.content;
      if (!advice) {
        throw new Error('No advice received');
      }

      return advice;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get travel advice';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getDestinationRecommendations,
    generateTravelItinerary,
    getTravelAdvice,
    loading,
    error
  };
};