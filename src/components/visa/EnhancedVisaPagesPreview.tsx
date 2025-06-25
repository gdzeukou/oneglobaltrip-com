
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  CreditCard,
  Globe,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedVisaPagesPreview = () => {
  const samplePages = [
    {
      title: 'France Short-Stay Visa',
      country: 'France',
      flag: '🇫🇷',
      path: '/visas/short-stay/france',
      type: 'Schengen',
      features: ['Smart Consulate Selection', 'Multi-Country Planning', 'Real-time Requirements'],
      processingTime: '15-20 days',
      cost: '$105'
    },
    {
      title: 'UK Visitor Visa',
      country: 'United Kingdom',
      flag: '🇬🇧',
      path: '/visas/short-stay/uk',
      type: 'Standard',
      features: ['Digital Application', 'Priority Service', 'Biometric Booking'],
      processingTime: '3 weeks',
      cost: '$125'
    },
    {
      title: 'Canada Visitor Visa',
      country: 'Canada',
      flag: '🇨🇦',
      path: '/visas/short-stay/canada',
      type: 'eTA/Visitor',
      features: ['Online Processing', 'Family Applications', 'Express Entry'],
      processingTime: '2-4 weeks',
      cost: '$130'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-900">Enhanced Visa Pages</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our new intelligent visa pages with dynamic checklists, 
            instant nationality checks, and smart consulate recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {samplePages.map((page, index) => (
            <Card key={index} className="border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-deep-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {page.title}
                  </h3>
                  <Badge variant="outline" className="mb-3">
                    {page.type}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  {page.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{page.processingTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">{page.cost}</span>
                  </div>
                </div>

                <Link to={page.path}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Explore Enhanced Page
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Dynamic Checklists</h4>
            <p className="text-sm text-gray-600">
              Interactive requirements that adapt to your specific visa type and nationality
            </p>
          </Card>

          <Card className="text-center p-6">
            <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Instant Visa Check</h4>
            <p className="text-sm text-gray-600">
              Know immediately if you need a visa based on your nationality
            </p>
          </Card>

          <Card className="text-center p-6">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Smart Recommendations</h4>
            <p className="text-sm text-gray-600">
              AI-powered consulate selection for Schengen multi-country trips
            </p>
          </Card>

          <Card className="text-center p-6">
            <ArrowRight className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Seamless Applications</h4>
            <p className="text-sm text-gray-600">
              Direct integration with booking systems and application forms
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Experience the Future of Visa Applications
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Try our enhanced visa pages with intelligent features designed to make your application process effortless.
            </p>
            <div className="space-x-4">
              <Link to="/visas/short-stay/france">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Try France Schengen Page
                </Button>
              </Link>
              <Link to="/visas/short-stay/uk">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Try UK Visa Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedVisaPagesPreview;
