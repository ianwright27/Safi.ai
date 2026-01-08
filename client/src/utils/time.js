export function timeToMinutes(timeStr) {
  // timeStr format: "HH:MM"
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
