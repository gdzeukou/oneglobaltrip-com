/**
 * Date utility functions for reliable date calculations
 */

/**
 * Add months to a date without using setMonth() to avoid boundary issues
 */
export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  const targetMonth = newDate.getMonth() + months;
  const targetYear = newDate.getFullYear() + Math.floor(targetMonth / 12);
  const finalMonth = targetMonth % 12;
  
  // Handle negative months
  if (finalMonth < 0) {
    return new Date(targetYear - 1, 12 + finalMonth, newDate.getDate());
  }
  
  return new Date(targetYear, finalMonth, newDate.getDate());
};

/**
 * Add days to a date reliably
 */
export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

/**
 * Check if a date is valid (not NaN)
 */
export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  if (!isValidDate(date)) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Check if passport is valid for travel (3 months beyond departure)
 */
export const isPassportValidForTravel = (
  passportExpiry: string | Date,
  departureDate: string | Date
): boolean => {
  const expiry = typeof passportExpiry === 'string' ? new Date(passportExpiry) : passportExpiry;
  const departure = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
  
  if (!isValidDate(expiry) || !isValidDate(departure)) return false;
  
  const threeMonthsAfterDeparture = addMonths(departure, 3);
  return expiry >= threeMonthsAfterDeparture;
};