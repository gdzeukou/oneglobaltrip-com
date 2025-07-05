// Enhanced date parsing function
export function parseNaturalDate(dateStr: string, currentYear = new Date().getFullYear()): string | null {
  console.log('Parsing date:', dateStr);
  
  if (!dateStr) return null;
  
  const cleanDate = dateStr.toLowerCase().trim();
  
  // Check if already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
    return cleanDate;
  }
  
  // Month mappings
  const months: Record<string, number> = {
    'january': 1, 'jan': 1,
    'february': 2, 'feb': 2,
    'march': 3, 'mar': 3,
    'april': 4, 'apr': 4,
    'may': 5,
    'june': 6, 'jun': 6,
    'july': 7, 'jul': 7,
    'august': 8, 'aug': 8,
    'september': 9, 'sep': 9, 'sept': 9,
    'october': 10, 'oct': 10,
    'november': 11, 'nov': 11,
    'december': 12, 'dec': 12
  };
  
  // Try to parse "Month DD" or "Month DD, YYYY" formats
  const monthDayMatch = cleanDate.match(/(\w+)\s+(\d{1,2})(?:,?\s*(\d{4}))?/);
  if (monthDayMatch) {
    const [, monthStr, dayStr, yearStr] = monthDayMatch;
    const month = months[monthStr];
    const day = parseInt(dayStr);
    const year = yearStr ? parseInt(yearStr) : currentYear;
    
    if (month && day >= 1 && day <= 31) {
      // If the date would be in the past this year, assume next year
      const proposedDate = new Date(year, month - 1, day);
      const now = new Date();
      
      let finalYear = year;
      if (proposedDate < now && !yearStr) {
        finalYear = currentYear + 1;
      }
      
      return `${finalYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  }
  
  // Try MM/DD or MM/DD/YYYY formats
  const slashMatch = cleanDate.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (slashMatch) {
    const [, monthStr, dayStr, yearStr] = slashMatch;
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    let year = currentYear;
    
    if (yearStr) {
      year = yearStr.length === 2 ? 2000 + parseInt(yearStr) : parseInt(yearStr);
    }
    
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const proposedDate = new Date(year, month - 1, day);
      const now = new Date();
      
      if (proposedDate < now && !yearStr) {
        year = currentYear + 1;
      }
      
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  }
  
  console.log('Could not parse date:', dateStr);
  return null;
}