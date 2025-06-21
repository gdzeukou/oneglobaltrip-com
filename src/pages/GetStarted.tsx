
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, MessageCircle, FileText } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    // Consultation Form
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    destinations: '',
    travelers: '',
    budget: '',
    interests: '',
    
    // Visa Form
    visaType: service || '',
    nationality: '',
    travelPurpose: 'tourism',
    departureDate: '',
    returnDate: '',
    previousVisas: '',
    specialCircumstances: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation request:', formData);
    alert('Consultation request submitted! We\'ll contact you within 4 hours.');
  };

  const handleVisaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Visa application:', formData);
    alert('Visa application submitted! We\'ll review and contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Plan Your
            <span className="block text-yellow-500">Dream Trip</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Schedule a free consultation or start your visa application
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="consultation" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Free Consultation</span>
              </TabsTrigger>
              <TabsTrigger value="visa-form" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Visa Application</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Contact Us</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consultation">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ConsultationForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleConsultationSubmit}
                />
                <ConsultationInfo />
              </div>
            </TabsContent>

            <TabsContent value="visa-form">
              <VisaApplicationForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleVisaSubmit}
              />
            </TabsContent>

            <TabsContent value="contact">
              <ContactSection />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
