
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Package {
  id: string;
  name: string;
  price: number;
}

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
  const packages: Package[] = [
    { id: '1', name: 'Paris + Santorini Escape', price: 2499 },
    { id: '2', name: 'London-Amsterdam Rail Adventure', price: 3299 },
    { id: '3', name: 'Swiss Alps Luxury Retreat', price: 4299 },
    { id: '4', name: 'Mediterranean Coast Explorer', price: 3899 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="package">Select Your Package</Label>
        <select
          id="package"
          className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          value={selectedPackage}
          onChange={(e) => onPackageChange(e.target.value)}
        >
          <option value="">Choose a package...</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} - From ${pkg.price.toLocaleString()}
            </option>
          ))}
        </select>
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
