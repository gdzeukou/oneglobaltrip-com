
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Coffee, Wine, Utensils, DollarSign, Star, Plus } from 'lucide-react';

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
      id: 'cafe-stop',
      icon: Coffee,
      title: 'Classic Parisian Café Stop',
      description: 'Enjoy coffee & a croissant at a historic café near the Eiffel Tower',
      price: 'Add $20 per person',
      isFree: false,
      isRecommended: true
    },
    {
      id: 'wine-cheese',
      icon: Wine,
      title: 'Wine & Cheese Pairing Experience',
      description: 'Hosted at a charming local wine cellar in Saint-Germain-des-Prés',
      price: 'Add $45 per person',
      isFree: false,
      isRecommended: true
    },
    {
      id: 'dinner-recommendation',
      icon: Utensils,
      title: 'Romantic Dinner Recommendation (Free Concierge Option)',
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Optional Add-Ons
            </h2>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            (Highly Recommended)
          </p>
          <p className="text-lg text-slate-500 mt-2 max-w-2xl mx-auto">
            Enhance your Paris experience with these carefully curated extras
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
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
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      addOn.isFree 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <IconComponent className="h-8 w-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                            {addOn.title}
                          </h3>
                          {addOn.isRecommended && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-sm font-medium">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                        {addOn.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className={`text-lg font-bold ${
                          addOn.isFree ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {addOn.price}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={addOn.id}
                            checked={isSelected}
                            onCheckedChange={() => handleAddOnToggle(addOn.id)}
                            className="h-6 w-6"
                          />
                          <label 
                            htmlFor={addOn.id}
                            className="text-lg font-medium text-slate-700 cursor-pointer select-none"
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
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Selected Add-Ons ({selectedAddOns.length})
                </h3>
                <p className="text-lg text-slate-600">
                  Your selections will be included in the final booking
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Plus className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  Enhanced Experience
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">
              Ready to Enhance Your Paris Adventure?
            </h3>
            <p className="text-lg opacity-90">
              These add-ons are designed to create unforgettable memories and provide authentic Parisian experiences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionalAddOns;
