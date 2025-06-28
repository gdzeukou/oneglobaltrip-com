
import { ExternalLink, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredPackages = [
  {
    id: 1,
    title: 'Paris Explorer',
    description: 'Discover the City of Light with guided tours, skip-the-line access, and authentic French experiences.',
    price: '$1,299',
    originalPrice: '$1,599',
    duration: '5 days',
    rating: 4.9,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=400&fit=crop',
    highlights: ['Eiffel Tower Skip-the-Line', 'Louvre Museum Tour', 'Seine River Cruise', 'Montmartre Walking Tour'],
    link: '/packages/paris-explore-package'
  },
  {
    id: 2,
    title: 'Italy & Greece Duo',
    description: 'Ancient wonders and Mediterranean beauty across two incredible countries.',
    price: '$2,499',
    originalPrice: '$2,899',
    duration: '10 days',
    rating: 4.8,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop',
    highlights: ['Colosseum Underground', 'Santorini Sunset', 'Vatican Museums', 'Acropolis Tour'],
    link: '/packages/italy-greece-duo'
  },
  {
    id: 3,
    title: 'Amsterdam + Rhine Cruise',
    description: 'Charming canals, historic cities, and scenic river cruising through the heart of Europe.',
    price: '$1,899',
    originalPrice: '$2,199',
    duration: '7 days',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop',
    highlights: ['Canal Ring Tour', 'Anne Frank House', 'Rhine River Cruise', 'Cologne Cathedral'],
    link: '/packages/amsterdam-rhine-cruise'
  }
];

const SchengenPackagesEnhanced = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-orange-100 text-orange-800 mb-4 px-4 py-2 text-sm font-semibold">
            Bundle & Save
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visa fee waived when you book a package! Explore Europe with our expertly curated experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    Visa Included
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                    <span className="text-xs text-gray-600">({pkg.reviews})</span>
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{pkg.title}</CardTitle>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  {pkg.description}
                </p>

                <div className="space-y-2">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">Visa fee waived</p>
                  </div>
                  <Button
                    onClick={() => window.open(pkg.link, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    <span className="mr-2">View Package</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => window.open('/packages', '_blank')}
            variant="outline"
            size="lg"
            className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchengenPackagesEnhanced;
