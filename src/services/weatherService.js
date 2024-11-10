// src/services/weatherService.js
export const fetchWeatherData = async (latitude, longitude) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`; //,time
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data;
};

export const getCoordinatesFromCity = async (city) => {
  const geoUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  if (data.length === 0) {
    throw new Error('City not found');
  }
  const { lat, lon } = data[0];
  return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
};
