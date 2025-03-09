import { EthiopianDate, GregorianDate } from './types';

/**
 * Checks if a given Ethiopian date is valid
 * @param date The Ethiopian date to validate
 * @returns True if the date is valid, false otherwise
 */
export function isValidEthiopianDate(date: EthiopianDate): boolean {
  const { year, month, day } = date;

  // Basic range checks
  if (year < 1 || month < 1 || day < 1) {
    return false;
  }

  // Ethiopian calendar has 13 months
  if (month > 13) {
    return false;
  }

  // First 12 months have 30 days each
  if (month <= 12 && day > 30) {
    return false;
  }

  // 13th month (Pagume) has 5 days in a regular year and 6 days in a leap year
  // In some calculations, day 7 can appear for the last day of the year before new year
  if (month === 13) {
    // Ethiopian leap year is every 4 years, but the rule is different from Gregorian
    // Ethiopian leap year is when (year + 1) % 4 === 0
    const isLeapYear = (year + 1) % 4 === 0;
    const maxDays = isLeapYear ? 7 : 6; // Allow up to 7 days for leap years, 6 for regular years

    if (day > maxDays) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a given Gregorian date is valid
 * @param date The Gregorian date to validate
 * @returns True if the date is valid, false otherwise
 */
export function isValidGregorianDate(date: GregorianDate): boolean {
  const { year, month, day } = date;

  // Basic range checks
  if (year < 1 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  // Check days in month
  const daysInMonth = [
    31, // January
    isGregorianLeapYear(year) ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31  // December
  ];

  return day <= daysInMonth[month - 1];
}

/**
 * Determines if a given Gregorian year is a leap year
 * @param year The Gregorian year to check
 * @returns True if the year is a leap year, false otherwise
 */
function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
} 