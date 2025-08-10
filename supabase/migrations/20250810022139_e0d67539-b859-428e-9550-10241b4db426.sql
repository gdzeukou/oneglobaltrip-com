-- 1) Extend user_preferences with memory and privacy fields
ALTER TABLE public.user_preferences
ADD COLUMN IF NOT EXISTS home_airports text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS passports text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS loyalty_ids jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS budget_band text DEFAULT 'mid',
ADD COLUMN IF NOT EXISTS preference_vector jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS tracking_opt_in boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS voice_opt_in boolean DEFAULT false;

-- 2) Create trip_contexts table for active/past planning contexts
CREATE TABLE IF NOT EXISTS public.trip_contexts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'active',
  destinations text[] NOT NULL DEFAULT '{}',
  date_window jsonb DEFAULT '{}'::jsonb,
  party_size integer DEFAULT 1,
  budget_range text,
  notes text,
  saved_quotes jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS and add policy to allow users to manage their own records
ALTER TABLE public.trip_contexts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='trip_contexts' AND policyname='Users can manage their own trip contexts'
  ) THEN
    CREATE POLICY "Users can manage their own trip contexts"
    ON public.trip_contexts
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- 3) Trigger to auto-update updated_at on changes
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_trip_contexts_updated_at'
  ) THEN
    CREATE TRIGGER trg_trip_contexts_updated_at
    BEFORE UPDATE ON public.trip_contexts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- 4) Helpful indexes for signals and contexts
CREATE INDEX IF NOT EXISTS idx_user_activity_user_created_at ON public.user_activity (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_last_activity ON public.user_sessions (user_id, last_activity DESC);
CREATE INDEX IF NOT EXISTS idx_trip_contexts_user_status ON public.trip_contexts (user_id, status);
