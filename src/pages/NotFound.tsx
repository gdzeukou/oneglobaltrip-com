
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Plane, Building } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Generate smart suggestions based on the attempted path
    const path = location.pathname.toLowerCase();
    const newSuggestions = [];

    if (path.includes('visa') || path.includes('schengen') || path.includes('uk') || path.includes('canada')) {
      newSuggestions.push('/visas/short-stay', '/visas/long-stay');
    }
    
    if (path.includes('short-stay') || path.includes('tourism')) {
      newSuggestions.push('/visas/short-stay/schengen', '/visas/short-stay/uk');
    }
    
    if (path.includes('long-stay') || path.includes('residency') || path.includes('work')) {
      newSuggestions.push('/visas/long-stay/portugal', '/visas/long-stay/norway');
    }
    
    if (path.includes('package') || path.includes('trip')) {
      newSuggestions.push('/packages', '/booking');
    }

    // Remove duplicates and set suggestions
    setSuggestions([...new Set(newSuggestions)]);
  }, [location.pathname]);

  const getSuggestionText = (path: string) => {
    const pathMap: { [key: string]: string } = {
      '/visas/short-stay': 'Short-Stay Visas',
      '/visas/long-stay': 'Long-Stay & Residency',
      '/visas/short-stay/schengen': 'Schengen Area Visa',
      '/visas/short-stay/uk': 'UK Tourist Visa',
      '/visas/long-stay/portugal': 'Portugal Residency',
      '/visas/long-stay/norway': 'Norway Work Permit',
      '/packages': 'Travel Packages',
      '/booking': 'Book Your Trip'
    };
    
    return pathMap[path] || path;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
          <CardTitle className="text-2xl text-gray-900 mb-2">Page Not Found</CardTitle>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. The URL might be incorrect or the page may have moved.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Show attempted path */}
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>You tried to visit:</strong> {location.pathname}
            </p>
          </div>

          {/* Smart suggestions */}
          {suggestions.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Were you looking for:
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate(suggestion)}
                  >
                    {suggestion.includes('short-stay') ? (
                      <Plane className="h-4 w-4 mr-2" />
                    ) : suggestion.includes('long-stay') ? (
                      <Building className="h-4 w-4 mr-2" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    {getSuggestionText(suggestion)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Main navigation options */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Popular Destinations:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/visas/short-stay')}
                className="justify-start"
              >
                <Plane className="h-4 w-4 mr-2" />
                Short-Stay Visas
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/visas/long-stay')}
                className="justify-start"
              >
                <Building className="h-4 w-4 mr-2" />
                Long-Stay Visas
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/packages')}
                className="justify-start"
              >
                <Search className="h-4 w-4 mr-2" />
                Travel Packages
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/get-started')}
                className="justify-start"
              >
                <Search className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>

          {/* Main action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

