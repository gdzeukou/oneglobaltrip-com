
import React from 'react';
import { CarouselSlide } from '@/data/heroSlides';
import HeroMedia from '@/components/home/hero/HeroMedia';

interface CarouselSlidesProps {
  slides: CarouselSlide[];
  currentSlide: number;
  previousSlide: number | null;
  direction: 'next' | 'prev';
  isTransitioning: boolean;
}

const CarouselSlides = ({ slides, currentSlide, previousSlide, direction, isTransitioning }: CarouselSlidesProps) => {
  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isPrev = previousSlide === index;
        const base = 'absolute inset-0 transition-all duration-700 ease-out will-change-transform';
        const stateClass = isActive
          ? 'opacity-100 translate-x-0'
          : isPrev
          ? direction === 'next'
            ? 'opacity-0 translate-x-[6%]'
            : 'opacity-0 -translate-x-[6%]'
          : 'opacity-0';

        return (
          <div key={slide.id} className={`${base} ${stateClass}`}>
            <div className={`h-full w-full transform transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-[1.02]'} ${isTransitioning && isActive ? (direction === 'next' ? '-translate-x-[1.5%]' : 'translate-x-[1.5%]') : ''}`}>
              <HeroMedia slide={slide} active={isActive} priority={index === 0 || isActive} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarouselSlides;
