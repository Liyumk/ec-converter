/**
 * Interface representing a date in the Ethiopian calendar
 */
export interface EthiopianDate {
  /**
   * Year in Ethiopian calendar (1-9999)
   */
  year: number;

  /**
   * Month in Ethiopian calendar (1-13)
   * Ethiopian calendar has 13 months: 12 months of 30 days each and a 13th month of 5 or 6 days
   */
  month: number;

  /**
   * Day in Ethiopian calendar (1-30 for months 1-12, 1-5 or 1-6 for month 13)
   */
  day: number;
}

/**
 * Interface representing a date in the Gregorian calendar
 */
export interface GregorianDate {
  /**
   * Year in Gregorian calendar
   */
  year: number;

  /**
   * Month in Gregorian calendar (1-12)
   */
  month: number;

  /**
   * Day in Gregorian calendar (1-31, depending on the month)
   */
  day: number;
} 