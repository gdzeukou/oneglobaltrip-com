
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TechNavigation from '@/components/TechNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { packages } from '@/data/packages';
import { useIsMobile } from '@/hooks/use-mobile';
import PackageDetailsHero from '@/components/packages/PackageDetailsHero';
import PackageDetailsItinerary from '@/components/packages/PackageDetailsItinerary';
import PackageDetailsInclusions from '@/components/packages/PackageDetailsInclusions';
import PackageDetailsHighlights from '@/components/packages/PackageDetailsHighlights';
import PackageDetailsPracticalInfo from '@/components/packages/PackageDetailsPracticalInfo';
import PackageDetailsBooking from '@/components/packages/PackageDetailsBooking';
import PackageDetailsCTA from '@/components/packages/PackageDetailsCTA';

const PackageDetails = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const packageData = packages.find(pkg => pkg.id === id);

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TechNavigation />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
            <Link to="/packages">
              <Button>View All Packages</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TechNavigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Link to="/packages" className="flex items-center space-x-2 mb-6">
            <Button variant="ghost" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Packages</span>
            </Button>
          </Link>

          {/* Hero Section */}
          <PackageDetailsHero packageData={packageData} />

          {/* Detailed Information Tabs - Mobile Optimized */}
          <Tabs defaultValue="itinerary" className="mb-8">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 h-auto' : 'grid-cols-5'} mb-6`}>
              <TabsTrigger value="itinerary" className={isMobile ? 'text-xs px-2 py-3' : ''}>
                {isMobile ? 'Itinerary' : 'Day by Day'}
              </TabsTrigger>
              <TabsTrigger value="inclusions" className={isMobile ? 'text-xs px-2 py-3' : ''}>
                {isMobile ? 'Included' : 'What\'s Included'}
              </TabsTrigger>
              {!isMobile && <TabsTrigger value="highlights">Highlights</TabsTrigger>}
              <TabsTrigger value="practical" className={isMobile ? 'text-xs px-2 py-3' : ''}>
                {isMobile ? 'Info' : 'Practical Info'}
              </TabsTrigger>
              <TabsTrigger value="booking" className={isMobile ? 'text-xs px-2 py-3' : ''}>
                {isMobile ? 'Booking' : 'Booking Details'}
              </TabsTrigger>
            </TabsList>

            {isMobile && (
              <TabsList className="grid w-full grid-cols-1 mb-6">
                <TabsTrigger value="highlights" className="text-xs px-2 py-3">
                  Highlights
                </TabsTrigger>
              </TabsList>
            )}

            <TabsContent value="itinerary">
              <PackageDetailsItinerary />
            </TabsContent>

            <TabsContent value="inclusions">
              <PackageDetailsInclusions />
            </TabsContent>

            <TabsContent value="highlights">
              <PackageDetailsHighlights packageData={packageData} />
            </TabsContent>

            <TabsContent value="practical">
              <PackageDetailsPracticalInfo packageData={packageData} />
            </TabsContent>

            <TabsContent value="booking">
              <PackageDetailsBooking packageData={packageData} />
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <PackageDetailsCTA packageId={packageData.id} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetails;
