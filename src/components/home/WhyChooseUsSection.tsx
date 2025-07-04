
import React from 'react';
import { CheckCircle, Clock, Shield } from 'lucide-react';

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why We Architect Awakenings</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Because ordinary travel agencies book trips. We craft transformations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">We Don't Just Get You There</h3>
            <p className="text-gray-600">We ensure you belong there. 99.2% of dreams realized.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time Moves for You</h3>
            <p className="text-gray-600">While others wait, you wander. Expedited everything.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Guardian of Your Dreams</h3>
            <p className="text-gray-600">Your journey is sacred. We protect every precious detail.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
