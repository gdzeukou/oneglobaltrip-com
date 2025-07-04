-- Update RLS policies for chat_conversations to handle development mode (null user_id)

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Users can delete their own conversations" ON chat_conversations;

-- Create updated policies that handle null user_id for development
CREATE POLICY "Users can create their own conversations" 
ON chat_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own conversations" 
ON chat_conversations 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own conversations" 
ON chat_conversations 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own conversations" 
ON chat_conversations 
FOR DELETE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Update RLS policies for chat_messages to handle development conversations (with null user_id)

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON chat_messages;
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON chat_messages;

-- Create updated policies
CREATE POLICY "Users can create messages in their conversations" 
ON chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (chat_conversations.user_id = auth.uid() OR chat_conversations.user_id IS NULL)
  )
);

CREATE POLICY "Users can view messages from their conversations" 
ON chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND (chat_conversations.user_id = auth.uid() OR chat_conversations.user_id IS NULL)
  )
);