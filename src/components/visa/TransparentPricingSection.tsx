
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TransparentPricingSection = () => {
  const pricingTiers = [
    {
      title: "Short-Stay Visas",
      subtitle: "Perfect for tourism & business",
      price: "From $175",
      originalPrice: "$250",
      savings: "Save $75",
      features: [
        "Expert document review",
        "Fast 5-20 day processing",
        "100% approval guarantee",
        "24/7 priority support",
        "Multi-country planning"
      ],
      popular: false,
      gradient: "from-blue-50 to-indigo-50",
      accentColor: "blue"
    },
    {
      title: "Long-Stay & Work Visas",
      subtitle: "For extended stays & residency",
      price: "From $240",
      originalPrice: "$350",
      savings: "Save $110",
      features: [
        "Comprehensive documentation",
        "Immigration lawyer review",
        "Embassy appointment booking",
        "Interview preparation",
        "Residency pathway guidance"
      ],
      popular: true,
      gradient: "from-purple-50 to-pink-50",
      accentColor: "purple"
    },
    {
      title: "Express & Urgent",
      subtitle: "When you need it fast",
      price: "From $299",
      originalPrice: "$450",
      savings: "Save $151",
      features: [
        "Priority processing",
        "48-hour document review",
        "Express embassy slots",
        "Dedicated case manager",
        "Emergency support line"
      ],
      popular: false,
      gradient: "from-amber-50 to-orange-50",
      accentColor: "amber"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-amber-500 fill-current" />
            <h2 className="text-4xl font-bold text-gray-900">Transparent Pricing</h2>
            <Star className="w-6 h-6 text-amber-500 fill-current" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. Just honest pricing for world-class visa services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card key={index} className={`group relative bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl overflow-hidden ${tier.popular ? 'ring-2 ring-purple-200 ring-opacity-50' : ''}`}>
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Main content */}
              <div className="relative z-10">
                <CardHeader className="text-center pb-6 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                    {tier.title}
                  </CardTitle>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {tier.subtitle}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                        {tier.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {tier.originalPrice}
                      </span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      tier.accentColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                      tier.accentColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {tier.savings}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                          tier.accentColor === 'blue' ? 'text-blue-600' :
                          tier.accentColor === 'purple' ? 'text-purple-600' :
                          'text-amber-600'
                        } group-hover:scale-110 transition-transform duration-300`} />
                        <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    tier.accentColor === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' :
                    tier.accentColor === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' :
                    'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
                  } text-white`}>
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-700">Success Rate</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-700">Visas Processed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparentPricingSection;
