function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// returns an array of n date strings (YYYY-MM-DD), ending at endDateStr
function lastNDates(endDateStr, n) {
  const end = new Date(endDateStr + "T00:00:00");
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    dates.push(toDateStr(d));
  }
  return dates;
}

module.exports = { lastNDates };
