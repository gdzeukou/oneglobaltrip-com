
import { CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from '@/types/package';

interface PackageDetailsHighlightsProps {
  packageData: Package;
}

const PackageDetailsHighlights = ({ packageData }: PackageDetailsHighlightsProps) => {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            <span>Trip Highlights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <ul className="space-y-3">
            {packageData.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-green-600 font-bold mt-1">✓</span>
                <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            <span>Special Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <ul className="space-y-3">
            {packageData.specialFeatures.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-yellow-500 font-bold mt-1">★</span>
                <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageDetailsHighlights;
