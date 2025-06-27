
import React from 'react';
import FastImage from '@/components/ui/fast-image';
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
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <FastImage
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full"
            priority={index === 0 || index === currentSlide}
            sizes="100vw"
            aspectRatio="16/9"
          />
        </figure>
      ))}
    </div>
  );
};

export default CarouselSlides;
