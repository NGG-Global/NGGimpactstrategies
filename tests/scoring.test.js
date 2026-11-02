// Run: node tests/scoring.test.js  (no dependencies)
// Locks the POIS key and norm cut-offs to the original sheets in docs/reference/.
const assert = require('assert');
const P = require('../js/scoring.js');

// 1. Every item 1..26 belongs to exactly one tactic.
const all = Object.values(P.SCORING_KEY).flat().sort((a, b) => a - b);
assert.deepStrictEqual(all, Array.from({ length: 26 }, (_, i) => i + 1), 'each item mapped once');

// 2. Key as printed on the "ריכוז תוצאות" sheet.
assert.deepStrictEqual(P.SCORING_KEY, {
  up: [7, 10, 12, 22], coal: [1, 21], press: [4, 8, 14, 18, 24],
  barg: [5, 9, 16, 23, 25], emo: [2, 6, 11, 13, 17, 19], reason: [3, 15, 20, 26],
});

// 3. Band cut-offs (thick lines at the 30th and 70th percentile on "דף נורמות").
const bands = { // [highest "נמוך", lowest "גבוה"]
  up: [5, 8], coal: [3, 6], press: [9, 14], barg: [8, 12], emo: [14, 19], reason: [12, 16],
};
for (const [id, [lowMax, highMin]] of Object.entries(bands)) {
  const n = P.SCORING_KEY[id].length;
  for (let s = n; s <= 5 * n; s++) {
    const want = s <= lowMax ? 'נמוך' : s >= highMin ? 'גבוה' : 'בינוני';
    assert.strictEqual(P.level(P.pct(id, s)), want, `${id} score ${s}`);
  }
}

// 4. Percentile placement never decreases as the score rises.
for (const id of Object.keys(P.NORMS)) {
  const n = P.SCORING_KEY[id].length;
  for (let s = n + 1; s <= 5 * n; s++) assert.ok(P.pct(id, s) >= P.pct(id, s - 1), `${id} monotonic at ${s}`);
}

// 5. Sum check on a fixed answer set.
const answers = [3,4,5,2,3,4,2,2,3,1,4,2,4,3,5,3,4,2,4,5,3,2,2,3,3,5];
assert.deepStrictEqual(
  Object.fromEntries(Object.keys(P.SCORING_KEY).map(id => [id, P.score(answers, id)])),
  { up: 7, coal: 6, press: 12, barg: 14, emo: 24, reason: 20 }
);

console.log('POIS scoring: all checks passed');
