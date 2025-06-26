
import { CheckCircle, ArrowRight, Plane, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VisaCategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Visa Category</h2>
          <p className="text-xl text-gray-600">Different visas for different dreams</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Short-Stay Card */}
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="bg-blue-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-blue-100">
                <Plane className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Short-Stay Visas</CardTitle>
              <p className="text-gray-600">Perfect for tourism, business trips, and short visits</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Tourism & Business Travel</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>90 days or less</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Fast processing (5-20 days)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Starting from $175</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200" asChild>
                <Link to="/visas/short-stay">
                  Explore Short-Stay Visas
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Long-Stay Card */}
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="bg-purple-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center border border-purple-100">
                <Building className="h-10 w-10 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Long-Stay & Residency</CardTitle>
              <p className="text-gray-600">For work, study, family reunion, and permanent moves</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Work & Study Permits</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>6 months to permanent</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Comprehensive support (2-8 months)</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Starting from $240</span>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors duration-200" asChild>
                <Link to="/visas/long-stay">
                  Explore Long-Stay Visas
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VisaCategoriesSection;
