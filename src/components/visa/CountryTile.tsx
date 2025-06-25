
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
      'France': 'france',
      'Netherlands': 'netherlands', 
      'Italy': 'italy',
      'Greece': 'greece',
      'United Kingdom': 'uk',
      'UAE (Dubai)': 'uae',
      'Nigeria e-Visa': 'nigeria',
      'Nigeria': 'nigeria',
      'Canada': 'canada',
      'Brazil': 'brazil',
      'India': 'india',
      'Portugal': 'portugal',
      'Norway': 'norway',
      'Denmark': 'denmark',
      'Finland': 'finland',
      'Germany': 'germany',
      'Switzerland': 'switzerland'
    };
    
    return mapping[countryName] || countryName.toLowerCase().replace(/\s+/g, '-');
  };

  const countrySlug = getCountrySlug(name);
  const linkTo = `/visas/${type}/${countrySlug}`;

  const getCountryGradient = (countryName: string) => {
    const gradients: { [key: string]: string } = {
      'France': 'from-blue-600 via-white to-red-600',
      'Netherlands': 'from-red-600 via-white to-blue-600',
      'Italy': 'from-green-600 via-white to-red-600',
      'Greece': 'from-blue-600 to-white',
      'Schengen Area': 'from-blue-600 to-purple-600',
      'United Kingdom': 'from-blue-800 via-white to-red-600',
      'UAE (Dubai)': 'from-green-600 via-white to-red-600',
      'Nigeria': 'from-green-600 via-white to-green-600',
      'Canada': 'from-red-600 via-white to-red-600',  
      'Brazil': 'from-green-600 via-yellow-400 to-blue-600',
      'India': 'from-orange-500 via-white to-green-600'
    };
    
    return gradients[countryName] || 'from-slate-600 to-slate-700';
  };

  return (
    <Link to={linkTo} className="block">
      <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <div className="relative h-40">
          <div className={`w-full h-full bg-gradient-to-br ${getCountryGradient(name)} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
            <div className="absolute inset-0">
              <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/10 rounded-full blur-lg" />
            </div>
            <div className="relative z-10 text-center text-white">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-white drop-shadow-lg" />
              <h3 className="text-lg font-bold mb-1 drop-shadow-md">{name}</h3>
              <p className="text-white/90 text-sm capitalize font-medium">{type.replace('-', ' ')} Visa</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-slate-700 group-hover:text-blue-700 transition-colors">
            <span className="font-semibold">Apply Now</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryTile;
