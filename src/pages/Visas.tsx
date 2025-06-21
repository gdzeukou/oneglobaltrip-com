
import { useState } from 'react';
import { CheckCircle, Clock, FileText, Shield, ArrowRight, AlertCircle, Users, Calendar, Plane, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Visas = () => {
  const [selectedVisa, setSelectedVisa] = useState('schengen');

  const shortStayVisas = [
    {
      id: 'schengen',
      name: 'Schengen Visa Pack',
      countries: '27 European Countries',
      price: 299,
      processingTime: '10-15 days',
      validityPeriod: '90 days',
      description: 'Access to 27 European countries with a single visa',
      type: 'short-stay'
    },
    {
      id: 'uk',
      name: 'UK Visa Pass',
      countries: 'United Kingdom',
      price: 399,
      processingTime: '15-20 days',
      validityPeriod: '6 months',
      description: 'Standard visitor visa for tourism and business',
      type: 'short-stay'
    },
    {
      id: 'brazil',
      name: 'Brazil eVisa',
      countries: 'Brazil',
      price: 199,
      processingTime: '5-10 days',
      validityPeriod: '90 days',
      description: 'Electronic visa for tourism purposes',
      type: 'short-stay'
    }
  ];

  const longStayVisas = [
    {
      id: 'portugal-residency',
      name: 'Portugal Residency',
      countries: 'Portugal',
      price: 1299,
      processingTime: '3-6 months',
      validityPeriod: '2 years',
      description: 'Temporary residence permit for work or investment',
      type: 'long-stay'
    },
    {
      id: 'norway-work',
      name: 'Norway Work Permit',
      countries: 'Norway',
      price: 899,
      processingTime: '2-4 months',
      validityPeriod: '3 years',
      description: 'Work permit for skilled professionals',
      type: 'long-stay'
    },
    {
      id: 'denmark-family',
      name: 'Denmark Family Reunion',
      countries: 'Denmark',
      price: 799,
      processingTime: '4-8 months',
      validityPeriod: '2 years',
      description: 'Family reunification residence permit',
      type: 'long-stay'
    }
  ];

  const allVisas = [...shortStayVisas, ...longStayVisas];
  const currentVisa = allVisas.find(visa => visa.id === selectedVisa) || shortStayVisas[0];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Visa Services
            <span className="block text-yellow-500">For Every Journey</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            From quick getaways to permanent moves - we make visa applications simple with guaranteed approval
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-yellow-500" />
              <span>100% Approval Rate</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Fast Processing</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-yellow-500" />
              <span>Expert Support</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold"
              asChild
            >
              <Link to="/visas/short-stay">
                <Plane className="h-5 w-5 mr-2" />
                Short-Stay Visas
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900"
              asChild
            >
              <Link to="/visas/long-stay">
                <Building className="h-5 w-5 mr-2" />
                Long-Stay & Residency
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Visa Category</h2>
            <p className="text-xl text-gray-600">Different visas for different dreams</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Short-Stay Card */}
            <Card className="hover-lift border-2 hover:border-blue-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Plane className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-900">Short-Stay Visas</CardTitle>
                <p className="text-gray-600">Perfect for tourism, business trips, and short visits</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Tourism & Business Travel</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>90 days or less</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Fast processing (5-20 days)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Starting from $199</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/visas/short-stay">
                    Explore Short-Stay Visas
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Long-Stay Card */}
            <Card className="hover-lift border-2 hover:border-purple-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-purple-900">Long-Stay & Residency</CardTitle>
                <p className="text-gray-600">For work, study, family reunion, and permanent moves</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Work & Study Permits</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>6 months to permanent</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Comprehensive support (2-8 months)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Starting from $799</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                  <Link to="/visas/long-stay">
                    Explore Long-Stay Visas
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Visa Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Visa Services</h2>
            <p className="text-xl text-gray-600">See what we can help you with</p>
          </div>

          <Tabs defaultValue="short-stay" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="short-stay">Short-Stay Visas</TabsTrigger>
              <TabsTrigger value="long-stay">Long-Stay & Residency</TabsTrigger>
            </TabsList>

            <TabsContent value="short-stay">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shortStayVisas.map((visa) => (
                  <Card key={visa.id} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-blue-900">{visa.name}</CardTitle>
                        <Badge className="bg-blue-500 text-white">
                          ${visa.price}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{visa.countries}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 text-sm">{visa.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Processing:</span>
                          <span className="font-medium">{visa.processingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Validity:</span>
                          <span className="font-medium">{visa.validityPeriod}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="long-stay">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {longStayVisas.map((visa) => (
                  <Card key={visa.id} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-purple-900">{visa.name}</CardTitle>
                        <Badge className="bg-purple-500 text-white">
                          ${visa.price}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{visa.countries}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 text-sm">{visa.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Processing:</span>
                          <span className="font-medium">{visa.processingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Validity:</span>
                          <span className="font-medium">{visa.validityPeriod}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Ready to start your visa application?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/visas/short-stay">Start Short-Stay Application</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/visas/long-stay">Start Long-Stay Application</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visas;
