
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPageTemplate from '@/components/visa/pages/VisaPageTemplate';
import CountrySpecificPricing from '@/components/visa/CountrySpecificPricing';
import { MapPin, Plane, Hotel, Camera, Utensils, ArrowRight, Clock, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FranceShortStay = () => {
  return (
    <VisaPageTemplate>
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="flex items-center mb-6">
              <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-white to-red-600 rounded mr-4"></div>
              <span className="text-lg font-semibold text-blue-200">France • Schengen Area</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              France Short-Stay Visa
              <span className="block text-transparent bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text">
                + Travel Packages
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl">
              Get your Schengen visa for France plus exclusive travel packages. 
              From Paris city breaks to Loire Valley tours - we handle everything.
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
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4">
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

        {/* France Travel Packages */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Exclusive France
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Travel Packages
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Combine your visa application with curated French experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Paris Romance Package */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <Camera className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Paris Romance</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-pink-100 text-pink-700">5 Days / 4 Nights</Badge>
                    <span className="text-2xl font-bold text-slate-900">€899</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 mb-4">
                    <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-pink-500" />Luxury hotel near Champs-Élysées</li>
                    <li className="flex items-center"><Camera className="h-4 w-4 mr-2 text-pink-500" />Eiffel Tower & Louvre tours</li>
                    <li className="flex items-center"><Utensils className="h-4 w-4 mr-2 text-pink-500" />Seine river dinner cruise</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    Book Package + Visa
                  </Button>
                </CardContent>
              </Card>

              {/* Loire Valley Castles */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <MapPin className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Loire Valley Castles</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-green-100 text-green-700">7 Days / 6 Nights</Badge>
                    <span className="text-2xl font-bold text-slate-900">€1,299</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 mb-4">
                    <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-green-500" />Château hotel accommodation</li>
                    <li className="flex items-center"><Camera className="h-4 w-4 mr-2 text-green-500" />5 castle visits with guides</li>
                    <li className="flex items-center"><Utensils className="h-4 w-4 mr-2 text-green-500" />Wine tasting experiences</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Book Package + Visa
                  </Button>
                </CardContent>
              </Card>

              {/* French Riviera Escape */}
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-center text-white">
                    <Plane className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">French Riviera</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-blue-100 text-blue-700">6 Days / 5 Nights</Badge>
                    <span className="text-2xl font-bold text-slate-900">€1,599</span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600 mb-4">
                    <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-blue-500" />Beachfront luxury hotel</li>
                    <li className="flex items-center"><Camera className="h-4 w-4 mr-2 text-blue-500" />Monaco & Cannes day trips</li>
                    <li className="flex items-center"><Utensils className="h-4 w-4 mr-2 text-blue-500" />Michelin dining experiences</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Book Package + Visa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Visa Pricing */}
        <CountrySpecificPricing 
          country="schengenShortStay" 
          title="France Visa Pricing"
          description="Transparent pricing for your France Schengen visa application"
        />

        <Footer />
      </div>
    </VisaPageTemplate>
  );
};

export default FranceShortStay;
