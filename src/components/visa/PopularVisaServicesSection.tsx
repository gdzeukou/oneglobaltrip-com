
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';

const PopularVisaServicesSection = () => {
  const navigate = useNavigate();

  const shortStayVisas = [
    {
      id: 'schengen',
      name: 'Schengen Visa Pack',
      countries: '27 European Countries',
      price: 193,
      processingTime: '10-15 days',
      validityPeriod: '90 days',
      description: 'Access to 27 European countries with a single visa',
      type: 'short-stay',
      popular: true
    },
    {
      id: 'uk',
      name: 'UK Visa Pass - 6 Month',
      countries: 'United Kingdom',
      price: 480,
      processingTime: '15-20 days',
      validityPeriod: '6 months',
      description: 'Standard visitor visa for tourism and business',
      type: 'short-stay'
    },
    {
      id: 'uk-5year',
      name: 'UK Visa Pass - 5 Year',
      countries: 'United Kingdom',
      price: 995,
      processingTime: '15-20 days',
      validityPeriod: '5 years',
      description: 'Long-term visitor visa for multiple entries',
      type: 'short-stay'
    },
    {
      id: 'brazil',
      name: 'Brazil eVisa',
      countries: 'Brazil',
      price: 175,
      processingTime: '5-10 days',
      validityPeriod: '90 days',
      description: 'Electronic visa for tourism purposes',
      type: 'short-stay'
    },
    {
      id: 'canada',
      name: 'Canada Entry Visa',
      countries: 'Canada',
      price: 300,
      processingTime: '2-4 weeks',
      validityPeriod: '6 months',
      description: 'Visitor visa and eTA for Canada',
      type: 'short-stay'
    },
    {
      id: 'nigeria',
      name: 'Nigeria Visa',
      countries: 'Nigeria',
      price: 290,
      processingTime: '5-7 days',
      validityPeriod: '90 days',
      description: 'Tourist and business visa for Nigeria',
      type: 'short-stay'
    },
    {
      id: 'uae',
      name: 'UAE Tourist Visa',
      countries: 'United Arab Emirates',
      price: 250,
      processingTime: '3-5 days',
      validityPeriod: '30-90 days',
      description: 'Tourist visa for UAE and Dubai',
      type: 'short-stay'
    },
    {
      id: 'india',
      name: 'India e-Visa',
      countries: 'India',
      price: 180,
      processingTime: '3-5 days',
      validityPeriod: '60 days',
      description: 'Electronic visa for India tourism',
      type: 'short-stay'
    }
  ];

  const longStayVisas = [
    {
      id: 'portugal-longstay',
      name: 'Portugal Long-Stay',
      countries: 'Portugal',
      price: 240,
      processingTime: '60-90 days',
      validityPeriod: '1 year+',
      description: 'Long-stay visa for work, study, or residence',
      type: 'long-stay',
      popular: true
    },
    {
      id: 'norway-longstay',
      name: 'Norway Long-Stay',
      countries: 'Norway',
      price: 240,
      processingTime: '60-90 days',
      validityPeriod: '1 year+',
      description: 'Long-stay visa for work or study',
      type: 'long-stay'
    },
    {
      id: 'denmark-longstay',
      name: 'Denmark Long-Stay',
      countries: 'Denmark',
      price: 240,
      processingTime: '60-90 days',
      validityPeriod: '1 year+',
      description: 'Long-stay visa for work or study',
      type: 'long-stay'
    },
    {
      id: 'finland-longstay',
      name: 'Finland Long-Stay',
      countries: 'Finland',
      price: 240,
      processingTime: '60-90 days',
      validityPeriod: '1 year+',
      description: 'Long-stay visa with Finnish insurance',
      type: 'long-stay'
    },
    {
      id: 'germany-longstay',
      name: 'Germany Long-Stay',
      countries: 'Germany',
      price: 240,
      processingTime: '60-90 days',
      validityPeriod: '1 year+',
      description: 'German long-stay visa for work/study',
      type: 'long-stay'
    },
    {
      id: 'france-longstay',
      name: 'France Long-Stay',
      countries: 'France',
      price: 240,
      processingTime: '60-90 days',
      validityPeriod: '1 year+',
      description: 'French long-stay visa for work/study',
      type: 'long-stay'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Visa Services</h2>
          <p className="text-xl text-gray-600">See what we can help you with</p>
        </div>

        <Tabs defaultValue="short-stay" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="short-stay">Short-Stay Visas</TabsTrigger>
            <TabsTrigger value="long-stay">Long-Stay & Residency</TabsTrigger>
          </TabsList>

          <TabsContent value="short-stay">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {shortStayVisas.map((visa) => (
                  <CarouselItem key={visa.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="hover-lift relative h-full">
                      {visa.popular && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                          POPULAR
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-blue-900">{visa.name}</CardTitle>
                          <Badge className="bg-blue-500 text-white">
                            ${visa.price}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{visa.countries}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4 text-sm">{visa.description}</p>
                        <div className="space-y-1 text-xs mb-4">
                          <div className="flex justify-between">
                            <span>Processing:</span>
                            <span className="font-medium">{visa.processingTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Validity:</span>
                            <span className="font-medium">{visa.validityPeriod}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            if (visa.id === 'schengen') {
                              navigate('/visas/short-stay/schengen');
                            } else if (visa.id === 'uk-5year') {
                              navigate('/visas/short-stay/uk-5year');
                            } else {
                              navigate(`/visas/short-stay/${visa.id}`);
                            }
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>

          <TabsContent value="long-stay">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {longStayVisas.map((visa) => (
                  <CarouselItem key={visa.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="hover-lift relative h-full">
                      {visa.popular && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                          POPULAR
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-purple-900">{visa.name}</CardTitle>
                          <Badge className="bg-purple-500 text-white">
                            ${visa.price}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{visa.countries}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4 text-sm">{visa.description}</p>
                        <div className="space-y-1 text-xs mb-4">
                          <div className="flex justify-between">
                            <span>Processing:</span>
                            <span className="font-medium">{visa.processingTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Validity:</span>
                            <span className="font-medium">{visa.validityPeriod}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => {
                            const country = visa.id.split('-')[0];
                            navigate(`/visas/long-stay/${country}`);
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PopularVisaServicesSection;
