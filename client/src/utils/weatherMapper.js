// model-supported weather tokens
export const WEATHER_TYPES = {
  CLOUDY_WITHOUT_WIND: "cloudywithoutwind",
  WINDY: "windy",
  SUNNY: "sunny",
  CLOUDY: "cloudy",
  RAINY: "rainy",
};

// scalable mapping function
export function mapWeatherToModel(rawWeather) {
  const w = rawWeather.toLowerCase();

  if (w.includes("rain")) return WEATHER_TYPES.RAINY;
  if (w.includes("wind")) return WEATHER_TYPES.WINDY;
  if (w.includes("sun") || w.includes("clear")) return WEATHER_TYPES.SUNNY;
  if (w.includes("cloud") && !w.includes("wind"))
    return WEATHER_TYPES.CLOUDY_WITHOUT_WIND;

  return WEATHER_TYPES.CLOUDY; // safe fallback
}
