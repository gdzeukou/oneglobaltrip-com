import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Sparkles } from 'lucide-react';
import { CarouselSlide } from '@/data/heroSlides';
import SmartApplyModal from '@/components/smart-routing/SmartApplyModal';
interface CarouselSlideContentProps {
  slide: CarouselSlide;
  isTransitioning: boolean;
}
const CarouselSlideContent = ({
  slide,
  isTransitioning
}: CarouselSlideContentProps) => {
  const [isSmartApplyOpen, setIsSmartApplyOpen] = useState(false);
  return <>
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
          <div className={`transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
            {/* Luxury destination title */}
            <h1 className="font-display text-luxury-lg md:text-luxury-xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight leading-none">
              {slide.destination}
            </h1>
            
            {/* Premium subtitle */}
            <p className="text-xl md:text-3xl lg:text-4xl text-white/95 mb-12 drop-shadow-lg font-light leading-relaxed max-w-4xl">
              {slide.teaser}
            </p>
            
            {/* Luxury CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button size="lg" className="btn-luxury-accent group relative overflow-hidden px-8 py-4 text-lg font-bold tracking-wide shadow-luxury-lg hover:shadow-luxury-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2" onClick={() => setIsSmartApplyOpen(true)}>
                <span className="relative z-10 flex items-center text-white text-base font-extrabold">
                  <Sparkles className="h-6 w-6 mr-3 animate-pulse" />
                  Start Your Journey
                </span>
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
              
              {/* Secondary luxury button for premium feel */}
              <Button size="lg" className="glass-luxury-strong text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold tracking-wide hover:bg-white/20 transition-all duration-300" asChild>
                <Link to="/packages">
                  Explore Packages
                </Link>
              </Button>
            </div>
            
            {/* Luxury accent line */}
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-accent via-accent/80 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      <SmartApplyModal isOpen={isSmartApplyOpen} onClose={() => setIsSmartApplyOpen(false)} />
    </>;
};
export default CarouselSlideContent;