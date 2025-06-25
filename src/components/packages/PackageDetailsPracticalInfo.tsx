
import { Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from '@/types/package';
import PackageVisaWizard from './PackageVisaWizard';

interface PackageDetailsPracticalInfoProps {
  packageData: Package;
}

const PackageDetailsPracticalInfo = ({ packageData }: PackageDetailsPracticalInfoProps) => {
  const isMultiCountry = packageData.countries && packageData.countries.length > 1;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Visa Requirements Wizard - Now Interactive */}
      <PackageVisaWizard packageData={packageData} />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {isMultiCountry && (
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                <span>Countries Covered</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {packageData.countries?.map((country, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800 text-xs sm:text-sm">
                    {country}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Best Time to Travel</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-gray-700 mb-2 text-sm sm:text-base"><strong>Peak Season:</strong> June - August (warm weather, longer days, higher prices)</p>
            <p className="text-gray-700 mb-2 text-sm sm:text-base"><strong>Shoulder Season:</strong> April-May, September-October (mild weather, fewer crowds)</p>
            <p className="text-gray-700 text-sm sm:text-base"><strong>Winter:</strong> November-March (cooler weather, indoor attractions, lowest prices)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Packing Essentials</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ul className="text-xs sm:text-sm space-y-1 text-gray-700">
              <li>• Comfortable walking shoes</li>
              <li>• Weather-appropriate clothing</li>
              <li>• Travel adapters (Type G for UK, Type C/E for Europe)</li>
              <li>• Portable phone charger</li>
              <li>• Camera with extra memory cards</li>
              <li>• Travel insurance documents</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PackageDetailsPracticalInfo;
