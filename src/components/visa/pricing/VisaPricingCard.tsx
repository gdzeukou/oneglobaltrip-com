import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';

interface VisaPricingCardProps {
  pkg: {
    name: string;
    price: string;
    description: string;
    features: string[];
    popular: boolean;
    badge?: string;
    badgeColor?: string;
  };
  index: number;
}

const VisaPricingCard = ({ pkg, index }: VisaPricingCardProps) => {
  return (
    <Card 
      className={`group relative transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden bg-white/90 backdrop-blur-sm ${
        pkg.popular 
          ? 'border-2 border-accent shadow-xl ring-2 ring-accent/20' 
          : 'border border-gray-200 hover:border-accent/50'
      } animate-scale-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {pkg.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`${pkg.badgeColor} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg animate-pulse`}>
            <Star className="h-4 w-4 mr-1" />
            {pkg.badge}
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pt-8 pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
          {pkg.name}
        </CardTitle>
        <div className="mb-4">
          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {pkg.price}
          </span>
          <span className="text-gray-600 ml-2">per application</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed px-2">{pkg.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0 pb-8 px-6">
        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start space-x-3 text-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <Button 
            className={`w-full font-semibold transition-all duration-300 ${
              pkg.popular 
                ? 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl' 
                : 'bg-primary hover:bg-primary/90 text-white'
            } group-hover:scale-105`}
            onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
          >
            Choose This Plan
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaPricingCard;