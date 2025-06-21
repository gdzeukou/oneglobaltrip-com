
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
      title: "Wine & Gastronomy Tour | France 🇫🇷",
      category: "luxury",
      duration: "6 days / 5 nights",
      price: 3299,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Sip, savor & stroll through Bordeaux and Dordogne",
      highlights: ["Premier Grand Cru tastings in Médoc & Saint-Émilion", "Truffle-hunting with farm-to-table lunch", "Hands-on Paris pastry workshop"],
      specialFeatures: ["Chef-led market tour", "Michelin dinner upgrade"],
      visasRequired: ["Schengen"],
      rating: 4.9,
      reviews: 87
    },
    {
      id: 2,
      title: "Tulips, Canals & Windmills | Netherlands 🇳🇱",
      category: "cultural",
      duration: "5 days / 4 nights",
      price: 2599,
      image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Iconic Dutch spring escape",
      highlights: ["Early-access Keukenhof Gardens", "Private Amsterdam canal cruise at sunset", "Zaanse Schans windmill & clog demo"],
      specialFeatures: ["Bicycle photo shoot", "Gouda cheese farm visit"],
      visasRequired: ["Schengen"],
      rating: 4.8,
      reviews: 112
    },
    {
      id: 3,
      title: "Fire & Ice Adventure | Iceland 🇮🇸",
      category: "adventure",
      duration: "6 days / 5 nights",
      price: 3799,
      image: "https://images.unsplash.com/photo-1539066436817-0c3c2c1c8e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Glaciers, geysers & geothermal bliss",
      highlights: ["Golden Circle super-jeep safari", "Glacier hike & crystal ice-cave tour", "Blue Lagoon twilight entry"],
      specialFeatures: ["Northern Lights photo guide", "Silfra snorkel"],
      visasRequired: ["Schengen"],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 4,
      title: "Alpine Peaks & Lakes | Switzerland 🇨🇭",
      category: "luxury",
      duration: "7 days / 6 nights",
      price: 4299,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Scenic rails to sky-high vistas",
      highlights: ["Glacier Express panoramic train", "Jungfraujoch 'Top of Europe' excursion", "Lake Lucerne vintage steamboat cruise"],
      specialFeatures: ["First-class Swiss Travel Pass", "Interlaken paragliding"],
      visasRequired: ["Schengen"],
      rating: 5.0,
      reviews: 89
    },
    {
      id: 5,
      title: "Medieval Cities & Chocolate | Belgium 🇧🇪",
      category: "cultural",
      duration: "4 days / 3 nights",
      price: 2199,
      image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cobblestones, craft beer & cocoa",
      highlights: ["Private Bruges & Ghent day-trip", "Hands-on master chocolatier workshop", "UNESCO Grand-Place night tour"],
      specialFeatures: ["Trappist abbey beer tasting", "Art-Nouveau bike ride"],
      visasRequired: ["Schengen"],
      rating: 4.7,
      reviews: 134
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
                    <h3 className="text-xl font-bold text-gray-900">{pkg.title.split(' | ')[0]}</h3>
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
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-gray-900">Included:</p>
                    {pkg.highlights.slice(0, 2).map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                    {pkg.specialFeatures.slice(0, 1).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-yellow-500 font-bold">★</span>
                        <span>{feature}</span>
                      </div>
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
