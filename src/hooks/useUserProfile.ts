import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface GlobeUserProfile {
  nationality: string;
  passport_countries: string[];
  home_city: string;
  home_city_slug: string;
  home_lat: number | null;
  home_lng: number | null;
}

const DEFAULT_PROFILE: GlobeUserProfile = {
  nationality: '',
  passport_countries: [],
  home_city: '',
  home_city_slug: '',
  home_lat: null,
  home_lng: null,
};

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<GlobeUserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setProfile(DEFAULT_PROFILE); return; }
    setLoading(true);
    try {
      const { data } = await supabase
        .from('globe_user_profile')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (data) {
        setProfile({
          nationality: data.nationality ?? '',
          passport_countries: data.passport_countries ?? [],
          home_city: data.home_city ?? '',
          home_city_slug: data.home_city_slug ?? '',
          home_lat: data.home_lat ?? null,
          home_lng: data.home_lng ?? null,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const updateProfile = useCallback(async (updates: Partial<GlobeUserProfile>) => {
    if (!user) return;
    const next = { ...profile, ...updates };
    setProfile(next);
    await supabase
      .from('globe_user_profile')
      .upsert({ user_id: user.id, ...next, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  }, [user, profile]);

  return { profile, loading, updateProfile };
};
