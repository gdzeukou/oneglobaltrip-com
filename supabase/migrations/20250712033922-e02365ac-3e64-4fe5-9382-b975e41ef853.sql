-- Extend user_preferences table for AI agent personalization
ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS ai_agent_name TEXT DEFAULT 'Maya',
ADD COLUMN IF NOT EXISTS ai_agent_travel_style TEXT CHECK (ai_agent_travel_style IN ('Budget', 'Business', 'Family', 'Luxury', 'Adventure')),
ADD COLUMN IF NOT EXISTS ai_agent_dream_destinations TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ai_agent_visa_assistance BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ai_agent_airline_accounts JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ai_agent_dietary_preferences TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ai_agent_accessibility_needs TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ai_agent_setup_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_agent_personality_traits JSONB DEFAULT '{"helpful": true, "friendly": true, "professional": true}';

-- Add comment to document the new columns
COMMENT ON COLUMN user_preferences.ai_agent_name IS 'User-chosen name for their personal AI travel agent';
COMMENT ON COLUMN user_preferences.ai_agent_travel_style IS 'Preferred travel style: Budget, Business, Family, Luxury, Adventure';
COMMENT ON COLUMN user_preferences.ai_agent_dream_destinations IS 'Top 3 dream destinations chosen by user';
COMMENT ON COLUMN user_preferences.ai_agent_visa_assistance IS 'Whether user needs visa assistance';
COMMENT ON COLUMN user_preferences.ai_agent_airline_accounts IS 'Airline loyalty accounts and preferences';
COMMENT ON COLUMN user_preferences.ai_agent_dietary_preferences IS 'Dietary restrictions and preferences';
COMMENT ON COLUMN user_preferences.ai_agent_accessibility_needs IS 'Accessibility requirements';
COMMENT ON COLUMN user_preferences.ai_agent_setup_completed IS 'Whether AI agent onboarding is complete';
COMMENT ON COLUMN user_preferences.ai_agent_personality_traits IS 'AI agent personality customization';