
import React, { useState, useEffect, useCallback } from 'react';
import { visaSlides } from '@/data/visaCarouselSlides';
import CarouselSlide from './carousel/CarouselSlide';
import CarouselControls from './carousel/CarouselControls';
import CarouselIndicators from './carousel/CarouselIndicators';

const VisasCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % visaSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + visaSlides.length) % visaSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, [currentSlide]);

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden rounded-lg shadow-premium mb-8"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      role="region"
      aria-label="Visa services carousel"
      aria-live="polite"
    >
      {/* Background slides */}
      <div className="absolute inset-0">
        {visaSlides.map((slide, index) => (
          <CarouselSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
            isTransitioning={isTransitioning}
            priority={index === 0}
          />
        ))}
      </div>

      <CarouselControls 
        onPrevious={prevSlide}
        onNext={nextSlide}
      />

      <CarouselIndicators 
        slides={visaSlides}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
      />
    </section>
  );
};

export default VisasCarousel;
