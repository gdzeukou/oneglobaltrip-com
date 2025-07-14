import React from 'react';

interface VisaPricingHeroProps {
  visaType?: string;
}

const VisaPricingHero = ({ visaType }: VisaPricingHeroProps) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary to-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          {visaType ? `${visaType.charAt(0).toUpperCase() + visaType.slice(1).replace('-', ' ')} Visa` : 'Visa'} Services
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Choose the perfect service level for your visa needs. Transparent pricing, exceptional support.
        </p>
      </div>
    </section>
  );
};

export default VisaPricingHero;