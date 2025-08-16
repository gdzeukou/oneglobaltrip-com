-- Fix security issue: Restrict chat conversations and messages to authenticated users only

-- Drop existing overly permissive policies for chat_conversations
DROP POLICY IF EXISTS "Allow conversation access for authenticated users or developmen" ON public.chat_conversations;

-- Drop existing overly permissive policies for chat_messages  
DROP POLICY IF EXISTS "Allow message access for conversations" ON public.chat_messages;

-- Create secure policies for chat_conversations
CREATE POLICY "Users can manage their own conversations" 
ON public.chat_conversations 
FOR ALL 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all conversations
CREATE POLICY "Admins can view all conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (is_admin());

-- Allow admins to manage all conversations
CREATE POLICY "Admins can manage all conversations" 
ON public.chat_conversations 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create secure policies for chat_messages
CREATE POLICY "Users can manage messages in their conversations" 
ON public.chat_messages 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.chat_conversations 
  WHERE chat_conversations.id = chat_messages.conversation_id 
  AND chat_conversations.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chat_conversations 
  WHERE chat_conversations.id = chat_messages.conversation_id 
  AND chat_conversations.user_id = auth.uid()
));

-- Allow admins to view all messages
CREATE POLICY "Admins can view all messages" 
ON public.chat_messages 
FOR SELECT 
USING (is_admin());

-- Allow admins to manage all messages
CREATE POLICY "Admins can manage all messages" 
ON public.chat_messages 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());