
import React from 'react';

const TrustIndicators = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Travelers' },
    { number: '180+', label: 'Countries Served' },
    { number: '98%', label: 'Visa Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  const partners = [
    { 
      name: 'IATA', 
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop&crop=center', 
      alt: 'IATA - International Air Transport Association' 
    },
    { 
      name: 'Amadeus', 
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=60&fit=crop&crop=center', 
      alt: 'Amadeus Travel Technology' 
    },
    { 
      name: 'Sabre', 
      logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=120&h=60&fit=crop&crop=center', 
      alt: 'Sabre Travel Network' 
    },
    { 
      name: 'Expedia', 
      logo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=120&h=60&fit=crop&crop=center', 
      alt: 'Expedia Partner' 
    },
    { 
      name: 'Booking.com', 
      logo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=120&h=60&fit=crop&crop=center', 
      alt: 'Booking.com Partner' 
    },
    { 
      name: 'TripAdvisor', 
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&h=60&fit=crop&crop=center', 
      alt: 'TripAdvisor Partner' 
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3"></div>
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-200/15 to-purple-200/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group hover:transform hover:scale-105 transition-all duration-300 ease-out"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-6">Trusted by Industry Leaders</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="group hover:transform hover:scale-110 transition-all duration-300 ease-out"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-white/30 w-24 h-14 flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.alt}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
