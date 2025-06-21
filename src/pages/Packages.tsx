
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackagesHero from '@/components/packages/PackagesHero';
import PackagesFilters from '@/components/packages/PackagesFilters';
import PackagesGrid from '@/components/packages/PackagesGrid';
import { packages, categories } from '@/data/packages';
import { usePackageFilters } from '@/hooks/usePackageFilters';

const Packages = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    filteredPackages,
    clearFilters
  } = usePackageFilters(packages);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <PackagesHero 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <PackagesFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      <PackagesGrid
        packages={filteredPackages}
        onClearFilters={clearFilters}
      />

      <Footer />
    </div>
  );
};

export default Packages;
