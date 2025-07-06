/**
 * Date utility functions for reliable date calculations
 */

/**
 * Add months to a date reliably avoiding boundary issues
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date.getTime());
  const day = result.getDate();
  const month = result.getMonth();
  const year = result.getFullYear();
  
  // Calculate target month and year
  const targetMonth = month + months;
  const targetYear = year + Math.floor(targetMonth / 12);
  const finalMonth = targetMonth >= 0 ? targetMonth % 12 : 12 + (targetMonth % 12);
  
  // Set to first day of target month to avoid overflow
  result.setFullYear(targetYear, finalMonth, 1);
  
  // Get last day of target month
  const lastDayOfMonth = new Date(targetYear, finalMonth + 1, 0).getDate();
  
  // Use original day or last day of month, whichever is smaller
  result.setDate(Math.min(day, lastDayOfMonth));
  
  return result;
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