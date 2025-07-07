
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
 * Parse date string reliably, handling different formats
 */
export const parseDate = (dateString: string | Date): Date => {
  if (dateString instanceof Date) return dateString;
  
  // Handle empty or invalid strings
  if (!dateString || typeof dateString !== 'string') {
    return new Date('');
  }
  
  // Create date and set to start of day to avoid timezone issues
  const date = new Date(dateString);
  if (isValidDate(date)) {
    // Set to noon to avoid timezone edge cases
    date.setHours(12, 0, 0, 0);
    return date;
  }
  
  return new Date('');
};

/**
 * Compare dates safely, ignoring time components
 */
export const compareDates = (date1: string | Date, date2: string | Date): number => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  
  if (!isValidDate(d1) || !isValidDate(d2)) {
    console.warn('Invalid date comparison:', { date1, date2 });
    return 0;
  }
  
  // Compare only the date parts (ignore time)
  const day1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const day2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  
  return day1.getTime() - day2.getTime();
};

/**
 * Check if passport is valid for travel (3 months beyond departure)
 */
export const isPassportValidForTravel = (
  passportExpiry: string | Date,
  departureDate: string | Date
): boolean => {
  console.log('Checking passport validity:', { passportExpiry, departureDate });
  
  const expiry = parseDate(passportExpiry);
  const departure = parseDate(departureDate);
  
  if (!isValidDate(expiry) || !isValidDate(departure)) {
    console.warn('Invalid dates for passport validation:', { expiry, departure });
    return false;
  }
  
  const threeMonthsAfterDeparture = addMonths(departure, 3);
  const isValid = compareDates(expiry, threeMonthsAfterDeparture) >= 0;
  
  console.log('Passport validation result:', {
    expiry: formatDate(expiry),
    departure: formatDate(departure),
    threeMonthsAfter: formatDate(threeMonthsAfterDeparture),
    isValid
  });
  
  return isValid;
};
