import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, PlaneTakeoff } from 'lucide-react';
import { CarouselSlide } from '@/data/heroSlides';

interface CarouselSlideContentProps {
  slide: CarouselSlide;
  isTransitioning: boolean;
}

const CarouselSlideContent = ({ slide, isTransitioning }: CarouselSlideContentProps) => {
  return (
    <div className="absolute inset-0 flex items-end justify-start">
      <div className="w-full p-3 sm:p-4 md:p-8 lg:p-16 xl:p-24">
        <div className={`transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
          {/* Dynamic headline per city */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-luxury-lg lg:text-luxury-xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl tracking-tight leading-tight">
            Your Dream Trip to {slide.destination} Starts Here
          </h1>

          {/* Fixed subheadline */}
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-white/95 mb-8 sm:mb-12 drop-shadow-lg font-light leading-relaxed max-w-4xl">
            Luxury trips with guaranteed visa assistance — all planned in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <Button size="lg" className="relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold tracking-wide transition-all duration-500 w-full sm:w-auto bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground animate-glow-pulse" asChild>
              <Link to="/startmytrip">
                <span className="relative z-10 flex items-center justify-center font-extrabold text-white drop-shadow-xl">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  Plan My Perfect Trip
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 w-full sm:w-auto" asChild>
              <Link to="/packages">
                <span className="flex items-center font-extrabold text-white drop-shadow-md">
                  <PlaneTakeoff className="h-5 w-5 mr-2" />
                  Explore Packages
                </span>
              </Link>
            </Button>
          </div>

          {/* Accent line */}
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CarouselSlideContent;
