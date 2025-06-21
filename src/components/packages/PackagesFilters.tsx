
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/types/package';

interface PackagesFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
}

const PackagesFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange
}: PackagesFiltersProps) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-5 w-full md:w-auto">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <select
            value={priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Prices</option>
            <option value="under-3000">Under $3,000</option>
            <option value="3000-4000">$3,000 - $4,000</option>
            <option value="over-4000">Over $4,000</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default PackagesFilters;
