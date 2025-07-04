
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VisaCardProps {
  title: string;
  description: string;
  processingTime: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  image?: string;
  badge?: string;
  popular?: boolean;
  showEuroFlag?: boolean;
}

const VisaCard = ({ 
  title, 
  description, 
  processingTime, 
  price, 
  features, 
  ctaText, 
  ctaLink,
  image,
  badge,
  popular = false,
  showEuroFlag = false
}: VisaCardProps) => {
  return (
    <Card className={`relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
      popular ? 'ring-2 ring-amber-400 shadow-amber-100/50' : ''
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </span>
        </div>
      )}
      
      {/* Hero Image Section */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {showEuroFlag && (
            <img 
              src="/lovable-uploads/f3204ae7-860b-465a-bfd2-4d6fb469bd17.png"
              alt="European Union Flag"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}
          {badge && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        {/* Title and Description */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Processing Time */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">
            Processing: <span className="font-semibold text-green-600">{processingTime}</span>
          </span>
        </div>

        {/* Price */}
        <div className="border-t border-gray-100 pt-4">
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-500 text-sm ml-1">per application</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button 
            asChild 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg group"
          >
            <Link to={ctaLink} className="flex items-center justify-center space-x-2">
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaCard;
