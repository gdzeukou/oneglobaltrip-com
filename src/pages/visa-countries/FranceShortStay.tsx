
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VisaPageTemplate from '@/components/visa/pages/VisaPageTemplate';

const FranceShortStay = () => {
  return (
    <VisaPageTemplate>
      <Navigation />
      
      <div className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-6xl">🇫🇷</span>
              <h1 className="text-4xl font-bold text-gray-900">France Short Stay Visa</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Apply for your France tourist visa with confidence. Experience the City of Light, 
              French cuisine, and rich cultural heritage with our expert visa assistance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Visit France?</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Explore iconic Paris landmarks: Eiffel Tower, Louvre, Notre-Dame</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Discover French Riviera beaches and glamorous Nice</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Experience world-renowned cuisine and wine regions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Visit historic castles and charming countryside</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visa Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Valid passport (6+ months validity)</li>
                <li>✓ Completed visa application form</li>
                <li>✓ Recent passport photos</li>
                <li>✓ Travel insurance coverage</li>
                <li>✓ Proof of accommodation</li>
                <li>✓ Flight reservations</li>
                <li>✓ Bank statements</li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">Processing Time: 5-15 working days</p>
                <p className="text-blue-800">Visa Fee: €80 (approx. $85)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </VisaPageTemplate>
  );
};

export default FranceShortStay;
