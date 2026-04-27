import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

const channels = [
  { icon: Phone,         title: 'Phone Support',  primary: '+1 877 622-7278',         secondary: 'Available for any matters' },
  { icon: Mail,          title: 'Email Support',  primary: 'booking@oneglobaltrip.com', secondary: 'Response within 2–4 hours' },
  { icon: Clock,         title: 'Business Hours', primary: 'Mon – Fri · 9am – 6pm EST', secondary: 'Weekend support available' },
  { icon: MessageCircle, title: 'Live Chat',      primary: 'Available on the site',     secondary: 'Instant during business hours' },
];

const Contact = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero — Stitch flat */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
          <Badge variant="secondary" className="mb-4 bg-verified-green/10 text-verified-green border-0">
            <ShieldCheck className="mr-1 h-3 w-3" /> Trusted by 10,000+ travelers
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Get in touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            Our travel experts are here to help with visas, packages, and itinerary planning.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}>
              <Calendar className="mr-2 h-4 w-4" /> Book a free consultation
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+18776227278"><Phone className="mr-2 h-4 w-4" /> +1 877 622-7278</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Channels */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Contact information</h2>
                <p className="mt-2 text-sm text-muted-foreground">Pick the channel that works best for you.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {channels.map(({ icon: Icon, title, primary, secondary }) => (
                  <Card key={title} className="border-card-border hover-elevate">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-serif font-semibold text-foreground">{title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm font-medium text-foreground">{primary}</p>
                      <p className="text-xs text-muted-foreground">{secondary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">Send a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll get back within a few hours.</p>
              <Card className="mt-6 border-card-border">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input id="contact-name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input id="contact-phone" type="tel" placeholder="Your phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea id="contact-message" rows={5} placeholder="How can we help?" />
                  </div>
                  <Button className="w-full">
                    Send message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — flat, brand-aligned */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            Ready for your next adventure?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join 10,000+ travelers who trusted us with their plans.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-left">
            {[
              { icon: Calendar, title: 'Free consultation', body: 'Tailored expert advice' },
              { icon: MapPin,   title: 'Worldwide reach',   body: 'Exclusive global access' },
              { icon: ShieldCheck, title: 'Verified service', body: '24/7 support, end-to-end' },
            ].map(({ icon: Icon, title, body }) => (
              <Card key={title} className="border-card-border">
                <CardContent className="p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-serif text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}>
              <Calendar className="mr-2 h-4 w-4" /> Start planning today
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:+18776227278"><Phone className="mr-2 h-4 w-4" /> Call now</a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No hidden fees · Instant booking confirmation · Best price guarantee
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
