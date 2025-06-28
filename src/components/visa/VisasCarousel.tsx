
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
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % visaSlides.length);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + visaSlides.length) % visaSlides.length);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 400);
  }, [currentSlide]);

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden rounded-2xl shadow-2xl shadow-black/20 mb-12 border-2 border-amber-200/20"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      role="region"
      aria-label="Premium visa services carousel"
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

      {/* Enhanced controls */}
      <CarouselControls 
        onPrevious={prevSlide}
        onNext={nextSlide}
      />

      {/* Enhanced indicators */}
      <CarouselIndicators 
        slides={visaSlides}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
      />
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-5000 ease-linear"
          style={{ width: isPlaying ? '100%' : '0%' }}
        />
      </div>
    </section>
  );
};

export default VisasCarousel;
