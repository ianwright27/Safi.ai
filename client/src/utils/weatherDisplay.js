export function formatWeatherDisplay({ temperature, windspeed }) {
  if (windspeed > 10) {
    return `${temperature}°C · Windy`;
  }

  return `${temperature}°C · Calm`;
}
