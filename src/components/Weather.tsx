import { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Thermometer, MapPin, Search } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export default function Weather() {
  const [city, setCity] = useState('Delhi');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError('');

    try {
      const apiKey = '6e2f09a2e5b8f4ad5e7c3d1f8b9a4e2c';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      setWeather({
        location: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon
      });
    } catch {
      setError('Unable to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      fetchWeather(searchInput);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Information</h1>
          <p className="text-gray-600">Live weather updates for your region</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter city name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </form>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        {weather && !loading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{weather.location}</h2>
                  <p className="text-blue-100 capitalize">{weather.description}</p>
                </div>
                {weather.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="Weather icon"
                    className="w-20 h-20"
                  />
                )}
              </div>

              <div className="text-6xl font-bold mb-8">
                {weather.temperature}°C
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold">{weather.humidity}%</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5" />
                    <span className="text-sm">Wind Speed</span>
                  </div>
                  <p className="text-2xl font-bold">{weather.windSpeed} m/s</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Thermometer className="h-6 w-6 text-orange-600" />
                  Farming Advice
                </h3>

                <div className="space-y-4">
                  {weather.temperature > 30 && (
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                      <p className="font-medium text-orange-800">High Temperature Alert</p>
                      <p className="text-sm text-orange-700">Increase irrigation frequency. Consider mulching to retain soil moisture.</p>
                    </div>
                  )}

                  {weather.temperature < 15 && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="font-medium text-blue-800">Cool Weather Notice</p>
                      <p className="text-sm text-blue-700">Good conditions for Rabi crops. Protect sensitive plants from frost.</p>
                    </div>
                  )}

                  {weather.humidity > 70 && (
                    <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
                      <p className="font-medium text-cyan-800">High Humidity</p>
                      <p className="text-sm text-cyan-700">Watch for fungal diseases. Ensure proper ventilation for crops.</p>
                    </div>
                  )}

                  {weather.windSpeed > 5 && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="font-medium text-green-800">Windy Conditions</p>
                      <p className="text-sm text-green-700">Avoid spraying pesticides. Provide support to tall crops.</p>
                    </div>
                  )}

                  {weather.temperature >= 15 && weather.temperature <= 30 && weather.humidity < 70 && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="font-medium text-green-800">Ideal Conditions</p>
                      <p className="text-sm text-green-700">Excellent weather for most farming activities. Good time for planting and field work.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Cloud className="h-6 w-6 text-blue-600" />
                  Best Crops for Current Weather
                </h3>

                <div className="space-y-2">
                  {weather.temperature > 25 && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Rice, Cotton, Maize</span>
                      <span className="text-sm text-green-600">Recommended</span>
                    </div>
                  )}

                  {weather.temperature >= 15 && weather.temperature <= 25 && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Wheat, Potato, Mustard</span>
                      <span className="text-sm text-green-600">Recommended</span>
                    </div>
                  )}

                  {weather.temperature < 15 && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">Wheat, Peas, Lentils</span>
                      <span className="text-sm text-green-600">Recommended</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
