-- Create user_agents table for AI agent storage
CREATE TABLE public.user_agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (length(name) >= 2 AND length(name) <= 25),
  avatar_url TEXT,
  preferences JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create index for efficient user lookups
CREATE INDEX idx_user_agents_user_id ON public.user_agents(user_id);

-- Enable RLS on user_agents table
ALTER TABLE public.user_agents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_agents
CREATE POLICY "Users can manage their own AI agent"
ON public.user_agents
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_agents_updated_at
BEFORE UPDATE ON public.user_agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing AI agent data from user_preferences to user_agents
INSERT INTO public.user_agents (user_id, name, avatar_url, preferences, created_at, updated_at)
SELECT 
  user_id,
  COALESCE(ai_agent_name, 'AI Travel Agent') as name,
  NULL as avatar_url,
  jsonb_build_object(
    'travel_style', ai_agent_travel_style,
    'dream_destinations', ai_agent_dream_destinations,
    'dietary_preferences', ai_agent_dietary_preferences,
    'accessibility_needs', ai_agent_accessibility_needs,
    'personality_traits', ai_agent_personality_traits,
    'airline_accounts', ai_agent_airline_accounts,
    'visa_assistance', ai_agent_visa_assistance
  ) as preferences,
  created_at,
  updated_at
FROM public.user_preferences
WHERE ai_agent_setup_completed = true
ON CONFLICT (user_id) DO NOTHING;