import VisaCard from '@/components/common/VisaCard';
import { ROUTES } from '@/constants/routes';

const VisaGrid = () => {
  const primaryVisas = [
    {
      id: 'schengen',
      name: 'Schengen Short-Stay Visa',
      tagline: 'Hop across 27 countries',
      description: 'One visa, endless Euro-city hopping for up to 90 days.',
      price: 193,
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      promo: 'Save $25 this month',
      route: ROUTES.SCHENGEN_SHORT_STAY_LANDING
    },
    {
      id: 'uk',
      name: 'UK Short-Stay Visa',
      tagline: 'Fast-track London trip',
      description: 'Be ready for Big Ben & cream tea in as little as 3 weeks.',
      price: 480,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
      promo: 'Most Popular',
      route: ROUTES.UK_SHORT_STAY
    },
    {
      id: 'brazil',
      name: 'Brazil Short-Stay Visa',
      tagline: 'Carnaval ready',
      description: 'Samba through Rio or relax in Bahia—visa sorted.',
      price: 175,
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center',
      promo: 'Fast Processing',
      route: ROUTES.BRAZIL_SHORT_STAY
    },
    {
      id: 'india',
      name: 'India Visa',
      tagline: 'Spice-route adventure',
      description: 'Witness the Taj, Kerala backwaters & more with zero hassle.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center',
      promo: 'E-Visa Available',
      route: ROUTES.INDIA_SHORT_STAY
    },
    {
      id: 'nigeria',
      name: 'Nigeria Visa (ETA/VFS)',
      tagline: 'Lagos in 10 days',
      description: 'We handle NIS forms & biometrics—just pack.',
      price: 290,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center',
      promo: 'Full Service',
      route: ROUTES.NIGERIA_SHORT_STAY
    },
    {
      id: 'uae',
      name: 'UAE Tourist Visa',
      tagline: 'Dubai weekend?',
      description: 'Desert thrills to mall chills—get your e-visa fast.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=center',
      promo: 'Quick Approval',
      route: ROUTES.UAE_SHORT_STAY
    },
    {
      id: 'canada',
      name: 'Canada Visa Short Stay',
      tagline: 'Maple leaf adventure',
      description: 'From Niagara Falls to Rocky Mountains—visa made simple.',
      price: 300,
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56cd928?w=800&h=600&fit=crop&crop=center',
      promo: 'Expert Support',
      route: ROUTES.CANADA_SHORT_STAY
    }
  ];

  const schengenCountries = [
    {
      id: 'france',
      name: 'France Visa – Short Stay',
      tagline: 'Bonjour Paris!',
      description: 'Perfect for fashion week, croissants & Eiffel selfies.',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      route: ROUTES.FRANCE_SHORT_STAY,
      price: 193
    },
    {
      id: 'netherlands',
      name: 'Netherlands Visa – Short Stay',
      tagline: 'Canals & cycling',
      description: 'Tulips, tech, and art in one smart visa.',
      image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&h=600&fit=crop&crop=center',
      route: ROUTES.NETHERLANDS_SHORT_STAY,
      price: 193
    },
    {
      id: 'germany',
      name: 'Germany Visa – Short Stay',
      tagline: 'Beer & business',
      description: 'Oktoberfest or trade fairs—visa in record time.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&crop=center',
      route: ROUTES.GERMANY_SHORT_STAY,
      price: 193
    },
    {
      id: 'denmark',
      name: 'Denmark Visa – Short Stay',
      tagline: 'Happiest nation trip',
      description: 'Hygge, design, and pastries await.',
      image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop&crop=center',
      route: ROUTES.DENMARK_SHORT_STAY,
      price: 193
    },
    {
      id: 'sweden',
      name: 'Sweden Visa – Short Stay',
      tagline: 'Nordic cool',
      description: 'Lapland lights to Stockholm startups—sorted.',
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=600&fit=crop&crop=center',
      route: ROUTES.SWEDEN_SHORT_STAY,
      price: 193
    }
  ];

  return (
    <section id="visa-cards" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Popular Short-Stay Destinations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {primaryVisas.map((visa) => (
            <VisaCard
              key={visa.id}
              {...visa}
              size="medium"
            />
          ))}
        </div>

        {/* Popular Schengen Countries */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Popular Schengen Countries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {schengenCountries.map((country) => (
              <VisaCard
                key={country.id}
                {...country}
                size="small"
                showDetails={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaGrid;
