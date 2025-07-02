
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
      className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Luxury travel destinations carousel"
      aria-live="polite"
    >
      <CarouselSlides slides={heroSlides} currentSlide={currentSlide} />

      {/* Luxury cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

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
