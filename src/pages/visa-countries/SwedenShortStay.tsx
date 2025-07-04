
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPageTemplate from '@/components/visa/pages/VisaPageTemplate';

const SwedenShortStay = () => {
  return (
    <VisaPageTemplate>
      <Navigation />
      
      <div className="bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-6xl">🇸🇪</span>
              <h1 className="text-4xl font-bold text-gray-900">Sweden Short Stay Visa</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Sweden's natural beauty, innovative design, and rich Viking heritage. 
              From Stockholm's archipelago to Lapland's Northern Lights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Experience Sweden</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Explore Stockholm's old town (Gamla Stan)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>See the Northern Lights in Swedish Lapland</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Visit the Ice Hotel in Jukkasjärvi</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Experience midnight sun in summer</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visa Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Valid passport</li>
                <li>✓ Visa application form</li>
                <li>✓ Passport-size photos</li>
                <li>✓ Travel insurance</li>
                <li>✓ Hotel reservations</li>
                <li>✓ Flight itinerary</li>
                <li>✓ Bank statements</li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">Processing Time: 5-35 business days</p>
                <p className="text-blue-800">Visa Fee: €80</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </VisaPageTemplate>
  );
};

export default SwedenShortStay;
