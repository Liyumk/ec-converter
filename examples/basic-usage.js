// Example of using ec-converter

// In a real project, you would import from the package:
// const { toEthiopian, toGregorian } = require('ec-converter');
// For this example, we'll import from our local build:
const { toEthiopian, toGregorian } = require("../dist");

// Get current date in Gregorian calendar
const today = new Date();
const gregorianDate = {
  year: today.getFullYear(),
  month: today.getMonth() + 1, // JavaScript months are 0-indexed
  day: today.getDate(),
};

console.log("Current Gregorian date:", gregorianDate);

// Convert to Ethiopian calendar
try {
  const ethiopianDate = toEthiopian(gregorianDate);
  console.log("Equivalent Ethiopian date:", ethiopianDate);

  // Convert back to Gregorian
  const backToGregorian = toGregorian(ethiopianDate);
  console.log("Back to Gregorian:", backToGregorian);

  // Example with a specific date: Ethiopian New Year (Enkutatash)
  const ethiopianNewYear2016 = { year: 2016, month: 1, day: 1 }; // Meskerem 1, 2016
  const gregorianEnkutatash = toGregorian(ethiopianNewYear2016);
  console.log("Ethiopian New Year 2016 in Gregorian:", gregorianEnkutatash);
} catch (error) {
  console.error("Error:", error.message);
}
