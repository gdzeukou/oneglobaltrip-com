import React, { useMemo } from 'react';
import { heroSlides } from '@/data/heroSlides';
import { useCarousel } from '@/hooks/useCarousel';
import { useCarouselTouch } from '@/hooks/useCarouselTouch';
import CarouselSlides from './carousel/CarouselSlides';
import CarouselNavigation from './carousel/CarouselNavigation';
import CarouselIndicators from './carousel/CarouselIndicators';

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

  const { handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown } =
    useCarouselTouch(nextSlide, prevSlide);

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
      aria-label="Travel destinations image slideshow"
      aria-live="polite"
    >
      <CarouselSlides
        slides={heroSlides}
        currentSlide={currentSlide}
        previousSlide={previousSlide}
        direction={direction}
        isTransitioning={isTransitioning}
      />

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
