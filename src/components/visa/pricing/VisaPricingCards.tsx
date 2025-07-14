import React from 'react';
import VisaPricingCard from './VisaPricingCard';

interface VisaPricingCardsProps {
  visaType?: string;
}

const VisaPricingCards = ({ visaType }: VisaPricingCardsProps) => {
  const visaPackages = {
    'short-stay': [
      {
        name: "Ultimate Visa Assist",
        price: "$129",
        description: "Professional visa application support with AI-powered accuracy checks",
        features: [
          "Smart AI application review and validation",
          "Biometric/Fingerprint Appointment Hunter",
          "Complete form preparation and submission",
          "Real-time application tracking portal",
          "Document checklist and requirements guide",
          "24/7 AI Travel Agent"
        ],
        popular: false,
        badge: "Essential",
        badgeColor: "bg-blue-500"
      },
      {
        name: "Trip Bundle",
        price: "$249",
        description: "Full travel experience with visa, accommodation, and flight arrangements",
        features: [
          "All Visa Assist services included",
          "Guaranteed 4-star hotel in prime location", 
          "Premium flight booking with lounge access",
          "OGT TripGift credit for activities",
          "Comprehensive Travel Insurance Picks"
        ],
        popular: true,
        badge: "Most Popular",
        badgeColor: "bg-accent"
      },
      {
        name: "OGT Elite", 
        price: "$479",
        description: "White-glove service with dedicated personal travel agent and VIP treatment",
        features: [
          "All Trip Bundle services included",
          "Dedicated Human Certified Travel Advisor",
          "Priority biometric appointment booking",
          "Airport transfer and VIP assistance",
          "Restaurant and event reservations"
        ],
        popular: false,
        badge: "Premium",
        badgeColor: "bg-purple-600"
      }
    ],
    'long-stay': [
      {
        name: "OGT Passport Club",
        price: "$289",
        description: "Annual membership with exclusive benefits",
        features: [
          "✓ **Free visa renewal** on one application each year",
          "✓ **Post-arrival support** (check-lists + residence-permit appointments)",
          "✓ **Instant 15% discount** on every Visa & Travel service",
          "✓ **Priority email / WhatsApp line** (24 h SLA)",
          "✓ **Members-only travel tips newsletter**"
        ],
        popular: false,
        badge: "Save All Year",
        badgeColor: "bg-emerald-500"
      },
      {
        name: "Residency Plus",
        price: "$899",
        description: "Comprehensive residency assistance with legal support",
        features: [
          "Everything in Residency Basic",
          "Professional legal consultation",
          "Certified document translation service",
          "Priority appointment coordination",
          "24/7 phone & WhatsApp support",
          "Relocation guidance and city orientation"
        ],
        popular: true,
        badge: "Most Popular",
        badgeColor: "bg-orange-500"
      },
      {
        name: "Residency VIP",
        price: "$1299",
        description: "Full-service residency support with concierge service",
        features: [
          "Everything in Residency Plus",
          "Dedicated personal case manager",
          "Priority processing with government offices",
          "Legal representation when required",
          "Housing assistance and property tours",
          "Complete integration support package"
        ],
        popular: false,
        badge: "VIP",
        badgeColor: "bg-purple-600"
      }
    ]
  };

  const currentPackages = visaPackages[visaType as keyof typeof visaPackages] || visaPackages['short-stay'];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {currentPackages.map((pkg, index) => (
            <VisaPricingCard key={index} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaPricingCards;