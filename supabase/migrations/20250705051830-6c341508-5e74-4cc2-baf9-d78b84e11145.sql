-- Test the current RLS policies by attempting to create a conversation as a development user
-- First, let's check what the auth.uid() returns in our current context

SELECT 
  auth.uid() as current_auth_uid,
  (auth.uid() IS NOT NULL) as is_authenticated,
  '00000000-0000-0000-0000-000000000000'::uuid as dev_user_id,
  (auth.uid() = '00000000-0000-0000-0000-000000000000'::uuid) as is_dev_user;

-- Test if we can create a conversation with null user_id (for development)
INSERT INTO chat_conversations (user_id, title) 
VALUES (null, 'Test conversation for development') 
RETURNING id, user_id, title, created_at;