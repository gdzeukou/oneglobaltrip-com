import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AIAgentPreferences {
  aiAgentName: string;
  aiAgentTravelStyle: string | null;
  aiAgentDreamDestinations: string[];
  aiAgentVisaAssistance: boolean;
  aiAgentAirlineAccounts: Record<string, any>;
  aiAgentDietaryPreferences: string[];
  aiAgentAccessibilityNeeds: string[];
  aiAgentSetupCompleted: boolean;
  aiAgentPersonalityTraits: Record<string, any>;
}

const defaultPreferences: AIAgentPreferences = {
  aiAgentName: 'AI Travel Agent',
  aiAgentTravelStyle: null,
  aiAgentDreamDestinations: [],
  aiAgentVisaAssistance: true,
  aiAgentAirlineAccounts: {},
  aiAgentDietaryPreferences: [],
  aiAgentAccessibilityNeeds: [],
  aiAgentSetupCompleted: false,
  aiAgentPersonalityTraits: { helpful: true, friendly: true, professional: true }
};

export const useAIAgentPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<AIAgentPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  const fetchPreferences = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
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
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching AI agent preferences:', error);
        return;
      }

      if (data) {
        setPreferences({
          aiAgentName: data.ai_agent_name || 'AI Travel Agent',
          aiAgentTravelStyle: data.ai_agent_travel_style,
          aiAgentDreamDestinations: data.ai_agent_dream_destinations || [],
          aiAgentVisaAssistance: data.ai_agent_visa_assistance ?? true,
          aiAgentAirlineAccounts: data.ai_agent_airline_accounts || {},
          aiAgentDietaryPreferences: data.ai_agent_dietary_preferences || [],
          aiAgentAccessibilityNeeds: data.ai_agent_accessibility_needs || [],
          aiAgentSetupCompleted: data.ai_agent_setup_completed ?? false,
          aiAgentPersonalityTraits: data.ai_agent_personality_traits || { helpful: true, friendly: true, professional: true }
        });
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<AIAgentPreferences>) => {
    if (!user) return;

    try {
      const updateData = {
        ai_agent_name: updates.aiAgentName,
        ai_agent_travel_style: updates.aiAgentTravelStyle,
        ai_agent_dream_destinations: updates.aiAgentDreamDestinations,
        ai_agent_visa_assistance: updates.aiAgentVisaAssistance,
        ai_agent_airline_accounts: updates.aiAgentAirlineAccounts,
        ai_agent_dietary_preferences: updates.aiAgentDietaryPreferences,
        ai_agent_accessibility_needs: updates.aiAgentAccessibilityNeeds,
        ai_agent_setup_completed: updates.aiAgentSetupCompleted,
        ai_agent_personality_traits: updates.aiAgentPersonalityTraits,
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
        console.error('Error updating AI agent preferences:', error);
        toast.error('Failed to save preferences');
        return false;
      }

      // Update local state
      setPreferences(prev => ({ ...prev, ...updates }));
      return true;
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to save preferences');
      return false;
    }
  };

  const saveCompleteSetup = async (completePreferences: Omit<AIAgentPreferences, 'aiAgentSetupCompleted'>) => {
    const success = await updatePreferences({
      ...completePreferences,
      aiAgentSetupCompleted: true
    });

    if (success) {
      toast.success(`🎉 ${completePreferences.aiAgentName} is ready to help you explore the world!`);
    }

    return success;
  };

  const getPersonalizedContext = () => {
    if (!preferences.aiAgentSetupCompleted) {
      return null;
    }

    return {
      agentName: preferences.aiAgentName,
      travelStyle: preferences.aiAgentTravelStyle,
      dreamDestinations: preferences.aiAgentDreamDestinations,
      visaAssistance: preferences.aiAgentVisaAssistance,
      dietaryPreferences: preferences.aiAgentDietaryPreferences,
      accessibilityNeeds: preferences.aiAgentAccessibilityNeeds,
      personalityTraits: preferences.aiAgentPersonalityTraits
    };
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  return {
    preferences,
    loading,
    updatePreferences,
    saveCompleteSetup,
    getPersonalizedContext,
    refreshPreferences: fetchPreferences
  };
};