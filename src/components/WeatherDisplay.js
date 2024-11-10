import React from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const WeatherDisplay = ({ weatherData, loading, error }) => {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Ensure weatherData exists before accessing it
  if (!weatherData || !weatherData.hourly || !weatherData.hourly.temperature_2m) {
    return <div className="error">No weather data available.</div>;
  }

  const currentTemperature = weatherData.hourly.temperature_2m[0]; // Use the first available hourly temperature
  const currentTimeUTC = weatherData.hourly.time[0]; // Get the time corresponding to that temperature
  
  // Convert UTC time to local time
  const currentTime = new Date(currentTimeUTC); // Create a Date object from the UTC time
  const localTime = currentTime.toLocaleTimeString(); // Format it to local time string

  // Placeholder weather condition - you can use actual weather condition from API
  const weatherCondition = "clear"; // For example, "clear", "cloudy", "rainy", etc.

  const renderWeatherIcon = (condition) => {
    switch (condition) {
      case 'clear':
        return <FaSun className="weather-condition-icon" />;
      case 'cloudy':
        return <FaCloud className="weather-condition-icon" />;
      case 'rainy':
        return <FaCloudRain className="weather-condition-icon" />;
      case 'snowy':
        return <FaSnowflake className="weather-condition-icon" />;
      default:
        return <FaCloud className="weather-condition-icon" />;
    }
  };

  return (
    <div className="weather-container">
      <h2 className="city-name">Weather Information</h2>
      <div className="weather-info">
        <div className="weather-detail">
          <h3>Current Temperature</h3>
          <p>{currentTemperature}°C</p>
        </div>
        <div className="weather-detail">
          <h3>Time</h3>
          <p>{localTime}</p> {/* Display the local time */}
        </div>
        <div className="weather-detail">
          <h3>Condition</h3>
          <div>
            {renderWeatherIcon(weatherCondition)}
            <p>{weatherCondition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
