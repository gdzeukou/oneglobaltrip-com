import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  first_name: string;
  last_name: string;
  date_of_birth: Date | undefined;
  passport_number: string;
  passport_expiry: Date | undefined;
  nationality: string;
  phone: string;
}

interface UseProfileMutationProps {
  onSuccess?: () => void;
}

export const useProfileMutation = ({ onSuccess }: UseProfileMutationProps = {}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileData) => {
      if (!user?.id) throw new Error('No user ID');
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: data.date_of_birth?.toISOString().split('T')[0],
          passport_number: data.passport_number,
          passport_expiry: data.passport_expiry?.toISOString().split('T')[0],
          nationality: data.nationality,
          phone: data.phone,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-check'] });
      toast({
        title: "Profile Created",
        description: "Your profile has been created successfully!",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive"
      });
    }
  });
};