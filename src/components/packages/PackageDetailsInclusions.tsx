
import { CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PackageDetailsInclusions = () => {
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
    <div className="space-y-4 sm:space-y-6">
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
    </div>
  );
};

export default PackageDetailsInclusions;
