
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Coffee, Wine, Utensils, DollarSign, Star, Plus, MapPin, Waves } from 'lucide-react';

interface AddOn {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  isRecommended?: boolean;
}

const OptionalAddOns = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const addOns: AddOn[] = [
    {
      id: 'versailles-trip',
      icon: MapPin,
      title: 'Palace of Versailles Day Trip',
      description: 'Full-day guided tour of the magnificent Palace and Gardens of Versailles with transportation included',
      price: 'Add $89 per person',
      isFree: false,
      isRecommended: true
    },
    {
      id: 'seine-dinner-cruise',
      icon: Waves,
      title: 'Seine River Dinner Cruise',
      description: 'Romantic 3-course dinner cruise along the Seine with live music and champagne',
      price: 'Add $125 per person',
      isFree: false,
      isRecommended: true
    },
    {
      id: 'cafe-stop',
      icon: Coffee,
      title: 'Classic Parisian Café Stop',
      description: 'Enjoy coffee & a croissant at a historic café near the Eiffel Tower',
      price: 'Add $20 per person',
      isFree: false
    },
    {
      id: 'wine-cheese',
      icon: Wine,
      title: 'Wine & Cheese Pairing Experience',
      description: 'Hosted at a charming local wine cellar in Saint-Germain-des-Prés',
      price: 'Add $45 per person',
      isFree: false
    },
    {
      id: 'dinner-recommendation',
      icon: Utensils,
      title: 'Restaurant Recommendations (Free Concierge)',
      description: 'We suggest 3 top-rated restaurants based on your taste and budget',
      price: 'Free – reservation handled by client',
      isFree: true
    },
    {
      id: 'tipping-guide',
      icon: DollarSign,
      title: 'Local Tipping Guide',
      description: 'Included automatically with your booking confirmation',
      price: 'Free',
      isFree: true
    }
  ];

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-3">
            <Star className="h-6 w-6 text-amber-500 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Optional Add-Ons
            </h2>
          </div>
          <p className="text-lg text-slate-600 font-medium">
            Enhance Your Paris Experience
          </p>
          <p className="text-base text-slate-500 mt-1 max-w-2xl mx-auto">
            Carefully curated extras to make your trip unforgettable
          </p>
        </div>

        <div className="grid gap-4">
          {addOns.map((addOn) => {
            const IconComponent = addOn.icon;
            const isSelected = selectedAddOns.includes(addOn.id);
            
            return (
              <Card 
                key={addOn.id} 
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-2 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${addOn.isRecommended ? 'ring-2 ring-amber-200' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      addOn.isFree 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight">
                            {addOn.title}
                          </h3>
                          {addOn.isRecommended && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs font-medium">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-base text-slate-600 mb-3 leading-relaxed">
                        {addOn.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className={`text-base font-bold ${
                          addOn.isFree ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {addOn.price}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={addOn.id}
                            checked={isSelected}
                            onCheckedChange={() => handleAddOnToggle(addOn.id)}
                            className="h-4 w-4"
                          />
                          <label 
                            htmlFor={addOn.id}
                            className="text-sm font-medium text-slate-700 cursor-pointer select-none"
                          >
                            Add to My Package
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        {selectedAddOns.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow-lg border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Selected Add-Ons ({selectedAddOns.length})
                </h3>
                <p className="text-base text-slate-600">
                  Your selections will be included in the final booking
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-bold text-blue-600">
                  Enhanced Experience
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OptionalAddOns;
