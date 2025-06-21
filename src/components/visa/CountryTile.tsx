
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface CountryTileProps {
  name: string;
  image: string;
  type: 'short-stay' | 'long-stay';
}

const CountryTile = ({ name, image, type }: CountryTileProps) => {
  // Map country names to URL-friendly slugs
  const getCountrySlug = (countryName: string) => {
    const slugMap: { [key: string]: string } = {
      'Schengen Area': 'schengen',
      'United Kingdom': 'uk',
      'Canada': 'canada',
      'Brazil': 'brazil',
      'Nigeria e-Visa': 'nigeria',
      'Nigeria': 'nigeria',
      'India': 'india',
      'UAE (Dubai)': 'uae',
      'Portugal': 'portugal',
      'Norway': 'norway',
      'Denmark': 'denmark',
      'Finland': 'finland',
      'France': 'france',
      'Germany': 'germany',
      'Switzerland': 'switzerland'
    };
    return slugMap[countryName] || countryName.toLowerCase().replace(/\s+/g, '-');
  };

  const countrySlug = getCountrySlug(name);
  const href = `/visas/${type}/${countrySlug}`;

  return (
    <Link to={href}>
      <Card className="overflow-hidden hover-lift group cursor-pointer">
        <div className="relative h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold text-center px-4">{name}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CountryTile;
