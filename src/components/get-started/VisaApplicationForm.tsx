
import React from 'react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';
import { FileText, CheckCircle, Users, Calendar, ArrowRight } from 'lucide-react';

const VisaApplicationForm: React.FC = () => {
  const steps = [
    { number: '1', text: 'Complete the application form', icon: <FileText className="h-4 w-4" /> },
    { number: '2', text: 'We review your requirements', icon: <CheckCircle className="h-4 w-4" /> },
    { number: '3', text: 'Schedule consultation to discuss details', icon: <Users className="h-4 w-4" /> },
    { number: '4', text: 'Begin visa processing', icon: <Calendar className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced process section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-yellow-800">Visa Application Process:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 hover:scale-105 group/item"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full group-hover/item:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <div className="text-yellow-600 group-hover/item:text-yellow-700 transition-colors duration-300">
                    {step.icon}
                  </div>
                  <span className="font-medium text-yellow-700 group-hover/item:text-yellow-800 transition-colors duration-300">
                    {step.text}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-yellow-400 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Hover shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
      </div>
      
      <UnifiedTravelForm 
        type="visa-application"
        title="Start Your Visa Application"
      />
    </div>
  );
};

export default VisaApplicationForm;
