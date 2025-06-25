
import React from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import { CheckCircle, Clock, Users, Award, Star } from 'lucide-react';

const ConsultationForm: React.FC = () => {
  const benefits = [
    { icon: <Clock className="h-4 w-4" />, text: '30-minute personalized consultation' },
    { icon: <Award className="h-4 w-4" />, text: 'Custom travel recommendations' },
    { icon: <CheckCircle className="h-4 w-4" />, text: 'Visa requirements assessment' },
    { icon: <Users className="h-4 w-4" />, text: 'Budget and timeline planning' },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced benefits section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-900">What's Included:</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-300 hover:scale-105 group/item"
              >
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white group-hover/item:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <span className="font-medium text-blue-800 group-hover/item:text-blue-900 transition-colors duration-300">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hover shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
      </div>
      
      <UnifiedTravelForm 
        type="consultation"
        title="Schedule Your Free Consultation"
      />
    </div>
  );
};

export default ConsultationForm;
