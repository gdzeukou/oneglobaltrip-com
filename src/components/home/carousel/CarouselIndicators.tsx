
import React from 'react';
import { CarouselSlide } from '@/data/heroSlides';

interface CarouselIndicatorsProps {
  slides: CarouselSlide[];
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

const CarouselIndicators = ({ slides, currentSlide, onSlideSelect }: CarouselIndicatorsProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
      {slides.map((slide, index) => (
        <button
          key={index}
          onClick={() => onSlideSelect(index)}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
            index === currentSlide
              ? 'bg-white shadow-lg scale-125'
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Go to slide ${index + 1}: ${slide.destination}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
