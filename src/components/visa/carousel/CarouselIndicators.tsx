
import React from 'react';
import { VisaSlide } from '@/data/visaCarouselSlides';

interface CarouselIndicatorsProps {
  slides: VisaSlide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const CarouselIndicators = ({ slides, currentSlide, onSlideChange }: CarouselIndicatorsProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
      {slides.map((slide, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`relative w-4 h-4 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 group ${
            index === currentSlide
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/50 scale-125 border-2 border-white/30'
              : 'bg-white/40 hover:bg-white/60 border border-white/40 hover:scale-110'
          }`}
          aria-label={`Go to visa service ${index + 1}: ${slide.title}`}
        >
          {index === currentSlide && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 animate-pulse opacity-60"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default CarouselIndicators;
