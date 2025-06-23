
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import VisaPricingCard from './VisaPricingCard';
import { visaPricingData } from '@/data/visaPricing';

const TransparentPricingSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-xl text-gray-600">No hidden fees. See exactly what you pay for.</p>
        </div>

        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 xl:basis-1/3">
              <VisaPricingCard visaData={visaPricingData.schengenShortStay} />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 xl:basis-1/3">
              <VisaPricingCard visaData={visaPricingData.ukVisa6Month} />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 xl:basis-1/3">
              <VisaPricingCard visaData={visaPricingData.canadaEntry} />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 xl:basis-1/3">
              <VisaPricingCard visaData={visaPricingData.nigeriaVisa} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-8">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              const element = document.getElementById('main-cta-section');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View All Visa Services
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TransparentPricingSection;
