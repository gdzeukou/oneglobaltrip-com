
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPageTemplate from '@/components/visa/pages/VisaPageTemplate';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import { MapPin, Plane, Hotel, Camera, Utensils, ArrowRight, Clock, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NetherlandsShortStay = () => {
  return (
    <VisaPageTemplate>
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="flex items-center mb-6">
              <div className="w-16 h-10 bg-gradient-to-b from-red-600 via-white to-blue-600 rounded mr-4"></div>
              <span className="text-lg font-semibold text-blue-200">Netherlands • Schengen Area</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Netherlands Short-Stay Visa
              <span className="block text-transparent bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text">
                + Travel Packages
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl">
              Get your Schengen visa for Netherlands plus exclusive travel packages. 
              From Amsterdam canals to Keukenhof gardens - we handle everything.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Schengen Benefits
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                90 Days Stay
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                99% Success Rate
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4">
                Apply for Visa + Package
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-4">
                Visa Only
                <Plane className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Netherlands Travel Packages */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Exclusive Netherlands
                <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                  Travel Packages
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Combine your visa application with authentic Dutch experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Amsterdam Discovery */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <Camera className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Amsterdam Discovery</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-orange-100 text-orange-700">4 Days / 3 Nights</Badge>
                    <span className="text-2xl font-bold text-slate-900">€699</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 mb-4">
                    <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-orange-500" />Canal-side boutique hotel</li>
                    <li className="flex items-center"><Camera className="h-4 w-4 mr-2 text-orange-500" />Museum district tours</li>
                    <li className="flex items-center"><Utensils className="h-4 w-4 mr-2 text-orange-500" />Canal cruise with dinner</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Book Package + Visa
                  </Button>
                </CardContent>
              </Card>

              {/* Tulip Season Special */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Tulip Season</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-pink-100 text-pink-700">5 Days / 4 Nights</Badge>
                    <span className="text-2xl font-bold text-slate-900">€999</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 mb-4">
                    <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-pink-500" />Luxury Amsterdam hotel</li>
                    <li className="flex items-center"><Camera className="h-4 w-4 mr-2 text-pink-500" />Keukenhof Gardens visit</li>
                    <li className="flex items-center"><Utensils className="h-4 w-4 mr-2 text-pink-500" />Traditional Dutch experiences</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Book Package + Visa
                  </Button>
                </CardContent>
              </Card>

              {/* Windmills & Countryside */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <Plane className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Dutch Countryside</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-green-100 text-green-700">6 Days / 5 Nights</Badge>
                    <span className="text-2xl font-bold text-slate-900">€1,199</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 mb-4">
                    <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-green-500" />Rural boutique accommodation</li>
                    <li className="flex items-center"><Camera className="h-4 w-4 mr-2 text-green-500" />Windmill tours & bike rides</li>
                    <li className="flex items-center"><Utensils className="h-4 w-4 mr-2 text-green-500" />Cheese & local food tours</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                    Book Package + Visa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Visa Pricing */}
        <CountrySpecificPricing 
          country="schengen" 
          title="Netherlands Visa Pricing"
          description="Transparent pricing for your Netherlands Schengen visa application"
        />

        <Footer />
      </div>
    </VisaPageTemplate>
  );
};

export default NetherlandsShortStay;
