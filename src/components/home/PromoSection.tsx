
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink, Ship, MapPin, Users, Calendar, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  const featuredPackages = [
    {
      id: 1,
      title: "Mediterranean Luxury Cruise",
      subtitle: "7-Night Premium Experience • Barcelona to Rome",
      price: "$3,299",
      originalPrice: "$4,199",
      paymentInfo: "Book now, pay later available",
      description: "Sail through azure waters visiting Barcelona, Monaco, Naples, and Rome. All-inclusive dining, spa treatments, and shore excursions included.",
      highlights: ["Balcony suite included", "All meals & drinks", "Shore excursions", "Spa access"],
      badge: "Most Popular",
      badgeColor: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Brazil Carnival Experience",
      subtitle: "Rio & Salvador • 8 Days of Culture & Celebration",
      price: "$2,899",
      originalPrice: "$3,799",
      paymentInfo: "Limited time carnival pricing",
      description: "Experience the world's biggest party! VIP carnival access, beachfront hotels, samba lessons, and authentic Brazilian cuisine.",
      highlights: ["VIP carnival tickets", "5-star beachfront", "Cultural tours", "Dance lessons"],
      badge: "Limited Time",
      badgeColor: "bg-orange-500"
    },
    {
      id: 3,
      title: "European Grand Tour",
      subtitle: "London • Paris • Rome • Barcelona • 12 Days",
      price: "$4,599",
      originalPrice: "$5,999",
      paymentInfo: "Includes all flights & transfers",
      description: "The ultimate European adventure. High-speed trains, luxury hotels, skip-the-line access to top attractions, and local culinary experiences.",
      highlights: ["First-class rail", "4-star hotels", "Skip-the-line tours", "Culinary experiences"],
      badge: "Premium",
      badgeColor: "bg-purple-500"
    },
    {
      id: 4,
      title: "Disney Magic at Sea",
      subtitle: "Family Caribbean Cruise • 7 Nights of Wonder",
      price: "$2,199",
      originalPrice: "$2,899",
      paymentInfo: "Family packages available",
      description: "Disney magic meets Caribbean paradise. Character dining, kids' clubs, exclusive Disney entertainment, and pristine beaches.",
      highlights: ["Disney characters", "Kids' activities", "Private island", "Character dining"],
      badge: "Family Favorite",
      badgeColor: "bg-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32">
          <Ship className="w-full h-full text-blue-600" />
        </div>
        <div className="absolute bottom-10 right-10 w-28 h-28">
          <MapPin className="w-full h-full text-emerald-600" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
          <Users className="w-full h-full text-purple-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-amber-500 mr-3" />
            <span className="text-lg font-semibold text-amber-600">Exclusive Travel Packages</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Dream Destinations,
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Unbeatable Prices
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-4">
            Seasonal deals and limited-time offers on luxury travel experiences
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From Mediterranean cruises to cultural adventures—your perfect getaway awaits
          </p>
        </div>

        {/* Desktop: Enhanced grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
            <div key={pkg.id} className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="absolute top-4 right-4 z-10">
                <Badge className={`${pkg.badgeColor} text-white font-bold px-3 py-1 shadow-lg`}>
                  {pkg.badge}
                </Badge>
              </div>
              
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden group-hover:from-slate-800 group-hover:to-blue-800 transition-all duration-500">
                  <div className="absolute inset-0">
                    <div className="absolute top-4 right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl" />
                  </div>
                  <div className="relative z-10 text-center text-white">
                    <Ship className="h-12 w-12 mx-auto mb-3 text-amber-400" />
                    <h4 className="text-lg font-bold">{pkg.title.split(' ')[0]}</h4>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                  {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                    <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.title}</h3>
                <p className="text-slate-600 mb-3 font-medium text-sm">{pkg.subtitle}</p>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">{pkg.price}</span>
                      <span className="text-lg text-slate-400 line-through">{pkg.originalPrice}</span>
                    </div>
                    <p className="text-sm text-emerald-600 font-medium">{pkg.paymentInfo}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-slate-600">4.9</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link to="/packages" target="_blank" rel="noopener noreferrer">
                    View Details
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
              {featuredPackages.map((pkg) => (
                <CarouselItem key={pkg.id}>
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className={`${pkg.badgeColor} text-white font-bold px-3 py-1`}>
                        {pkg.badge}
                      </Badge>
                    </div>
                    
                    <div className="aspect-[4/3] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Ship className="h-12 w-12 mx-auto mb-3 text-amber-400" />
                          <h4 className="text-lg font-bold">{pkg.title.split(' ')[0]}</h4>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.title}</h3>
                      <p className="text-slate-600 mb-3">{pkg.subtitle}</p>
                      <p className="text-sm text-slate-500 mb-4">{pkg.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-slate-900">{pkg.price}</span>
                            <span className="text-lg text-slate-400 line-through">{pkg.originalPrice}</span>
                          </div>
                          <p className="text-sm text-emerald-600 font-medium">{pkg.paymentInfo}</p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                        asChild
                      >
                        <Link to="/packages" target="_blank" rel="noopener noreferrer">
                          View Details
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

        <div className="text-center mt-16 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-xl border border-white/50">
            <div className="flex items-center justify-center space-x-3 text-slate-700 mb-6">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-2xl">Complete Travel Concierge</span>
            </div>
            <p className="text-lg text-slate-600 mb-4">
              Every detail handled with precision—flights, accommodations, activities, dining, and documentation
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>24/7 Concierge Support</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Visa Assistance Included</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Price Match Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
