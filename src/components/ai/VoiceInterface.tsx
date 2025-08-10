import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface VoiceInterfaceProps {
  onSpeakingChange: (speaking: boolean) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const chatRef = useRef<RealtimeChat | null>(null);
  const { preferences } = useAIAgentPreferences();
  const { user } = useAuth();
  const [voiceConversationId, setVoiceConversationId] = useState<string | null>(null);
  const userBufferRef = useRef<string>('');
  const assistantBufferRef = useRef<string>('');
  const titleSetRef = useRef<boolean>(false);

  const ensureConversation = async (): Promise<string | null> => {
    if (voiceConversationId) return voiceConversationId;
    if (!user) return null;
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({ user_id: user.id, title: 'Voice Chat' })
      .select()
      .single();
    if (error) {
      console.error('Failed to create voice conversation', error);
      return null;
    }
    setVoiceConversationId(data.id);
    return data.id;
  };

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    const cid = await ensureConversation();
    if (!cid || !content.trim()) return;
    await supabase.from('chat_messages').insert({
      conversation_id: cid,
      role,
      content,
    });
  };

  const maybeUpdateTitle = async () => {
    if (titleSetRef.current) return;
    const cid = voiceConversationId;
    if (!cid) return;
    try {
      await supabase.functions.invoke('conversation-title', { body: { conversationId: cid } });
      titleSetRef.current = true;
    } catch (e) {
      console.warn('Title update failed', e);
    }
  };

  const handleMessage = (event: any) => {
    console.log('Received Realtime event:', event);

    // User transcript accumulation
    if (event.type === 'input_audio_transcription.delta' || event.type === 'response.input_text.delta') {
      userBufferRef.current += event.delta || event.text || '';
      return;
    }
    if (event.type === 'response.created') {
      if (userBufferRef.current.trim()) {
        saveMessage('user', userBufferRef.current.trim());
        userBufferRef.current = '';
      }
      return;
    }

    // Assistant transcript accumulation
    if (
      event.type === 'response.audio_transcript.delta' ||
      event.type === 'response.output_text.delta'
    ) {
      assistantBufferRef.current += event.delta || event.text || '';
      onSpeakingChange(true);
      return;
    }

    if (
      event.type === 'response.audio.done' ||
      event.type === 'response.output_text.done' ||
      event.type === 'response.done'
    ) {
      if (assistantBufferRef.current.trim()) {
        saveMessage('assistant', assistantBufferRef.current.trim());
        assistantBufferRef.current = '';
        maybeUpdateTitle();
      }
      onSpeakingChange(false);
      return;
    }

    // Fallback speaking indicator
    if (event.type === 'response.audio.delta') {
      onSpeakingChange(true);
    } else if (event.type === 'response.audio.done') {
      onSpeakingChange(false);
    }
  };

  const startConversation = async () => {
    try {
      chatRef.current = new RealtimeChat(handleMessage);
      const agentName = preferences?.aiAgentName || 'AI Travel Agent';
      await chatRef.current.init({
        voice: 'alloy',
        instructions:
          `You are OneGlobalTrip's AI Travel Agent named ${agentName}. ` +
          `Always introduce yourself as ${agentName}. ` +
          `If asked for your name, reply exactly: "I'm ${agentName}." ` +
          `Be friendly, proactive, and concise. Ask at most 1–2 follow-up questions per turn.`,
      });
      if (user) {
        await ensureConversation();
      }
      setIsConnected(true);
      toast({ title: 'Connected', description: 'Voice interface is ready' });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start conversation',
        variant: 'destructive',
      });
    }
  };

  const endConversation = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    onSpeakingChange(false);
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
      {!isConnected ? (
        <Button onClick={startConversation} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Start Voice Chat
        </Button>
      ) : (
        <Button onClick={endConversation} variant="secondary">
          End Voice Chat
        </Button>
      )}
    </div>
  );
};

export default VoiceInterface;
