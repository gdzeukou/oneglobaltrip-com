
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface CountryTileProps {
  name: string;
  image: string;
  type: 'short-stay' | 'long-stay';
}

const CountryTile = ({ name, image, type }: CountryTileProps) => {
  const handleClick = () => {
    const element = document.getElementById('visa-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Link to={`/visas/${type}?country=${encodeURIComponent(name)}`}>
      <Card className="overflow-hidden hover-lift group cursor-pointer" onClick={handleClick}>
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
