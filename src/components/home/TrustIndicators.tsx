
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
      displayName: 'IATA',
      color: 'from-blue-600 to-blue-800'
    },
    { 
      name: 'Amadeus', 
      displayName: 'Amadeus',
      color: 'from-purple-600 to-purple-800'
    },
    { 
      name: 'Sabre', 
      displayName: 'Sabre',
      color: 'from-red-600 to-red-800'
    },
    { 
      name: 'Expedia', 
      displayName: 'Expedia',
      color: 'from-yellow-600 to-orange-600'
    },
    { 
      name: 'Booking.com', 
      displayName: 'Booking',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      name: 'TripAdvisor', 
      displayName: 'TripAdvisor',
      color: 'from-green-600 to-green-800'
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
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 w-28 h-16 flex items-center justify-center">
                  <div className={`text-lg font-bold bg-gradient-to-r ${partner.color} bg-clip-text text-transparent text-center leading-tight`}>
                    {partner.displayName}
                  </div>
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
