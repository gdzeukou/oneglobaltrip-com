
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { packages } from '@/data/packages';

interface PackageSelectionStepProps {
  selectedPackage: string;
  customizations: string;
  onPackageChange: (packageId: string) => void;
  onCustomizationsChange: (customizations: string) => void;
}

const PackageSelectionStep = ({ 
  selectedPackage, 
  customizations, 
  onPackageChange, 
  onCustomizationsChange 
}: PackageSelectionStepProps) => {
  const [selectedPackages, setSelectedPackages] = React.useState<string[]>(
    selectedPackage ? [selectedPackage] : []
  );

  const handlePackageSelection = (packageId: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedPackages, packageId]
      : selectedPackages.filter(id => id !== packageId);
    
    setSelectedPackages(updated);
    // For backwards compatibility, pass the first selected package
    onPackageChange(updated[0] || '');
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold mb-4 block">Select the package(s) you're interested in:</Label>
        <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                id={pkg.id}
                checked={selectedPackages.includes(pkg.id)}
                onCheckedChange={(checked) => handlePackageSelection(pkg.id, checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor={pkg.id} className="cursor-pointer font-medium">{pkg.title}</Label>
                <p className="text-sm text-gray-600">{pkg.country} - {pkg.duration} - From ${pkg.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label htmlFor="customizations">Customization Requests</Label>
        <Textarea
          id="customizations"
          placeholder="Tell us about any special preferences, dietary requirements, or customizations you'd like..."
          value={customizations}
          onChange={(e) => onCustomizationsChange(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default PackageSelectionStep;
