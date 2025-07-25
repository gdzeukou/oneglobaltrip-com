import React from 'react';
import { CheckCircle2, Plane, Shield, Crown, Sparkles } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: 'Passport to Possibility',
      description: 'We don\'t just process visas. We unlock worlds where you belong.',
      features: ['Soul-Deep Expertise', '99.2% Dreams Realized', 'Round-the-Clock Guardian Angels', 'Promise-Back Guarantee']
    },
    {
      icon: Crown,
      title: 'Curated Impossibilities',
      description: 'Where luxury meets authenticity and every moment becomes a treasured memory.',
      features: ['Personal World Curator', 'Doors Others Cannot Open', 'Sanctuaries of Wonder', 'Stories Written Just for You']
    },
    {
      icon: Sparkles,
      title: 'Your Personal World Whisperer',
      description: 'Because extraordinary journeys require more than planning—they need magic.',
      features: ['Devoted Dream Architect', 'Where VIP Means Visionary', 'Guardian of Your Journey', 'Shield of Serenity']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-50 to-accent-50/30" id="services">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-luxury-lg md:text-luxury-xl font-bold text-primary mb-8 tracking-tight">
            Where Luxury Meets Authenticity
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            You don't just travel, you arrive different. Some journeys change your address. Others change your soul.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-accent via-accent/80 to-transparent rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`card-luxury group cursor-pointer ${
                index === 1 ? 'lg:scale-105 border-accent/30' : ''
              }`}
            >
              <div className="p-10">
                <div className="mb-8">
                  <div className="relative">
                    <service.icon className="h-16 w-16 text-accent mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                    <div className="absolute -inset-2 bg-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Luxury accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;