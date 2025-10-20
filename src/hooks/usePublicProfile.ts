import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface PublicProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  home_city?: string;
  home_country?: string;
  current_location?: {
    city: string;
    country: string;
    lat: number;
    lng: number;
    last_updated: string;
  };
  travel_interests?: string[];
  languages_spoken?: string[];
  age_range?: string;
  gender?: string;
  is_discoverable: boolean;
  location_sharing_enabled: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export const usePublicProfile = (userId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const targetUserId = userId || user?.id;

  const { data: profile, isLoading } = useQuery({
    queryKey: ['public-profile', targetUserId],
    queryFn: async () => {
      if (!targetUserId) return null;
      
      const { data, error } = await supabase
        .from('user_profiles_public')
        .select('*')
        .eq('user_id', targetUserId)
        .maybeSingle();

      if (error) throw error;
      return data as PublicProfile;
    },
    enabled: !!targetUserId,
  });

  const createOrUpdateProfile = useMutation({
    mutationFn: async (profileData: Partial<PublicProfile>) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_profiles_public')
        .upsert({
          user_id: user.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-profile'] });
      toast({
        title: 'Profile updated',
        description: 'Your public profile has been updated successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    profile,
    isLoading,
    createOrUpdateProfile: createOrUpdateProfile.mutate,
    isUpdating: createOrUpdateProfile.isPending,
  };
};
