-- Apply the RLS policy fixes for Maya chat system
-- Fix RLS policies for chat_conversations to allow development access
-- Update the RLS policy to properly handle development users

DROP POLICY IF EXISTS "Users can create their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can delete their own conversations" ON chat_conversations;

-- Create more permissive policies that allow development access
CREATE POLICY "Allow conversation access for authenticated users or development" 
ON chat_conversations FOR ALL 
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR 
  (user_id IS NULL) OR
  (user_id = '00000000-0000-0000-0000-000000000000'::uuid)
)
WITH CHECK (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR 
  (user_id IS NULL) OR
  (user_id = '00000000-0000-0000-0000-000000000000'::uuid)
);

-- Also update chat_messages policies for consistency
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON chat_messages;
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON chat_messages;

CREATE POLICY "Allow message access for conversations" 
ON chat_messages FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      (auth.uid() IS NOT NULL AND chat_conversations.user_id = auth.uid()) OR 
      (chat_conversations.user_id IS NULL) OR
      (chat_conversations.user_id = '00000000-0000-0000-0000-000000000000'::uuid)
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (
      (auth.uid() IS NOT NULL AND chat_conversations.user_id = auth.uid()) OR 
      (chat_conversations.user_id IS NULL) OR
      (chat_conversations.user_id = '00000000-0000-0000-0000-000000000000'::uuid)
    )
  )
);