
import { Shield, Clock, Users } from 'lucide-react';

const VisasHero = () => {
  return (
    <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Visa Services
          <span className="block text-yellow-500">For Every Journey</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          From quick getaways to permanent moves - we make visa applications simple with guaranteed approval
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
            <Shield className="h-5 w-5 text-yellow-500" />
            <span>100% Approval Rate</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
            <Clock className="h-5 w-5 text-yellow-500" />
            <span>Fast Processing</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
            <Users className="h-5 w-5 text-yellow-500" />
            <span>Expert Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisasHero;
