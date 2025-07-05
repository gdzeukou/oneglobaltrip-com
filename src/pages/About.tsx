import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Globe, HeartHandshake } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHeader
        title="About One Global Trip"
        subtitle="Your trusted partner in making travel dreams come true"
        description="Since our founding, we've been dedicated to providing exceptional visa services and unforgettable travel experiences to thousands of satisfied customers worldwide."
        backgroundGradient="bg-gradient-to-br from-primary/10 via-background to-accent/10"
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To simplify global travel by providing expert visa services and personalized travel solutions that turn your travel dreams into reality.
              </p>
              <p className="text-muted-foreground">
                We believe that everyone deserves to explore the world without the stress of complex visa processes. That's why we've made it our mission to handle the paperwork while you focus on planning your adventure.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration and global travel planning"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, number: '10,000+', label: 'Happy Customers' },
              { icon: Award, number: '99%', label: 'Success Rate' },
              { icon: Globe, number: '50+', label: 'Countries Served' },
              { icon: HeartHandshake, number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Our Expert Team</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Our dedicated professionals bring years of experience in visa services and travel planning to help you every step of the way.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Visa Services Director',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=300&q=80',
                description: '10+ years in immigration law and visa processing'
              },
              {
                name: 'Michael Chen',
                role: 'Travel Experience Manager',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
                description: 'Expert in creating personalized travel experiences'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Customer Success Lead',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
                description: 'Dedicated to ensuring every customer journey is perfect'
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied travelers who trusted us with their visa needs and travel dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;