import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const featuredPosts = [
    {
      id: 1,
      title: 'Complete Guide to Schengen Visa Requirements 2024',
      excerpt: 'Everything you need to know about applying for a Schengen visa, from documents to processing times.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
      category: 'Visa Guides',
      readTime: '8 min read',
      date: 'Dec 15, 2024',
      featured: true
    },
    {
      id: 2,
      title: 'Top 10 European Destinations for First-Time Travelers',
      excerpt: 'Discover the must-visit European cities that offer the perfect blend of culture, history, and modern attractions.',
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=800&q=80',
      category: 'Travel Tips',
      readTime: '12 min read',
      date: 'Dec 12, 2024',
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: 'UK Visa Changes: What You Need to Know in 2024',
      excerpt: 'Recent updates to UK visa policies and how they affect your travel plans.',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
      category: 'Visa Updates',
      readTime: '6 min read',
      date: 'Dec 10, 2024'
    },
    {
      id: 4,
      title: 'Best Travel Insurance Options for International Trips',
      excerpt: 'Protect your investment with the right travel insurance coverage.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
      category: 'Travel Tips',
      readTime: '5 min read',
      date: 'Dec 8, 2024'
    },
    {
      id: 5,
      title: 'Digital Nomad Visa Options: Work While You Travel',
      excerpt: 'Explore countries offering digital nomad visas for remote workers.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
      category: 'Digital Nomad',
      readTime: '10 min read',
      date: 'Dec 5, 2024'
    },
    {
      id: 6,
      title: 'Packing Essentials for European Winter Travel',
      excerpt: 'Stay warm and stylish during your European winter adventure.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80',
      category: 'Travel Tips',
      readTime: '7 min read',
      date: 'Dec 3, 2024'
    },
    {
      id: 7,
      title: 'Student Visa Application Tips for European Universities',
      excerpt: 'Navigate the student visa process for studying in Europe.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      category: 'Student Visas',
      readTime: '9 min read',
      date: 'Nov 28, 2024'
    },
    {
      id: 8,
      title: 'Cultural Etiquette: Do\'s and Don\'ts in Different Countries',
      excerpt: 'Avoid cultural faux pas with our comprehensive etiquette guide.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
      category: 'Cultural Tips',
      readTime: '11 min read',
      date: 'Nov 25, 2024'
    }
  ];

  const categories = ['All', 'Visa Guides', 'Travel Tips', 'Visa Updates', 'Digital Nomad', 'Student Visas', 'Cultural Tips'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHeader
        title="Travel Blog & Guides"
        subtitle="Expert insights, tips, and guides for your global adventures"
        description="Stay updated with the latest visa requirements, travel tips, and destination guides from our team of experts."
        backgroundGradient="bg-gradient-to-br from-accent/20 via-background to-primary/10"
      />

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === 'All' ? 'default' : 'secondary'}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Featured Articles</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Recent Articles</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 text-xs bg-primary/90 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest travel tips, visa updates, and destination guides delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;