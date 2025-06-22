
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  const featuredTrips = [
    {
      id: 1,
      title: "European Classics",
      subtitle: "Paris ✈ Rome ✈ Barcelona – 10-Day Rail Adventure",
      price: "$2,499",
      paymentInfo: "No payments until 30 days before departure",
      description: "All planning done for you – flights, stays, activities. Just bring your passport!",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Brazil Carnival Blast",
      subtitle: "Rio & Salvador – 7 Nights of Samba & Sun",
      price: "$1,899",
      paymentInfo: "Reserve with $0 today",
      description: "Experience the vibrant culture, stunning beaches, and unforgettable carnival atmosphere.",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Asian Discovery",
      subtitle: "Tokyo ✈ Seoul ✈ Bangkok – 12-Day Multi-City Explorer",
      price: "$2,799",
      paymentInfo: "Pay later, travel worry-free",
      description: "Immerse yourself in ancient traditions and modern wonders across three incredible cities.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pack Your Bags, Not Your Bills – Book Now, Pay $0 Down!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure your spot today and settle the balance later. All you have to do is show up.
          </p>
        </div>

        {/* Desktop: Side-by-side cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
          {featuredTrips.map((trip) => (
            <div key={trip.id} className="relative bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-500 text-white font-bold px-3 py-1">
                  $0 Down
                </Badge>
              </div>
              <div className="aspect-video overflow-hidden">
                <img 
                  src={trip.image} 
                  alt={`${trip.title} - ${trip.subtitle}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
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
                      <img 
                        src={trip.image} 
                        alt={`${trip.title} - ${trip.subtitle}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
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

        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Plane className="h-5 w-5" />
            <span className="font-medium">All planning done for you – flights, stays, activities. Just bring your passport!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
