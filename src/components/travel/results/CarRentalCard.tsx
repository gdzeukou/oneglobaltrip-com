import React, { useState } from 'react';
import { Car, Users, Luggage, Fuel, Settings, Shield, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

export interface CarRentalResult {
  id: string;
  provider: {
    name: string;
    logo?: string;
  };
  vehicle: {
    category: string;
    model: string;
    brand: string;
    image?: string;
    passengers: number;
    luggage: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: string;
    doors: number;
    airConditioning: boolean;
  };
  pickup: {
    location: string;
    address: string;
    date: string;
    time: string;
  };
  dropoff: {
    location: string;
    address: string;
    date: string;
    time: string;
  };
  pricing: {
    dailyRate: number;
    weeklyRate?: number;
    totalDays: number;
    basePrice: number;
    taxes: number;
    fees: number;
    totalPrice: number;
    currency: string;
  };
  insurance: Array<{
    type: string;
    description: string;
    dailyPrice: number;
    included: boolean;
  }>;
  inclusions: string[];
  mileage: {
    type: 'Unlimited' | 'Limited';
    limit?: number;
  };
}

interface CarRentalCardProps {
  car: CarRentalResult;
  onSelect: (car: CarRentalResult) => void;
  onCompare?: (car: CarRentalResult) => void;
  isSelected?: boolean;
  isComparing?: boolean;
}

const CarRentalCard: React.FC<CarRentalCardProps> = ({
  car,
  onSelect,
  onCompare,
  isSelected = false,
  isComparing = false
}) => {
  const [showInsurance, setShowInsurance] = useState(false);
  const [pricingView, setPricingView] = useState<'daily' | 'weekly' | 'total'>('daily');

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrentPrice = () => {
    switch (pricingView) {
      case 'daily':
        return car.pricing.dailyRate;
      case 'weekly':
        return car.pricing.weeklyRate || car.pricing.dailyRate * 7;
      case 'total':
        return car.pricing.totalPrice;
      default:
        return car.pricing.dailyRate;
    }
  };

  const getPriceLabel = () => {
    switch (pricingView) {
      case 'daily':
        return 'per day';
      case 'weekly':
        return 'per week';
      case 'total':
        return `total (${car.pricing.totalDays} days)`;
      default:
        return 'per day';
    }
  };

  return (
    <Card className={`group hover:shadow-elegant transition-all duration-300 ${
      isSelected ? 'ring-2 ring-primary shadow-glow' : ''
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {car.provider.logo ? (
              <img 
                src={car.provider.logo} 
                alt={car.provider.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                <Car className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground">{car.provider.name}</h3>
              <p className="text-sm text-muted-foreground">{car.vehicle.category}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPricingView('daily')}
                className={pricingView === 'daily' ? 'bg-muted' : ''}
              >
                Daily
              </Button>
              {car.pricing.weeklyRate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPricingView('weekly')}
                  className={pricingView === 'weekly' ? 'bg-muted' : ''}
                >
                  Weekly
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPricingView('total')}
                className={pricingView === 'total' ? 'bg-muted' : ''}
              >
                Total
              </Button>
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatPrice(getCurrentPrice(), car.pricing.currency)}
            </div>
            <div className="text-sm text-muted-foreground">{getPriceLabel()}</div>
          </div>
        </div>

        {/* Vehicle Image and Details */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            {car.vehicle.image && (
              <div className="h-24 mb-3">
                <img
                  src={car.vehicle.image}
                  alt={`${car.vehicle.brand} ${car.vehicle.model}`}
                  className="h-full w-auto object-contain mx-auto"
                />
              </div>
            )}
            <div className="text-center">
              <h4 className="font-medium text-foreground">{car.vehicle.brand} {car.vehicle.model}</h4>
              <p className="text-sm text-muted-foreground">or similar</p>
            </div>
          </div>
        </div>

        {/* Vehicle Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{car.vehicle.passengers} passengers</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Luggage className="w-4 h-4 text-muted-foreground" />
            <span>{car.vehicle.luggage} bags</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span>{car.vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Fuel className="w-4 h-4 text-muted-foreground" />
            <span>{car.vehicle.fuelType}</span>
          </div>
        </div>

        {/* Pickup and Drop-off */}
        <div className="mb-4 space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-foreground">Pick-up: {car.pickup.location}</div>
              <div className="text-muted-foreground">{car.pickup.address}</div>
              <div className="text-muted-foreground">
                {formatDate(car.pickup.date)} at {car.pickup.time}
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-foreground">Drop-off: {car.dropoff.location}</div>
              <div className="text-muted-foreground">{car.dropoff.address}</div>
              <div className="text-muted-foreground">
                {formatDate(car.dropoff.date)} at {car.dropoff.time}
              </div>
            </div>
          </div>
        </div>

        {/* Inclusions */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {car.inclusions.map((inclusion, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {inclusion}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {car.mileage.type} mileage
            </Badge>
          </div>
        </div>

        {/* Insurance Options */}
        <Collapsible open={showInsurance} onOpenChange={setShowInsurance}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between mb-2">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Insurance Options</span>
              </span>
              <span className="text-xs">
                {showInsurance ? 'Hide' : 'Show'}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mb-4">
            {car.insurance.map((insurance, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{insurance.type}</span>
                  <div className="flex items-center space-x-2">
                    {insurance.included ? (
                      <Badge variant="secondary" className="text-xs">Included</Badge>
                    ) : (
                      <span className="text-sm font-medium">
                        +{formatPrice(insurance.dailyPrice, car.pricing.currency)}/day
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{insurance.description}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Breakdown */}
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Base rate ({car.pricing.totalDays} days)</span>
              <span>{formatPrice(car.pricing.basePrice, car.pricing.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & fees</span>
              <span>{formatPrice(car.pricing.taxes + car.pricing.fees, car.pricing.currency)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(car.pricing.totalPrice, car.pricing.currency)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={() => onSelect(car)}
            className="flex-1"
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? 'Selected' : 'Select Car'}
          </Button>
          
          {onCompare && (
            <Button 
              onClick={() => onCompare(car)}
              variant="ghost"
              size="sm"
              className={isComparing ? 'bg-secondary' : ''}
            >
              {isComparing ? 'Remove' : 'Compare'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarRentalCard;