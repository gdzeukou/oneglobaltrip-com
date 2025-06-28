
import React from 'react';

const schengenCountries = [
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' }
];

const SchengenInfoSection = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Is the Schengen Area?
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                The Schengen Area is a zone of 29 European countries that have abolished passport 
                and border controls at their mutual borders. Named after the Luxembourg village 
                where the agreement was signed in 1985, it allows for free movement of people 
                within this area.
              </p>
              <p>
                With a single Schengen visa, you can visit multiple countries without additional 
                border checks. This makes it perfect for exploring Europe's rich culture, history, 
                and diverse landscapes in one seamless journey.
              </p>
            </div>

            {/* Member States */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                29 Member States:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {schengenCountries.map((country) => (
                  <div 
                    key={country.code}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {country.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-5xl font-bold mb-2">29</div>
                    <div className="text-lg font-medium">Countries</div>
                    <div className="text-sm opacity-90">One Visa</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Schengen Area
                </h3>
                <p className="text-gray-600">
                  Free movement across borders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchengenInfoSection;
