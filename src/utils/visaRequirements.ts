
// Comprehensive visa requirements and nationality filtering

// Schengen Area countries (citizens don't need Schengen visas)
export const schengenCountries = [
  'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia', 
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Italy', 
  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 
  'Norway', 'Poland', 'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 
  'Switzerland'
];

// Countries that are visa-exempt for Schengen (90 days tourist/business)
export const schengenVisaExemptCountries = [
  'United States', 'Canada', 'Australia', 'United Kingdom', 'Japan', 
  'South Korea', 'New Zealand', 'Israel', 'Singapore', 'Malaysia', 'Brunei', 
  'Chile', 'Uruguay', 'Argentina', 'Brazil', 'Mexico', 'Panama', 'Costa Rica', 
  'Honduras', 'El Salvador', 'Nicaragua', 'Guatemala', 'Venezuela', 'Colombia', 
  'Peru', 'Paraguay', 'Bolivia', 'Ecuador', 'Barbados', 'Antigua and Barbuda', 
  'Bahamas', 'Dominica', 'Grenada', 'Saint Kitts and Nevis', 'Saint Lucia', 
  'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'Seychelles', 
  'Mauritius', 'Taiwan', 'Hong Kong', 'Macao', 'Montenegro', 'Serbia', 
  'North Macedonia', 'Albania', 'Bosnia and Herzegovina', 'Moldova', 'Ukraine', 
  'Georgia'
];

// All world countries/nationalities
export const allCountries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
  'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China',
  'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
  'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark',
  'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
  'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
  'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
  'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
  'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
  'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
  'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

// Countries that typically NEED visas for Schengen (should appear in nationality list for Schengen applications)
export const schengenVisaRequiredCountries = allCountries.filter(country => 
  !schengenCountries.includes(country) && 
  !schengenVisaExemptCountries.includes(country)
);

// Function to get filtered nationality list based on destination
export const getFilteredNationalities = (destinationCountry: string, visaType: 'short-stay' | 'long-stay') => {
  console.log('Filtering nationalities for:', destinationCountry, visaType);
  
  // For long-stay visas, always show all countries
  if (visaType === 'long-stay') {
    return allCountries;
  }
  
  // For short-stay visas, filter based on destination
  if (destinationCountry === 'Schengen Area') {
    // Only show countries that need Schengen visas
    return schengenVisaRequiredCountries;
  }
  
  // For other destinations, show all countries for now
  // This can be expanded with specific visa requirements for other countries
  return allCountries;
};

// Helper function to check if a nationality needs a visa for a destination
export const needsVisa = (nationality: string, destination: string) => {
  if (destination === 'Schengen Area') {
    return !schengenCountries.includes(nationality) && !schengenVisaExemptCountries.includes(nationality);
  }
  
  // Add logic for other destinations as needed
  return true; // Default to requiring visa
};
