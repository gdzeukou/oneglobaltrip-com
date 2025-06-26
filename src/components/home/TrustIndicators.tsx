
import React from 'react';

const TrustIndicators = () => {
  const stats = [
    { number: '25,000+', label: 'Happy Travelers' },
    { number: '180+', label: 'Countries Served' },
    { number: '98%', label: 'Visa Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <section className="py-12 bg-yellow-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-blue-900">{stat.number}</div>
              <div className="text-blue-800 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
