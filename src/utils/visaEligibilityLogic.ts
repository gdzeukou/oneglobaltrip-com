
// Visa eligibility logic and validation utilities

export const usaVisaStatuses = [
  { value: 'citizen', label: 'US Citizen' },
  { value: 'green-card', label: 'Green Card Holder (Permanent Resident)' },
  { value: 'f1', label: 'F1 - Student Visa' },
  { value: 'h1b', label: 'H1B - Work Visa' },
  { value: 'l1', label: 'L1 - Intracompany Transfer' },
  { value: 'o1', label: 'O1 - Extraordinary Ability' },
  { value: 'j1', label: 'J1 - Exchange Visitor' },
  { value: 'b1-b2', label: 'B1/B2 - Tourist/Business Visitor' },
  { value: 'other', label: 'Other Visa Status' }
];

export const travelPurposes = [
  { value: 'tourism', label: 'Tourism & Leisure' },
  { value: 'business', label: 'Business Meetings' },
  { value: 'family', label: 'Visiting Family/Friends' },
  { value: 'conference', label: 'Conference/Events' },
  { value: 'medical', label: 'Medical Treatment' },
  { value: 'transit', label: 'Transit' }
];

export const travelDurations = [
  { value: 'short', label: 'Up to 30 days' },
  { value: 'medium', label: '31-60 days' },
  { value: 'long', label: '61-90 days' }
];

// Check if USA visa status allows Schengen application from USA
export const canApplyFromUSA = (visaStatus: string): boolean => {
  const restrictedStatuses = ['b1-b2'];
  return !restrictedStatuses.includes(visaStatus);
};

// Get eligibility message based on status
export const getEligibilityMessage = (nationality: string, applyingFrom: string, usaVisaStatus?: string) => {
  if (applyingFrom === 'USA' && usaVisaStatus === 'b1-b2') {
    return {
      eligible: false,
      message: 'B1/B2 visa holders cannot apply for Schengen visas from the USA',
      recommendation: 'Consider applying from your home country'
    };
  }

  // Add more logic for different nationalities and visa-exempt countries
  const visaExemptCountries = [
    'United States', 'Canada', 'Australia', 'United Kingdom', 'Japan',
    'South Korea', 'New Zealand', 'Israel', 'Singapore', 'Malaysia'
    // Add more as needed
  ];

  if (visaExemptCountries.includes(nationality)) {
    return {
      eligible: true,
      message: 'You are visa-exempt for short stays up to 90 days',
      recommendation: 'No visa required for tourism/business visits'
    };
  }

  return {
    eligible: true,
    message: 'Visa required - you can apply',
    recommendation: 'Follow the standard application process'
  };
};
