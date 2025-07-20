
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UnifiedAIAgent {
  id?: string;
  name: string;
  avatar_url?: string;
  travelStyle: string | null;
  dreamDestinations: string[];
  visaAssistance: boolean;
  airlineAccounts: Record<string, any>;
  dietaryPreferences: string[];
  accessibilityNeeds: string[];
  setupCompleted: boolean;
  personalityTraits: Record<string, any>;
}

const defaultAgent: UnifiedAIAgent = {
  name: '',
  travelStyle: null,
  dreamDestinations: [],
  visaAssistance: true,
  airlineAccounts: {},
  dietaryPreferences: [],
  accessibilityNeeds: [],
  setupCompleted: false,
  personalityTraits: { helpful: true, friendly: true, professional: true }
};

export const useUnifiedAIAgent = () => {
  const { user } = useAuth();
  const [agent, setAgent] = useState<UnifiedAIAgent>(defaultAgent);
  const [loading, setLoading] = useState(true);

  const fetchAgent = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // First try to get from user_agents table
      const { data: userAgent, error: agentError } = await supabase
        .from('user_agents')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (userAgent && !agentError) {
        setAgent({
          id: userAgent.id,
          name: userAgent.name,
          avatar_url: userAgent.avatar_url,
          travelStyle: userAgent.preferences?.travel_style || null,
          dreamDestinations: userAgent.preferences?.dream_destinations || [],
          visaAssistance: userAgent.preferences?.visa_assistance ?? true,
          airlineAccounts: userAgent.preferences?.airline_accounts || {},
          dietaryPreferences: userAgent.preferences?.dietary_preferences || [],
          accessibilityNeeds: userAgent.preferences?.accessibility_needs || [],
          setupCompleted: true, // If it exists in user_agents, it's completed
          personalityTraits: userAgent.preferences?.personality_traits || { helpful: true, friendly: true, professional: true }
        });
        setLoading(false);
        return;
      }

      // If not found in user_agents, check user_preferences
      const { data: preferences, error: prefsError } = await supabase
        .from('user_preferences')
        .select(`
          ai_agent_name,
          ai_agent_travel_style,
          ai_agent_dream_destinations,
          ai_agent_visa_assistance,
          ai_agent_airline_accounts,
          ai_agent_dietary_preferences,
          ai_agent_accessibility_needs,
          ai_agent_setup_completed,
          ai_agent_personality_traits
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      if (preferences && !prefsError) {
        setAgent({
          name: preferences.ai_agent_name || '',
          travelStyle: preferences.ai_agent_travel_style,
          dreamDestinations: preferences.ai_agent_dream_destinations || [],
          visaAssistance: preferences.ai_agent_visa_assistance ?? true,
          airlineAccounts: preferences.ai_agent_airline_accounts || {},
          dietaryPreferences: preferences.ai_agent_dietary_preferences || [],
          accessibilityNeeds: preferences.ai_agent_accessibility_needs || [],
          setupCompleted: preferences.ai_agent_setup_completed ?? false,
          personalityTraits: preferences.ai_agent_personality_traits || { helpful: true, friendly: true, professional: true }
        });
      }
    } catch (error) {
      console.error('Error fetching agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAgent = async (updates: Partial<UnifiedAIAgent>) => {
    if (!user) return false;

    try {
      // If agent has an ID, update user_agents table
      if (agent.id) {
        const { error } = await supabase
          .from('user_agents')
          .update({
            name: updates.name,
            avatar_url: updates.avatar_url,
            preferences: {
              travel_style: updates.travelStyle,
              dream_destinations: updates.dreamDestinations,
              visa_assistance: updates.visaAssistance,
              airline_accounts: updates.airlineAccounts,
              dietary_preferences: updates.dietaryPreferences,
              accessibility_needs: updates.accessibilityNeeds,
              personality_traits: updates.personalityTraits,
            }
          })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error updating agent:', error);
          return false;
        }
      } else {
        // Update user_preferences table
        const updateData = {
          ai_agent_name: updates.name,
          ai_agent_travel_style: updates.travelStyle,
          ai_agent_dream_destinations: updates.dreamDestinations,
          ai_agent_visa_assistance: updates.visaAssistance,
          ai_agent_airline_accounts: updates.airlineAccounts,
          ai_agent_dietary_preferences: updates.dietaryPreferences,
          ai_agent_accessibility_needs: updates.accessibilityNeeds,
          ai_agent_setup_completed: updates.setupCompleted,
          ai_agent_personality_traits: updates.personalityTraits,
        };

        // Remove undefined values
        Object.keys(updateData).forEach(key => {
          if (updateData[key as keyof typeof updateData] === undefined) {
            delete updateData[key as keyof typeof updateData];
          }
        });

        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            ...updateData,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error updating preferences:', error);
          return false;
        }
      }

      // Update local state
      setAgent(prev => ({ ...prev, ...updates }));
      return true;
    } catch (error) {
      console.error('Error updating agent:', error);
      return false;
    }
  };

  const saveCompleteSetup = async (completeAgent: Omit<UnifiedAIAgent, 'setupCompleted' | 'id'>) => {
    const success = await updateAgent({
      ...completeAgent,
      setupCompleted: true
    });

    if (success) {
      toast.success(`🎉 ${completeAgent.name} is ready to help you explore the world!`);
    }

    return success;
  };

  useEffect(() => {
    fetchAgent();
  }, [user]);

  return {
    agent,
    loading,
    updateAgent,
    saveCompleteSetup,
    refreshAgent: fetchAgent,
    hasAgent: !!agent.name && agent.setupCompleted
  };
};
