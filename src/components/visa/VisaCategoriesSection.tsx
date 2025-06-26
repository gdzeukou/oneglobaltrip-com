
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
          <Card className="group relative bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-500/30 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-[1px] bg-white rounded-2xl" />
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-200/50">
                  <Plane className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl text-blue-900 group-hover:text-blue-800 transition-colors duration-300">Short-Stay Visas</CardTitle>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Perfect for tourism, business trips, and short visits</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Tourism & Business Travel</span>
                  </div>
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>90 days or less</span>
                  </div>
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Fast processing (5-20 days)</span>
                  </div>
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Starting from $175</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" asChild>
                  <Link to="/visas/short-stay">
                    Explore Short-Stay Visas
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Long-Stay Card */}
          <Card className="group relative bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-purple-500/30 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-[1px] bg-white rounded-2xl" />
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-200/50">
                  <Building className="h-10 w-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                </div>
                <CardTitle className="text-2xl text-purple-900 group-hover:text-purple-800 transition-colors duration-300">Long-Stay & Residency</CardTitle>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">For work, study, family reunion, and permanent moves</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Work & Study Permits</span>
                  </div>
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>6 months to permanent</span>
                  </div>
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Comprehensive support (2-8 months)</span>
                  </div>
                  <div className="flex items-center text-sm group-hover:text-gray-800 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
                    <span>Starting from $240</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" asChild>
                  <Link to="/visas/long-stay">
                    Explore Long-Stay Visas
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VisaCategoriesSection;
