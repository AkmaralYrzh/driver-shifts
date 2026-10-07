const test = require("node:test");
const assert = require("node:assert");
const store = require("../lib/store");

test("addTrip rejects a duplicate id", () => {
  const trip = {
    id: "dup-1", start: "2026-10-05T10:00:00+05:00", end: "2026-10-05T10:10:00+05:00",
    amount: 1000, payment: "cash", commission: 150
  };
  assert.strictEqual(store.addTrip(trip), true);
  assert.strictEqual(store.addTrip(trip), false);
});

test("addTrip rejects amount <= 0", () => {
  assert.throws(() => store.addTrip({
    id: "bad-amount", start: "2026-10-05T10:00:00+05:00", end: "2026-10-05T10:10:00+05:00",
    amount: 0, payment: "cash", commission: 0
  }));
});

test("addTrip rejects end before start", () => {
  assert.throws(() => store.addTrip({
    id: "bad-time", start: "2026-10-05T10:10:00+05:00", end: "2026-10-05T10:00:00+05:00",
    amount: 500, payment: "cash", commission: 75
  }));
});
