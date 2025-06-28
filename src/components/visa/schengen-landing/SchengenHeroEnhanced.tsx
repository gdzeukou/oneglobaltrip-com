import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
}];
const SchengenHeroEnhanced = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    user
  } = useAuth();
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
  const handleCTAClick = () => {
    if (user) {
      // User is already signed in, redirect to application
      navigate('/dashboard');
    } else {
      // User needs to sign in first
      navigate('/auth');
    }
  };
  return <div className="relative h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" loading={index === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-black/40" />
          </div>)}
      </div>

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Next slide">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} aria-label={`Go to slide ${index + 1}`} />)}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-gray-100">
            Your Gateway to Europe Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90 animate-fade-in text-zinc-50">
            Get your Schengen Short-Stay Visa with expert guidance in days, not weeks.
          </p>
          <Button onClick={handleCTAClick} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
            Sign In & Begin Application
          </Button>
        </div>
      </div>

      {/* Current Location Badge */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
        <p className="text-white text-sm font-medium">
          {heroSlides[currentSlide].location}
        </p>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t md:hidden">
        <Button onClick={handleCTAClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
          Sign In & Begin Application
        </Button>
      </div>
    </div>;
};
export default SchengenHeroEnhanced;