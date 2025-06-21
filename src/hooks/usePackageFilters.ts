
import { useState, useMemo } from 'react';
import { Package } from '@/types/package';

export const usePackageFilters = (packages: Package[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'under-3000' && pkg.price < 3000) ||
                          (priceRange === '3000-4000' && pkg.price >= 3000 && pkg.price < 4000) ||
                          (priceRange === 'over-4000' && pkg.price >= 4000);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [packages, searchTerm, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    filteredPackages,
    clearFilters
  };
};
