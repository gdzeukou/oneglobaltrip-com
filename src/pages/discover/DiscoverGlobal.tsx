import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import OGTNavbar from '@/components/navigation/OGTNavbar';
import { TravelerCard } from '@/components/discover/TravelerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, Filter, Globe } from 'lucide-react';
import { PublicProfile } from '@/hooks/usePublicProfile';

export default function DiscoverGlobal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const { data: travelers, isLoading } = useQuery({
    queryKey: ['discover-global', searchQuery, selectedInterest, selectedCountry],
    queryFn: async () => {
      let query = supabase
        .from('user_profiles_public')
        .select('*')
        .eq('is_discoverable', true);

      if (searchQuery) {
        query = query.or(`display_name.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`);
      }

      if (selectedInterest !== 'all') {
        query = query.contains('travel_interests', [selectedInterest]);
      }

      if (selectedCountry !== 'all') {
        query = query.eq('home_country', selectedCountry);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      return data as PublicProfile[];
    },
  });

  const interests = [
    'Adventure', 'Luxury', 'Budget', 'Foodie', 'Culture', 
    'Beach', 'Nature', 'Photography', 'Solo Travel', 'Family'
  ];

  return (
    <div className="min-h-screen bg-background">
      <OGTNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Discover Travelers Worldwide</h1>
              <p className="text-muted-foreground">
                Connect with travelers from around the globe
              </p>
            </div>
          </div>

          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Travel Interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interests</SelectItem>
                  {interests.map(interest => (
                    <SelectItem key={interest} value={interest.toLowerCase()}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="Brazil">Brazil</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery || selectedInterest !== 'all' || selectedCountry !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedInterest('all');
                    setSelectedCountry('all');
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </Card>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-64 animate-pulse bg-muted" />
            ))}
          </div>
        ) : travelers && travelers.length > 0 ? (
          <>
            <div className="mb-4 text-muted-foreground">
              Found {travelers.length} travelers
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelers.map(traveler => (
                <TravelerCard key={traveler.id} traveler={traveler} />
              ))}
            </div>
          </>
        ) : (
          <Card className="p-12 text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No travelers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters to discover more travelers.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
