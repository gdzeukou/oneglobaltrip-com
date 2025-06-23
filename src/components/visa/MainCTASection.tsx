
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/ui/optimized-image';

const MainCTASection = () => {
  const navigate = useNavigate();

  const popularChoices = [
    {
      id: 'schengen',
      title: 'Schengen Visa Pack',
      subtitle: '27 European Countries',
      description: 'Access 27 European countries with a single visa application',
      price: 'from $193',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&crop=center',
      alt: 'European landmarks for Schengen visa',
      badge: 'POPULAR',
      badgeColor: 'bg-red-500',
      route: '/visas/short-stay/schengen'
    },
    {
      id: 'portugal',
      title: 'Portugal Long-Stay Visa',
      subtitle: 'Work, Study & Residence',
      description: 'Long-term visa for Portugal with comprehensive support',
      price: 'from $240',
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop&crop=center',
      alt: 'Portuguese architecture for Portugal visa',
      badge: 'TRENDING',
      badgeColor: 'bg-red-500',
      route: '/visas/long-stay/portugal'
    }
  ];

  return (
    <section id="main-cta-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Choices</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your visa application today with our most requested services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {popularChoices.map((choice) => (
            <Card key={choice.id} className="overflow-hidden hover-lift group cursor-pointer relative" onClick={() => navigate(choice.route)}>
              <div className="absolute top-4 right-4 z-10">
                <span className={`${choice.badgeColor} text-white px-3 py-1 text-sm font-bold rounded-full`}>
                  {choice.badge}
                </span>
              </div>
              <div className="relative h-48">
                <OptimizedImage
                  src={choice.image}
                  alt={choice.alt}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                  overlay
                  overlayColor="bg-black/20"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-blue-900">{choice.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{choice.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">{choice.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{choice.description}</p>
                <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                  Start Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Need help choosing? Our visa experts are here to guide you.
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
          >
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
