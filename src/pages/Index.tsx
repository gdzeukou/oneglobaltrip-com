import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Camera, Mountain, Waves, Building, Star, Heart, ArrowRight, FileText, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      price: 'From $299',
      rating: 4.9,
      reviews: 2847,
      category: 'beach'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      price: 'From $599',
      rating: 4.8,
      reviews: 1923,
      category: 'city'
    },
    {
      id: 3,
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
      price: 'From $799',
      rating: 4.9,
      reviews: 1456,
      category: 'adventure'
    },
    {
      id: 4,
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      price: 'From $1299',
      rating: 4.9,
      reviews: 3241,
      category: 'beach'
    },
    {
      id: 5,
      name: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      price: 'From $899',
      rating: 4.7,
      reviews: 987,
      category: 'adventure'
    },
    {
      id: 6,
      name: 'New York City',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      price: 'From $399',
      rating: 4.6,
      reviews: 5632,
      category: 'city'
    }
  ];

  const visaServices = [
    {
      id: 1,
      name: 'Schengen Visa',
      description: 'Travel to 26 European countries with a single visa',
      processingTime: '15-20 days',
      price: 'From $99',
      countries: '26 countries',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop',
      features: ['Multiple entry', 'Up to 90 days', 'Tourism & Business']
    },
    {
      id: 2,
      name: 'UK Visa',
      description: 'Visit the United Kingdom for tourism or business',
      processingTime: '3-8 weeks',
      price: 'From $149',
      countries: '1 country',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
      features: ['6 months validity', 'Tourism & Business', 'Fast-track available']
    },
    {
      id: 3,
      name: 'Brazil Visa',
      description: 'Explore the vibrant culture and nature of Brazil',
      processingTime: '5-15 days',
      price: 'From $79',
      countries: '1 country',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
      features: ['90 days stay', 'Tourism & Business', 'Electronic visa available']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', icon: Plane },
    { id: 'beach', name: 'Beach', icon: Waves },
    { id: 'city', name: 'City', icon: Building },
    { id: 'adventure', name: 'Adventure', icon: Mountain }
  ];

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                GlobalTrip
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Destinations</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hotels</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Flights</a>
              <a href="#visas" className="text-gray-700 hover:text-blue-600 transition-colors">Visas</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-orange-600/20 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop')] bg-cover bg-center"></div>
        
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover Your Next
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Explore breathtaking destinations around the world with our curated travel experiences
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Where to?"
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="date"
                  className="pl-10 bg-white/20 border-white/30 text-white"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Guests"
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-12">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-xl text-gray-600">Find your perfect getaway</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`h-12 px-6 ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                    : 'hover:bg-blue-50'
                }`}
              >
                <IconComponent className="h-5 w-5 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Heart className="h-5 w-5 text-white" />
                </button>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">({destination.reviews} reviews)</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{destination.price}</span>
                  <Button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Book Now
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Visa Services Section */}
      <section id="visas" className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visa Services</h2>
            <p className="text-xl text-gray-600">Get your travel documents sorted with our expert visa assistance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visaServices.map((visa) => (
              <Card key={visa.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
                <div className="relative">
                  <img 
                    src={visa.image} 
                    alt={visa.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {visa.countries}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{visa.name}</h3>
                  <p className="text-gray-600 mb-4">{visa.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Processing: {visa.processingTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>Starting {visa.price}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {visa.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join millions of travelers who trust GlobalTrip for their perfect getaway
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Start Planning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">GlobalTrip</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Europe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Americas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Africa</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Booking Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 GlobalTrip. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
