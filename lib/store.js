const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "trips.json");

let trips = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

function getTripsByDate(date) {
  return trips.filter(t => t.start.startsWith(date));
}

// returns true if the trip was added, false if it was a duplicate (same id)
function addTrip(trip) {
  if (!(trip.amount > 0)) {
    throw new Error("amount must be greater than 0");
  }
  if (!(new Date(trip.end) > new Date(trip.start))) {
    throw new Error("end must be later than start");
  }
  if (trips.some(t => t.id === trip.id)) {
    return false;
  }
  trips.push(trip);
  return true;
}

module.exports = { getTripsByDate, addTrip };
