
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CountryTileProps {
  name: string;
  image: string;
  type: 'short-stay' | 'long-stay';
}

const CountryTile = ({ name, image, type }: CountryTileProps) => {
  const getCountrySlug = (countryName: string) => {
    const mapping: { [key: string]: string } = {
      'Schengen Area': 'schengen',
      'United Kingdom': 'uk',
      'UAE (Dubai)': 'uae',
      'Nigeria e-Visa': 'nigeria',
      'Canada': 'canada',
      'Brazil': 'brazil',
      'India': 'india',
      'Portugal': 'portugal',
      'Norway': 'norway',
      'Denmark': 'denmark',
      'Finland': 'finland',
      'Nigeria': 'nigeria',
      'France': 'france',
      'Germany': 'germany',
      'Switzerland': 'switzerland'
    };
    
    return mapping[countryName] || countryName.toLowerCase().replace(/\s+/g, '-');
  };

  const countrySlug = getCountrySlug(name);
  const linkTo = `/visas/${type}/${countrySlug}`;

  return (
    <Link to={linkTo} className="block">
      <Card className="hover-lift overflow-hidden group cursor-pointer">
        <div className="relative h-40">
          <div className="w-full h-full bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-blue-700 flex items-center justify-center relative overflow-hidden group-hover:from-deep-blue-800 group-hover:to-blue-600 transition-all duration-300">
            <div className="absolute inset-0">
              <div className="absolute top-2 right-2 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl" />
              <div className="absolute bottom-2 left-2 w-12 h-12 bg-blue-400/10 rounded-full blur-lg" />
            </div>
            <div className="relative z-10 text-center text-white">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <h3 className="text-lg font-bold mb-1">{name}</h3>
              <p className="text-blue-200 text-sm capitalize">{type.replace('-', ' ')} Visa</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-blue-600 group-hover:text-blue-800 transition-colors">
            <span className="font-medium">Apply Now</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryTile;
