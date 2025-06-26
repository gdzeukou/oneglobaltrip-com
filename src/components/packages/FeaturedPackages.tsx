
import { MapPin, Calendar, Users, Star, ArrowRight, Sparkles, Heart, Ship, Plane, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';

interface FeaturedPackagesProps {
  packages: Package[];
}

const FeaturedPackages = ({ packages }: FeaturedPackagesProps) => {
  // Create featured luxury packages if none exist
  const luxuryPackages = packages.length > 0 ? packages.slice(0, 4) : [
    {
      id: 'lux-cruise-med',
      title: 'Mediterranean Luxury Cruise',
      description: 'Sail through crystal-clear waters visiting iconic ports from Barcelona to Rome. Includes balcony suite, gourmet dining, and exclusive shore excursions.',
      price: 3299,
      duration: '7 nights',
      country: 'Mediterranean',
      rating: 4.9,
      highlights: ['Balcony Suite', 'All-Inclusive Dining', 'Shore Excursions'],
      category: 'cruise'
    },
    {
      id: 'euro-grand-tour',
      title: 'European Grand Tour',
      description: 'Experience the best of Europe with luxury accommodations, first-class rail travel, and VIP access to top attractions across 4 countries.',
      price: 4599,
      duration: '12 days',
      country: 'Multi-Country',
      rating: 4.8,
      highlights: ['First-Class Rail', 'Luxury Hotels', 'VIP Access'],
      category: 'tour'
    },
    {
      id: 'brazil-carnival',
      title: 'Brazil Carnival Experience',
      description: 'Immerse yourself in the world\'s biggest celebration with VIP carnival access, beachfront luxury, and authentic cultural experiences.',
      price: 2899,
      duration: '8 days',
      country: 'Brazil',
      rating: 4.9,
      highlights: ['VIP Carnival Access', '5-Star Beachfront', 'Cultural Tours'],
      category: 'cultural'
    },
    {
      id: 'disney-caribbean',
      title: 'Disney Caribbean Magic',
      description: 'Perfect family adventure combining Disney magic with Caribbean paradise. Character dining, kids\' clubs, and pristine private beaches.',
      price: 2199,
      duration: '7 nights',
      country: 'Caribbean',
      rating: 4.8,
      highlights: ['Disney Characters', 'Kids\' Activities', 'Private Beach'],
      category: 'family'
    }
  ];

  const featuredPackages = luxuryPackages;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cruise': return Ship;
      case 'tour': return Camera;
      case 'cultural': return Users;
      case 'family': return Heart;
      default: return MapPin;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500 mr-3" />
            <span className="text-lg font-semibold text-amber-600">Curated Experiences</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Luxury Travel
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Collection
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Handpicked premium experiences with complete concierge service included
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPackages.map((pkg, index) => {
            const IconComponent = getCategoryIcon(pkg.category || 'tour');
            
            return (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-2xl group bg-white shadow-lg border-0 rounded-2xl transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="relative">
                  <div className="w-full h-56 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center text-white">
                      <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-3 mx-auto w-fit">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-sm font-medium">{pkg.country}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-slate-900 font-bold">
                      From ${pkg.price.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                    {pkg.duration}
                  </div>
                  
                  <button className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300">
                    <Heart className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1 flex-1">{pkg.title}</h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-slate-600">{pkg.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 text-sm line-clamp-3 leading-relaxed">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{pkg.country}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Simple highlights */}
                  <div className="space-y-2 mb-6">
                    {(pkg.highlights || []).slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to={`/packages/${pkg.id}`}>
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find Your Dream Destination?
            </h3>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Our travel concierge team crafts custom itineraries for any destination. 
              Let us design your perfect getaway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4" asChild>
                <Link to="/get-started">
                  <Users className="h-5 w-5 mr-2" />
                  Custom Trip Planning
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-4" asChild>
                <Link to="/packages">
                  <Plane className="h-5 w-5 mr-2" />
                  Browse All Packages
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
