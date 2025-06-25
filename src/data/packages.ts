import { Package, PackageCategory } from '@/types/package';

export const categories: PackageCategory[] = [
  { id: 'all', name: 'All Packages', icon: 'Globe' },
  { id: 'romantic', name: 'Romantic', icon: 'Heart' },
  { id: 'cultural', name: 'Cultural', icon: 'MapPin' },
  { id: 'luxury', name: 'Luxury', icon: 'Crown' },
  { id: 'family', name: 'Family', icon: 'Users' },
  { id: 'adventure', name: 'Adventure', icon: 'Mountain' },
  { id: 'city-breaks', name: 'City Breaks', icon: 'Building' },
  { id: 'multi-country', name: 'Multi-Country', icon: 'Map' }
];

// Europe Express packages
export const packages: Package[] = [
  {
    id: "london-paris-rome",
    title: "London, Paris & Rome Classic",
    shortDescription: "Experience three iconic European capitals in one unforgettable journey",
    description: "Discover the rich history, stunning architecture, and vibrant culture of London, Paris, and Rome. This carefully crafted 11-day adventure takes you through three of Europe's most beloved capitals, offering the perfect blend of guided tours and free time to explore at your own pace.",
    price: 3299,
    originalPrice: 4199,
    duration: "11 days",
    image: "/lovable-uploads/44149117-d839-409c-9984-58ab8271cacf.png",
    category: "cultural",
    rating: 4.8,
    reviewCount: 127,
    countries: ["uk", "france", "italy"], // Updated to use country codes
    cities: ["London", "Paris", "Rome"],
    highlights: [
      "Skip-the-line access to Tower of London, Eiffel Tower & Colosseum",
      "Expert local guides in all three cities",
      "Central 4-star hotels with breakfast included",
      "Eurostar journey from London to Paris",
      "Small group experience (max 16 travelers)",
      "Wine tasting in a Roman enoteca",
      "Seine River cruise in Paris",
      "Traditional afternoon tea in London"
    ],
    specialFeatures: [
      "UNESCO World Heritage site visits",
      "Photography workshops with local artists",
      "Exclusive after-hours museum access",
      "Local cooking class in Rome",
      "Private coach transfers between attractions",
      "24/7 English-speaking tour director"
    ],
    visasRequired: ["UK ETA (for US citizens)", "Schengen visa (if required)"],
    difficulty: "Easy",
    groupSize: "8-16 people",
    included: [
      "10 nights accommodation in 4-star hotels",
      "Daily breakfast buffet",
      "4 lunches including special experiences",
      "2 dinners including farewell meal",
      "Eurostar tickets (London-Paris)",
      "Flights (Paris-Rome)",
      "All ground transportation",
      "Expert local guides",
      "Skip-the-line tickets to major attractions",
      "Go City London Pass",
      "Seine River cruise",
      "Wine tasting experience"
    ]
  },
  {
    id: 'london-paris-rome-signature',
    title: 'London, Paris & Rome – 10-Day Signature Tour',
    country: 'United Kingdom, France, Italy',
    category: 'multi-country',
    duration: '10 Days',
    price: 4299,
    originalPrice: 4899,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
    description: 'Experience three of Europe\'s most iconic capitals on this carefully curated 10-day journey. Perfect for couples and first-time Europe travelers seeking a comprehensive introduction to European culture, history, and cuisine. From London\'s royal heritage to Paris\'s artistic treasures and Rome\'s ancient wonders, this signature tour combines the best of each destination with seamless transportation, expert guides, and authentic local experiences.',
    highlights: [
      'Explore London with Go City London Pass covering 80+ top attractions including Tower of London, Westminster Abbey, and Thames River Cruise',
      'Take the luxurious Eurostar high-speed train from London to Paris in Standard Premier class with complimentary meal service',
      'Skip-the-line access to the Louvre Museum with expert art historian guide and small group size (max 12 people)',
      'Full-day Loire Valley castle tour visiting Château de Chambord and Château de Chenonceau with wine tasting',
      'Scenic Cotswolds countryside excursion with traditional pub lunch and village exploration',
      'Private Vatican Museums, Sistine Chapel, and St. Peter\'s Basilica tour with licensed archaeologist guide',
      'Skip-the-line Colosseum and Roman Forum tour with underground chambers access',
      'Traditional cooking class in Rome\'s Trastevere district with local chef and market visit',
      'Full-day Tuscany excursion to Siena and San Gimignano with wine estate lunch',
      'Seine River cruise at sunset with champagne and panoramic views of illuminated Paris landmarks'
    ],
    specialFeatures: [
      'Private airport and station transfers in luxury vehicles with professional English-speaking drivers',
      'Carefully selected 4-star hotels in prime central locations with daily breakfast and concierge services',
      'Expert local guides with art history, archaeology, or cultural backgrounds for all major tours',
      'Small group experiences with maximum 16 participants for personalized attention',
      'Skip-the-line access to all major attractions to maximize your time and avoid crowds',
      'Eurostar Standard Premier class with spacious seats, complimentary meals, and lounge access',
      'Flexible itinerary with optional activities and free time for personal exploration',
      'Comprehensive pre-departure travel packet with detailed itineraries, packing lists, and cultural insights',
      '24/7 local support phone line with English-speaking representatives in each destination',
      'Carefully planned meal experiences including château lunch, cooking class, and farewell dinners'
    ],
    visasRequired: ['Schengen Visa', 'UK Visa'],
    rating: 4.9,
    reviews: 247,
    countries: ['United Kingdom', 'France', 'Italy'],
    features: [
      'Private Transfers', 
      'Expert Guides', 
      'Skip-the-Line Access', 
      'Eurostar Train', 
      'Flight Included',
      'Cooking Class',
      'Wine Tastings',
      'Small Groups',
      'Central Hotels',
      '24/7 Support'
    ],
    tags: [
      'couples', 
      'first-time-europe', 
      'signature-tour', 
      'multi-country', 
      'cultural',
      'luxury-touches',
      'art-history',
      'culinary-experiences',
      'romantic',
      'comprehensive'
    ]
  }
];
