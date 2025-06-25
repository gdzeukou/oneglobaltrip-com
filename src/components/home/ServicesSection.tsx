
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plane, Hotel, MapPin, ArrowRight, Sparkles } from 'lucide-react';

const ServicesSection = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      name: 'Visa Services',
      description: 'Expert visa processing for 180+ countries with guaranteed approval',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-500/20',
    },
    {
      icon: <Plane className="h-8 w-8" />,
      name: 'Flight Deals',
      description: 'Best prices on international flights with exclusive partnerships',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      hoverColor: 'hover:bg-emerald-500/20',
    },
    {
      icon: <Hotel className="h-8 w-8" />,
      name: 'Hotel Bookings',
      description: 'Handpicked luxury accommodations worldwide with special rates',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
      hoverColor: 'hover:bg-purple-500/20',
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      name: 'Travel Planning',
      description: 'Custom itineraries and authentic local experiences tailored for you',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      hoverColor: 'hover:bg-amber-500/20',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full border border-blue-200/50">
              <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="text-sm font-semibold text-blue-700 tracking-wide">Premium Services</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-slate-900">Everything You Need</span>
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text mt-2">
              for Perfect Travel
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From visa approval to your dream destination—we handle every detail with 
            <span className="text-blue-600 font-semibold"> expert precision</span>
          </p>
        </div>
        
        {/* Enhanced Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative p-8 text-center h-full flex flex-col">
                {/* Enhanced Icon Container */}
                <div className={`${feature.bgColor} ${feature.hoverColor} rounded-2xl p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <div className={`${feature.iconColor} transition-colors duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Interactive Arrow */}
                <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`flex items-center space-x-2 ${feature.iconColor} font-semibold text-sm`}>
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Hover Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-6">
            Ready to start your journey? Our experts are here to help 24/7
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors duration-300">
            <span>Get personalized assistance</span>
            <ArrowRight className="h-5 w-5 transform hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
