import React, { lazy, Suspense } from 'react';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';

const InteractiveGlobe = lazy(() => import('@/components/home/InteractiveGlobe'));

const SimplifiedHome = () => (
  <div className="fixed inset-0 flex flex-col bg-black overflow-hidden">
    <SimplifiedNavigation />
    <div className="flex-1 relative min-h-0">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
              <p className="text-white/40 text-sm tracking-widest uppercase">Loading Globe</p>
            </div>
          </div>
        }
      >
        <div className="absolute inset-0">
          <InteractiveGlobe />
        </div>
      </Suspense>
    </div>
  </div>
);

export default SimplifiedHome;
