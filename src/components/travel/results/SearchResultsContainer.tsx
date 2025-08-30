import React, { useState } from 'react';
import { Grid, List, Filter, ArrowUpDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpediaFlightCard from '@/components/travel/cards/ExpediaFlightCard';
import { FlightResult } from './FlightResultCard';
import HotelResultCard, { HotelResult } from './HotelResultCard';
import CarRentalCard, { CarRentalResult } from './CarRentalCard';
import SearchFilters from './SearchFilters';
import { SkeletonEnhanced } from '@/components/ui/skeleton-enhanced';

interface SearchResultsContainerProps {
  flights?: FlightResult[];
  hotels?: HotelResult[];
  carRentals?: CarRentalResult[];
  loading: boolean;
  activeTab?: 'flights' | 'hotels' | 'cars';
  onTabChange?: (tab: 'flights' | 'hotels' | 'cars') => void;
  onFlightSelect?: (flight: FlightResult) => void;
  onHotelSelect?: (hotel: HotelResult) => void;
  onCarSelect?: (car: CarRentalResult) => void;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'duration' | 'popularity';

const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({
  flights = [],
  hotels = [],
  carRentals = [],
  loading,
  activeTab = 'flights',
  onTabChange,
  onFlightSelect,
  onHotelSelect,
  onCarSelect
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [compareItems, setCompareItems] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState({
    flights,
    hotels,
    carRentals
  });

  const handleFilterChange = (filters: any) => {
    // Apply filters to results
    const applyFilters = (items: any[], type: string) => {
      return items.filter(item => {
        // Price range filter
        if (filters.priceRange) {
          const price = type === 'flights' ? item.price.amount : 
                       type === 'hotels' ? item.rooms[0].pricePerNight :
                       item.pricing.totalPrice;
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            return false;
          }
        }

        // Flight specific filters
        if (type === 'flights') {
          if (filters.nonStopOnly && item.stops > 0) return false;
          if (filters.airlines && filters.airlines.length > 0 && !filters.airlines.includes(item.airline.code)) return false;
        }

        // Hotel specific filters
        if (type === 'hotels') {
          if (filters.starRating && item.rating < filters.starRating) return false;
          if (filters.amenities && filters.amenities.length > 0) {
            const hasRequiredAmenities = filters.amenities.every((amenity: string) =>
              item.amenities.some((hotelAmenity: string) =>
                hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
              )
            );
            if (!hasRequiredAmenities) return false;
          }
        }

        // Car rental specific filters
        if (type === 'cars') {
          if (filters.transmission && item.vehicle.transmission !== filters.transmission) return false;
          if (filters.fuelType && item.vehicle.fuelType !== filters.fuelType) return false;
        }

        return true;
      });
    };

    setFilteredResults({
      flights: applyFilters(flights, 'flights'),
      hotels: applyFilters(hotels, 'hotels'),
      carRentals: applyFilters(carRentals, 'cars')
    });
  };

  const handleSort = (items: any[], type: string) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          const priceA = type === 'flights' ? a.price.amount : 
                        type === 'hotels' ? a.rooms[0].pricePerNight :
                        a.pricing.totalPrice;
          const priceB = type === 'flights' ? b.price.amount : 
                        type === 'hotels' ? b.rooms[0].pricePerNight :
                        b.pricing.totalPrice;
          return priceA - priceB;
        case 'price-desc':
          const priceA2 = type === 'flights' ? a.price.amount : 
                         type === 'hotels' ? a.rooms[0].pricePerNight :
                         a.pricing.totalPrice;
          const priceB2 = type === 'flights' ? b.price.amount : 
                         type === 'hotels' ? b.rooms[0].pricePerNight :
                         b.pricing.totalPrice;
          return priceB2 - priceA2;
        case 'rating':
          if (type === 'hotels') return b.rating - a.rating;
          return 0;
        case 'duration':
          if (type === 'flights') {
            const durationA = parseInt(a.duration.replace(/\D/g, ''));
            const durationB = parseInt(b.duration.replace(/\D/g, ''));
            return durationA - durationB;
          }
          return 0;
        default:
          return 0;
      }
    });
  };

  const handleCompare = (item: any) => {
    setCompareItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.filter(p => p.id !== item.id);
      } else if (prev.length < 3) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const getResultCount = () => {
    switch (activeTab) {
      case 'flights':
        return filteredResults.flights.length;
      case 'hotels':
        return filteredResults.hotels.length;
      case 'cars':
        return filteredResults.carRentals.length;
      default:
        return 0;
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonEnhanced key={index} variant="card" className="h-64" />
          ))}
        </div>
      );
    }

    const renderFlights = () => {
      const sortedFlights = handleSort(filteredResults.flights, 'flights');
      return (
        <div className="space-y-4">
          {sortedFlights.map((flight) => (
            <ExpediaFlightCard
              key={flight.id}
              flight={flight}
              onSelect={onFlightSelect || (() => {})}
              onCompare={handleCompare}
              isComparing={compareItems.some(item => item.id === flight.id)}
            />
          ))}
        </div>
      );
    };

    const renderHotels = () => {
      const sortedHotels = handleSort(filteredResults.hotels, 'hotels');
      return (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {sortedHotels.map((hotel) => (
            <HotelResultCard
              key={hotel.id}
              hotel={hotel}
              onSelect={onHotelSelect || (() => {})}
              onCompare={handleCompare}
              isComparing={compareItems.some(item => item.id === hotel.id)}
            />
          ))}
        </div>
      );
    };

    const renderCarRentals = () => {
      const sortedCars = handleSort(filteredResults.carRentals, 'cars');
      return (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {sortedCars.map((car) => (
            <CarRentalCard
              key={car.id}
              car={car}
              onSelect={onCarSelect || (() => {})}
              onCompare={handleCompare}
              isComparing={compareItems.some(item => item.id === car.id)}
            />
          ))}
        </div>
      );
    };

    return (
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flights">
            Flights ({filteredResults.flights.length})
          </TabsTrigger>
          <TabsTrigger value="hotels">
            Hotels ({filteredResults.hotels.length})
          </TabsTrigger>
          <TabsTrigger value="cars">
            Cars ({filteredResults.carRentals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights">{renderFlights()}</TabsContent>
        <TabsContent value="hotels">{renderHotels()}</TabsContent>
        <TabsContent value="cars">{renderCarRentals()}</TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="w-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
          {!loading && (
            <Badge variant="secondary">
              {getResultCount()} results found
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Compare Panel */}
          {compareItems.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Compare ({compareItems.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Compare Options</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {compareItems.map((item) => (
                    <div key={item.id} className="border border-border rounded-lg p-4">
                      {/* Simplified comparison view */}
                      <h3 className="font-medium mb-2">
                        {item.airline?.name || item.name || item.vehicle?.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Price: {item.price?.amount || item.rooms?.[0]?.pricePerNight || item.pricing?.totalPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-background"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            {activeTab === 'hotels' && <option value="rating">Rating: High to Low</option>}
            {activeTab === 'flights' && <option value="duration">Duration: Shortest</option>}
          </select>

          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Filter Results</DialogTitle>
              </DialogHeader>
              <SearchFilters
                activeTab={activeTab}
                onFilterChange={handleFilterChange}
                flights={flights}
                hotels={hotels}
                carRentals={carRentals}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Results */}
      {renderResults()}

      {/* No Results */}
      {!loading && getResultCount() === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No results found matching your criteria.</p>
          <Button onClick={() => setShowFilters(true)}>
            Adjust Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsContainer;