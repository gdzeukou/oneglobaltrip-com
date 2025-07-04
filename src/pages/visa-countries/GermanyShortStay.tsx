
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPageTemplate from '@/components/visa/pages/VisaPageTemplate';

const GermanyShortStay = () => {
  return (
    <VisaPageTemplate>
      <Navigation />
      
      <div className="bg-gradient-to-br from-red-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-6xl">🇩🇪</span>
              <h1 className="text-4xl font-bold text-gray-900">Germany Short Stay Visa</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Germany's rich history, vibrant cities, and stunning landscapes. 
              From Berlin's culture to Bavaria's castles, we'll help you get there.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Explore Germany</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Visit Berlin's historic sites and modern culture</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Explore Neuschwanstein Castle in Bavaria</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Experience Oktoberfest in Munich</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Drive the scenic Romantic Road</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visa Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Valid passport</li>
                <li>✓ Visa application form</li>
                <li>✓ Biometric photos</li>
                <li>✓ Travel insurance (€30,000 coverage)</li>
                <li>✓ Accommodation proof</li>
                <li>✓ Financial statements</li>
                <li>✓ Employment letter</li>
              </ul>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-red-800 font-medium">Processing Time: 5-35 business days</p>
                <p className="text-red-800">Visa Fee: €80</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </VisaPageTemplate>
  );
};

export default GermanyShortStay;
