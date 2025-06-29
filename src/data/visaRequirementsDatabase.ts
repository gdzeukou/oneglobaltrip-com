
export interface VisaRequirement {
  required: boolean;
  isSchengen: boolean;
  message?: string;
}

export const destinationCountries = [
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'france', name: 'France', flag: '🇫🇷' },
  { code: 'italy', name: 'Italy', flag: '🇮🇹' },
  { code: 'germany', name: 'Germany', flag: '🇩🇪' },
  { code: 'spain', name: 'Spain', flag: '🇪🇸' },
  { code: 'japan', name: 'Japan', flag: '🇯🇵' },
  { code: 'uae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'canada', name: 'Canada', flag: '🇨🇦' },
  { code: 'usa', name: 'United States', flag: '🇺🇸' }
];

export const schengenCountries = ['france', 'italy', 'germany', 'spain', 'netherlands', 'greece'];

export const checkVisaRequirement = (nationality: string, destination: string, purpose: string): VisaRequirement => {
  // Simplified visa check logic
  const isSchengen = schengenCountries.includes(destination);
  
  // US citizens generally don't need visas for short stays in Europe
  if (nationality === 'United States') {
    if (destination === 'uk') {
      return { required: false, isSchengen: false, message: 'ETA required from 2024' };
    }
    return { required: false, isSchengen };
  }
  
  // Default to requiring visa for other nationalities
  return { required: true, isSchengen };
};
