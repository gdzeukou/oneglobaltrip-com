
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PackagesHero from '@/components/packages/PackagesHero';
import PackagesFilters from '@/components/packages/PackagesFilters';
import PackagesGrid from '@/components/packages/PackagesGrid';
import FeaturedPackages from '@/components/packages/FeaturedPackages';
import TrustBadges from '@/components/common/TrustBadges';
import FAQSection from '@/components/common/FAQSection';
import { usePackageFilters } from '@/hooks/usePackageFilters';
import { packages } from '@/data/packages';
import { categories } from '@/data/packages';

const Packages = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    filteredPackages,
    clearFilters
  } = usePackageFilters(packages);

  const faqData = [
    {
      question: "What's included in your packages?",
      answer: "Our packages include visa assistance, accommodation bookings, flight reservations, travel insurance, and 24/7 support. Specific inclusions vary by package - check individual package details for complete information."
    },
    {
      question: "Can I customize a package?",
      answer: "Absolutely! We offer flexible customization options. You can add or remove services, extend stays, upgrade accommodations, and include additional experiences. Our travel experts will help tailor the perfect package for you."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 4-6 weeks in advance for optimal pricing and availability. However, we can accommodate last-minute bookings (subject to visa processing times and availability)."
    },
    {
      question: "What if my visa gets rejected?",
      answer: "We offer a 100% visa approval guarantee. If your visa is rejected due to our error, we'll reapply for free. Our expert review process minimizes rejection risks significantly."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We offer flexible payment options including installment plans and pay-later options. Contact us to discuss payment arrangements that work for your budget."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <PackagesHero 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <FeaturedPackages packages={packages} />
      <PackagesFilters 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />
      <PackagesGrid 
        packages={filteredPackages}
        onClearFilters={clearFilters}
      />
      <TrustBadges />
      <FAQSection faqs={faqData} />

      <Footer />
    </div>
  );
};

export default Packages;
