
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
      
      {/* Modern Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 text-white py-20 relative overflow-hidden">
        {/* Clean background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-blue-900/95 via-deep-blue-800/90 to-deep-blue-900/95" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
          </div>
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-32 left-32 w-6 h-6 bg-yellow-400 rounded-full" />
            <div className="absolute top-48 right-40 w-4 h-4 bg-white/40 rotate-45" />
            <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-400 rotate-45" />
            <div className="absolute bottom-48 right-1/3 w-5 h-5 bg-white/30 rounded-full" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-pulse" />
            <span className="text-lg font-medium text-yellow-400">Your Journey Starts Here</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-text animate-fade-in">
            Let's Plan Your
            <span className="block text-yellow-400 animate-float">Dream Trip</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up">
            Schedule a free consultation or start your visa application with our expert team
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-xl p-2 border-0">
              <TabsTrigger 
                value="consultation" 
                className="flex items-center space-x-2 px-6 py-4 rounded-lg data-[state=active]:bg-deep-blue-900 data-[state=active]:text-white transition-all hover-lift"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Free Consultation</span>
              </TabsTrigger>
              <TabsTrigger 
                value="visa-form" 
                className="flex items-center space-x-2 px-6 py-4 rounded-lg data-[state=active]:bg-deep-blue-900 data-[state=active]:text-white transition-all hover-lift"
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">Visa Application</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contact" 
                className="flex items-center space-x-2 px-6 py-4 rounded-lg data-[state=active]:bg-deep-blue-900 data-[state=active]:text-white transition-all hover-lift"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Contact Us</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-12">
              <TabsContent value="consultation" className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="card-modern p-8">
                    <ConsultationForm />
                  </div>
                  <div className="card-modern p-8">
                    <ConsultationInfo />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="visa-form" className="animate-fade-in">
                <div className="card-modern p-8">
                  <VisaApplicationForm />
                </div>
              </TabsContent>

              <TabsContent value="contact" className="animate-fade-in">
                <div className="card-modern p-8">
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
