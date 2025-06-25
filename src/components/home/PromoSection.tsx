import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink, Plane, MapPin, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnhancedImage from '@/components/ui/enhanced-image';

const PromoSection = () => {
  const featuredTrips = [
    {
      id: 1,
      title: "European Classics",
      subtitle: "Paris ✈ Rome ✈ Barcelona – 10-Day Rail Adventure",
      price: "$2,499",
      paymentInfo: "No payments until 30 days before departure",
      description: "Experience iconic landmarks, world-class cuisine, and rich cultural heritage across three magnificent capitals.",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center",
      highlights: ["Skip-the-line Louvre & Colosseum", "High-speed rail travel", "Local culinary experiences"]
    },
    {
      id: 2,
      title: "Brazil Carnival Blast",
      subtitle: "Rio & Salvador – 7 Nights of Samba & Sun",
      price: "$1,899",
      paymentInfo: "Reserve with $0 today",
      description: "Dance the night away at Rio's famous carnival while soaking up the vibrant culture and stunning beaches.",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center",
      highlights: ["VIP carnival access", "Copacabana beachfront", "Samba dance lessons"]
    },
    {
      id: 3,
      title: "Asian Discovery",
      subtitle: "Tokyo ✈ Seoul ✈ Bangkok – 12-Day Multi-City Explorer",
      price: "$2,799",
      paymentInfo: "Pay later, travel worry-free",
      description: "Immerse yourself in ancient traditions, cutting-edge technology, and incredible street food across three dynamic cities.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&crop=center",
      highlights: ["Traditional temple visits", "Modern city skylines", "Authentic street food tours"]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32">
          <Plane className="w-full h-full text-blue-600" />
        </div>
        <div className="absolute bottom-10 right-10 w-28 h-28">
          <MapPin className="w-full h-full text-yellow-600" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
          <Camera className="w-full h-full text-blue-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pack Your Bags, Not Your Bills
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-4">
            Book Now, Pay $0 Down!
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Secure your spot today and settle the balance later. All you have to do is show up and create memories.
          </p>
        </div>

        {/* Desktop: Enhanced side-by-side cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
          {featuredTrips.map((trip, index) => (
            <div key={trip.id} className="relative bg-white rounded-xl shadow-xl overflow-hidden hover-lift card-hover animate-scale-in group" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-500 text-white font-bold px-3 py-1 shadow-lg">
                  $0 Down
                </Badge>
              </div>
              <div className="aspect-video overflow-hidden relative">
                <EnhancedImage 
                  src={trip.image} 
                  alt={`${trip.title} - ${trip.subtitle}`}
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                  overlay
                  overlayColor="bg-black/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex flex-wrap gap-1">
                    {trip.highlights.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                <p className="text-gray-600 mb-3 font-medium">{trip.subtitle}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{trip.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-900">From {trip.price}</span>
                    <p className="text-sm text-green-600 font-medium">{trip.paymentInfo}</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white hover-lift shadow-lg"
                  asChild
                >
                  <Link to="/packages" target="_blank" rel="noopener noreferrer">
                    See Details
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {featuredTrips.map((trip) => (
                <CarouselItem key={trip.id}>
                  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-green-500 text-white font-bold px-3 py-1">
                        $0 Down
                      </Badge>
                    </div>
                    <div className="aspect-video overflow-hidden">
                      <EnhancedImage 
                        src={trip.image} 
                        alt={`${trip.title} - ${trip.subtitle}`}
                        className="w-full h-full"
                        overlay
                        overlayColor="bg-black/10"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                      <p className="text-gray-600 mb-3">{trip.subtitle}</p>
                      <p className="text-sm text-gray-500 mb-4">{trip.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-blue-900">From {trip.price}</span>
                          <p className="text-sm text-green-600 font-medium">{trip.paymentInfo}</p>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                        asChild
                      >
                        <Link to="/packages" target="_blank" rel="noopener noreferrer">
                          See Details
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-center mt-12 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto shadow-lg">
            <div className="flex items-center justify-center space-x-3 text-gray-700 mb-4">
              <Plane className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-lg">Complete Peace of Mind</span>
            </div>
            <p className="text-gray-600">
              All planning done for you – flights, stays, activities, visas. Just bring your passport and sense of adventure!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
