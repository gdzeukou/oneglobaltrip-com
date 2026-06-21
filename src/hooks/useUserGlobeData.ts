import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface GlobeSave {
  id: string;
  type: 'city' | 'country';
  name: string;
  country: string;
  country_slug: string;
  city_slug?: string | null;
  lat: number;
  lng: number;
  emoji?: string | null;
  created_at: string;
}

export interface GlobeVisited {
  id: string;
  country: string;
  country_slug: string;
  visited_at?: string | null;
}

export interface GlobeRecent {
  id: string;
  type: 'city' | 'country';
  name: string;
  country: string;
  country_slug: string;
  city_slug?: string | null;
  lat: number;
  lng: number;
  emoji?: string | null;
  viewed_at: string;
}

interface UserGlobeData {
  saves: GlobeSave[];
  visited: GlobeVisited[];
  recent: GlobeRecent[];
  loading: boolean;
  // Actions
  savePlace: (place: Omit<GlobeSave, 'id' | 'created_at'>) => Promise<void>;
  unsavePlace: (id: string) => Promise<void>;
  markVisited: (country: string, countrySlug: string, visitedAt?: string) => Promise<void>;
  unmarkVisited: (id: string) => Promise<void>;
  trackRecent: (place: Omit<GlobeRecent, 'id' | 'viewed_at'>) => Promise<void>;
  isSaved: (countrySlug: string, citySlug?: string) => boolean;
  isVisited: (countrySlug: string) => boolean;
}

export const useUserGlobeData = (): UserGlobeData => {
  const { user } = useAuth();
  const [saves, setSaves] = useState<GlobeSave[]>([]);
  const [visited, setVisited] = useState<GlobeVisited[]>([]);
  const [recent, setRecent] = useState<GlobeRecent[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setSaves([]); setVisited([]); setRecent([]); return; }
    setLoading(true);
    try {
      const [savesRes, visitedRes, recentRes] = await Promise.all([
        supabase.from('globe_saves').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('globe_visited').select('*').eq('user_id', user.id),
        supabase.from('globe_recent').select('*').eq('user_id', user.id).order('viewed_at', { ascending: false }).limit(20),
      ]);
      if (savesRes.data) setSaves(savesRes.data as GlobeSave[]);
      if (visitedRes.data) setVisited(visitedRes.data as GlobeVisited[]);
      if (recentRes.data) setRecent(recentRes.data as GlobeRecent[]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const savePlace = useCallback(async (place: Omit<GlobeSave, 'id' | 'created_at'>) => {
    if (!user) return;
    const { data } = await supabase
      .from('globe_saves')
      .upsert({ ...place, user_id: user.id }, { onConflict: 'user_id,country_slug,city_slug' })
      .select()
      .single();
    if (data) setSaves((prev) => [data as GlobeSave, ...prev.filter((s) => s.id !== (data as any).id)]);
  }, [user]);

  const unsavePlace = useCallback(async (id: string) => {
    await supabase.from('globe_saves').delete().eq('id', id);
    setSaves((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const markVisited = useCallback(async (country: string, countrySlug: string, visitedAt?: string) => {
    if (!user) return;
    const { data } = await supabase
      .from('globe_visited')
      .upsert({ user_id: user.id, country, country_slug: countrySlug, visited_at: visitedAt ?? null }, { onConflict: 'user_id,country_slug' })
      .select()
      .single();
    if (data) setVisited((prev) => [data as GlobeVisited, ...prev.filter((v) => v.country_slug !== countrySlug)]);
  }, [user]);

  const unmarkVisited = useCallback(async (id: string) => {
    await supabase.from('globe_visited').delete().eq('id', id);
    setVisited((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const trackRecent = useCallback(async (place: Omit<GlobeRecent, 'id' | 'viewed_at'>) => {
    if (!user) return;
    const { data } = await supabase
      .from('globe_recent')
      .upsert(
        { ...place, user_id: user.id, viewed_at: new Date().toISOString() },
        { onConflict: 'user_id,country_slug,city_slug' }
      )
      .select()
      .single();
    if (data) setRecent((prev) => [data as GlobeRecent, ...prev.filter((r) => r.id !== (data as any).id)].slice(0, 20));
  }, [user]);

  const isSaved = useCallback(
    (countrySlug: string, citySlug?: string) =>
      saves.some((s) => s.country_slug === countrySlug && (citySlug ? s.city_slug === citySlug : !s.city_slug)),
    [saves]
  );

  const isVisited = useCallback(
    (countrySlug: string) => visited.some((v) => v.country_slug === countrySlug),
    [visited]
  );

  return { saves, visited, recent, loading, savePlace, unsavePlace, markVisited, unmarkVisited, trackRecent, isSaved, isVisited };
};
