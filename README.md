# EC-Converter

A JavaScript/TypeScript library for converting between Ethiopian calendar and Gregorian calendar.

![npm](https://img.shields.io/npm/v/ec-converter)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Liyumk/ec-converter/npm-publish.yml)

## Features

- Convert dates from Gregorian to Ethiopian calendar
- Convert dates from Ethiopian to Gregorian calendar
- Validate dates in both calendar systems
- Written in TypeScript with full type definitions
- Zero dependencies
- Comprehensive test coverage

## Installation

```bash
npm install ec-converter
```

or

```bash
yarn add ec-converter
```

## Usage

### Converting from Gregorian to Ethiopian

```typescript
import { toEthiopian } from 'ec-converter';

// September 11, 2023 (Gregorian) -> Meskerem 1, 2016 (Ethiopian)
const ethiopianDate = toEthiopian({ year: 2023, month: 9, day: 11 });
console.log(ethiopianDate);
// Output: { year: 2016, month: 1, day: 1 }
```

### Converting from Ethiopian to Gregorian

```typescript
import { toGregorian } from 'ec-converter';

// Meskerem 1, 2016 (Ethiopian) -> September 11, 2023 (Gregorian)
const gregorianDate = toGregorian({ year: 2016, month: 1, day: 1 });
console.log(gregorianDate);
// Output: { year: 2023, month: 9, day: 11 }
```

### Validating Dates

```typescript
import { isValidEthiopianDate, isValidGregorianDate } from 'ec-converter';

// Check if a Gregorian date is valid
console.log(isValidGregorianDate({ year: 2023, month: 2, day: 29 }));
// Output: false (2023 is not a leap year)

// Check if an Ethiopian date is valid
console.log(isValidEthiopianDate({ year: 2016, month: 13, day: 6 }));
// Output: true (2016 is a leap year in Ethiopian calendar)
```

## Ethiopian Calendar Overview

The Ethiopian calendar:

- Is approximately 7-8 years behind the Gregorian calendar
- Has 13 months: 12 months of 30 days each and a 13th month of 5 or 6 days
- Has a leap year every 4 years, similar to the Gregorian calendar but with different rules
- Starts its new year on what is September 11 (or September 12 in leap years) in the Gregorian calendar

### Month Names

1. Meskerem (መስከረም) - 30 days
2. Tikimt (ጥቅምት) - 30 days
3. Hidar (ኅዳር) - 30 days
4. Tahsas (ታኅሣሥ) - 30 days
5. Tir (ጥር) - 30 days
6. Yekatit (የካቲት) - 30 days
7. Megabit (መጋቢት) - 30 days
8. Miyazya (ሚያዝያ) - 30 days
9. Ginbot (ግንቦት) - 30 days
10. Sene (ሰኔ) - 30 days
11. Hamle (ሐምሌ) - 30 days
12. Nehase (ነሐሴ) - 30 days
13. Pagume (ጳጉሜ) - 5 or 6 days

## License

MIT 