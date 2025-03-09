const { toEthiopian, toGregorian } = require('./dist');

// Test multiple dates
const testDates = [
  { year: 2023, month: 12, day: 25 },
  { year: 2024, month: 4, day: 10 },
  { year: 2025, month: 3, day: 9 }
];

console.log('Testing Gregorian to Ethiopian:');
testDates.forEach(date => {
  console.log(`${date.year}-${date.month}-${date.day} => `, 
    toEthiopian(date));
});
