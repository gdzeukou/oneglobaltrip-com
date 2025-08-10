import React, { useMemo } from 'react';
import { heroSlides } from '@/data/heroSlides';
import { useCarousel } from '@/hooks/useCarousel';
import { useCarouselTouch } from '@/hooks/useCarouselTouch';
import CarouselSlides from './carousel/CarouselSlides';
import CarouselSlideContent from './carousel/CarouselSlideContent';
import CarouselNavigation from './carousel/CarouselNavigation';
import CarouselIndicators from './carousel/CarouselIndicators';
import PlaneRouteOverlay from './hero/PlaneRouteOverlay';
import PassportStamps from './hero/PassportStamps';
import '@/styles/hero-animations.css';

const HeroCarousel = () => {
  const {
    currentSlide,
    previousSlide,
    direction,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
  } = useCarousel({
    totalSlides: heroSlides.length,
    isPlaying: true,
    autoPlayInterval: 5500,
  });

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarouselTouch(nextSlide, prevSlide);

  const currentSlideData = useMemo(() => heroSlides[currentSlide], [currentSlide]);

  return (
    <section
      className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      onMouseEnter={pause}
      onMouseLeave={resume}
      tabIndex={0}
      role="region"
      aria-label="Luxury travel destinations carousel"
      aria-live="polite"
    >
      <CarouselSlides
        slides={heroSlides}
        currentSlide={currentSlide}
        previousSlide={previousSlide}
        direction={direction}
        isTransitioning={isTransitioning}
      />

      {/* Subtle gradient scrims for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Animated overlays */}
      <PlaneRouteOverlay />
      <PassportStamps slideKey={currentSlideData.id} />

      {/* Trust badge top-left */}
      <div className="absolute top-4 left-4 z-10">
        <div className="backdrop-blur-md bg-black/50 text-white font-semibold rounded-full px-4 py-2 text-xs sm:text-sm flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>98% Visa Success Rate</span>
          <span className="hidden sm:inline-block">•</span>
          <span className="hidden sm:inline-flex">10,000+ Happy Travelers</span>
        </div>
      </div>

      <CarouselSlideContent slide={currentSlideData} isTransitioning={isTransitioning} />

      <CarouselNavigation onPrevSlide={prevSlide} onNextSlide={nextSlide} />

      <CarouselIndicators
        slides={heroSlides}
        currentSlide={currentSlide}
        onSlideSelect={goToSlide}
      />
    </section>
  );
};

export default HeroCarousel;
