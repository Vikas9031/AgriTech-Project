import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { sampleCrops } from '../data/sampleData';

export default function CropGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedSoil, setSelectedSoil] = useState('All');

  const seasons = ['All', 'Kharif', 'Rabi', 'Zaid', 'Year-round'];
  const soilTypes = ['All', 'Loamy', 'Clay', 'Sandy', 'Sandy Loam', 'Black'];

  const filteredCrops = sampleCrops.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === 'All' || crop.season === selectedSeason;
    const matchesSoil = selectedSoil === 'All' || crop.soil_type.includes(selectedSoil);
    return matchesSearch && matchesSeason && matchesSoil;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Crop Guide</h1>
          <p className="text-gray-600">Explore crops by season and soil type</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season === 'All' ? 'All Seasons' : season}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedSoil}
                onChange={(e) => setSelectedSoil(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                {soilTypes.map((soil) => (
                  <option key={soil} value={soil}>
                    {soil === 'All' ? 'All Soil Types' : soil}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={crop.image_url}
                alt={crop.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{crop.name}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{crop.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Season:</span>
                    <span className="text-gray-600">{crop.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Soil:</span>
                    <span className="text-gray-600">{crop.soil_type.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Water:</span>
                    <span className="text-gray-600">{crop.water_requirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Temperature:</span>
                    <span className="text-gray-600">{crop.temperature_range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="text-gray-600">{crop.growing_duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
