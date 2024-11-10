import React from 'react';

const HourlyForecast = ({ hourlyData }) => {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-container">
        {hourlyData && hourlyData.length > 0 ? (
          hourlyData.slice(0, 12).map((temp, index) => (
            <div key={index} className="hourly-item" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <p>Hour {index + 1}</p>
              <p>{temp}°C</p>
            </div>
          ))
        ) : (
          <p>No hourly data available.</p>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;
