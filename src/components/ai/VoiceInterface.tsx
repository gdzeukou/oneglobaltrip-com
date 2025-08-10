import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { useUserAgent } from '@/hooks/useUserAgent';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Mic, Square } from 'lucide-react';
import { getDisplayAgentName } from '@/utils/displayAgentName';
import { useNavigate } from 'react-router-dom';

interface VoiceInterfaceProps {
  onSpeakingChange: (speaking: boolean) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const chatRef = useRef<RealtimeChat | null>(null);
  const { preferences } = useAIAgentPreferences();
  const { agent: userAgent } = useUserAgent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [voiceConversationId, setVoiceConversationId] = useState<string | null>(null);
  const userBufferRef = useRef<string>('');
  const assistantBufferRef = useRef<string>('');
  const titleSetRef = useRef<boolean>(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [liveUserText, setLiveUserText] = useState('');
  const [liveAssistantText, setLiveAssistantText] = useState('');
  const displayAgentName = getDisplayAgentName(userAgent?.name, preferences?.aiAgentName);
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
  const { error } = await supabase.from('chat_messages').insert({
    conversation_id: cid,
    role,
    content,
  });
  if (error) {
    console.error('Failed to insert chat message', error);
  } else {
    setTranscript((prev) => [...prev, { role, content }]);
  }
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

    // USER TRANSCRIPTS (multiple possible event names from Realtime API)
    if (
      event &&
      [
        'input_audio_transcription.delta',
        'input_transcript.delta',
        'response.input_text.delta',
        'input.text.delta',
      ].includes(event.type)
    ) {
      const chunk = event.delta || event.text || '';
      userBufferRef.current += chunk;
      setLiveUserText(userBufferRef.current);
      return;
    }

    if (
      event &&
      [
        'input_audio_transcription.done',
        'input_audio_transcription.completed',
        'input_transcript.done',
        'input_transcript.completed',
        'input_audio_buffer.speech_stopped',
      ].includes(event.type)
    ) {
      const text = userBufferRef.current.trim();
      if (text) {
        saveMessage('user', text);
      }
      userBufferRef.current = '';
      setLiveUserText('');
      return;
    }

    // ASSISTANT TRANSCRIPTS
    if (
      event &&
      [
        'response.audio_transcript.delta',
        'response.output_text.delta',
        'response.text.delta',
      ].includes(event.type)
    ) {
      const chunk = event.delta || event.text || '';
      assistantBufferRef.current += chunk;
      setLiveAssistantText(assistantBufferRef.current);
      onSpeakingChange(true);
      return;
    }

    if (
      event &&
      [
        'response.audio.done',
        'response.output_text.done',
        'response.done',
        'response.completed',
        'response.audio_transcript.done',
      ].includes(event.type)
    ) {
      const text = assistantBufferRef.current.trim();
      if (text) {
        saveMessage('assistant', text);
      }
      assistantBufferRef.current = '';
      setLiveAssistantText('');
      maybeUpdateTitle();
      onSpeakingChange(false);
      return;
    }

    // Fallback speaking indicator
    if (event?.type === 'response.audio.delta') {
      onSpeakingChange(true);
    } else if (event?.type === 'response.audio.done') {
      onSpeakingChange(false);
    }
  };

  const startConversation = async () => {
    try {
      // Reset state and fetch user's first name if available
      setTranscript([]);
      titleSetRef.current = false;
      if (user && !firstName) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', user.id)
            .maybeSingle();
          if (profile?.first_name) setFirstName(profile.first_name);
        } catch (e) {
          console.warn('Failed to fetch first name', e);
        }
      }

      chatRef.current = new RealtimeChat(handleMessage);
      const agentName = displayAgentName;
      await chatRef.current.init({
        voice: 'alloy',
        instructions:
          `You are OneGlobalTrip's AI Travel Agent named ${agentName}. ` +
          `Always introduce yourself as ${agentName}. ` +
          `If asked for your name, reply exactly: \"I'm ${agentName}.\" ` +
          `${firstName ? `The user's first name is ${firstName}. Address them by their first name naturally. ` : ''}` +
          `Be friendly, proactive, and concise. Ask at most 1–2 follow-up questions per turn.`,
      });
      let cid: string | null = null;
      if (user) {
        cid = await ensureConversation();
      }
      setIsConnected(true);
      if (cid) {
        navigate(`/ai-chat?cid=${cid}`);
      }
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
    if (voiceConversationId) {
      navigate(`/ai-chat?cid=${voiceConversationId}`);
    }
    toast({ title: 'Voice chat ended', description: 'Conversation saved.' });
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Live captions overlay */}
      {isConnected && (liveAssistantText || liveUserText) && (
        <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center px-6">
          <p className="pointer-events-none text-center text-2xl sm:text-3xl leading-snug font-medium text-foreground bg-background/70 backdrop-blur rounded-2xl px-5 py-4 shadow">
            {liveAssistantText || liveUserText}
          </p>
          <span aria-live="polite" className="sr-only">{liveAssistantText || liveUserText}</span>
        </div>
      )}

      {/* Floating controls */}
      <div className="fixed bottom-24 right-6 flex flex-col items-end gap-2 z-50">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 shadow-sm">
            You’re chatting with <span className="text-primary font-semibold">{displayAgentName}</span>
          </span>
        </div>

        <Button
          onClick={isConnected ? endConversation : startConversation}
          size="icon"
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          aria-label={isConnected ? 'End voice chat' : 'Start voice chat'}
        >
          {isConnected ? <Square className="h-5 w-5 sm:h-6 sm:w-6" /> : <Mic className="h-5 w-5 sm:h-6 sm:w-6" />}
        </Button>
      </div>
    </>
  );
};

export default VoiceInterface;
