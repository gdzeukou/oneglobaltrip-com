
import React from 'react';
import { VisaSlide } from '@/data/visaCarouselSlides';

interface CarouselIndicatorsProps {
  slides: VisaSlide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const CarouselIndicators = ({ slides, currentSlide, onSlideChange }: CarouselIndicatorsProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {slides.map((slide, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
            index === currentSlide
              ? 'bg-white shadow-lg scale-125'
              : 'bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Go to visa service ${index + 1}: ${slide.title}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
