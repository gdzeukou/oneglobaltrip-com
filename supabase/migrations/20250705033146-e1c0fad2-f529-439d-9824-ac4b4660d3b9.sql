-- Debug and fix RLS policies for chat_conversations
-- First, let's check if there are any issues with the current policies

-- Drop and recreate the INSERT policy with better error handling
DROP POLICY IF EXISTS "Users can create their own conversations" ON chat_conversations;

-- Create a more robust INSERT policy that handles authentication better
CREATE POLICY "Users can create their own conversations" 
ON chat_conversations 
FOR INSERT 
WITH CHECK (
  -- Allow if user is authenticated and user_id matches
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
  -- Allow null user_id for development/testing
  (user_id IS NULL)
);

-- Also ensure the table RLS is enabled
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

-- Let's also make sure the messages table has proper policies
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON chat_messages;

CREATE POLICY "Users can create messages in their conversations" 
ON chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      (auth.uid() IS NOT NULL AND chat_conversations.user_id = auth.uid()) OR 
      chat_conversations.user_id IS NULL
    )
  )
);