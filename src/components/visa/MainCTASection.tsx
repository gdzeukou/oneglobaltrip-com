
import { CheckCircle, Plane, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const MainCTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="main-cta-section" className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">🎯 Most Popular Choice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Schengen - Most Popular Short Stay */}
            <Card className="border-2 border-blue-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-bold">
                MOST POPULAR
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-900">Schengen Area Visa</CardTitle>
                <p className="text-gray-600">Visit 27 European Countries</p>
                <div className="text-3xl font-bold text-blue-900">$193</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Multiple entries allowed</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>90 days validity period</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>27 countries access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Tourism & business purposes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>10-15 days processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Expert application support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  onClick={() => navigate('/visas/short-stay/schengen')}
                >
                  Apply for Schengen Visa
                </Button>
              </CardContent>
            </Card>

            {/* Portugal - Most Popular Long Stay */}
            <Card className="border-2 border-purple-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-sm font-bold">
                TRENDING
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-purple-900">Portugal Residency</CardTitle>
                <p className="text-gray-600">Live & Work in Europe</p>
                <div className="text-3xl font-bold text-purple-900">$1,299</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Multiple entries allowed</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>2 years initial validity</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Work permit included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>EU countries access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Renewal possible</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Path to permanent residency</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                  onClick={() => navigate('/visas/long-stay/portugal')}
                >
                  Apply for Portugal Residency
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold"
              onClick={() => navigate('/visas/short-stay')}
            >
              <Plane className="h-5 w-5 mr-2" />
              All Short-Stay Visas
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold"
              onClick={() => navigate('/visas/long-stay')}
            >
              <Building className="h-5 w-5 mr-2" />
              All Long-Stay Visas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
