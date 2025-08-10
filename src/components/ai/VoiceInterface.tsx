import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { useUserAgent } from '@/hooks/useUserAgent';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Mic, Square, MessageCircle } from 'lucide-react';

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
  const [voiceConversationId, setVoiceConversationId] = useState<string | null>(null);
  const userBufferRef = useRef<string>('');
  const assistantBufferRef = useRef<string>('');
  const titleSetRef = useRef<boolean>(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const displayAgentName = preferences?.aiAgentName || userAgent?.name || 'AI Travel Agent';

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
  setTranscript((prev) => [...prev, { role, content }]);
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
    setShowTranscript(true);
    toast({ title: 'Voice chat ended', description: 'Transcript is ready below.' });
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Transcript panel */}
      {showTranscript && transcript.length > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-xl max-h-72 overflow-y-auto rounded-2xl border border-border bg-popover p-4 shadow-xl">
          <h3 className="text-sm font-semibold mb-2">Voice Chat Transcript</h3>
          <div className="space-y-2 text-sm">
            {transcript.map((m, i) => (
              <div key={i} className="leading-snug">
                <span className="font-medium">{m.role === 'user' ? 'You' : displayAgentName}:</span>{' '}
                <span className={m.role === 'user' ? 'text-foreground' : 'text-muted-foreground'}>{m.content}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1">
            You’re chatting with <span className="text-primary font-semibold">{displayAgentName}</span>
          </span>
          {transcript.length > 0 && (
            <button
              onClick={() => setShowTranscript((v) => !v)}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {showTranscript ? 'Hide' : 'Transcript'}
            </button>
          )}
        </div>

        <Button
          onClick={isConnected ? endConversation : startConversation}
          size="icon"
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          aria-label={isConnected ? 'End voice chat' : 'Start voice chat'}
        >
          {isConnected ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
};

export default VoiceInterface;
