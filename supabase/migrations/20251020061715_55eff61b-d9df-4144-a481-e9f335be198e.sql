-- Create enum for connection types (if not exists)
DO $$ BEGIN
  CREATE TYPE public.connection_type AS ENUM ('friend', 'follow', 'travel_buddy');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for connection status (if not exists)
DO $$ BEGIN
  CREATE TYPE public.connection_status AS ENUM ('pending', 'accepted', 'blocked');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for trip collaborator roles (if not exists)
DO $$ BEGIN
  CREATE TYPE public.trip_collab_role AS ENUM ('owner', 'editor', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create enum for invitation status (if not exists)
DO $$ BEGIN
  CREATE TYPE public.invitation_status AS ENUM ('pending', 'accepted', 'declined');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 1. user_profiles_public - Public Profile Information
CREATE TABLE IF NOT EXISTS public.user_profiles_public (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  display_name text NOT NULL,
  avatar_url text,
  bio text,
  home_city text,
  home_country text,
  current_location jsonb,
  travel_interests text[],
  languages_spoken text[],
  age_range text,
  gender text,
  is_discoverable boolean DEFAULT true,
  location_sharing_enabled boolean DEFAULT false,
  last_active_at timestamptz DEFAULT now(),
  profile_completion_percentage integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. user_connections - Friend/Follow System
CREATE TABLE IF NOT EXISTS public.user_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  addressee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status connection_status NOT NULL DEFAULT 'pending',
  connection_type connection_type DEFAULT 'friend',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, addressee_id)
);

-- 3. trip_collaborators - Shared Trips
CREATE TABLE IF NOT EXISTS public.trip_collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role trip_collab_role DEFAULT 'viewer',
  invited_by uuid REFERENCES auth.users(id),
  invitation_status invitation_status DEFAULT 'pending',
  can_edit boolean DEFAULT false,
  can_invite_others boolean DEFAULT false,
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(trip_id, user_id)
);

-- 4. user_location_history - Location Tracking
CREATE TABLE IF NOT EXISTS public.user_location_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  location jsonb NOT NULL,
  accuracy_radius_km numeric,
  is_traveling boolean DEFAULT false,
  related_trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  recorded_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days')
);

-- 5. discovery_preferences - User Privacy Settings
CREATE TABLE IF NOT EXISTS public.discovery_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  show_in_nearby boolean DEFAULT true,
  show_in_global_directory boolean DEFAULT true,
  share_current_location boolean DEFAULT false,
  share_upcoming_trips boolean DEFAULT true,
  share_past_trips boolean DEFAULT false,
  who_can_see_profile text DEFAULT 'everyone',
  who_can_message text DEFAULT 'everyone',
  who_can_invite_to_trips text DEFAULT 'connections',
  auto_accept_connections boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. traveler_messages - In-App Messaging
