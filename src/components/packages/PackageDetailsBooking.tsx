
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from '@/types/package';

interface PackageDetailsBookingProps {
  packageData: Package;
}

const PackageDetailsBooking = ({ packageData }: PackageDetailsBookingProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Pricing Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm sm:text-base">Base Price (per person):</span>
                <span className="font-semibold text-sm sm:text-base">${packageData.price.toLocaleString()}</span>
              </div>
              {packageData.originalPrice && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm sm:text-base">Regular Price:</span>
                  <span className="line-through text-gray-500 text-sm sm:text-base">${packageData.originalPrice.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-green-600">
                <span className="font-medium text-sm sm:text-base">You Save:</span>
                <span className="font-bold text-sm sm:text-base">${(packageData.originalPrice! - packageData.price).toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs sm:text-sm text-gray-600">*Based on double occupancy. Single supplement available.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Booking Process</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ol className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>Complete our travel preferences form</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>Receive personalized itinerary within 24 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>Secure your trip with a small deposit</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span>We handle all bookings and visa assistance</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Free Cancellation</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">Cancel up to 30 days before departure for a full refund</p>
            <p className="text-xs sm:text-sm text-gray-500">Terms and conditions apply. Travel insurance recommended.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageDetailsBooking;
