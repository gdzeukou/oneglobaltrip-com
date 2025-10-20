import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Connection {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  connection_type: 'friend' | 'follow' | 'travel_buddy';
  created_at: string;
  updated_at: string;
}

export const useConnections = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: connections, isLoading } = useQuery({
    queryKey: ['connections', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_connections')
        .select('*')
        .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

      if (error) throw error;
      return data as Connection[];
    },
    enabled: !!user?.id,
  });

  const sendConnectionRequest = useMutation({
    mutationFn: async ({ 
      addresseeId, 
      connectionType = 'friend' 
    }: { 
      addresseeId: string; 
      connectionType?: 'friend' | 'follow' | 'travel_buddy';
    }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_connections')
        .insert({
          requester_id: user.id,
          addressee_id: addresseeId,
          connection_type: connectionType,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      toast({
        title: 'Connection request sent',
        description: 'Your connection request has been sent.',
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

  const updateConnectionStatus = useMutation({
    mutationFn: async ({ 
      connectionId, 
      status 
    }: { 
      connectionId: string; 
      status: 'accepted' | 'blocked';
    }) => {
      const { data, error } = await supabase
        .from('user_connections')
        .update({ status })
        .eq('id', connectionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      toast({
        title: 'Connection updated',
        description: 'Connection status has been updated.',
      });
    },
  });

  const removeConnection = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('user_connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      toast({
        title: 'Connection removed',
        description: 'The connection has been removed.',
      });
    },
  });

  const getConnectionStatus = (otherUserId: string): 'none' | 'pending' | 'connected' | 'blocked' => {
    if (!connections || !user?.id) return 'none';

    const connection = connections.find(
      c => (c.requester_id === user.id && c.addressee_id === otherUserId) ||
           (c.addressee_id === user.id && c.requester_id === otherUserId)
    );

    if (!connection) return 'none';
    if (connection.status === 'blocked') return 'blocked';
    if (connection.status === 'accepted') return 'connected';
    return 'pending';
  };

  return {
    connections: connections || [],
    isLoading,
    sendConnectionRequest: sendConnectionRequest.mutate,
    updateConnectionStatus: updateConnectionStatus.mutate,
    removeConnection: removeConnection.mutate,
    getConnectionStatus,
    isSendingRequest: sendConnectionRequest.isPending,
  };
};
