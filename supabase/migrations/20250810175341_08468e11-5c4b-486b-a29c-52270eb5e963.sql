-- Create voice_transcripts table for saving call transcripts
CREATE TABLE IF NOT EXISTS public.voice_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  conversation_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  turns JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT,
  entities JSONB NOT NULL DEFAULT '{"dates":[],"airports":[],"cities":[],"budgets":[],"preferences":[]}'::jsonb
);

-- Enable RLS
ALTER TABLE public.voice_transcripts ENABLE ROW LEVEL SECURITY;

-- Policies: users manage their own transcripts
CREATE POLICY IF NOT EXISTS "Users can insert their transcripts"
ON public.voice_transcripts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can view their transcripts"
ON public.voice_transcripts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their transcripts"
ON public.voice_transcripts
FOR UPDATE
USING (auth.uid() = user_id);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_voice_transcripts_user_id ON public.voice_transcripts(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_transcripts_call_id ON public.voice_transcripts(call_id);
