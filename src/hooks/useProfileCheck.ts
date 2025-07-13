import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useProfileCheck = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile-check', user?.id],
    queryFn: async () => {
      if (!user?.id) return { hasProfile: false, profile: null };
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No profile exists yet
        return { hasProfile: false, profile: null };
      }

      if (error) throw error;

      // Check if profile has required fields
      const hasRequiredFields = data && 
        (data.first_name || data.last_name) &&
        data.date_of_birth &&
        data.passport_number &&
        data.passport_expiry;

      return { 
        hasProfile: !!hasRequiredFields,
        profile: data
      };
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  });
};