
import VisaPricingCard from './VisaPricingCard';
import { visaPricingData } from '@/data/visaPricing';

interface CountrySpecificPricingProps {
  country: keyof typeof visaPricingData;
  title?: string;
  description?: string;
}

const CountrySpecificPricing = ({ 
  country, 
  title = "Visa Pricing", 
  description = "Transparent pricing with no hidden fees" 
}: CountrySpecificPricingProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{description}</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <VisaPricingCard visaData={visaPricingData[country]} />
        </div>
      </div>
    </section>
  );
};

export default CountrySpecificPricing;
