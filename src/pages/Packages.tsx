import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, Heart, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const packages = [
    {
      id: 1,
      title: "Paris + Santorini Escape",
      category: "romantic",
      duration: "7 days",
      price: 2499,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Romantic getaway combining the charm of Paris with the beauty of Santorini",
      highlights: ["Eiffel Tower dinner", "Santorini sunset cruise", "5-star hotels"],
      visasRequired: ["Schengen"],
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      title: "London-Amsterdam Rail Adventure",
      category: "cultural",
      duration: "10 days",
      price: 3299,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Explore two iconic cities via scenic rail routes",
      highlights: ["Royal Palace tours", "Canal boat cruise", "West End show"],
      visasRequired: ["UK", "Schengen"],
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      title: "Swiss Alps Luxury Retreat",
      category: "luxury",
      duration: "5 days",
      price: 4299,
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Ultimate luxury experience in the heart of the Swiss Alps",
      highlights: ["Helicopter tours", "Michelin dining", "Spa treatments"],
      visasRequired: ["Schengen"],
      rating: 5.0,
      reviews: 45
    },
    {
      id: 4,
      title: "Mediterranean Coast Explorer",
      category: "adventure",
      duration: "14 days",
      price: 3899,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Multi-country coastal adventure through Spain, France, and Italy",
      highlights: ["Beach hopping", "Wine tastings", "Coastal hiking"],
      visasRequired: ["Schengen"],
      rating: 4.7,
      reviews: 156
    }
  ];

  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'romantic', name: 'Romantic' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'adventure', name: 'Adventure' }
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'under-3000' && pkg.price < 3000) ||
                        (priceRange === '3000-4000' && pkg.price >= 3000 && pkg.price < 4000) ||
                        (priceRange === 'over-4000' && pkg.price >= 4000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Europe
            <span className="block text-yellow-500">Your Way</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Curated luxury travel packages with guaranteed visa assistance
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search destinations, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Prices</option>
              <option value="under-3000">Under $3,000</option>
              <option value="3000-4000">$3,000 - $4,000</option>
              <option value="over-4000">Over $4,000</option>
            </select>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover-lift group">
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-blue-900 font-bold">
                      From ${pkg.price.toLocaleString()}
                    </Badge>
                  </div>
                  <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                      <span className="text-sm text-gray-500">({pkg.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Visas: {pkg.visasRequired.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                    <Link to={`/booking?package=${pkg.id}`}>
                      Book This Package
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
