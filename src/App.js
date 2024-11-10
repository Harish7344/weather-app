import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeatherData, getCoordinatesFromCity } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import HourlyForecast from './components/HourlyForecast';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Function to reverse geocode the coordinates into a city name
const getCityNameFromCoordinates = async (latitude, longitude) => {
  const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  try {
    const response = await fetch(geoUrl);
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || 'Unknown Location';
  } catch (error) {
    console.error("Error fetching city name:", error);
    return 'Unknown Location';
  }
};

const App = () => {
  const [city, setCity] = useState('');
  const [cityName, setCityName] = useState(''); // To store the city name for display
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);

  // Function to fetch weather data based on latitude and longitude
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(lat, lon);
      console.log('Fetched weather data:', data); // Log the data for debugging
      setWeatherData(data);
      setHourlyData(data.hourly.temperature_2m); // Set hourly temperature data
      setLoading(false);

      // Get city name from coordinates
      const fetchedCityName = await getCityNameFromCoordinates(lat, lon);
      setCityName(fetchedCityName);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to get the user's current location using the geolocation API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude); // Fetch weather for the current location
        },
        (error) => {
          setError('Unable to retrieve your location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
    }
  };

  // Fetch weather for the city or location on initial load or when search is performed
  const handleSearch = async (e) => {
    e.preventDefault();
    if (city) {
      try {
        const coordinates = await getCoordinatesFromCity(city);
        fetchWeather(coordinates.latitude, coordinates.longitude);
      } catch (error) {
        setError('City not found');
      }
    }
  };

  // UseEffect to fetch current location when the app loads
  useEffect(() => {
    setLoading(true);
    getCurrentLocation(); // Automatically fetch weather data for the current location
  }, []); // Empty dependency array ensures this only runs once on initial load

  return (
    <div className={`app ${loading ? 'loading' : ''}`}>
      <h1 className="title">Weather App</h1>
      
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {/* Display the city name dynamically */}
      <h2 className="city-name"><FaMapMarkerAlt className="location-icon" />{cityName || 'Loading your location...'}</h2>
      <WeatherDisplay weatherData={weatherData} loading={loading} error={error} />
      {weatherData && <HourlyForecast hourlyData={hourlyData} />}
    </div>
  );
};

export default App;
