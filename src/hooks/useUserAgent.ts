import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserAgent {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  preferences: {
    travel_style?: string[];
    languages?: string[];
    budget_range?: string;
    flight_comfort?: number;
    hotel_rating?: number;
    pace?: number;
    allow_data_access?: boolean;
  };
  created_at: string;
  updated_at: string;
}

export const useUserAgent = () => {
  const { user } = useAuth();
  const [agent, setAgent] = useState<UserAgent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserAgent();
    } else {
      setAgent(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserAgent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_agents')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user agent:', error);
        return;
      }

      setAgent(data);
    } catch (error) {
      console.error('Error fetching user agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agentData: Omit<UserAgent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('user_agents')
        .insert({
          user_id: user.id,
          name: agentData.name,
          avatar_url: agentData.avatar_url,
          preferences: agentData.preferences
        })
        .select()
        .single();

      if (error) throw error;

      setAgent(data);
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating agent:', error);
      return { data: null, error };
    }
  };

  const updateAgent = async (updates: Partial<Pick<UserAgent, 'name' | 'avatar_url' | 'preferences'>>) => {
    if (!user || !agent) throw new Error('User not authenticated or no agent found');

    try {
      const { data, error } = await supabase
        .from('user_agents')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setAgent(data);
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating agent:', error);
      return { data: null, error };
    }
  };

  const hasAgent = !!agent;

  return {
    agent,
    loading,
    hasAgent,
    createAgent,
    updateAgent,
    refetch: fetchUserAgent
  };
};