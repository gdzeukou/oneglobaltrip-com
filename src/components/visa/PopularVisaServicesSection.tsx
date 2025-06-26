
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users,
  Globe,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PopularVisaServicesSection = () => {
  const services = [
    {
      title: 'Schengen Tourist Visa',
      description: 'Visit 27 European countries with one visa',
      flag: '🇪🇺',
      price: 'From $105',
      processing: '15-20 days',
      popularity: 'Most Popular',
      features: ['Multi-country travel', 'Fast processing', '90-day validity'],
      path: '/visas/short-stay/schengen',
      accentColor: 'blue'
    },
    {
      title: 'UK Visitor Visa',
      description: 'Explore England, Scotland, Wales & Northern Ireland',
      flag: '🇬🇧',
      price: 'From $125',
      processing: '3 weeks',
      popularity: 'Trending',
      features: ['6-month validity', 'Multiple entries', 'Family friendly'],
      path: '/visas/short-stay/uk',
      accentColor: 'green'
    },
    {
      title: 'Canada Visitor Visa',
      description: 'Experience the beauty of Canada',
      flag: '🇨🇦',
      price: 'From $130',
      processing: '2-4 weeks',
      popularity: 'High Demand',
      features: ['Up to 10 years', 'Work opportunities', 'Path to residency'],
      path: '/visas/short-stay/canada',
      accentColor: 'red'
    },
    {
      title: 'USA B1/B2 Visa',
      description: 'Business and tourism visa for the United States',
      flag: '🇺🇸',
      price: 'From $185',
      processing: '3-5 weeks',
      popularity: 'Premium',
      features: ['10-year validity', 'Business & tourism', 'Multiple entries'],
      path: '/visas/short-stay/usa',
      accentColor: 'purple'
    },
    {
      title: 'Australia Tourist Visa',
      description: 'Discover the land down under',
      flag: '🇦🇺',
      price: 'From $165',
      processing: '2-3 weeks',
      popularity: 'Popular',
      features: ['12-month validity', 'Multiple entries', 'Work holiday option'],
      path: '/visas/short-stay/australia',
      accentColor: 'amber'
    },
    {
      title: 'Dubai/UAE Visa',
      description: 'Experience luxury and innovation in the UAE',
      flag: '🇦🇪',
      price: 'From $95',
      processing: '5-7 days',
      popularity: 'Fast Track',
      features: ['90-day validity', 'Quick processing', 'Multiple entries'],
      path: '/visas/short-stay/uae',
      accentColor: 'orange'
    }
  ];

  const getBadgeColor = (popularity: string) => {
    switch (popularity) {
      case 'Most Popular': return 'bg-blue-100 text-blue-800';
      case 'Trending': return 'bg-green-100 text-green-800';
      case 'High Demand': return 'bg-red-100 text-red-800';
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Fast Track': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Popular Visa Services</h2>
            <Star className="w-6 h-6 text-amber-500 fill-current" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our most requested visa services with guaranteed approval and expert support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{service.flag}</div>
                  <Badge className={`${getBadgeColor(service.popularity)} border-0 font-medium`}>
                    {service.popularity}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {service.price}
                    </div>
                    <div className="text-xs text-gray-500">Total price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-700 flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.processing}
                    </div>
                    <div className="text-xs text-gray-500">Processing</div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={service.path}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find Your Destination?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We process visas for 180+ countries worldwide. Let our experts help you find the right visa.
            </p>
            <div className="space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                <Users className="w-4 h-4 mr-2" />
                Speak with Expert
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium">
                Browse All Countries
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularVisaServicesSection;
