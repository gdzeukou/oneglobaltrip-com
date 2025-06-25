
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { useLocationDetection } from '@/hooks/useLocationDetection';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { AnimatedSection } from '@/components/ui/animated-section';

interface VisaRecommendation {
  country: string;
  type: 'short-stay' | 'long-stay';
  duration: string;
  basePrice: number;
  processing: string;
  popularity: number;
  flag: string;
  benefits: string[];
  href: string;
}

const getRecommendations = (userCountry: string): VisaRecommendation[] => {
  const allRecommendations: VisaRecommendation[] = [
    {
      country: 'Schengen Area',
      type: 'short-stay',
      duration: '90 days',
      basePrice: 299,
      processing: '7-14 days',
      popularity: 95,
      flag: '🇪🇺',
      benefits: ['26 countries access', 'No border checks', 'Multiple entry'],
      href: '/visas/short-stay/schengen'
    },
    {
      country: 'United Kingdom',
      type: 'short-stay',
      duration: '6 months',
      basePrice: 399,
      processing: '10-15 days',
      popularity: 88,
      flag: '🇬🇧',
      benefits: ['6-month validity', 'Multiple entry', 'Fast processing'],
      href: '/visas/short-stay/uk'
    },
    {
      country: 'Canada',
      type: 'short-stay',
      duration: '6 months',
      basePrice: 249,
      processing: '5-10 days',
      popularity: 92,
      flag: '🇨🇦',
      benefits: ['10-year validity', 'Multiple entry', 'Online application'],
      href: '/visas/short-stay/canada'
    },
    {
      country: 'Portugal',
      type: 'long-stay',
      duration: '1-2 years',
      basePrice: 899,
      processing: '60-90 days',
      popularity: 85,
      flag: '🇵🇹',
      benefits: ['EU residency', 'Work permit included', 'Path to citizenship'],
      href: '/visas/long-stay/portugal'
    }
  ];

  // Customize recommendations based on user's country
  if (userCountry === 'Nigeria') {
    return allRecommendations.filter(rec => 
      ['Schengen Area', 'United Kingdom', 'Canada'].includes(rec.country)
    );
  }
  
  if (userCountry === 'India') {
    return allRecommendations.filter(rec => 
      ['Schengen Area', 'Canada', 'Portugal'].includes(rec.country)
    );
  }

  return allRecommendations.slice(0, 3);
};

export const VisaRecommendations = () => {
  const { country, countryCode, currency, isLoading: locationLoading } = useLocationDetection();
  const { convert, isLoading: ratesLoading } = useCurrencyConverter();
  
  if (locationLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const recommendations = getRecommendations(country);

  return (
    <AnimatedSection className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-4"
          >
            <MapPin className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-lg text-gray-600">
              Detected location: {country} {countryCode && `(${countryCode})`}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recommended Visas For You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your location and travel patterns, here are the best visa options
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.country}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full" hover gradient>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{rec.flag}</div>
                  <h3 className="text-xl font-bold text-gray-900">{rec.country}</h3>
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(rec.popularity / 20) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{rec.popularity}% popular</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{rec.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Processing:</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-600 mr-1" />
                      <span className="font-semibold">{rec.processing}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price:</span>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="font-bold text-lg">
                        {!ratesLoading && currency !== 'USD' 
                          ? `${Math.round(convert(rec.basePrice, 'USD', currency))} ${currency}`
                          : `$${rec.basePrice} USD`
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {rec.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <PremiumButton 
                  className="w-full" 
                  glow 
                  onClick={() => window.location.href = rec.href}
                >
                  Apply Now
                </PremiumButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default VisaRecommendations;
