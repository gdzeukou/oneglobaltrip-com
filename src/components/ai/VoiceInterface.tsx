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
import LiveTranscriptOverlay from '@/components/ai/LiveTranscriptOverlay';
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
  // Linger the last finalized captions on screen for better readability
  const [lingerUserText, setLingerUserText] = useState('');
  const [lingerAssistantText, setLingerAssistantText] = useState('');
  const userLingerTimeoutRef = useRef<number | null>(null);
  const assistantLingerTimeoutRef = useRef<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const displayAgentName = getDisplayAgentName(userAgent?.name, preferences?.aiAgentName);
  const ensureConversation = async (): Promise<string | null> => {
    if (voiceConversationId) return voiceConversationId;
    // Create conversation for both authenticated and anonymous users
    const payload: any = { title: 'Voice Chat' };
    if (user?.id) payload.user_id = user.id;

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert(payload)
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
      // When new live user text arrives, clear any lingering text and timers
      if (userLingerTimeoutRef.current) {
        clearTimeout(userLingerTimeoutRef.current);
        userLingerTimeoutRef.current = null;
      }
      setLingerUserText('');
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
      // Linger finalized user text for a few seconds so it's readable
      setLingerUserText(text);
      if (userLingerTimeoutRef.current) {
        clearTimeout(userLingerTimeoutRef.current);
      }
      userLingerTimeoutRef.current = window.setTimeout(() => {
        setLingerUserText('');
      }, 4000);
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
      // Clear any lingering assistant text when new live arrives
      if (assistantLingerTimeoutRef.current) {
        clearTimeout(assistantLingerTimeoutRef.current);
        assistantLingerTimeoutRef.current = null;
      }
      setLingerAssistantText('');
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
      // Linger finalized assistant text for readability
      setLingerAssistantText(text);
      if (assistantLingerTimeoutRef.current) {
        clearTimeout(assistantLingerTimeoutRef.current);
      }
      assistantLingerTimeoutRef.current = window.setTimeout(() => {
        setLingerAssistantText('');
      }, 4000);
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
    if (isConnected || isConnecting) return;
    setIsConnecting(true);
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

      // Ensure previous session is disconnected before starting a new one
      chatRef.current?.disconnect();

      chatRef.current = new RealtimeChat(handleMessage);
      const agentName = displayAgentName;
      await chatRef.current.init({
        voice: 'alloy',
        instructions:
          `You are OneGlobalTrip's AI Travel Agent named ${agentName}. ` +
          `Always introduce yourself as ${agentName}. ` +
          `If asked for your name, reply exactly: "I'm ${agentName}." ` +
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
    } finally {
      setIsConnecting(false);
    }
  };

  const endConversation = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsConnecting(false);
    onSpeakingChange(false);
    if (voiceConversationId) {
      navigate(`/ai-chat?cid=${voiceConversationId}`);
    }
    toast({ title: 'Voice chat ended', description: 'Conversation saved.' });
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
      if (userLingerTimeoutRef.current) {
        clearTimeout(userLingerTimeoutRef.current);
      }
      if (assistantLingerTimeoutRef.current) {
        clearTimeout(assistantLingerTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Live captions overlay */}
      {isConnected && ((liveAssistantText || liveUserText) || (lingerAssistantText || lingerUserText)) && (
        <LiveTranscriptOverlay
          userText={liveUserText || lingerUserText}
          assistantText={liveAssistantText || lingerAssistantText}
          agentName={displayAgentName}
          agentAvatarUrl={userAgent?.avatar_url}
        />
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
