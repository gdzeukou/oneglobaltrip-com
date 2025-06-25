
import React from 'react';
import { Shield, Award, Users, Clock, Star, CheckCircle, Globe, Heart } from 'lucide-react';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: '100% Secure',
      description: 'SSL encrypted & protected',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Award Winning',
      description: 'Recognized excellence',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '50K+ Travelers',
      description: 'Happy customers worldwide',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full border border-blue-200/50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 tracking-wide">Trusted by Thousands</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-slate-900">Why Travelers</span>
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Choose Us
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied travelers who trust us with their dream journeys
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {indicators.map((indicator, index) => (
            <div 
              key={index}
              className={`group relative p-6 bg-gradient-to-br ${indicator.bgColor} rounded-2xl border ${indicator.borderColor} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Animation */}
              <div className={`absolute inset-0 bg-gradient-to-br ${indicator.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon Container */}
              <div className={`${indicator.iconColor} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                {indicator.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300">
                {indicator.title}
              </h3>
              <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                {indicator.description}
              </p>
              
              {/* Hover Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">150+</div>
              <div className="text-sm text-slate-600">Countries</div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">50K+</div>
              <div className="text-sm text-slate-600">Happy Clients</div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-sm text-slate-600">Rating</div>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">15+</div>
              <div className="text-sm text-slate-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
