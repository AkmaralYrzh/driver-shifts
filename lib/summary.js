function summarize(trips) {
  const revenue = trips.reduce((sum, t) => sum + t.amount, 0);
  const commission = trips.reduce((sum, t) => sum + t.commission, 0);
  const cash = trips.filter(t => t.payment === "cash").reduce((sum, t) => sum + t.amount, 0);
  const card = trips.filter(t => t.payment === "card").reduce((sum, t) => sum + t.amount, 0);

  return {
    count: trips.length,
    revenue,
    commission,
    payout: revenue - commission,
    cash,
    card
  };
}

module.exports = { summarize };
