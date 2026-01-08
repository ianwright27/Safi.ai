import { mapWeatherToModel } from "./weatherMapper";

export function weatherCodeToModel(weathercode, windspeed) {
  // Open-Meteo weather codes (simplified)
  if ([61, 63, 65, 80, 81, 82].includes(weathercode)) {
    return "rainy";
  }

  if (windspeed > 10) {
    return "windy";
  }

  if ([0].includes(weathercode)) {
    return "sunny";
  }

  if ([1, 2, 3].includes(weathercode)) {
    return windspeed > 5
      ? "windy"
      : "cloudywithoutwind";
  }

  return "cloudy";
}
