
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Star, CheckCircle, Plane, Train, Clock, Camera, Utensils, Bed, Map, Info } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { packages } from '@/data/packages';
import OptimizedImage from '@/components/ui/optimized-image';
import { useIsMobile } from '@/hooks/use-mobile';

const PackageDetails = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const packageData = packages.find(pkg => pkg.id === id);

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/packages">View All Packages</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isMultiCountry = packageData.countries && packageData.countries.length > 1;

  // Enhanced itinerary data
  const itinerary = [
    {
      day: "Day 1-3",
      city: "London",
      title: "Royal London & English Countryside",
      highlights: [
        "Private transfer from Heathrow Airport to your 4-star central London hotel",
        "Go City London Pass: Access to 80+ attractions including Tower of London, Westminster Abbey",
        "Guided walking tour of Westminster & Royal Parks",
        "Full-day Cotswolds excursion with traditional pub lunch",
        "Evening at leisure - Optional West End show (additional cost)"
      ],
      accommodation: "4-star central London hotel (3 nights)",
      meals: "Daily breakfast, 1 lunch in Cotswolds",
      transportation: "Private airport transfer, comfortable coach for Cotswolds tour"
    },
    {
      day: "Day 4-6",
      city: "Paris",
      title: "City of Light & Loire Valley Castles",
      highlights: [
        "Eurostar high-speed train from London St. Pancras to Paris Gare du Nord (2h 15min)",
        "Private transfer to your boutique hotel in central Paris",
        "Skip-the-line Louvre Museum tour with expert guide",
        "Seine River cruise with champagne at sunset",
        "Full-day Loire Valley castle tour: Chambord & Chenonceau with wine tasting",
        "Evening stroll through Montmartre with local guide"
      ],
      accommodation: "4-star boutique hotel in Saint-Germain (3 nights)",
      meals: "Daily breakfast, château lunch in Loire Valley, farewell dinner",
      transportation: "Eurostar train, private transfers, luxury coach for Loire Valley"
    },
    {
      day: "Day 7-10",
      city: "Rome",
      title: "Eternal City & Vatican Treasures",
      highlights: [
        "Flight from Paris CDG to Rome Fiumicino (2h 20min)",
        "Private transfer to your hotel near Spanish Steps",
        "Skip-the-line Colosseum & Roman Forum tour with archaeologist guide",
        "Private Vatican Museums, Sistine Chapel & St. Peter's Basilica tour",
        "Cooking class in Trastevere with local chef",
        "Day trip to Tuscany: Siena & San Gimignano with wine tasting",
        "Farewell aperitivo with panoramic city views"
      ],
      accommodation: "4-star elegant hotel near Spanish Steps (4 nights)",
      meals: "Daily breakfast, cooking class meal, Tuscan lunch, farewell dinner",
      transportation: "Flight, private transfers, comfortable coach for Tuscany tour"
    }
  ];

  const inclusions = [
    {
      category: "Accommodation",
      items: [
        "10 nights in carefully selected 4-star hotels",
        "Central locations in all three cities",
        "Daily breakfast buffet",
        "Welcome amenities and concierge services"
      ]
    },
    {
      category: "Transportation",
      items: [
        "Round-trip flights: Paris to Rome",
        "Eurostar train: London to Paris (Standard Premier class)",
        "Private airport/station transfers in all cities",
        "Comfortable coaches for all excursions",
        "All transportation between activities included"
      ]
    },
    {
      category: "Tours & Activities",
      items: [
        "Go City London Pass (80+ attractions)",
        "Skip-the-line access to major attractions",
        "Expert local guides for all tours",
        "Small group sizes (max 16 people)",
        "Headsets provided for all guided tours"
      ]
    },
    {
      category: "Meals & Dining",
      items: [
        "Daily breakfast at hotels",
        "4 lunches including château and Tuscan experiences",
        "2 special dinners including farewell meal",
        "Wine tastings in Loire Valley and Tuscany",
        "Cooking class with chef in Rome"
      ]
    }
  ];

  const exclusions = [
    "International flights to London and from Rome",
    "Travel insurance (strongly recommended)",
    "Meals not mentioned in the itinerary",
    "Optional activities and excursions",
    "Personal expenses and shopping",
    "Tips for guides and drivers (optional)",
    "Visa fees (assistance provided)"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/packages" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Packages</span>
            </Link>
          </Button>

          {/* Hero Section - Mobile Optimized */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
            <div className="relative">
              <OptimizedImage
                src={packageData.image}
                alt={packageData.title}
                className="w-full h-64 sm:h-80 lg:h-96 rounded-lg"
                overlay
                overlayColor="bg-black/10"
              />
              {isMultiCountry && (
                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2">
                  <Plane className="h-3 w-3 sm:h-4 sm:w-4" />
                  <Train className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Multi-Country</span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-blue-900 font-bold text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                  From ${packageData.price.toLocaleString()}
                </Badge>
              </div>
              {packageData.originalPrice && (
                <div className="absolute top-4 right-4 mt-8 sm:mt-12">
                  <Badge variant="outline" className="bg-white/90 text-gray-600 line-through text-xs sm:text-sm">
                    ${packageData.originalPrice.toLocaleString()}
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{packageData.title}</h1>
              <p className="text-lg sm:text-xl text-gray-600">{packageData.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Duration</p>
                    <p className="text-gray-600 text-sm sm:text-base">{packageData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Countries</p>
                    <p className="text-gray-600 text-sm sm:text-base">{isMultiCountry ? `${packageData.countries?.length} Countries` : packageData.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Ideal For</p>
                    <p className="text-gray-600 text-sm sm:text-base">Couples, First-Time Europe</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Rating</p>
                    <p className="text-gray-600 text-sm sm:text-base">{packageData.rating}/5 ({packageData.reviews} reviews)</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                <Link to={`/booking?package=${packageData.id}`}>
                  Start Planning Your Trip
                </Link>
              </Button>
            </div>
          </div>

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

            <TabsContent value="itinerary" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                {itinerary.map((day, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-yellow-50 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-lg sm:text-xl text-blue-900">{day.day}</CardTitle>
                          <p className="text-base sm:text-lg font-semibold text-gray-800">{day.city} - {day.title}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 self-start sm:self-center">{day.city}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                            <Camera className="h-4 w-4 mr-2 text-blue-600" />
                            Daily Highlights
                          </h4>
                          <ul className="space-y-2">
                            {day.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-xs sm:text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                              <Bed className="h-4 w-4 mr-2 text-blue-600" />
                              Accommodation
                            </h4>
                            <p className="text-gray-700 text-xs sm:text-sm">{day.accommodation}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                              <Utensils className="h-4 w-4 mr-2 text-blue-600" />
                              Meals Included
                            </h4>
                            <p className="text-gray-700 text-xs sm:text-sm">{day.meals}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                              <Map className="h-4 w-4 mr-2 text-blue-600" />
                              Transportation
                            </h4>
                            <p className="text-gray-700 text-xs sm:text-sm">{day.transportation}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inclusions" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {inclusions.map((section, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg text-blue-900">{section.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg text-red-800 flex items-center">
                    <Info className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Not Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2">
                    {exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold mt-1">✗</span>
                        <span className="text-red-700 text-xs sm:text-sm">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="highlights">
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
            </TabsContent>

            <TabsContent value="practical" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      <span>Visa Requirements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-3">
                      <p className="text-gray-700 mb-4 text-sm sm:text-base">Required visas for this trip:</p>
                      <div className="flex flex-wrap gap-2">
                        {packageData.visasRequired.map((visa, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs sm:text-sm">
                            {visa}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-4">
                        We'll provide complete visa assistance including document checklists, application guidance, and appointment booking support.
                      </p>
                    </div>
                  </CardContent>
                </Card>

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
            </TabsContent>

            <TabsContent value="booking" className="space-y-4 sm:space-y-6">
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
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-yellow-50">
            <CardContent className="p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Ready to Start Planning?</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Get personalized recommendations and let us handle all the details for your perfect European adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                  <Link to={`/booking?package=${packageData.id}`}>
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetails;
