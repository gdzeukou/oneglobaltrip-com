
-- 1) Clean duplicates in user_preferences: keep the most recently updated row per user
WITH ranked AS (
  SELECT
    id,
    user_id,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY COALESCE(updated_at, created_at) DESC, id DESC
    ) AS rn
  FROM public.user_preferences
)
DELETE FROM public.user_preferences up
USING ranked r
WHERE up.id = r.id
  AND r.rn > 1;

-- 2) Enforce unique user_id in user_preferences
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_preferences_user_id_key'
      AND conrelid = 'public.user_preferences'::regclass
  ) THEN
    ALTER TABLE public.user_preferences
      ADD CONSTRAINT user_preferences_user_id_key UNIQUE (user_id);
  END IF;
END$$;

-- 3) Clean duplicates in user_agents: keep the most recently updated row per user
WITH ranked AS (
  SELECT
    id,
    user_id,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY COALESCE(updated_at, created_at) DESC, id DESC
    ) AS rn
  FROM public.user_agents
)
DELETE FROM public.user_agents ua
USING ranked r
WHERE ua.id = r.id
  AND r.rn > 1;

-- 4) Enforce unique user_id in user_agents
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_agents_user_id_key'
      AND conrelid = 'public.user_agents'::regclass
  ) THEN
    ALTER TABLE public.user_agents
      ADD CONSTRAINT user_agents_user_id_key UNIQUE (user_id);
  END IF;
END$$;
