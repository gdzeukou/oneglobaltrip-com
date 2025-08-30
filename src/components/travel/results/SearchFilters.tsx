import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterState {
  priceRange: [number, number];
  // Flight filters
  nonStopOnly: boolean;
  airlines: string[];
  departureTime: string[];
  // Hotel filters
  starRating: number;
  amenities: string[];
  distanceFromCenter: number;
  // Car rental filters
  transmission: string;
  fuelType: string;
  carBrands: string[];
}

interface SearchFiltersProps {
  activeTab: 'flights' | 'hotels' | 'cars';
  onFilterChange: (filters: FilterState) => void;
  flights: any[];
  hotels: any[];
  carRentals: any[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  activeTab,
  onFilterChange,
  flights,
  hotels,
  carRentals
}) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    nonStopOnly: false,
    airlines: [],
    departureTime: [],
    starRating: 0,
    amenities: [],
    distanceFromCenter: 50,
    transmission: '',
    fuelType: '',
    carBrands: []
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Initialize price range based on available data
  useEffect(() => {
    let min = 0;
    let max = 10000;

    if (activeTab === 'flights' && flights.length > 0) {
      const prices = flights.map(f => f.price.amount);
      min = Math.min(...prices);
      max = Math.max(...prices);
    } else if (activeTab === 'hotels' && hotels.length > 0) {
      const prices = hotels.map(h => h.rooms[0].pricePerNight);
      min = Math.min(...prices);
      max = Math.max(...prices);
    } else if (activeTab === 'cars' && carRentals.length > 0) {
      const prices = carRentals.map(c => c.pricing.totalPrice);
      min = Math.min(...prices);
      max = Math.max(...prices);
    }

    setPriceRange([min, max]);
    setFilters(prev => ({ ...prev, priceRange: [min, max] }));
  }, [activeTab, flights, hotels, carRentals]);

  // Get unique values for filter options
  const getUniqueAirlines = () => {
    const airlines = flights.map(f => ({ code: f.airline.code, name: f.airline.name }));
    return airlines.filter((airline, index, self) => 
      index === self.findIndex(a => a.code === airline.code)
    );
  };

  const getUniqueAmenities = () => {
    const allAmenities = hotels.flatMap(h => h.amenities);
    return [...new Set(allAmenities)].slice(0, 15); // Limit to most common amenities
  };

  const getUniqueCarBrands = () => {
    const brands = carRentals.map(c => c.vehicle.brand);
    return [...new Set(brands)];
  };

  const handleFilterUpdate = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      priceRange,
      nonStopOnly: false,
      airlines: [],
      departureTime: [],
      starRating: 0,
      amenities: [],
      distanceFromCenter: 50,
      transmission: '',
      fuelType: '',
      carBrands: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]) count++;
    if (filters.nonStopOnly) count++;
    if (filters.airlines.length > 0) count++;
    if (filters.starRating > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.transmission) count++;
    if (filters.fuelType) count++;
    if (filters.carBrands.length > 0) count++;
    return count;
  };

  const renderFlightFilters = () => (
    <div className="space-y-6">
      {/* Airlines */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Airlines</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {getUniqueAirlines().map((airline) => (
            <div key={airline.code} className="flex items-center space-x-2">
              <Checkbox
                id={`airline-${airline.code}`}
                checked={filters.airlines.includes(airline.code)}
                onCheckedChange={(checked) => {
                  const newAirlines = checked
                    ? [...filters.airlines, airline.code]
                    : filters.airlines.filter(a => a !== airline.code);
                  handleFilterUpdate({ airlines: newAirlines });
                }}
              />
              <Label htmlFor={`airline-${airline.code}`} className="text-sm">
                {airline.name} ({airline.code})
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Non-stop only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="non-stop"
          checked={filters.nonStopOnly}
          onCheckedChange={(checked) => handleFilterUpdate({ nonStopOnly: !!checked })}
        />
        <Label htmlFor="non-stop">Non-stop flights only</Label>
      </div>

      {/* Departure Time */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Departure Time</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Early Morning (00:00 - 06:00)', value: 'early' },
            { label: 'Morning (06:00 - 12:00)', value: 'morning' },
            { label: 'Afternoon (12:00 - 18:00)', value: 'afternoon' },
            { label: 'Evening (18:00 - 24:00)', value: 'evening' }
          ].map((time) => (
            <div key={time.value} className="flex items-center space-x-2">
              <Checkbox
                id={`time-${time.value}`}
                checked={filters.departureTime.includes(time.value)}
                onCheckedChange={(checked) => {
                  const newTimes = checked
                    ? [...filters.departureTime, time.value]
                    : filters.departureTime.filter(t => t !== time.value);
                  handleFilterUpdate({ departureTime: newTimes });
                }}
              />
              <Label htmlFor={`time-${time.value}`} className="text-xs">
                {time.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHotelFilters = () => (
    <div className="space-y-6">
      {/* Star Rating */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Minimum Star Rating</Label>
        <Select 
          value={filters.starRating.toString()} 
          onValueChange={(value) => handleFilterUpdate({ starRating: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any rating</SelectItem>
            <SelectItem value="3">3+ stars</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="5">5 stars only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Amenities */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Amenities</Label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {getUniqueAmenities().map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={(checked) => {
                  const newAmenities = checked
                    ? [...filters.amenities, amenity]
                    : filters.amenities.filter(a => a !== amenity);
                  handleFilterUpdate({ amenities: newAmenities });
                }}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-xs">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Distance from Center */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Distance from Center: {filters.distanceFromCenter}km
        </Label>
        <Slider
          value={[filters.distanceFromCenter]}
          onValueChange={([value]) => handleFilterUpdate({ distanceFromCenter: value })}
          max={50}
          min={1}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderCarFilters = () => (
    <div className="space-y-6">
      {/* Transmission */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Transmission</Label>
        <Select 
          value={filters.transmission} 
          onValueChange={(value) => handleFilterUpdate({ transmission: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any transmission</SelectItem>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Fuel Type</Label>
        <Select 
          value={filters.fuelType} 
          onValueChange={(value) => handleFilterUpdate({ fuelType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any fuel type</SelectItem>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Car Brands */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Car Brands</Label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {getUniqueCarBrands().map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.carBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  const newBrands = checked
                    ? [...filters.carBrands, brand]
                    : filters.carBrands.filter(b => b !== brand);
                  handleFilterUpdate({ carBrands: newBrands });
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary">{getActiveFiltersCount()} active</Badge>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => handleFilterUpdate({ priceRange: value as [number, number] })}
          max={priceRange[1]}
          min={priceRange[0]}
          step={10}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Tab-specific filters */}
      {activeTab === 'flights' && renderFlightFilters()}
      {activeTab === 'hotels' && renderHotelFilters()}
      {activeTab === 'cars' && renderCarFilters()}

      {/* Apply Button */}
      <div className="pt-4">
        <Button 
          onClick={() => onFilterChange(filters)} 
          className="w-full"
        >
          Apply Filters ({getActiveFiltersCount()})
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;