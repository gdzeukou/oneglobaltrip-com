
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const heroSlides = [{
  id: 1,
  image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=1920&h=1080&fit=crop',
  alt: 'Eiffel Tower, Paris, France',
  location: 'Paris, France'
}, {
  id: 2,
  image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&h=1080&fit=crop',
  alt: 'Colosseum, Rome, Italy',
  location: 'Rome, Italy'
}, {
  id: 3,
  image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&h=1080&fit=crop',
  alt: 'Santorini Cliffs, Greece',
  location: 'Santorini, Greece'
}, {
  id: 4,
  image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1920&h=1080&fit=crop',
  alt: 'Amsterdam Canals, Netherlands',
  location: 'Amsterdam, Netherlands'
}, {
  id: 5,
  image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&h=1080&fit=crop',
  alt: 'Sagrada Familia, Barcelona, Spain',
  location: 'Barcelona, Spain'
}, {
  id: 6,
  image: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=1920&h=1080&fit=crop',
  alt: 'Neuschwanstein Castle, Germany',
  location: 'Bavaria, Germany'
}, {
  id: 7,
  image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&h=1080&fit=crop',
  alt: 'Hallstatt, Austria',
  location: 'Hallstatt, Austria'
}, {
  id: 8,
  image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1920&h=1080&fit=crop',
  alt: 'Nyhavn, Copenhagen, Denmark',
  location: 'Copenhagen, Denmark'
}, {
  id: 9,
  image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1920&h=1080&fit=crop',
  alt: 'Old Town Tallinn, Estonia',
  location: 'Tallinn, Estonia'
}, {
  id: 10,
  image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&h=1080&fit=crop',
  alt: 'Plitvice Lakes, Croatia',
  location: 'Plitvice, Croatia'
}, {
  id: 11,
  image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&h=1080&fit=crop',
  alt: 'Bruges, Belgium',
  location: 'Bruges, Belgium'
}, {
  id: 12,
  image: 'https://images.unsplash.com/photo-1551524164-6cf6ac833fb4?w=1920&h=1080&fit=crop',
  alt: 'Lisbon, Portugal',
  location: 'Lisbon, Portugal'
}];

const SchengenHeroEnhanced = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleEligibilityCheck = () => {
    // Scroll to AI visa checker section
    const element = document.getElementById('ai-visa-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignInClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slideshow Background with reduced overlay */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Reduced overlay for more prominent images */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom-left content with service proposition */}
      <div className="absolute bottom-6 left-6 z-10 max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Your Gateway to Europe
          </h1>
          <p className="text-white/90 mb-6 text-lg">
            We handle your Schengen visa application from start to finish. Expert guidance, document review, and application support.
          </p>
          
          {/* Service highlights */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm">Expert document review</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm">100% approval guarantee</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm">Expedited processing available</span>
            </div>
          </div>

          {/* CTA Hierarchy */}
          <div className="space-y-3">
            <Button
              onClick={handleEligibilityCheck}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Check My Eligibility
            </Button>
            <Button
              onClick={handleSignInClick}
              size="lg"
              variant="outline"
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold py-3 rounded-xl backdrop-blur-sm"
            >
              Sign In & Begin Application
            </Button>
          </div>
        </div>
      </div>

      {/* Current Location Badge */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
        <p className="text-white text-sm font-medium">
          {heroSlides[currentSlide].location}
        </p>
      </div>

      {/* Mobile CTA - Updated */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t md:hidden">
        <div className="space-y-2">
          <Button
            onClick={handleEligibilityCheck}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
          >
            Check My Eligibility
          </Button>
          <Button
            onClick={handleSignInClick}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 font-semibold py-2 rounded-xl"
          >
            Sign In & Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchengenHeroEnhanced;
