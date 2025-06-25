
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, MapPin, Star, CheckCircle, Calendar, Sparkles } from 'lucide-react';

const ConsultationInfo: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: '30-Minute Deep Dive',
      description: 'Personalized consultation tailored to your travel dreams',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Custom Recommendations',
      description: 'Hand-picked destinations based on your preferences',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-600',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Visa Assessment',
      description: 'Complete requirements analysis for your destinations',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Budget Planning',
      description: 'Smart budgeting and timeline optimization',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full border border-blue-200/50">
            <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 tracking-wide">Free Consultation</span>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          What You'll Get
        </h3>
        <p className="text-lg text-gray-600">
          Everything you need to plan your perfect trip
        </p>
      </div>

      {/* Enhanced benefits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <Card 
            key={index}
            className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient background overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="relative p-6">
              {/* Icon container */}
              <div className={`p-3 bg-gradient-to-r ${benefit.bgColor} rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300 border border-current/10`}>
                <div className={benefit.iconColor}>
                  {benefit.icon}
                </div>
              </div>
              
              {/* Content */}
              <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                {benefit.title}
              </h4>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {benefit.description}
              </p>
              
              {/* Hover shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced trust section */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h4 className="text-xl font-bold text-green-900 mb-3">
            100% Free & No Commitment
          </h4>
          <p className="text-green-700 leading-relaxed mb-6">
            Get expert travel advice with absolutely no strings attached. Our consultation is completely free, and you're under no obligation to book with us.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-green-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>30 Minutes</span>
            </div>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Expert Advisor</span>
            </div>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            <div>No Credit Card</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationInfo;
