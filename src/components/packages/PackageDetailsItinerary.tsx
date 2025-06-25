
import { Camera, CheckCircle, Bed, Utensils, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PackageDetailsItinerary = () => {
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

  return (
    <div className="space-y-4 sm:space-y-6">
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
    </div>
  );
};

export default PackageDetailsItinerary;
