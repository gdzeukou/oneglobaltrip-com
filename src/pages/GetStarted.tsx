
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, MessageCircle, FileText, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConsultationForm from '@/components/get-started/ConsultationForm';
import VisaApplicationForm from '@/components/get-started/VisaApplicationForm';
import ConsultationInfo from '@/components/get-started/ConsultationInfo';
import ContactSection from '@/components/get-started/ContactSection';

const GetStarted = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');
  const [activeTab, setActiveTab] = useState(service ? 'visa-form' : 'consultation');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Enhanced colorful hero section */}
      <section className="pt-20 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 text-white py-16 md:py-20 relative overflow-hidden animate-gradient">
        {/* Colorful background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/95 via-indigo-600/90 to-blue-700/95" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-64 md:w-80 h-64 md:h-80 bg-pink-500/20 rounded-full blur-3xl animate-colorful-float" />
            <div className="absolute bottom-20 left-20 w-48 md:w-64 h-48 md:h-64 bg-yellow-400/20 rounded-full blur-3xl animate-colorful-float" style={{ animationDelay: '1s' }} />
          </div>
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-32 left-32 w-6 h-6 bg-pink-400 rounded-full animate-bounce" />
            <div className="absolute top-48 right-40 w-4 h-4 bg-yellow-300 rotate-45 animate-pulse" />
            <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-green-400 rotate-45 animate-bounce" />
            <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-blue-300 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-6 md:h-8 w-6 md:w-8 text-yellow-400 mr-3 animate-pulse" />
            <span className="text-base md:text-lg font-medium text-yellow-300">Your Journey Starts Here</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hero-text-mobile animate-slide-up-fade">
            Let's Plan Your
            <span className="block text-gradient-primary animate-colorful-float">Dream Trip</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            Schedule a free consultation or start your visa application with our expert team
          </p>
        </div>
      </section>

      {/* Enhanced main content */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-colorful shadow-2xl rounded-2xl p-2 border-2 border-white/30">
              <TabsTrigger 
                value="consultation" 
                className="flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all hover-lift-colorful text-sm md:text-base"
              >
                <Calendar className="h-4 md:h-5 w-4 md:w-5" />
                <span className="font-medium hidden sm:inline">Free Consultation</span>
                <span className="font-medium sm:hidden">Consult</span>
              </TabsTrigger>
              <TabsTrigger 
                value="visa-form" 
                className="flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all hover-lift-colorful text-sm md:text-base"
              >
                <FileText className="h-4 md:h-5 w-4 md:w-5" />
                <span className="font-medium hidden sm:inline">Visa Application</span>
                <span className="font-medium sm:hidden">Visa</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contact" 
                className="flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all hover-lift-colorful text-sm md:text-base"
              >
                <MessageCircle className="h-4 md:h-5 w-4 md:w-5" />
                <span className="font-medium">Contact</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-8 md:mt-12">
              <TabsContent value="consultation" className="animate-slide-up-fade">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  <div className="card-colorful p-6 md:p-8">
                    <ConsultationForm />
                  </div>
                  <div className="card-colorful p-6 md:p-8">
                    <ConsultationInfo />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visa-form" className="animate-slide-up-fade">
                <div className="card-colorful p-6 md:p-8">
                  <VisaApplicationForm />
                </div>
              </TabsContent>

              <TabsContent value="contact" className="animate-slide-up-fade">
                <div className="card-colorful p-6 md:p-8">
                  <ContactSection />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
