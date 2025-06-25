
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Star, CheckCircle, Plane, Train, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { packages } from '@/data/packages';
import OptimizedImage from '@/components/ui/optimized-image';

const PackageDetails = () => {
  const { id } = useParams();
  const packageData = packages.find(pkg => pkg.id === id);

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/packages">View All Packages</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isMultiCountry = packageData.countries && packageData.countries.length > 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/packages" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Packages</span>
            </Link>
          </Button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <OptimizedImage
                src={packageData.image}
                alt={packageData.title}
                className="w-full h-96 rounded-lg"
                overlay
                overlayColor="bg-black/10"
              />
              {isMultiCountry && (
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                  <Plane className="h-4 w-4" />
                  <Train className="h-4 w-4" />
                  <span>Multi-Country</span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-blue-900 font-bold text-lg px-4 py-2">
                  From ${packageData.price.toLocaleString()}
                </Badge>
              </div>
              {packageData.originalPrice && (
                <div className="absolute top-4 right-4 mt-12">
                  <Badge variant="outline" className="bg-white/90 text-gray-600 line-through">
                    ${packageData.originalPrice.toLocaleString()}
                  </Badge>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{packageData.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{packageData.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-600">{packageData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Countries</p>
                    <p className="text-gray-600">{isMultiCountry ? `${packageData.countries?.length} Countries` : packageData.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Ideal For</p>
                    <p className="text-gray-600">Couples, First-Time Europe</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Rating</p>
                    <p className="text-gray-600">{packageData.rating}/5 ({packageData.reviews} reviews)</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                <Link to={`/booking?package=${packageData.id}`}>
                  Start Planning Your Trip
                </Link>
              </Button>
            </div>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Trip Highlights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {packageData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>What's Included</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {packageData.specialFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-yellow-500 font-bold mt-1">★</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Visa Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Visa Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-700 mb-4">Required visas for this trip:</p>
                  <div className="flex flex-wrap gap-2">
                    {packageData.visasRequired.map((visa, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {visa}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    We'll help you with the visa application process and provide guidance on required documents.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Countries Covered */}
            {isMultiCountry && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span>Countries Covered</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {packageData.countries?.map((country, index) => (
                      <Badge key={index} className="bg-gray-100 text-gray-800">
                        {country}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Call to Action */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-yellow-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Planning?</h2>
              <p className="text-gray-600 mb-6">
                Get personalized recommendations and let us handle all the details for your perfect European adventure.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                <Link to={`/booking?package=${packageData.id}`}>
                  Start Planning Your Trip
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetails;
