# Weather App

This is a simple React-based weather application that allows users to get weather information for a specific city or their current location. The app fetches weather data from the Open-Meteo API and displays real-time weather conditions, hourly forecasts, and more.

## Features

- **Current weather data**: Displays current temperature, weather condition, and the time of the weather data.
- **Hourly forecast**: Shows hourly temperature data for the next 12 hours.
- **Location-based weather**: Automatically detects and fetches weather for the user's current location.
- **Search for a city**: Allows users to search for weather in any city by name.
- **Responsive design**: The app is designed to work on desktop and mobile devices.

## Components

### 1. `App`
This is the main component that handles the state of the application, including weather data, location, and search functionality. It uses:
- `SearchBar`: A component that allows the user to search for weather data by entering a city name.
- `WeatherDisplay`: Displays the current weather information, including temperature and condition.
- `HourlyForecast`: Shows the hourly temperature forecast for the next 12 hours.

### 2. `SearchBar`
A functional component with an input field for entering a city name. It uses the `setCity` function to update the city state and triggers a weather search when the form is submitted.

### 3. `WeatherDisplay`
Displays the current weather data, including:
- Current temperature in Celsius.
- Local time of the weather data.
- Weather condition with corresponding icons.

### 4. `HourlyForecast`
Displays hourly temperature data for the next 12 hours. The data is fetched from the weather API and displayed in individual hourly blocks.

### 5. `weatherService.js`
Contains the logic for interacting with external APIs:
- `fetchWeatherData`: Fetches weather data from Open-Meteo API based on latitude and longitude.
- `getCoordinatesFromCity`: Fetches latitude and longitude from the city name using OpenStreetMap’s Nominatim API.
- `getCurrentLocation`: Uses the browser's geolocation API to fetch the current location of the user.

## Setup

### Prerequisites

- **Node.js**: You should have Node.js installed on your machine.
- **NPM/Yarn**: You can use either NPM or Yarn for package management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Harish7344/weather-app.git
   cd weather-app

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000`.

---

## Folder Structure

- **`src/`**: Main source directory containing React components and styles.
  - **`components/`**:
    - `HourlyForecast.js`: A component that renders hourly forecast details.
    - `SearchBar.js`: A component for the search bar and search logic.
    - `WeatherDisplay.js`: A component for the .
  - **`services/`**:
    - `WeatherService.js`: Contains the API calls.
  - **`utils/`**:
    - `gelocation.js`: Contains the location finder / navigator.
  - **`App.js`**: The main component that contains the core logic for fetching weather and managing state.
  - **`index.js`**: The entry point for rendering the app.
  - **`App.css`**: Contains the custom styles for the app.

---

## How It Works

### Fetching Weather Data
- When the app loads, it automatically fetches the user's current location using the browser's **Geolocation API** (`getCurrentLocation`).
- Once the coordinates are obtained, the app fetches weather data using the `fetchWeatherData` function from the **Open-Meteo API**.

### City Search
- Users can search for weather information in any city by entering the city name into the search bar.
- The `handleSearch` function converts the city name into latitude and longitude using the `getCoordinatesFromCity` function, and then fetches weather data using the retrieved coordinates.

### Hourly Forecast
- The app displays hourly temperature data for the next 12 hours. It slices the first 12 hourly temperatures and displays them in individual hourly blocks.

### Dynamic City Name
- When weather data is fetched, the app dynamically displays the city name based on the retrieved coordinates. 
- It also handles cases where the city name cannot be found (e.g., invalid coordinates or errors during reverse geocoding).

## API Endpoints

### 1. Open-Meteo API (Weather data)
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Parameters**:
  - `latitude`: Latitude of the location.
  - `longitude`: Longitude of the location.
  - `hourly`: A comma-separated list of the hourly data to be fetched. (For example, `temperature_2m` for hourly temperature data).
  
  **Example API URL**:
  ```bash
  https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&hourly=temperature_2m

### 2. OpenStreetMap Nominatim API (Geocoding)
- **Endpoint**: `https://nominatim.openstreetmap.org/search`
- **Parameters**:
  - `q`: The city name.
  - `format`: Set to `json` to return the result in JSON format.
  
  **Example API URL**:
  ```bash
  https://nominatim.openstreetmap.org/search?q=Berlin&format=json&limit=1

### 3. Reverse Geocoding (Get City Name from Coordinates)
- **Endpoint**: `https://nominatim.openstreetmap.org/reverse`
- **Parameters**:
  - `lat`: Latitude.
  - `lon`: Longitude.
  - `format`: Set to `json` to return the result in JSON format.
  
  **Example API URL**:
  ```bash
  https://nominatim.openstreetmap.org/reverse?lat=52.52&lon=13.405&format=json

## Styling

The app uses basic CSS styles, which are included in the `index.css` and `App.css` files. You can customize the styles as needed.

## Notes

- The app uses **icons from React Icons** (e.g., `FaSun`, `FaCloud`, etc.) to represent different weather conditions.
- **Error handling**: Proper error messages are displayed when:
  - No weather data is available.
  - The city entered by the user cannot be found.
  - The browser does not support geolocation.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