CREATE TABLE IF NOT EXISTS public.traveler_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_text text NOT NULL,
  read boolean DEFAULT false,
  read_at timestamptz,
  related_trip_id uuid REFERENCES trips(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_location_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discovery_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traveler_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view discoverable profiles" ON public.user_profiles_public;
DROP POLICY IF EXISTS "Users can manage own profile" ON public.user_profiles_public;
DROP POLICY IF EXISTS "Users can view own connections" ON public.user_connections;
DROP POLICY IF EXISTS "Users can create connections" ON public.user_connections;
DROP POLICY IF EXISTS "Users can update own connections" ON public.user_connections;
DROP POLICY IF EXISTS "Users can delete own connections" ON public.user_connections;
DROP POLICY IF EXISTS "View trip collaborators" ON public.trip_collaborators;
DROP POLICY IF EXISTS "Invite trip collaborators" ON public.trip_collaborators;
DROP POLICY IF EXISTS "Update trip collaborators" ON public.trip_collaborators;
DROP POLICY IF EXISTS "Users can manage own location" ON public.user_location_history;
DROP POLICY IF EXISTS "Users can manage own preferences" ON public.discovery_preferences;
DROP POLICY IF EXISTS "Users can view own messages" ON public.traveler_messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.traveler_messages;
DROP POLICY IF EXISTS "Users can update own messages" ON public.traveler_messages;

-- RLS Policies for user_profiles_public
CREATE POLICY "Users can view discoverable profiles" ON public.user_profiles_public
FOR SELECT USING (
  is_discoverable = true 
  AND (
    (SELECT who_can_see_profile FROM discovery_preferences WHERE user_id = user_profiles_public.user_id) = 'everyone'
    OR
    (
      (SELECT who_can_see_profile FROM discovery_preferences WHERE user_id = user_profiles_public.user_id) = 'connections'
      AND EXISTS (
        SELECT 1 FROM user_connections 
        WHERE (requester_id = auth.uid() AND addressee_id = user_profiles_public.user_id AND status = 'accepted'::connection_status)
           OR (addressee_id = auth.uid() AND requester_id = user_profiles_public.user_id AND status = 'accepted'::connection_status)
      )
    )
    OR user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage own profile" ON public.user_profiles_public
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- RLS Policies for user_connections
CREATE POLICY "Users can view own connections" ON public.user_connections
FOR SELECT USING (requester_id = auth.uid() OR addressee_id = auth.uid());

CREATE POLICY "Users can create connections" ON public.user_connections
FOR INSERT WITH CHECK (requester_id = auth.uid());

CREATE POLICY "Users can update own connections" ON public.user_connections
FOR UPDATE USING (requester_id = auth.uid() OR addressee_id = auth.uid());

CREATE POLICY "Users can delete own connections" ON public.user_connections
FOR DELETE USING (requester_id = auth.uid() OR addressee_id = auth.uid());

-- RLS Policies for trip_collaborators
CREATE POLICY "View trip collaborators" ON public.trip_collaborators
FOR SELECT USING (
  user_id = auth.uid() 
  OR EXISTS (
    SELECT 1 FROM trip_collaborators tc2 
    WHERE tc2.trip_id = trip_collaborators.trip_id 
    AND tc2.user_id = auth.uid()
  )
);

CREATE POLICY "Invite trip collaborators" ON public.trip_collaborators
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM trip_collaborators 
    WHERE trip_id = trip_collaborators.trip_id 
    AND user_id = auth.uid() 
    AND (role = 'owner'::trip_collab_role OR role = 'editor'::trip_collab_role OR can_invite_others = true)
  )
  OR EXISTS (
    SELECT 1 FROM trips WHERE id = trip_collaborators.trip_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Update trip collaborators" ON public.trip_collaborators
FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for user_location_history
CREATE POLICY "Users can manage own location" ON public.user_location_history
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- RLS Policies for discovery_preferences
CREATE POLICY "Users can manage own preferences" ON public.discovery_preferences
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- RLS Policies for traveler_messages
CREATE POLICY "Users can view own messages" ON public.traveler_messages
FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.traveler_messages
FOR INSERT WITH CHECK (
  sender_id = auth.uid() 
  AND (
    (SELECT who_can_message FROM discovery_preferences WHERE user_id = receiver_id) = 'everyone'
    OR 
    (
      (SELECT who_can_message FROM discovery_preferences WHERE user_id = receiver_id) = 'connections'
      AND EXISTS (
        SELECT 1 FROM user_connections 
        WHERE (requester_id = auth.uid() AND addressee_id = receiver_id AND status = 'accepted'::connection_status)
           OR (addressee_id = auth.uid() AND requester_id = receiver_id AND status = 'accepted'::connection_status)
      )
    )
  )
);

CREATE POLICY "Users can update own messages" ON public.traveler_messages
FOR UPDATE USING (receiver_id = auth.uid());

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_user_profiles_public_updated_at ON public.user_profiles_public;
DROP TRIGGER IF EXISTS update_user_connections_updated_at ON public.user_connections;
DROP TRIGGER IF EXISTS update_discovery_preferences_updated_at ON public.discovery_preferences;

-- Create triggers to update updated_at timestamp
CREATE TRIGGER update_user_profiles_public_updated_at
  BEFORE UPDATE ON public.user_profiles_public
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_connections_updated_at
  BEFORE UPDATE ON public.user_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discovery_preferences_updated_at
  BEFORE UPDATE ON public.discovery_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get nearby travelers using geospatial calculation
CREATE OR REPLACE FUNCTION public.get_nearby_travelers(
  user_lat float,
  user_lng float,
  radius_km int DEFAULT 50
)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  avatar_url text,
  distance_km numeric,
  current_location jsonb,
  bio text,
  travel_interests text[],
  upcoming_trips jsonb
) 
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    upp.user_id,
    upp.display_name,
    upp.avatar_url,
    ROUND(
      (6371 * acos(
        cos(radians(user_lat)) * 
        cos(radians((upp.current_location->>'lat')::float)) * 
        cos(radians((upp.current_location->>'lng')::float) - radians(user_lng)) + 
        sin(radians(user_lat)) * 
        sin(radians((upp.current_location->>'lat')::float))
      ))::numeric, 
      1
    ) AS distance_km,
    upp.current_location,
    upp.bio,
    upp.travel_interests,
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'destination', t.destination,
          'start_date', t.start_date,
          'end_date', t.end_date
        )
      )
      FROM trips t
      WHERE t.user_id = upp.user_id
      AND t.start_date > CURRENT_DATE
      AND t.status != 'cancelled'
      LIMIT 3
    ) AS upcoming_trips
  FROM user_profiles_public upp
  INNER JOIN discovery_preferences dp ON dp.user_id = upp.user_id
  WHERE 
    upp.is_discoverable = true
    AND upp.location_sharing_enabled = true
    AND dp.show_in_nearby = true
    AND upp.current_location IS NOT NULL
    AND upp.user_id != auth.uid()
    AND (6371 * acos(
      cos(radians(user_lat)) * 
      cos(radians((upp.current_location->>'lat')::float)) * 
      cos(radians((upp.current_location->>'lng')::float) - radians(user_lng)) + 
      sin(radians(user_lat)) * 
      sin(radians((upp.current_location->>'lat')::float))
    )) <= radius_km
  ORDER BY distance_km ASC;
END;
$$;

-- Function to clean up expired location history
CREATE OR REPLACE FUNCTION public.cleanup_expired_locations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.user_location_history 
  WHERE expires_at < now();
END;
$$;