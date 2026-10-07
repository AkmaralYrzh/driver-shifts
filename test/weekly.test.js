const test = require("node:test");
const assert = require("node:assert");
const { lastNDates } = require("../lib/weekly");

test("lastNDates returns 7 consecutive dates ending at the given date", () => {
  const dates = lastNDates("2026-10-07", 7);
  assert.strictEqual(dates.length, 7);
  assert.strictEqual(dates[0], "2026-10-01");
  assert.strictEqual(dates[6], "2026-10-07");
});

test("lastNDates handles month boundaries", () => {
  const dates = lastNDates("2026-10-02", 7);
  assert.strictEqual(dates[0], "2026-09-26");
  assert.strictEqual(dates[6], "2026-10-02");
});
