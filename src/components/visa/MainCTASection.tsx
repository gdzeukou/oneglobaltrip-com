import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
const MainCTASection = () => {
  const navigate = useNavigate();
  const popularChoices = [{
    id: 'schengen',
    title: 'Schengen Visa Pack',
    subtitle: '27 European Countries',
    description: 'Access 27 European countries with a single visa application. Perfect for exploring multiple destinations.',
    price: 'from $193',
    image: '/lovable-uploads/a70031da-92cd-4c64-bc4e-e490944cd7aa.png',
    alt: 'European Union flag waving in front of classical European architecture',
    badge: 'POPULAR',
    badgeColor: 'bg-red-500',
    route: '/visas/short-stay/schengen',
    features: ['90-day validity', 'Multiple entries', 'Fast processing']
  }, {
    id: 'portugal',
    title: 'Portugal Long-Stay Visa',
    subtitle: 'Work, Study & Residence',
    description: 'Long-term visa for Portugal with comprehensive support for work permits and residency applications.',
    price: 'from $240',
    image: '/lovable-uploads/9c32b030-f008-4022-995f-0151ebec23ae.png',
    alt: 'Beautiful view of Portuguese architecture and cityscape from historic window',
    badge: 'TRENDING',
    badgeColor: 'bg-green-500',
    route: '/visas/long-stay/portugal',
    features: ['Work authorization', 'Path to residency', 'Family inclusion']
  }];
  return <section id="main-cta-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 font-extrabold">Priority Visa Guidance</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your visa application today with our most requested services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {popularChoices.map((choice, index) => <Card key={choice.id} className="overflow-hidden hover-lift group cursor-pointer relative card-hover animate-scale-in" style={{
          animationDelay: `${index * 0.2}s`
        }} onClick={() => navigate(choice.route)}>
              <div className="absolute top-4 right-4 z-10">
                <span className={`${choice.badgeColor} text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg`}>
                  {choice.badge}
                </span>
              </div>
              <div className="relative h-48 overflow-hidden">
                <img src={choice.image} alt={choice.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex flex-wrap gap-2">
                    {choice.features.map((feature, idx) => <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                        {feature}
                      </span>)}
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-deep-blue-900">{choice.title}</CardTitle>
                    <p className="text-gray-600 text-sm font-medium">{choice.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-deep-blue-900">{choice.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{choice.description}</p>
                <Button className="w-full bg-gradient-to-r from-deep-blue-900 to-deep-blue-800 hover:from-deep-blue-800 hover:to-deep-blue-700 shadow-lg hover-lift">
                  Start Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>)}
        </div>

        <div className="text-center animate-fade-in" style={{
        animationDelay: '0.5s'
      }}>
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Need help choosing the right visa? Our experts have processed over 10,000 successful applications.
            </p>
            <Button size="lg" variant="outline" className="border-deep-blue-800 text-deep-blue-800 hover:bg-deep-blue-800 hover:text-white shadow-lg hover-lift" onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}>
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default MainCTASection;