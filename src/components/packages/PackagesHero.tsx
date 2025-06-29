
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface PackagesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PackagesHero: React.FC<PackagesHeroProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Travel Packages</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Discover amazing destinations with our curated travel packages. 
          Complete visa assistance, flights, accommodations, and unforgettable experiences.
        </p>
        
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search destinations, packages..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 py-3 text-lg bg-white text-gray-900"
          />
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;
