
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackagesCarousel from '@/components/packages/PackagesCarousel';
import FeaturedPackages from '@/components/packages/FeaturedPackages';
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
      
      <div className="container mx-auto px-4 py-8">
        <PackagesCarousel />
      </div>

      <FeaturedPackages packages={packages} />

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
