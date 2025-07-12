import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAgent } from '@/hooks/useUserAgent';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Calendar, Users, PlaneTakeoff, Bot } from 'lucide-react';

const StartMyTrip = () => {
  const navigate = useNavigate();
  const { agent } = useUserAgent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destinations: [],
    travelType: '',
    budget: '',
    duration: '',
    travelers: '',
    interests: [],
    specialRequests: ''
  });

  const destinations = [
    'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Greece',
    'Portugal', 'Switzerland', 'Austria', 'Belgium', 'Denmark', 'Sweden'
  ];

  const interests = [
    'Cultural Sites', 'Museums', 'Food & Wine', 'Shopping', 'Nightlife',
    'Adventure', 'Nature', 'History', 'Art', 'Architecture', 'Beaches'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data and navigate to AI Travel Agent chat
    localStorage.setItem('tripPlanningData', JSON.stringify(formData));
    navigate('/ai-chat');
  };

  const handleDestinationChange = (destination: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      destinations: checked 
        ? [...prev.destinations, destination]
        : prev.destinations.filter(d => d !== destination)
    }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Let's Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your travel dreams with us, and your AI Travel Agent will create personalized recommendations just for you.
            </p>
          </div>

          {/* Form */}
          <Card className="card-luxury">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <PlaneTakeoff className="h-6 w-6 mr-3 text-accent" />
                Tell Us About Your Dream Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Travel Type *</Label>
                    <Select value={formData.travelType} onValueChange={(value) => setFormData(prev => ({ ...prev, travelType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leisure">Leisure / Tourism</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="family">Family Visit</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Number of Travelers *</Label>
                    <Select value={formData.travelers} onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How many travelers?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2">2 travelers</SelectItem>
                        <SelectItem value="3-4">3-4 travelers</SelectItem>
                        <SelectItem value="5+">5+ travelers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Trip Duration</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long is your trip?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 days</SelectItem>
                        <SelectItem value="4-7">4-7 days</SelectItem>
                        <SelectItem value="1-2">1-2 weeks</SelectItem>
                        <SelectItem value="3-4">3-4 weeks</SelectItem>
                        <SelectItem value="1month+">1 month or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="What's your budget?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget ($1,000 - $2,500)</SelectItem>
                        <SelectItem value="mid">Mid-range ($2,500 - $5,000)</SelectItem>
                        <SelectItem value="luxury">Luxury ($5,000 - $10,000)</SelectItem>
                        <SelectItem value="premium">Premium ($10,000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Destinations */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    <MapPin className="h-5 w-5 inline mr-2" />
                    Which destinations interest you?
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {destinations.map((destination) => (
                      <div key={destination} className="flex items-center space-x-2">
                        <Checkbox
                          id={destination}
                          checked={formData.destinations.includes(destination)}
                          onCheckedChange={(checked) => handleDestinationChange(destination, checked as boolean)}
                        />
                        <Label htmlFor={destination} className="text-sm">{destination}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    What are you most interested in?
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <Label htmlFor={interest} className="text-sm">{interest}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <Label htmlFor="special-requests">
                    Any special requests or requirements?
                  </Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Tell us about any accessibility needs, dietary restrictions, special occasions, or anything else we should know..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="btn-luxury-accent px-12 py-4 text-lg font-bold"
                  >
                    <Bot className="h-6 w-6 mr-3" />
                    Tell "{agent?.name || 'AI Travel Agent'}" to Plan this Trip for You
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StartMyTrip;