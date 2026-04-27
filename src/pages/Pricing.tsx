import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Globe, Shield, Users, Phone, Clock, TrendingUp, Award, Check, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PricingCard from '@/components/common/PricingCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { BOOKING_PLANS } from '@/data/bookingPlans';
import { BookingPlan } from '@/types/booking';

const Pricing = () => {
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlanSelect = (plan: BookingPlan) => {
    if (plan.contactSales) {
      window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank');
      return;
    }
    if (plan.id === 'free_ai_agent') navigate('/trip-planner');
    else if (plan.id === 'visa_assist') navigate('/visa-booking');
    else if (plan.id === 'global_explorer') navigate('/booking', { state: { selectedPlan: plan } });
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free_ai_agent': return Globe;
      case 'visa_assist': return Shield;
      case 'global_explorer': return TrendingUp;
      case 'enterprise_global_mobility': return Building2;
      default: return Globe;
    }
  };

  const getButtonText = (plan: BookingPlan) => {
    if (plan.contactSales) return 'Contact sales';
    if (plan.id === 'free_ai_agent') return 'Build my free AI agent';
    if (plan.id === 'visa_assist') return 'Get visa help — $69';
    return 'Upgrade to Global Explorer';
  };

  if (isLoading) return <LoadingScreen message="Loading pricing plans..." />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero — Stitch flat */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-5 gap-1 bg-verified-green/10 text-verified-green border-0">
              <Sparkles className="h-3 w-3" /> Explore the globe with one click
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              Your personal AI travel agent
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground">
              Create a free AI agent that manages everything — solo trips, group vacations, business travel, and relocation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate('/trip-planner')}>
                Build my free AI agent <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank')}>
                Enterprise demo
              </Button>
            </div>
          </div>

          {/* Feature row */}
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { icon: Globe,  title: 'Global exploration', body: '180+ countries. Instant itineraries, local insights.' },
              { icon: Users,  title: 'Group management',   body: 'From family trips to corporate travel at scale.' },
              { icon: Shield, title: 'Visa & residency',   body: 'Complex visas, residency programs — simplified.' },
            ].map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-card-border hover-elevate">
                <CardContent className="p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Choose your plan</h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
              From free AI-powered planning to enterprise-grade global mobility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {BOOKING_PLANS.filter(p => !p.enterprise).map((plan) => {
              const features = plan.features.map(f => ({ name: f, included: true }));
              return (
                <PricingCard
                  key={plan.id}
                  title={plan.name}
                  subtitle={plan.sla}
                  price={plan.price}
                  period={plan.sla.includes('Annual') ? '/year' : ''}
                  features={features}
                  badge={plan.badge}
                  badgeColor={plan.badgeColor}
                  popular={plan.popular}
                  enterprise={plan.enterprise}
                  contactSales={plan.contactSales}
                  customPrice={plan.customPrice}
                  onSelect={() => handlePlanSelect(plan)}
                  buttonText={getButtonText(plan)}
                />
              );
            })}
          </div>

          {/* Enterprise — flat, navy */}
          {BOOKING_PLANS.filter(p => p.enterprise).map((plan) => {
            const features = plan.features.map(f => ({ name: f, included: true }));
            return (
              <div key={plan.id} className="mx-auto max-w-5xl">
                <Card className="border-card-border bg-primary text-primary-foreground">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary-foreground/10">
                            <Building2 className="h-5 w-5" />
                          </span>
                          <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-0">Enterprise</Badge>
                        </div>
                        <h3 className="font-serif text-3xl font-semibold tracking-tight">{plan.name}</h3>
                        <p className="mt-2 text-primary-foreground/70">{plan.sla}</p>

                        <div className="mt-6 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                          <span className="font-serif text-3xl font-semibold">{plan.customPrice}</span>
                          <p className="mt-1 text-sm text-primary-foreground/70">Custom pricing for your organization</p>
                        </div>

                        <p className="mt-6 border-l-2 border-primary-foreground/30 pl-3 text-sm italic text-primary-foreground/80">
                          "We cut corporate travel chaos in half while boosting traveler satisfaction by 3×."
                        </p>

                        <Button onClick={() => handlePlanSelect(plan)} className="mt-6 w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                          {getButtonText(plan)}
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-semibold">Everything included</h4>
                        <ul className="mt-4 space-y-3">
                          {features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-verified-green" />
                              <span>{f.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partnerships */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Trusted industry partners</h3>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading partners to deliver seamless global mobility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Building2,  title: 'IATA',         body: 'Official airline industry partnership for seamless flight bookings and compliance.' },
              { icon: Globe,      title: 'Expedia Group',body: 'Global inventory access with competitive rates and instant confirmation.' },
              { icon: TrendingUp, title: 'SAP Concur',   body: 'Enterprise expense management integration for streamlined reporting.' },
            ].map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-card-border">
                <CardContent className="p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-card-border">
            <CardContent className="p-8 md:p-10 text-center">
              <h4 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Enterprise global mobility suite</h4>
              <p className="mt-3 text-base text-muted-foreground max-w-3xl mx-auto">
                Managing thousands of trips a year? Our enterprise platform combines visas, travel bookings, and compliance.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Button size="lg" onClick={() => window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank')}>
                  Contact sales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">15-minute consultation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Why leading companies choose us</h3>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl mx-auto">
              See how leading clients cut travel admin time by 60% using One Global Trip.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Users, title: 'Fortune 500 ready',  body: 'More powerful and reliable than competitors like Navan.' },
              { icon: Award, title: '98% success rate',   body: 'Proven track record with visas and travel management.' },
              { icon: Phone, title: '24/7 support',       body: 'Global reach with on-the-ground partners in 180+ countries.' },
            ].map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-card-border">
                <CardContent className="p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-3xl font-semibold tracking-tight text-foreground">Ready to transform your global mobility?</h3>
          <p className="mt-3 text-base text-muted-foreground">
            Let's design a solution that saves you time, money, and stress — at scale.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => window.open('https://calendly.com/oneglobaltrip/enterprise-consultation', '_blank')}>
              Contact sales <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/trip-planner')}>
              Try the free version
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
