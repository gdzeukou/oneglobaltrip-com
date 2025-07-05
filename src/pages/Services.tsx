import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  Shield, 
  Users, 
  Plane, 
  MapPin, 
  Calendar,
  Phone,
  CheckCircle,
  Star
} from 'lucide-react';

const Services = () => {
  const visaServices = [
    {
      title: 'Schengen Visa Services',
      description: 'Visit 27 European countries with a single visa application. Perfect for tourism, business, or family visits.',
      features: ['Complete document review', 'Embassy appointment booking', 'Application tracking', '99% approval rate'],
      price: 'From $199',
      popular: true,
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'UK Visa Services',
      description: 'Comprehensive UK visa assistance for tourism, business, student, and family reunion visas.',
      features: ['Priority processing available', 'Document checklist', 'Interview preparation', 'Fast-track options'],
      price: 'From $249',
      popular: false,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'US Visa Services',
      description: 'Navigate the complex US visa process with expert guidance for B1/B2, F1, and other visa categories.',
      features: ['DS-160 form assistance', 'Interview coaching', 'Document preparation', 'Status tracking'],
      price: 'From $299',
      popular: false,
      image: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const travelServices = [
    {
      icon: Plane,
      title: 'Flight Booking',
      description: 'Find the best flight deals and book with confidence. 24/7 support included.',
      features: ['Best price guarantee', 'Flexible booking options', 'Multi-city itineraries']
    },
    {
      icon: MapPin,
      title: 'Travel Packages',
      description: 'Curated travel experiences combining flights, hotels, and activities.',
      features: ['All-inclusive packages', 'Local tour guides', 'Cultural experiences']
    },
    {
      icon: Calendar,
      title: 'Itinerary Planning',
      description: 'Personalized travel itineraries crafted by our expert travel consultants.',
      features: ['Custom recommendations', 'Local insights', 'Day-by-day planning']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Free consultation to understand your travel needs and visa requirements.',
      icon: Phone
    },
    {
      step: '02',
      title: 'Documentation',
      description: 'Complete document review and preparation with our expert team.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Application',
      description: 'We handle the entire application process and embassy appointments.',
      icon: Clock
    },
    {
      step: '04',
      title: 'Success',
      description: 'Receive your visa and travel documents ready for your journey.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive visa and travel solutions for your global adventures"
        description="From visa applications to complete travel packages, we handle every detail so you can focus on making memories."
        backgroundGradient="bg-gradient-to-br from-primary/10 via-background to-accent/10"
      />

      {/* Visa Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Visa Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert visa assistance with a 99% approval rate. We handle the paperwork, you plan the adventure.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {visaServices.map((service, index) => (
              <Card key={index} className={`relative overflow-hidden hover:shadow-lg transition-shadow ${service.popular ? 'border-primary shadow-md' : ''}`}>
                {service.popular && (
                  <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={service.popular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Services */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Travel Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete travel solutions to make your journey seamless from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {travelServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <service.icon className="h-16 w-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, transparent process designed to get you from application to approval efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Guarantees</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We stand behind our services with industry-leading guarantees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: '99% Approval Rate',
                description: 'Our expert review process ensures your application has the highest chance of success.'
              },
              {
                icon: Clock,
                title: 'On-Time Processing',
                description: 'We guarantee your application will be processed within the promised timeframe.'
              },
              {
                icon: Users,
                title: '24/7 Support',
                description: 'Round-the-clock customer support to answer your questions and provide updates.'
              }
            ].map((guarantee, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <guarantee.icon className="h-16 w-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{guarantee.title}</h3>
                  <p className="text-muted-foreground">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our experts handle your visa application while you focus on planning your adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Application
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;