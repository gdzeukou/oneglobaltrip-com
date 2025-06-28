
import VisaCard from '@/components/common/VisaCard';
import { ROUTES } from '@/constants/routes';

const VisaGrid = () => {
  const primaryVisas = [
    {
      id: 'schengen',
      title: 'Schengen Short-Stay Visa',
      description: 'One visa, endless Euro-city hopping for up to 90 days.',
      processingTime: '10-15 days',
      price: '$193',
      features: [
        'Visit 27 European countries',
        'Stay up to 90 days',
        'Multiple entry allowed',
        'Fast processing available'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.SCHENGEN_SHORT_STAY_LANDING,
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      badge: 'Save $25 this month',
      popular: false
    },
    {
      id: 'uk',
      title: 'UK Short-Stay Visa',
      description: 'Be ready for Big Ben & cream tea in as little as 3 weeks.',
      processingTime: '15-20 days',
      price: '$480',
      features: [
        'Visit England, Scotland, Wales',
        'Stay up to 6 months',
        'Business or tourism',
        'Expert application review'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.UK_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
      badge: 'Most Popular',
      popular: true
    },
    {
      id: 'brazil',
      title: 'Brazil Short-Stay Visa',
      description: 'Samba through Rio or relax in Bahia—visa sorted.',
      processingTime: '7-10 days',
      price: '$175',
      features: [
        'Tourism and business',
        'Stay up to 90 days',
        'Fast processing',
        'Document assistance'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.BRAZIL_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center',
      badge: 'Fast Processing',
      popular: false
    },
    {
      id: 'india',
      title: 'India Visa',
      description: 'Witness the Taj, Kerala backwaters & more with zero hassle.',
      processingTime: '3-5 days',
      price: '$180',
      features: [
        'E-Visa available',
        'Tourism and business',
        'Quick online process',
        '30-day validity'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.INDIA_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center',
      badge: 'E-Visa Available',
      popular: false
    },
    {
      id: 'nigeria',
      title: 'Nigeria Visa (ETA/VFS)',
      description: 'We handle NIS forms & biometrics—just pack.',
      processingTime: '10-15 days',
      price: '$290',
      features: [
        'Full service support',
        'Biometrics assistance',
        'Document preparation',
        'Embassy liaison'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.NIGERIA_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center',
      badge: 'Full Service',
      popular: false
    },
    {
      id: 'uae',
      title: 'UAE Tourist Visa',
      description: 'Desert thrills to mall chills—get your e-visa fast.',
      processingTime: '2-3 days',
      price: '$250',
      features: [
        'E-Visa processing',
        '30-day tourist visa',
        'Quick approval',
        'Online application'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.UAE_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=center',
      badge: 'Quick Approval',
      popular: false
    },
    {
      id: 'canada',
      title: 'Canada Visa Short Stay',
      description: 'From Niagara Falls to Rocky Mountains—visa made simple.',
      processingTime: '20-30 days',
      price: '$300',
      features: [
        'Visitor visa',
        'Stay up to 6 months',
        'Expert support',
        'Document review'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.CANADA_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56cd928?w=800&h=600&fit=crop&crop=center',
      badge: 'Expert Support',
      popular: false
    }
  ];

  const schengenCountries = [
    {
      id: 'france',
      title: 'France Visa – Short Stay',
      description: 'Perfect for fashion week, croissants & Eiffel selfies.',
      processingTime: '10-15 days',
      price: '$193',
      features: [
        'Schengen area access',
        'Stay up to 90 days',
        'Tourism and business',
        'Fast processing'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.FRANCE_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 'netherlands',
      title: 'Netherlands Visa – Short Stay',
      description: 'Tulips, tech, and art in one smart visa.',
      processingTime: '10-15 days',
      price: '$193',
      features: [
        'Schengen area access',
        'Stay up to 90 days',
        'Tourism and business',
        'Fast processing'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.NETHERLANDS_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 'germany',
      title: 'Germany Visa – Short Stay',
      description: 'Oktoberfest or trade fairs—visa in record time.',
      processingTime: '10-15 days',
      price: '$193',
      features: [
        'Schengen area access',
        'Stay up to 90 days',
        'Tourism and business',
        'Fast processing'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.GERMANY_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 'denmark',
      title: 'Denmark Visa – Short Stay',
      description: 'Hygge, design, and pastries await.',
      processingTime: '10-15 days',
      price: '$193',
      features: [
        'Schengen area access',
        'Stay up to 90 days',
        'Tourism and business',
        'Fast processing'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.DENMARK_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 'sweden',
      title: 'Sweden Visa – Short Stay',
      description: 'Lapland lights to Stockholm startups—sorted.',
      processingTime: '10-15 days',
      price: '$193',
      features: [
        'Schengen area access',
        'Stay up to 90 days',
        'Tourism and business',
        'Fast processing'
      ],
      ctaText: 'Apply Now',
      ctaLink: ROUTES.SWEDEN_SHORT_STAY,
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=600&fit=crop&crop=center'
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
              title={visa.title}
              description={visa.description}
              processingTime={visa.processingTime}
              price={visa.price}
              features={visa.features}
              ctaText={visa.ctaText}
              ctaLink={visa.ctaLink}
              image={visa.image}
              badge={visa.badge}
              popular={visa.popular}
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
                title={country.title}
                description={country.description}
                processingTime={country.processingTime}
                price={country.price}
                features={country.features}
                ctaText={country.ctaText}
                ctaLink={country.ctaLink}
                image={country.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaGrid;
