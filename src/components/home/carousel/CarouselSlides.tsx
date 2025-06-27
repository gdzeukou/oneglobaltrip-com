
import React from 'react';
import EnhancedImage from '@/components/ui/enhanced-image';
import { CarouselSlide } from '@/data/heroSlides';

interface CarouselSlidesProps {
  slides: CarouselSlide[];
  currentSlide: number;
}

const CarouselSlides = ({ slides, currentSlide }: CarouselSlidesProps) => {
  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <figure 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <EnhancedImage
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full"
            priority={index === 0}
            sizes="100vw"
            aspectRatio="16/9"
          />
        </figure>
      ))}
    </div>
  );
};

export default CarouselSlides;
