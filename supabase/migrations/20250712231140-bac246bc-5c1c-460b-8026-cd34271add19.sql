-- Enable realtime for user activity tracking
ALTER TABLE user_activity REPLICA IDENTITY FULL;

-- Add user_sessions table for better session tracking
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  email TEXT NOT NULL,
  session_id TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  location_data JSONB,
  pages_visited INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_email ON public.user_sessions(email);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_is_active ON public.user_sessions(is_active);

-- Enable RLS on user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_sessions
CREATE POLICY "Anyone can create sessions" ON public.user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sessions" ON public.user_sessions FOR UPDATE USING (true);
CREATE POLICY "Admin can view all sessions" ON public.user_sessions FOR SELECT USING (is_admin());
CREATE POLICY "Users can view own sessions" ON public.user_sessions FOR SELECT USING (auth.uid() = user_id);

-- Add realtime publication for user activity and sessions
ALTER PUBLICATION supabase_realtime ADD TABLE user_activity;
ALTER PUBLICATION supabase_realtime ADD TABLE user_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE user_agents;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;

-- Create trigger for updated_at on user_sessions
CREATE TRIGGER update_user_sessions_updated_at
BEFORE UPDATE ON public.user_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();