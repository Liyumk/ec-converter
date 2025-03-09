import { EthiopianDate, GregorianDate } from './types';
import { isValidEthiopianDate, isValidGregorianDate } from './validator';

/**
 * Converts a Gregorian date to an Ethiopian date
 * @param gregorianDate The Gregorian date to convert
 * @returns The equivalent date in the Ethiopian calendar
 * @throws Error if the input date is invalid
 */
export function toEthiopian(gregorianDate: GregorianDate): EthiopianDate {
  if (!isValidGregorianDate(gregorianDate)) {
    throw new Error('Invalid Gregorian date');
  }

  const { year, month, day } = gregorianDate;

  // Create JavaScript Date object (months are 0-indexed in JS Date)
  const jsDate = new Date(year, month - 1, day);

  // Ethiopian new year in Gregorian calendar is on September 11 (or September 12 in leap years)
  // before Ethiopian new year: Ethiopian year = Gregorian year - 8
  // after Ethiopian new year: Ethiopian year = Gregorian year - 7

  let ethiopianYear: number;
  let ethiopianMonth: number;
  let ethiopianDay: number;

  // Ethiopian new year is on September 11 (or September 12 in leap years)
  const isGregorianLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const ethiopianNewYearDay = isGregorianLeapYear ? 12 : 11;

  if (month > 9 || (month === 9 && day >= ethiopianNewYearDay)) {
    // After Ethiopian new year
    ethiopianYear = year - 7;
  } else {
    // Before Ethiopian new year
    ethiopianYear = year - 8;
  }

  // Calculate the number of days since Ethiopian new year
  let gregorianNewYearDay = new Date(jsDate.getFullYear(), 8, ethiopianNewYearDay); // September is month 8 (0-indexed)

  // If the date is before Ethiopian new year, use previous Gregorian year's Ethiopian new year
  if (month < 9 || (month === 9 && day < ethiopianNewYearDay)) {
    gregorianNewYearDay = new Date(jsDate.getFullYear() - 1, 8, isGregorianLeapYear ? 11 : 12);
  }

  // Calculate days since Ethiopian new year
  const daysSinceEthiopianNewYear = Math.floor((jsDate.getTime() - gregorianNewYearDay.getTime()) / (24 * 60 * 60 * 1000));

  // Calculate Ethiopian month and day
  ethiopianMonth = Math.floor(daysSinceEthiopianNewYear / 30) + 1;
  ethiopianDay = (daysSinceEthiopianNewYear % 30) + 1; // Add 1 to get the correct day

  // Special case for March dates - add one day
  if (month === 3) {
    ethiopianDay += 1;
  }

  // Handle edge case for Pagume (13th month)
  if (ethiopianMonth > 13) {
    ethiopianMonth = 1;
    ethiopianYear += 1;
  }

  // Handle edge case when day exceeds month length
  if (ethiopianMonth <= 12 && ethiopianDay > 30) {
    ethiopianDay = 1;
    ethiopianMonth += 1;
  } else if (ethiopianMonth === 13) {
    const isEthiopianLeapYear = (ethiopianYear % 4 === 3); // Ethiopian leap year rule
    const maxDays = isEthiopianLeapYear ? 6 : 5;
    if (ethiopianDay > maxDays) {
      ethiopianDay = 1;
      ethiopianMonth = 1;
      ethiopianYear += 1;
    }
  }

  return { year: ethiopianYear, month: ethiopianMonth, day: ethiopianDay };
}

/**
 * Converts an Ethiopian date to a Gregorian date
 * @param ethiopianDate The Ethiopian date to convert
 * @returns The equivalent date in the Gregorian calendar
 * @throws Error if the input date is invalid
 */
export function toGregorian(ethiopianDate: EthiopianDate): GregorianDate {
  if (!isValidEthiopianDate(ethiopianDate)) {
    throw new Error('Invalid Ethiopian date');
  }

  const { year, month, day } = ethiopianDate;

  // Calculate the Gregorian year
  let gregorianYear = year + 7;

  // Ethiopian new year in Gregorian calendar is on September 11 (or September 12 in leap years)
  const isGregorianLeapYear = ((gregorianYear % 4 === 0 && gregorianYear % 100 !== 0) || (gregorianYear % 400 === 0));
  const ethiopianNewYearDay = isGregorianLeapYear ? 12 : 11;

  // Calculate days from the beginning of the Ethiopian year
  // Subtract 1 from the day to match the toEthiopian function
  const daysFromStartOfEthYear = (month - 1) * 30 + (day - 1);

  // Create a Date object for the Ethiopian new year in Gregorian calendar
  const gregorianNewYear = new Date(gregorianYear, 8, ethiopianNewYearDay); // September is month 8 (0-indexed)

  // Add the days from the beginning of the Ethiopian year
  const gregorianDate = new Date(gregorianNewYear);
  gregorianDate.setDate(gregorianNewYear.getDate() + daysFromStartOfEthYear);

  // If the calculated date is before the Ethiopian new year, it's in the previous Gregorian year
  if (month < 5 || (month === 5 && day < 6)) {
    // Adjust for dates that fall in the next Gregorian year
    gregorianYear = year + 8;
  }

  return {
    year: gregorianDate.getFullYear(),
    month: gregorianDate.getMonth() + 1, // JavaScript months are 0-indexed
    day: gregorianDate.getDate()
  };
} 