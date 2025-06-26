
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
            <Card key={index} className={`relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.title}
                </CardTitle>
                <p className="text-gray-600 mb-6">
                  {tier.subtitle}
                </p>
                
                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {tier.originalPrice}
                    </span>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {tier.savings}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Success Rate</div>
            </div>
            <div className="text-center bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-700 font-medium">Visas Processed</div>
            </div>
            <div className="text-center bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparentPricingSection;
