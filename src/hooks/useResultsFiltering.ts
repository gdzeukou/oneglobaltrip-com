import { useState, useEffect, useMemo } from 'react';

interface FilterOptions {
  priceRange: [number, number];
  // Flight filters
  nonStopOnly?: boolean;
  airlines?: string[];
  departureTime?: string[];
  // Hotel filters
  starRating?: number;
  amenities?: string[];
  distanceFromCenter?: number;
  // Car rental filters
  transmission?: string;
  fuelType?: string;
  carBrands?: string[];
}

interface SortOptions {
  field: 'price' | 'duration' | 'rating' | 'popularity';
  direction: 'asc' | 'desc';
}

export const useResultsFiltering = <T extends Record<string, any>>(
  data: T[],
  type: 'flights' | 'hotels' | 'cars'
) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000]
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'price',
    direction: 'asc'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize price range based on data
  useEffect(() => {
    if (data.length === 0) return;

    const prices = data.map(item => {
      switch (type) {
        case 'flights':
          return item.price?.amount || 0;
        case 'hotels':
          return item.rooms?.[0]?.pricePerNight || 0;
        case 'cars':
          return item.pricing?.totalPrice || 0;
        default:
          return 0;
      }
    });

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice]
    }));
  }, [data, type]);

  // Filter function
  const applyFilters = useMemo(() => {
    return data.filter(item => {
      // Price filter
      const price = type === 'flights' ? item.price?.amount :
                   type === 'hotels' ? item.rooms?.[0]?.pricePerNight :
                   item.pricing?.totalPrice;
      
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Search query filter
      if (searchQuery) {
        const searchFields = type === 'flights' 
          ? [item.airline?.name, item.departure?.airport, item.arrival?.airport]
          : type === 'hotels'
          ? [item.name, item.location?.city, item.location?.address]
          : [item.vehicle?.brand, item.vehicle?.model, item.provider?.name];
        
        const matchesSearch = searchFields.some(field => 
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (!matchesSearch) return false;
      }

      // Type-specific filters
      if (type === 'flights') {
        if (filters.nonStopOnly && item.stops > 0) return false;
        if (filters.airlines?.length && !filters.airlines.includes(item.airline?.code)) return false;
        
        if (filters.departureTime?.length) {
          const departureHour = new Date(item.departure?.time).getHours();
          const timeSlot = departureHour < 6 ? 'early' :
                          departureHour < 12 ? 'morning' :
                          departureHour < 18 ? 'afternoon' : 'evening';
          if (!filters.departureTime.includes(timeSlot)) return false;
        }
      }

      if (type === 'hotels') {
        if (filters.starRating && item.rating < filters.starRating) return false;
        
        if (filters.amenities?.length) {
          const hasRequiredAmenities = filters.amenities.every(amenity =>
            item.amenities?.some((hotelAmenity: string) =>
              hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
            )
          );
          if (!hasRequiredAmenities) return false;
        }

        if (filters.distanceFromCenter) {
          const distance = parseFloat(item.location?.distance?.replace(/[^\d.]/g, '') || '0');
          if (distance > filters.distanceFromCenter) return false;
        }
      }

      if (type === 'cars') {
        if (filters.transmission && item.vehicle?.transmission !== filters.transmission) return false;
        if (filters.fuelType && item.vehicle?.fuelType !== filters.fuelType) return false;
        if (filters.carBrands?.length && !filters.carBrands.includes(item.vehicle?.brand)) return false;
      }

      return true;
    });
  }, [data, filters, searchQuery, type]);

  // Sort function
  const sortedAndFilteredData = useMemo(() => {
    return [...applyFilters].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortOptions.field) {
        case 'price':
          aValue = type === 'flights' ? a.price?.amount :
                   type === 'hotels' ? a.rooms?.[0]?.pricePerNight :
                   a.pricing?.totalPrice;
          bValue = type === 'flights' ? b.price?.amount :
                   type === 'hotels' ? b.rooms?.[0]?.pricePerNight :
                   b.pricing?.totalPrice;
          break;
        
        case 'duration':
          if (type === 'flights') {
            aValue = parseInt(a.duration?.replace(/\D/g, '') || '0');
            bValue = parseInt(b.duration?.replace(/\D/g, '') || '0');
          } else {
            return 0;
          }
          break;
        
        case 'rating':
          if (type === 'hotels') {
            aValue = a.rating || 0;
            bValue = b.rating || 0;
          } else {
            return 0;
          }
          break;
        
        case 'popularity':
          // Could be based on availability, review count, etc.
          aValue = type === 'hotels' ? a.reviewCount :
                   type === 'flights' ? a.availability :
                   a.provider?.rating || 0;
          bValue = type === 'hotels' ? b.reviewCount :
                   type === 'flights' ? b.availability :
                   b.provider?.rating || 0;
          break;
        
        default:
          return 0;
      }

      if (sortOptions.direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [applyFilters, sortOptions]);

  // Get unique filter options
  const getFilterOptions = useMemo(() => {
    const options: any = {};

    if (type === 'flights') {
      options.airlines = [...new Set(data.map(item => item.airline?.code))].filter(Boolean);
    }

    if (type === 'hotels') {
      const allAmenities = data.flatMap(item => item.amenities || []);
      options.amenities = [...new Set(allAmenities)].slice(0, 20);
    }

    if (type === 'cars') {
      options.carBrands = [...new Set(data.map(item => item.vehicle?.brand))].filter(Boolean);
      options.transmissions = [...new Set(data.map(item => item.vehicle?.transmission))].filter(Boolean);
      options.fuelTypes = [...new Set(data.map(item => item.vehicle?.fuelType))].filter(Boolean);
    }

    return options;
  }, [data, type]);

  // Reset filters
  const resetFilters = () => {
    const prices = data.map(item => {
      switch (type) {
        case 'flights':
          return item.price?.amount || 0;
        case 'hotels':
          return item.rooms?.[0]?.pricePerNight || 0;
        case 'cars':
          return item.pricing?.totalPrice || 0;
        default:
          return 0;
      }
    });

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilters({
      priceRange: [minPrice, maxPrice]
    });
    setSearchQuery('');
    setSortOptions({ field: 'price', direction: 'asc' });
  };

  return {
    filteredData: sortedAndFilteredData,
    filters,
    setFilters,
    sortOptions,
    setSortOptions,
    searchQuery,
    setSearchQuery,
    filterOptions: getFilterOptions,
    resetFilters,
    totalResults: data.length,
    filteredCount: sortedAndFilteredData.length
  };
};