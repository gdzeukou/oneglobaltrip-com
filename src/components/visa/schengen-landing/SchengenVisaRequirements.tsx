
import { useState } from 'react';
import { ChevronDown, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const visaExemptCountries = [
  'United States', 'Canada', 'Australia', 'New Zealand', 'Japan', 'South Korea',
  'Singapore', 'Malaysia', 'Israel', 'Chile', 'Argentina', 'Brazil', 'Mexico',
  'Uruguay', 'Paraguay', 'Costa Rica', 'Panama', 'Honduras', 'El Salvador',
  'Guatemala', 'Nicaragua', 'Venezuela', 'Colombia', 'Peru', 'Ecuador'
];

const SchengenVisaRequirements = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('us-passport');
  const [searchTerm, setSearchTerm] = useState('');
  const [quizOpen, setQuizOpen] = useState(false);

  const filteredCountries = visaExemptCountries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who Needs a Schengen Visa?
          </h2>
          <p className="text-xl text-gray-600">
            Visa requirements depend on your nationality and length of stay
          </p>
        </div>

        <div className="space-y-4">
          {/* US Passport Holders */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Collapsible 
              open={openAccordion === 'us-passport'} 
              onOpenChange={() => toggleAccordion('us-passport')}
            >
              <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-2xl">🇺🇸</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        US Passport Holders
                      </h3>
                      <p className="text-sm text-gray-600">No visa required for short stays</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                    openAccordion === 'us-passport' ? 'rotate-180' : ''
                  }`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Current Status:</p>
                        <p className="text-gray-700">Travel freely for up to 90 days in any 180-day period</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Starting 2025:</p>
                        <p className="text-gray-700">ETIAS (European Travel Information and Authorization System) will be required</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Visa-Exempt Countries */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Collapsible 
              open={openAccordion === 'visa-exempt'} 
              onOpenChange={() => toggleAccordion('visa-exempt')}
            >
              <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Citizens of Visa-Exempt Countries
                      </h3>
                      <p className="text-sm text-gray-600">60+ countries with visa-free access</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                    openAccordion === 'visa-exempt' ? 'rotate-180' : ''
                  }`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search your country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <div key={country} className="p-2 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">{country}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* All Other Nationalities */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Collapsible 
              open={openAccordion === 'visa-required'} 
              onOpenChange={() => toggleAccordion('visa-required')}
            >
              <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-6 h-6 text-red-500" />
                      <span className="text-2xl">📋</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        All Other Nationalities
                      </h3>
                      <p className="text-sm text-gray-600">Short-stay C-type visa required</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                    openAccordion === 'visa-required' ? 'rotate-180' : ''
                  }`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Visa Type:</p>
                        <p className="text-gray-700">Short-stay C-type visa (up to 90 days)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Processing Time:</p>
                        <p className="text-gray-700">10-15 business days (expedited options available)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Our Success Rate:</p>
                        <p className="text-gray-700">97% approval rate with expert document review</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Check Status CTA */}
        <div className="text-center mt-8">
          <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Check My Status
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Check Your Visa Requirements</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Get personalized visa requirements based on your nationality and travel plans.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Sign in to access our comprehensive visa checker and get started with your application.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setQuizOpen(false);
                    window.location.href = '/auth';
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Sign In to Check Status
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SchengenVisaRequirements;
