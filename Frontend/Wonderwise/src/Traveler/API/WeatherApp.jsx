import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Search } from 'lucide-react';

const WeatherApp = ({ onWeatherData, initialCity = 'New York', showSearch = true }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace with your actual WeatherAPI key
  const API_KEY = 'da62748055134d2cbfc170641251406';

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="w-8 h-8 text-yellow-400" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="w-8 h-8 text-gray-300" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="w-8 h-8 text-white" />;
    } else {
      return <Cloud className="w-8 h-8 text-gray-300" />;
    }
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchCity}&days=5&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Call parent function with weather data
      if (onWeatherData) {
        onWeatherData(data);
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    fetchWeather(city);
  };

  // Load default city on mount
  useEffect(() => {
    fetchWeather(initialCity);
  }, [initialCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Search Section */}
        {showSearch && (
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 pr-14"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Weather Forecast Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Cloud className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">Weather Forecast</h1>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="text-white/60 mt-2">Loading...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {weatherData && !loading && (
            <div className="space-y-4">
              {/* Current Location */}
              <div className="text-center mb-6">
                <h2 className="text-xl text-white font-semibold">
                  {weatherData.location.name}, {weatherData.location.country}
                </h2>
              </div>

              {/* Today's Weather */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  {getWeatherIcon(weatherData.current.condition.text)}
                  <div>
                    <h3 className="text-xl font-bold text-white">Today</h3>
                    <p className="text-white/80">{weatherData.current.condition.text}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">
                    {Math.round(weatherData.current.temp_f)}°F
                  </span>
                </div>
              </div>

              {/* Forecast Days */}
              {weatherData.forecast.forecastday.slice(1).map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(day.day.condition.text)}
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {getDayName(day.date)}
                      </h3>
                      <p className="text-white/80">{day.day.condition.text}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      {Math.round(day.day.maxtemp_f)}°F
                    </span>
                    <p className="text-white/60 text-sm">
                      Low: {Math.round(day.day.mintemp_f)}°F
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;