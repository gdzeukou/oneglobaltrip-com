/**
 * Date utility functions for reliable date calculations
 */

/**
 * Add months to a date without using setMonth() to avoid boundary issues
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const currentMonth = result.getMonth();
  const currentYear = result.getFullYear();
  
  // Calculate new year and month
  const totalMonths = currentMonth + months;
  const newYear = currentYear + Math.floor(totalMonths / 12);
  const newMonth = totalMonths % 12;
  
  // Handle negative months properly
  if (totalMonths < 0) {
    const yearsBack = Math.ceil(-totalMonths / 12);
    const adjustedYear = currentYear - yearsBack;
    const adjustedMonth = 12 + (totalMonths % 12);
    return new Date(adjustedYear, adjustedMonth === 12 ? 0 : adjustedMonth, result.getDate());
  }
  
  return new Date(newYear, newMonth, result.getDate());
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