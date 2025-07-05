-- Maya Recovery Plan - Step 2: Remove Foreign Key Constraint
-- Remove the problematic foreign key constraint from chat_conversations
-- This allows development users with null user_id to work properly

ALTER TABLE chat_conversations DROP CONSTRAINT IF EXISTS chat_conversations_user_id_fkey;