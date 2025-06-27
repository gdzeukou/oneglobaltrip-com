
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnhancedImage from '@/components/ui/enhanced-image';

interface PackageSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
}

const packageSlides: PackageSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=1920&q=80',
    title: 'Paris Explorer Package',
    description: 'Experience the City of Light with guided tours and luxury stays',
    price: 'From $1,299',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=paris',
    alt: 'Eiffel Tower and Parisian streets with cafes and architecture'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1920&q=80',
    title: 'Santorini Sunset Escape',
    description: 'Romantic getaway with breathtaking views and premium accommodations',
    price: 'From $1,899',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=santorini',
    alt: 'Santorini white buildings with blue domes overlooking the sea'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1920&q=80',
    title: 'London Royal Heritage',
    description: 'Discover royal palaces, museums, and historic landmarks',
    price: 'From $1,599',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=london',
    alt: 'Big Ben and London skyline with Thames River at twilight'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1920&q=80',
    title: 'Rome Ancient Wonders',
    description: 'Walk through history with expert guides and cultural experiences',
    price: 'From $1,399',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=rome',
    alt: 'Roman Colosseum at night with ancient architecture illuminated'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1920&q=80',
    title: 'Amsterdam Canal Adventure',
    description: 'Charming canals, world-class museums, and vibrant culture',
    price: 'From $1,199',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=amsterdam',
    alt: 'Amsterdam canal houses with colorful facades reflected in water'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
    title: 'Tokyo Modern Discovery',
    description: 'Blend of tradition and innovation in Japan\'s bustling capital',
    price: 'From $2,199',
    ctaText: 'Explore Deals',
    ctaLink: '/packages?destination=tokyo',
    alt: 'Tokyo skyline at night with neon lights and modern architecture'
  }
];

const PackagesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      setCurrentSlide((prev) => (prev + 1) % packageSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + packageSlides.length) % packageSlides.length);
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

  const currentSlideData = packageSlides[currentSlide];

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden rounded-lg shadow-premium mb-8"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      role="region"
      aria-label="Travel packages carousel"
      aria-live="polite"
    >
      {/* Background slides */}
      <div className="absolute inset-0">
        {packageSlides.map((slide, index) => (
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-6 md:p-8 lg:p-12">
          <div 
            className={`transition-all duration-600 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {currentSlideData.title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-2 drop-shadow-md font-light">
              {currentSlideData.description}
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-6 drop-shadow-md">
              {currentSlideData.price}
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
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous package"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next package"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {packageSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to package ${index + 1}: ${packageSlides[index].title}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PackagesCarousel;
