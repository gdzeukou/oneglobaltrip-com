import React from 'react';

const VisaPricingInfo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Government Fees</h3>
            <p className="text-gray-600">
              Government visa fees are paid separately directly to the embassy or consulate. 
              These fees vary by country and visa type.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Processing Time</h3>
            <p className="text-gray-600">
              Processing times vary by destination and visa type. We'll provide accurate 
              timelines based on current embassy processing times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaPricingInfo;