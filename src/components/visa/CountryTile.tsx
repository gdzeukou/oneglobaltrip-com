
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
          <img
            src={image}
            alt={`${name} visa`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
            <p className="text-white/90 text-sm capitalize">{type.replace('-', ' ')} Visa</p>
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

