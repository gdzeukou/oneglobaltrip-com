import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const parisImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=1920&q=80',
    alt: 'Romantic sunset view of Eiffel Tower with golden lighting over Paris cityscape'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1920&q=80',
    alt: 'Seine River with historic bridges and charming Parisian architecture'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=1920&q=80',
    alt: 'Romantic Parisian café scene with outdoor seating and classic bistro atmosphere'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1920&q=80',
    alt: 'Beautiful Parisian brunch spread with croissants, coffee and fresh pastries'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?auto=format&fit=crop&w=1920&q=80',
    alt: 'Champs-Élysées and Arc de Triomphe with elegant Parisian street life'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    alt: 'Romantic couple walking through charming Montmartre cobblestone streets'
  }
];

const ParisSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(parisImages.length).fill(false));

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % parisImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + parisImages.length) % parisImages.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isPlaying]);

  return (
    <section 
      className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-xl shadow-xl mb-8"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Images */}
      <div className="absolute inset-0">
        {parisImages.map((image, index) => (
          <div 
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {!imagesLoaded[index] && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-pulse flex items-center justify-center">
                <div className="text-white text-lg font-semibold">Loading Paris...</div>
              </div>
            )}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoad(index)}
              onError={() => console.log(`Failed to load image ${index + 1}`)}
              style={{ display: imagesLoaded[index] ? 'block' : 'none' }}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {parisImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ParisSlideshow;
