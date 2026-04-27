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

    const path = location.pathname.toLowerCase();
    const newSuggestions: string[] = [];

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
      '/booking': 'Book Your Trip',
    };
    return pathMap[path] || path;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="relative z-10 max-w-2xl w-full border-card-border shadow-luxury">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto inline-flex items-baseline gap-1 font-serif">
            <span className="text-6xl font-semibold tracking-tighter text-primary">4</span>
            <span className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
              <Plane className="h-6 w-6" />
            </span>
            <span className="text-6xl font-semibold tracking-tighter text-primary">4</span>
          </div>
          <CardTitle className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Page not found
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            The URL might be incorrect or the page may have moved.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm">
            <span className="font-medium text-foreground">You tried:</span>{' '}
            <code className="font-mono text-muted-foreground">{location.pathname}</code>
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Search className="h-4 w-4" />
                Were you looking for?
              </h3>
              <div className="space-y-2">
                {suggestions.map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate(s)}
                  >
                    {s.includes('short-stay') ? <Plane className="mr-2 h-4 w-4" /> :
                     s.includes('long-stay')  ? <Building className="mr-2 h-4 w-4" /> :
                     <Search className="mr-2 h-4 w-4" />}
                    {getSuggestionText(s)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground">Popular destinations</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button variant="outline" onClick={() => navigate('/visas/short-stay')} className="justify-start"><Plane className="mr-2 h-4 w-4" />Short-Stay Visas</Button>
              <Button variant="outline" onClick={() => navigate('/visas/long-stay')}  className="justify-start"><Building className="mr-2 h-4 w-4" />Long-Stay Visas</Button>
              <Button variant="outline" onClick={() => navigate('/packages')}         className="justify-start"><Search className="mr-2 h-4 w-4" />Travel Packages</Button>
              <Button variant="outline" onClick={() => navigate('/get-started')}      className="justify-start"><Search className="mr-2 h-4 w-4" />Get Started</Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button onClick={() => navigate(-1)} variant="outline" className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back
            </Button>
            <Button onClick={() => navigate('/')} className="flex-1">
              <Home className="mr-2 h-4 w-4" /> Return home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
