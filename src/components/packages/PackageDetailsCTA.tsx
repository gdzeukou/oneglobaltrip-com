
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface PackageDetailsCTAProps {
  packageId: string;
}

const PackageDetailsCTA = ({ packageId }: PackageDetailsCTAProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-yellow-50">
      <CardContent className="p-6 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Ready to Start Planning?</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Get personalized recommendations and let us handle all the details for your perfect European adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
            <Link to={`/booking?package=${packageId}`}>
              Start Planning Your Trip
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link to="/get-started">
              Get Free Consultation
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageDetailsCTA;
