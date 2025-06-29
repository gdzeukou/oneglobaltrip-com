
import React, { useState, useMemo } from 'react';
import { heroSlides } from '@/data/heroSlides';
import { useCarousel } from '@/hooks/useCarousel';
import { useCarouselTouch } from '@/hooks/useCarouselTouch';
import CarouselSlides from './carousel/CarouselSlides';
import CarouselSlideContent from './carousel/CarouselSlideContent';
import CarouselNavigation from './carousel/CarouselNavigation';
import CarouselIndicators from './carousel/CarouselIndicators';

const HeroCarousel = () => {
  const {
    currentSlide,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide
  } = useCarousel({
    totalSlides: heroSlides.length,
    isPlaying: true
  });

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown
  } = useCarouselTouch(nextSlide, prevSlide);

  const currentSlideData = useMemo(() => heroSlides[currentSlide], [currentSlide]);

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero image carousel"
      aria-live="polite"
    >
      <CarouselSlides slides={heroSlides} currentSlide={currentSlide} />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

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
