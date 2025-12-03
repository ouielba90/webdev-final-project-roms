export function isoToeuDate(isoDateStr) {
  if (!isoDateStr) return "";
  const [year, month, day] = isoDateStr.split("T")[0].split("-");
  return `${day}-${month}-${year}`;
}

export function daysBetweenDates(isoDateStr) {
  if (!isoDateStr) return null;
  const givenDate = new Date(isoDateStr);
  const today = new Date();
  const diffDays = Math.floor((givenDate - today) / (1000 * 60 * 60 * 24));
  return diffDays;
}
