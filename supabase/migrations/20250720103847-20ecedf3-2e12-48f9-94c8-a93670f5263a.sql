-- Update default AI agent name from 'Maya' to empty string to force user setup
ALTER TABLE user_preferences 
ALTER COLUMN ai_agent_name SET DEFAULT '';

-- Update existing 'Maya' entries to empty string to force users to set up their own agent
UPDATE user_preferences 
SET ai_agent_name = '', ai_agent_setup_completed = false 
WHERE ai_agent_name = 'Maya';