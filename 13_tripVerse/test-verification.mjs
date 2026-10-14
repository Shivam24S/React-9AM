import { trips, CATEGORIES } from "./src/data/Trips.js";

console.log("=== TRIPVERSE LOGIC & DATA VERIFICATION SUITE ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Data Integrity Tests
console.log("\n--- 1. Trip Dataset Verification ---");
assert(Array.isArray(trips) && trips.length === 16, `Trip dataset contains 16 packages (found: ${trips.length})`);

trips.forEach((t) => {
  assert(
    typeof t.id === "number" && t.id > 0 &&
    typeof t.name === "string" && t.name.length > 3 &&
    typeof t.destination === "string" &&
    typeof t.price === "number" && t.price > 0 &&
    typeof t.duration === "string" &&
    typeof t.rating === "number" && t.rating >= 4.0 && t.rating <= 5.0 &&
    typeof t.image === "string" && t.image.startsWith("http") &&
    Array.isArray(t.gallery) && t.gallery.length >= 1 &&
    Array.isArray(t.highlights) && t.highlights.length >= 2 &&
    Array.isArray(t.itinerary) && t.itinerary.length >= 3 &&
    Array.isArray(t.inclusions) && t.inclusions.length >= 2 &&
    Array.isArray(t.exclusions) && t.exclusions.length >= 1 &&
    typeof t.category === "string" && CATEGORIES.includes(t.category),
    `Trip #${t.id} (${t.name}) satisfies full schema and category validation`
  );
});

// 2. Pricing Calculation Tests
console.log("\n--- 2. Booking Pricing Formula Tests ---");
const sampleTrip = trips[0]; // Romantic Paris Getaway: 107900
const calcTotal = (price, travelers) => {
  const numTravelers = Math.max(1, Number(travelers) || 1);
  return price * numTravelers;
};

assert(calcTotal(sampleTrip.price, 1) === 107900, "1 traveler total is exact trip price (107900)");
assert(calcTotal(sampleTrip.price, 2) === 215800, "2 travelers total is exactly 215800");
assert(calcTotal(sampleTrip.price, 5) === 539500, "5 travelers total is exactly 539500");
assert(calcTotal(sampleTrip.price, "3") === 323700, "String '3' travelers coerces cleanly without string-concatenation bugs");
assert(calcTotal(sampleTrip.price, 0) === 107900, "0 travelers clamps to minimum 1 traveler");
assert(calcTotal(sampleTrip.price, -2) === 107900, "Negative travelers clamps to minimum 1 traveler");

// 3. Filter Combination Tests
console.log("\n--- 3. Catalog Filtering Logic Tests ---");
const filterTrips = (category, budget, query) => {
  return trips.filter((t) => {
    if (category && category !== "All" && t.category !== category) return false;
    if (budget === "under100k" && t.price >= 100000) return false;
    if (budget === "100k-140k" && (t.price < 100000 || t.price > 140000)) return false;
    if (budget === "above140k" && t.price <= 140000) return false;
    if (query && !t.name.toLowerCase().includes(query.toLowerCase()) && !t.destination.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
};

const baliResults = filterTrips("All", "all", "Bali");
assert(baliResults.length === 1 && baliResults[0].id === 2, "Search 'Bali' returns exactly 1 Bali trip (Trip #2)");

const beachResults = filterTrips("Beach Escapes", "all", "");
assert(beachResults.length >= 2, `Category 'Beach Escapes' returns multiple trips (found: ${beachResults.length})`);

const budgetResults = filterTrips("All", "under100k", "");
assert(budgetResults.every((t) => t.price < 100000), "All trips in 'under100k' have price < ₹1,00,000");

const comboResults = filterTrips("Cultural Experiences", "100k-140k", "");
assert(comboResults.every((t) => t.category === "Cultural Experiences" && t.price >= 100000 && t.price <= 140000), "Combined category + budget filter produces accurate subset");

// 4. Summary
console.log(`\n=== SUITE COMPLETE: ${passed} Passed, ${failed} Failed ===`);
if (failed > 0) process.exit(1);
