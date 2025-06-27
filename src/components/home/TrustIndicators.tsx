
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
      color: 'from-slate-700 to-slate-900'
    },
    { 
      name: 'WorldVia', 
      displayName: 'WorldVia',
      color: 'from-blue-700 to-blue-900'
    },
    { 
      name: 'Fora Travel', 
      displayName: 'Fora Travel',
      color: 'from-emerald-700 to-emerald-900'
    },
    { 
      name: 'Expedia', 
      displayName: 'Expedia',
      color: 'from-amber-600 to-amber-800'
    },
    { 
      name: 'ACLA', 
      displayName: 'ACLA',
      color: 'from-purple-700 to-purple-900'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Elegant decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 via-white/30 to-slate-100/20"></div>
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-gradient-to-br from-slate-200/10 to-slate-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-br from-slate-200/10 to-slate-300/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group hover:transform hover:scale-105 transition-all duration-500 ease-out"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-500 border border-slate-200/50">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-2 font-serif">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium text-base tracking-wide uppercase letter-spacing-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2 font-serif tracking-wide">Trusted by Industry Leaders</h3>
          <p className="text-slate-600 mb-10 text-lg">Partnerships that ensure excellence in every journey</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="group hover:transform hover:scale-110 transition-all duration-500 ease-out"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-500 border border-slate-200/30 w-36 h-20 flex items-center justify-center">
                  <div className={`text-xl font-bold bg-gradient-to-r ${partner.color} bg-clip-text text-transparent text-center leading-tight font-serif tracking-wide`}>
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
