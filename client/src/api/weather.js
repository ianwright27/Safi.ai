// export async function fetchWeather(lat, lon) {
//   const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

//   const res = await fetch(url);
//   const data = await res.json();

//   return {
//     temperature: data.current_weather.temperature,
//     windspeed: data.current_weather.windspeed,
//     weathercode: data.current_weather.weathercode,
//   };
// }
export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast
    ?latitude=${lat}
    &longitude=${lon}
    &current=temperature_2m,wind_speed_10m,weather_code
    &timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");

  const data = await res.json();

  return {
    temperature: data.current.temperature_2m,
    windspeed: data.current.wind_speed_10m,
    weathercode: data.current.weather_code,
  };
}
