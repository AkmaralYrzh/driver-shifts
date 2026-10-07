const express = require("express");
const { summarize } = require("./lib/summary");
const { lastNDates } = require("./lib/weekly");
const store = require("./lib/store");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/api/trips", (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: "query param 'date' is required, format YYYY-MM-DD" });
  }
  const trips = store.getTripsByDate(date);
  res.json({ trips, summary: summarize(trips) });
});

app.get("/api/weekly", (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: "query param 'date' is required, format YYYY-MM-DD" });
  }
  const days = lastNDates(date, 7).map(d => ({
    date: d,
    payout: summarize(store.getTripsByDate(d)).payout
  }));
  res.json({ days });
});

app.post("/api/trips", (req, res) => {
  const trip = req.body;
  if (!trip.id || !trip.start || !trip.end || typeof trip.amount !== "number" || !trip.payment) {
    return res.status(400).json({ error: "invalid trip: id, start, end, amount, payment are required" });
  }
  try {
    const added = store.addTrip(trip);
    res.status(added ? 201 : 200).json({ added });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
