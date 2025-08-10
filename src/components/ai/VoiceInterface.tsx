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
import CaptionsPanel from '@/components/ai/CaptionsPanel';

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

  // Buffers and UI states
  const userBufferRef = useRef<string>('');
  const assistantBufferRef = useRef<string>('');
  const [transcript, setTranscript] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [liveUserText, setLiveUserText] = useState('');
  const [liveAssistantText, setLiveAssistantText] = useState('');
  const [lingerUserText, setLingerUserText] = useState('');
  const [lingerAssistantText, setLingerAssistantText] = useState('');
  const userLingerTimeoutRef = useRef<number | null>(null);
  const assistantLingerTimeoutRef = useRef<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [recordEnabled, setRecordEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  // Turn tracking for transcript persistence
  const callStartRef = useRef<number | null>(null);
  const callIdRef = useRef<string | null>(null);
  const assistantSpeakingRef = useRef<boolean>(false);
  const userTurnStartRef = useRef<number | null>(null);
  const assistantTurnStartRef = useRef<number | null>(null);
  const turnsRef = useRef<{ speaker: 'user' | 'assistant'; text: string; startMs: number; endMs: number }[]>([]);

  const titleSetRef = useRef<boolean>(false);
  const [firstName, setFirstName] = useState<string | null>(null);
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

  const compileTranscript = () => {
    const createdAt = callStartRef.current ? new Date(callStartRef.current).toISOString() : new Date().toISOString();
    const durationSeconds = callStartRef.current ? Math.round((Date.now() - callStartRef.current) / 1000) : null;
    return {
      callId: callIdRef.current || '',
      userId: user?.id || null,
      createdAt,
      durationSeconds: durationSeconds ?? undefined,
      turns: turnsRef.current,
      summary: '',
      entities: { dates: [], airports: [], cities: [], budgets: [], preferences: [] },
    };
  };

  const copyTranscript = () => {
    const lines = turnsRef.current.map((t) => `${t.speaker === 'user' ? 'You' : displayAgentName}: ${t.text}`);
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      toast({ title: 'Copied', description: 'Transcript copied to clipboard.' });
    });
  };

  const downloadTranscript = () => {
    const lines = turnsRef.current.map((t) => `${t.speaker === 'user' ? 'You' : displayAgentName}: ${t.text}`);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ogt-transcript-${callIdRef.current || 'call'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveTranscriptToDB = async () => {
    if (!recordEnabled) return; // respect consent
    if (!user?.id) {
      toast({ title: 'Sign in required', description: 'Please sign in to save transcripts.' });
      return;
    }
    try {
      setSaving(true);
      const compiled = compileTranscript();
      const { error } = await supabase.from('voice_transcripts').insert({
        call_id: compiled.callId,
        user_id: user.id,
        conversation_id: voiceConversationId,
        duration_seconds: compiled.durationSeconds,
        turns: compiled.turns as any,
        summary: compiled.summary,
        entities: compiled.entities as any,
      });
      if (error) throw error;
      toast({ title: 'Saved', description: 'Transcript saved to your trip file.' });
    } catch (e: any) {
      console.error('Failed to save transcript', e);
      toast({ title: 'Save failed', description: e?.message || 'Could not save transcript', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const playConsentNotice = async () => {
    try {
      if (!recordEnabled) return;
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance('This call is being transcribed to help with your booking.');
        u.rate = 1.05;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    } catch (e) {
      // non-blocking
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
      if (!userTurnStartRef.current) {
        userTurnStartRef.current = Date.now();
        // Barge-in: if assistant was speaking, cancel its speech
        if (assistantSpeakingRef.current) {
          chatRef.current?.interrupt();
          assistantSpeakingRef.current = false;
        }
      }
      const chunk = event.delta || event.text || '';
      userBufferRef.current += chunk;
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
        const startMs = userTurnStartRef.current && callStartRef.current
          ? userTurnStartRef.current - callStartRef.current
          : 0;
        const endMs = callStartRef.current ? Date.now() - callStartRef.current : startMs;
        turnsRef.current.push({ speaker: 'user', text, startMs, endMs });
      }
      userTurnStartRef.current = null;
      userBufferRef.current = '';
      setLiveUserText('');
      setLingerUserText(text);
      if (userLingerTimeoutRef.current) {
        clearTimeout(userLingerTimeoutRef.current);
      }
      userLingerTimeoutRef.current = window.setTimeout(() => {
        setLingerUserText('');
      }, 5000);
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
      if (!assistantTurnStartRef.current) {
        assistantTurnStartRef.current = Date.now();
      }
      assistantSpeakingRef.current = true;
      const chunk = event.delta || event.text || '';
      assistantBufferRef.current += chunk;
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
        const startMs = assistantTurnStartRef.current && callStartRef.current
          ? assistantTurnStartRef.current - callStartRef.current
          : 0;
        const endMs = callStartRef.current ? Date.now() - callStartRef.current : startMs;
        turnsRef.current.push({ speaker: 'assistant', text, startMs, endMs });
      }
      assistantTurnStartRef.current = null;
      assistantBufferRef.current = '';
      setLiveAssistantText('');
      setLingerAssistantText(text);
      if (assistantLingerTimeoutRef.current) {
        clearTimeout(assistantLingerTimeoutRef.current);
      }
      assistantLingerTimeoutRef.current = window.setTimeout(() => {
        setLingerAssistantText('');
      }, 5000);
      maybeUpdateTitle();
      assistantSpeakingRef.current = false;
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
      turnsRef.current = [];
      callIdRef.current = (crypto && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}`;
      callStartRef.current = Date.now();

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
          `You are OneGlobalTrip's real-time Voice Travel Agent named ${agentName}. ` +
          `Never say "I'll be back shortly"; instead narrate progress like "searching now, first options incoming". ` +
          `${firstName ? `The user's first name is ${firstName}. Address them naturally. ` : ''}` +
          `Prefer nonstop; if nothing found, relax constraints and explain. Keep captions-friendly, concise.`,
      });

      let cid: string | null = null;
      if (user) {
        cid = await ensureConversation();
      }
      setIsConnected(true);
      if (cid) {
        navigate(`/ai-chat?cid=${cid}`);
      }

      if (recordEnabled) await playConsentNotice();

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

  const endConversation = async () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsConnecting(false);
    onSpeakingChange(false);

    // Auto-save transcript on end if consented
    if (recordEnabled) {
      await saveTranscriptToDB();
    }

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

  const shownUserText = liveUserText || lingerUserText;
  const shownAssistantText = liveAssistantText || lingerAssistantText;
  const userFinal = Boolean(!liveUserText && lingerUserText);
  const assistantFinal = Boolean(!liveAssistantText && lingerAssistantText);

  return (
    <>
      {/* Captions Panel */}
      {isConnected && (shownUserText || shownAssistantText) && (
        <CaptionsPanel
          userText={shownUserText}
          userFinal={userFinal}
          assistantText={shownAssistantText}
          assistantFinal={assistantFinal}
          agentName={displayAgentName}
          onCopy={copyTranscript}
          onDownload={downloadTranscript}
          onSave={saveTranscriptToDB}
          saving={saving}
        />
      )}

      {/* Floating controls */}
      <div className="fixed bottom-24 right-6 flex flex-col items-end gap-2 z-50">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <label className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 shadow-sm cursor-pointer">
            <input
              type="checkbox"
              className="accent-primary"
              checked={recordEnabled}
              onChange={(e) => setRecordEnabled(e.target.checked)}
            />
            <span>Record & Transcribe</span>
          </label>
          <span className="rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 shadow-sm">
            You’re chatting with <span className="text-primary font-semibold">{displayAgentName}</span>
          </span>
        </div>

        <Button
          onClick={isConnected ? endConversation : startConversation}
          size="icon"
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          aria-label={isConnected ? 'End voice chat' : 'Start voice chat'}
          disabled={isConnecting}
        >
          {isConnected ? <Square className="h-5 w-5 sm:h-6 sm:w-6" /> : <Mic className="h-5 w-5 sm:h-6 sm:w-6" />}
        </Button>
      </div>
    </>
  );
};

export default VoiceInterface;
