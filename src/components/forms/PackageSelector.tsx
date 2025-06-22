
import React from 'react';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { packages } from '@/data/packages';

interface PackageSelectorProps {
  selectedPackages: string[];
  onPackageSelection: (packageId: string, checked: boolean) => void;
}

const PackageSelector = ({ selectedPackages, onPackageSelection }: PackageSelectorProps) => {
  return (
    <div>
      <Label className="text-lg font-semibold mb-4 block">Select the package(s) you're interested in: *</Label>
      
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
              selectedPackages.includes(pkg.id) ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
            onClick={() => onPackageSelection(pkg.id, !selectedPackages.includes(pkg.id))}
          >
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                $0 Down
              </div>
            </div>
            {selectedPackages.includes(pkg.id) && (
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              </div>
            )}
            <div className="aspect-video overflow-hidden">
              <img 
                src={pkg.image || `https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop`}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{pkg.title}</h3>
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {pkg.country} • {pkg.duration}
              </p>
              <p className="text-xl font-bold text-blue-900">From ${pkg.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto space-x-4 pb-4 mb-6">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl flex-shrink-0 w-72 ${
                selectedPackages.includes(pkg.id) ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              }`}
              onClick={() => onPackageSelection(pkg.id, !selectedPackages.includes(pkg.id))}
            >
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  $0 Down
                </div>
              </div>
              {selectedPackages.includes(pkg.id) && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    ✓
                  </div>
                </div>
              )}
              <div className="aspect-video overflow-hidden">
                <img 
                  src={pkg.image || `https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop`}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{pkg.title}</h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {pkg.country} • {pkg.duration}
                </p>
                <p className="text-xl font-bold text-blue-900">From ${pkg.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSelector;
