// client/src/api/collect-data.js

/**
 * Send collected smoke data to the backend for storage/processing.
 * @param {Object} data - The form data to collect (date, times, special day, etc.)
 * @returns {Promise<Object>} - JSON response from backend
 */
export async function collectSmokeData(data) {
  const LOCAL_API_URL = "http://localhost:8000/collect-data"; // local dev
  const PRODUCTION_API_URL = import.meta.env.VITE_API_URL + "/collect-data"; // production

  const response = await fetch(PRODUCTION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to collect smoke data");
  }

  return response.json();
}
