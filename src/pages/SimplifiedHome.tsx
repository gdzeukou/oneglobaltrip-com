import React, { lazy, Suspense, useRef } from 'react';
import FloatingMenu from '@/components/globe/FloatingMenu';
import GlobeSearchBar from '@/components/globe/GlobeSearchBar';
import type { SelectedDestination } from '@/components/globe/DestinationCard';

const MapboxGlobe = lazy(() => import('@/components/globe/MapboxGlobe'));

const SimplifiedHome = () => {
  const cityTriggerRef = useRef<((dest: SelectedDestination) => void) | null>(null);

  return (
    <div className="fixed inset-0 bg-black">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
            <p className="text-white/40 text-sm tracking-widest uppercase">Loading Globe</p>
          </div>
        }
      >
        <MapboxGlobe
          onRegisterCityTrigger={(fn) => { cityTriggerRef.current = fn; }}
        />
      </Suspense>
      <GlobeSearchBar
        onSelectCity={(dest) => cityTriggerRef.current?.(dest)}
      />
      <FloatingMenu />
    </div>
  );
};

export default SimplifiedHome;
