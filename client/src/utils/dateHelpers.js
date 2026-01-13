// utils/dateHelpers.jsx

/**
 * Converts a JS Date object or string (yyyy-mm-dd) to "YYYY-MM-DD"
 * Example: 2025-10-03
 */
export function formatDateToYYYYMMDD(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return ""; // fallback
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDate(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return ""; // fallback
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Converts a time string ("HH:MM") or Date object to "HHMM" format
 * Example: "17:17" -> "1717"
 */
export function formatTimeToHHMM(timeInput) {
  if (!timeInput) return "";
  
  if (typeof timeInput === "string") {
    // If already "HH:MM", just remove the colon
    return timeInput.replace(":", "");
  }

  const date = new Date(timeInput);
  if (isNaN(date)) return "";

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}${mm}`;
}

/**
 * Returns the day of the week as string from a date input
 * Example: "2025-10-03" -> "Friday"
 */
export function getDayFromDate(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "";

  const options = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
export function getDayOfWeek(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "";

  const options = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}