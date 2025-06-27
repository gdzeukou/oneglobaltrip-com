
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnhancedImage from '@/components/ui/enhanced-image';

interface CarouselSlide {
  id: string;
  image: string;
  destination: string;
  teaser: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
}

const heroSlides: CarouselSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=1920&q=80',
    destination: 'Paris',
    teaser: 'See Paris in Bloom',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=paris',
    alt: 'Eiffel Tower and Parisian cityscape during golden hour with cherry blossoms'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1920&q=80',
    destination: 'Santorini',
    teaser: 'Sunsets in Santorini',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=santorini',
    alt: 'White-washed buildings with blue domes overlooking the Aegean Sea at sunset'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1920&q=80',
    destination: 'London',
    teaser: 'Royal London Adventures',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=london',
    alt: 'Big Ben and London Eye with Thames River during twilight blue hour'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1920&q=80',
    destination: 'Rome',
    teaser: 'Ancient Rome Awaits',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=rome',
    alt: 'Roman Colosseum illuminated at night with ancient architecture details'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80',
    destination: 'Amsterdam',
    teaser: 'Canal City Magic',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=amsterdam',
    alt: 'Amsterdam canal houses with colorful facades reflected in water at dusk'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=1920&q=80',
    destination: 'Madrid',
    teaser: 'Spanish Passion',
    ctaText: 'Explore Deals',  
    ctaLink: '/packages?destination=madrid',
    alt: 'Gran Via in Madrid with historic architecture and vibrant city lights'
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80',
    destination: 'Rio de Janeiro',
    teaser: 'Brazilian Paradise',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=rio',
    alt: 'Christ the Redeemer statue overlooking Rio de Janeiro bay and Sugarloaf Mountain'
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
    destination: 'Tokyo',
    teaser: 'Neon Dreams',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=tokyo',
    alt: 'Tokyo skyline at night with neon lights and Mount Fuji in the background'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
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
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
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

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero image carousel"
      aria-live="polite"
    >
      {/* Background slides with crossfade transition */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
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

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-6 md:p-12 lg:p-16">
          <div 
            className={`transition-all duration-600 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              {currentSlideData.destination}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 drop-shadow-md font-light">
              {currentSlideData.teaser}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FF6F61] to-[#ff8a7a] hover:from-[#e55a4d] hover:to-[#ff6f61] text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to={currentSlideData.ctaLink}>
                {currentSlideData.ctaText}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}: ${heroSlides[index].destination}`}
          />
        ))}
      </div>

      {/* Play/Pause indicator for accessibility */}
      <div className="absolute top-4 right-4 text-white/70 text-sm">
        {isPlaying ? '⏸️ Hover to pause' : '▶️ Auto-playing'}
      </div>
    </section>
  );
};

export default HeroCarousel;
