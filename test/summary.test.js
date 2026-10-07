const test = require("node:test");
const assert = require("node:assert");
const { summarize } = require("../lib/summary");

test("summarize counts trips and sums amounts", () => {
  const trips = [
    { amount: 2400, commission: 360, payment: "card" },
    { amount: 1500, commission: 225, payment: "cash" }
  ];
  const s = summarize(trips);
  assert.strictEqual(s.count, 2);
  assert.strictEqual(s.revenue, 3900);
  assert.strictEqual(s.commission, 585);
  assert.strictEqual(s.payout, 3315);
  assert.strictEqual(s.cash, 1500);
  assert.strictEqual(s.card, 2400);
});

test("summarize on empty list returns zeros", () => {
  const s = summarize([]);
  assert.strictEqual(s.count, 0);
  assert.strictEqual(s.revenue, 0);
  assert.strictEqual(s.payout, 0);
});
