
import { Button } from '@/components/ui/button';
import { Package } from '@/types/package';
import PackageCard from './PackageCard';

interface PackagesGridProps {
  packages: Package[];
  onClearFilters: () => void;
}

const PackagesGrid = ({ packages, onClearFilters }: PackagesGridProps) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
        
        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
            <Button onClick={onClearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesGrid;
