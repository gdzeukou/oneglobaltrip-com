
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Star, ArrowRight } from 'lucide-react';

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      {/* Hero Section - Brighter gradient and colors */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-md">Get in Touch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/95 font-medium">
            Ready to start your journey? Our travel experts are here to help you every step of the way.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Book Free Consultation
          </Button>
        </div>
      </section>

      {/* Contact Information - Brighter cards and colors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Phone className="h-6 w-6 text-blue-500" />
                      <span className="text-gray-800 font-bold">Phone Support</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">+1 877 622-7278</p>
                    <p className="text-gray-700 font-medium">Available for any matters</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Mail className="h-6 w-6 text-purple-500" />
                      <span className="text-gray-800 font-bold">Email Support</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">booking@oneglobaltrip.com</p>
                    <p className="text-gray-700 font-medium">Response within 2-4 hours</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-green-50 to-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-green-500" />
                      <span className="text-gray-800 font-bold">Business Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">Mon - Fri: 9AM - 6PM EST</p>
                    <p className="text-gray-700 font-medium">Weekend support available</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <MessageCircle className="h-6 w-6 text-orange-500" />
                      <span className="text-gray-800 font-bold">Live Chat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">Available on website</p>
                    <p className="text-gray-700 font-medium">Instant responses during business hours</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Contact Form - Brighter styling */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Quick Contact</h2>
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Email
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Phone
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Message
                      </label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors font-medium"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Attractive CTA Section - Replacing Office Locations */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-yellow-300 mr-3 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready for Your Next Adventure?</h2>
            <Star className="h-8 w-8 text-yellow-300 ml-3 animate-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-medium">
            Join over 10,000 happy travelers who trusted us with their dream vacations. 
            Let's make your travel dreams come true!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Free Consultation</h3>
                <p className="text-white/80">Expert advice tailored to your needs</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Worldwide Destinations</h3>
                <p className="text-white/80">Access to exclusive global experiences</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">5-Star Service</h3>
                <p className="text-white/80">24/7 support throughout your journey</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Start Planning Today
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-xl px-10 py-4 rounded-full bg-white/10 backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            >
              <Phone className="h-6 w-6 mr-3" />
              Call Now: +1 877 622-7278
            </Button>
          </div>

          <p className="text-white/70 mt-6 text-lg">
            ✨ No hidden fees • ✨ Instant booking confirmation • ✨ Best price guarantee
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
