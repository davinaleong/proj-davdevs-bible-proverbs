/**
 * Date utilities for the Dav/Devs Bible Proverbs app
 */

/**
 * Get today's proverb chapter number based on the current date
 * Uses the day of the month (1-31) to determine which chapter to show
 * @returns The chapter number (1-31)
 */
export function getTodaysProverbChapter(): number {
  const today = new Date();
  const dayOfMonth = today.getDate();
  
  // Ensure we stay within the valid range of Proverbs chapters (1-31)
  return Math.min(dayOfMonth, 31);
}

/**
 * Check if today is a special date that should show a specific chapter
 * @returns The chapter number if it's a special date, or null otherwise
 */
export function getSpecialDateChapter(): number | null {
  const today = new Date();
  const month = today.getMonth() + 1; // 0-based to 1-based
  const day = today.getDate();
  
  // Special cases for months with fewer than 31 days
  // For February 29 (leap year), show chapter 29
  if (month === 2 && day === 29) {
    return 29;
  }
  
  // For months with 30 days, day 31 would show chapter 30
  const thirtyDayMonths = [4, 6, 9, 11]; // April, June, September, November
  if (thirtyDayMonths.includes(month) && day === 30) {
    return 30;
  }
  
  return null;
}

/**
 * Get the chapter to display today, considering special dates
 * @returns The chapter number to display
 */
export function getCurrentChapter(): number {
  const specialChapter = getSpecialDateChapter();
  if (specialChapter) {
    return specialChapter;
  }
  
  return getTodaysProverbChapter();
}

/**
 * Format a date according to user preferences
 * @param date The date to format
 * @param format The format string (e.g., 'dd mmm yyyy', 'mm/dd/yyyy')
 * @returns The formatted date string
 */
export function formatDate(date: Date, format: string = 'dd mmm yyyy'): string {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthNamesFull = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  switch (format) {
    case 'dd mmm yyyy':
      return `${day.toString().padStart(2, '0')} ${monthNames[month]} ${year}`;
    case 'dd/mm/yyyy':
      return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
    case 'mm/dd/yyyy':
      return `${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    case 'dd mmmm yyyy':
      return `${day} ${monthNamesFull[month]} ${year}`;
    case 'mmmm dd, yyyy':
      return `${monthNamesFull[month]} ${day}, ${year}`;
    default:
      return `${day.toString().padStart(2, '0')} ${monthNames[month]} ${year}`;
  }
}

/**
 * Get a human-readable description of which proverb is being shown
 * @param chapter The chapter number
 * @returns A description string
 */
export function getProverbDescription(chapter: number): string {
  const today = new Date();
  const todaysChapter = getCurrentChapter();
  
  if (chapter === todaysChapter) {
    return `Today's Proverb (${formatDate(today)})`;
  } else {
    return `Proverbs Chapter ${chapter}`;
  }
}