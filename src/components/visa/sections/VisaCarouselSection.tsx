
import VisasCarousel from '@/components/visa/VisasCarousel';

const VisaCarouselSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text mb-4 tracking-tight">
            Premium Visa Services
          </h2>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our world-class visa processing services designed for discerning travelers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <VisasCarousel />
      </div>
    </section>
  );
};

export default VisaCarouselSection;
