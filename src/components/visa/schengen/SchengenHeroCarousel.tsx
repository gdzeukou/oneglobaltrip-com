
import React from 'react';
import { useCarousel } from '@/hooks/useCarousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const schengenDestinations = [
  {
    id: 1,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Eiffel Tower at sunset with romantic golden lighting over Paris'
  },
  {
    id: 2,
    name: 'Venice, Italy', 
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Gondolas on Venice canals with historic architecture'
  },
  {
    id: 3,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&h=1080&fit=crop&crop=center',
    alt: 'White and blue buildings overlooking the Aegean Sea in Santorini'
  },
  {
    id: 4,
    name: 'Amsterdam, Netherlands',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Traditional Amsterdam canal houses and bridges'
  },
  {
    id: 5,
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Majestic Swiss Alps with snow-capped mountains and lakes'
  },
  {
    id: 6,
    name: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Sagrada Familia and Barcelona architecture'
  },
  {
    id: 7,
    name: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1587330979470-3016b6702d89?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Brandenburg Gate and Berlin landmarks'
  },
  {
    id: 8,
    name: 'Vienna, Austria',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Historic Vienna architecture and palaces'
  },
  {
    id: 9,
    name: 'Copenhagen, Denmark',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Colorful Nyhavn harbor in Copenhagen'
  },
  {
    id: 10,
    name: 'Lisbon, Portugal',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1920&h=1080&fit=crop&crop=center',
    alt: 'Historic trams and colorful buildings in Lisbon'
  }
];

const SchengenHeroCarousel = () => {
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel({
    totalSlides: schengenDestinations.length,
    autoPlayInterval: 5000,
    isPlaying: true
  });

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Carousel Images */}
      <div className="absolute inset-0">
        {schengenDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={destination.image}
              alt={destination.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Start Your Schengen Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Get Help With Your Visa Today!
          </p>
          <div className="text-sm md:text-base opacity-90">
            Currently viewing: {schengenDestinations[currentSlide].name}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
        aria-label="Previous destination"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
        aria-label="Next destination"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {schengenDestinations.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to ${schengenDestinations[index].name}`}
          />
        ))}
      </div>
    </section>
  );
};

export default SchengenHeroCarousel;
