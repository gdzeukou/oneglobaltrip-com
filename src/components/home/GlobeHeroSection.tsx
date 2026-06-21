import React, { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const InteractiveGlobe = lazy(() => import('./InteractiveGlobe'));

const GlobeHeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Star field background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 50% 60%, white, transparent),
            radial-gradient(1px 1px at 10% 80%, white, transparent),
            radial-gradient(1px 1px at 90% 70%, white, transparent),
            radial-gradient(1px 1px at 35% 15%, white, transparent),
            radial-gradient(1px 1px at 65% 85%, white, transparent),
            radial-gradient(1px 1px at 15% 50%, white, transparent),
            radial-gradient(1px 1px at 75% 40%, white, transparent),
            radial-gradient(2px 2px at 45% 25%, rgba(255,255,255,0.5), transparent),
            radial-gradient(2px 2px at 85% 55%, rgba(255,255,255,0.5), transparent),
            radial-gradient(2px 2px at 25% 70%, rgba(255,255,255,0.5), transparent)`,
        }}
      />

      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center">
        {/* Left: Text content */}
        <div className="w-full lg:w-2/5 px-6 md:px-12 lg:px-16 py-24 lg:py-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm tracking-widest uppercase">
              One Global Trip
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Your World,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Reimagined
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed">
            Explore 180+ destinations. AI-powered travel planning, seamless visa support, and concierge service — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-base px-8"
            >
              <Link to="/startmytrip">
                Plan My Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-base px-8"
            >
              <Link to="/visas">Explore Visas</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { value: '10K+', label: 'Travelers' },
              { value: '98%', label: 'Visa Success' },
              { value: '180+', label: 'Countries' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Globe */}
        <div className="w-full lg:w-3/5 h-[60vw] lg:h-screen max-h-[700px] lg:max-h-none">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
              </div>
            }
          >
            <InteractiveGlobe />
          </Suspense>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-1 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
};

export default GlobeHeroSection;
