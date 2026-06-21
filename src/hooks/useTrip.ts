import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface TripStop {
  id: string;
  trip_id: string;
  position: number;
  name: string;
  country: string;
  country_slug: string;
  city_slug: string;
  lat: number;
  lng: number;
  emoji?: string | null;
  arrive_date?: string | null;
  depart_date?: string | null;
}

export interface GlobeTrip {
  id: string;
  name: string;
  created_at: string;
}

export const useTrip = () => {
  const { user } = useAuth();
  const [trip, setTrip] = useState<GlobeTrip | null>(null);
  const [stops, setStops] = useState<TripStop[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) { setTrip(null); setStops([]); return; }
    setLoading(true);
    try {
      const { data: tripData } = await supabase
        .from('globe_trips')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (tripData) {
        setTrip(tripData as GlobeTrip);
        const { data: stopsData } = await supabase
          .from('globe_trip_stops')
          .select('*')
          .eq('trip_id', tripData.id)
          .order('position', { ascending: true });
        setStops((stopsData ?? []) as TripStop[]);
      } else {
        setTrip(null);
        setStops([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const ensureTrip = useCallback(async (): Promise<GlobeTrip> => {
    if (trip) return trip;
    const { data } = await supabase
      .from('globe_trips')
      .insert({ user_id: user!.id, name: 'My Trip' })
      .select()
      .single();
    const newTrip = data as GlobeTrip;
    setTrip(newTrip);
    return newTrip;
  }, [trip, user]);

  const addStop = useCallback(async (dest: {
    name: string; country: string; country_slug: string; city_slug: string;
    lat: number; lng: number; emoji?: string;
  }) => {
    if (!user) return;
    const activeTrip = await ensureTrip();
    const nextPos = stops.length;
    const { data } = await supabase
      .from('globe_trip_stops')
      .insert({
        trip_id: activeTrip.id,
        user_id: user.id,
        position: nextPos,
        name: dest.name,
        country: dest.country,
        country_slug: dest.country_slug,
        city_slug: dest.city_slug,
        lat: dest.lat,
        lng: dest.lng,
        emoji: dest.emoji ?? null,
      })
      .select()
      .single();
    if (data) setStops((prev) => [...prev, data as TripStop]);
  }, [user, stops, ensureTrip]);

  const removeStop = useCallback(async (stopId: string) => {
    await supabase.from('globe_trip_stops').delete().eq('id', stopId);
    setStops((prev) => {
      const next = prev.filter((s) => s.id !== stopId);
      // resequence positions
      next.forEach((s, i) => { s.position = i; });
      return [...next];
    });
  }, []);

  const updateStopDates = useCallback(async (
    stopId: string,
    arrive_date: string | null,
    depart_date: string | null
  ) => {
    await supabase
      .from('globe_trip_stops')
      .update({ arrive_date, depart_date })
      .eq('id', stopId);
    setStops((prev) =>
      prev.map((s) => s.id === stopId ? { ...s, arrive_date, depart_date } : s)
    );
  }, []);

  const clearTrip = useCallback(async () => {
    if (!trip) return;
    await supabase.from('globe_trips').delete().eq('id', trip.id);
    setTrip(null);
    setStops([]);
  }, [trip]);

  const isInTrip = useCallback(
    (citySlug: string) => stops.some((s) => s.city_slug === citySlug),
    [stops]
  );

  return { trip, stops, loading, addStop, removeStop, updateStopDates, clearTrip, isInTrip };
};
