
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPageTemplate from '@/components/visa/pages/VisaPageTemplate';

const DenmarkShortStay = () => {
  return (
    <VisaPageTemplate>
      <Navigation />
      
      <div className="bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-6xl">🇩🇰</span>
              <h1 className="text-4xl font-bold text-gray-900">Denmark Short Stay Visa</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience Denmark's hygge lifestyle, fairy-tale castles, and modern design. 
              From Copenhagen's charm to Viking history, your Danish adventure awaits.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Discover Denmark</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Explore colorful Nyhavn in Copenhagen</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Visit historic Kronborg Castle (Hamlet's castle)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Experience world-class Nordic cuisine</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Enjoy bike-friendly cities and green spaces</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visa Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Valid passport (3+ months beyond stay)</li>
                <li>✓ Completed application form</li>
                <li>✓ Recent passport photographs</li>
                <li>✓ Travel insurance coverage</li>
                <li>✓ Proof of accommodation</li>
                <li>✓ Return flight tickets</li>
                <li>✓ Financial proof</li>
              </ul>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-red-800 font-medium">Processing Time: 5-15 working days</p>
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

export default DenmarkShortStay;
