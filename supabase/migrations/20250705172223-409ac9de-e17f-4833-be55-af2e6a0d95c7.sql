-- Maya Flight Booking Fix - Step 1: Allow null user_id for development scenarios
-- This matches the pattern used by chat_conversations table

-- Make user_id nullable in flight_bookings table to support development users
ALTER TABLE flight_bookings ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies to handle nullable user_id (like chat_conversations)
DROP POLICY IF EXISTS "Users can create their own bookings" ON flight_bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON flight_bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON flight_bookings;

-- Create new RLS policies that handle both authenticated users and development scenarios
CREATE POLICY "Allow booking access for authenticated users or development"
ON flight_bookings
FOR ALL
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

-- Update related tables to handle nullable user_id pattern as well
-- booking_passengers, booking_payments, booking_documents should work with nullable user_id in flight_bookings