import { useState } from 'react';
import { Sprout, Shield, AlertCircle } from 'lucide-react';
import { sampleFertilizers, samplePesticides } from '../data/sampleData';

export default function Recommendations() {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'pesticide'>('fertilizer');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const cropOptions = [
    'All',
    'Rice',
    'Wheat',
    'Maize',
    'Cotton',
    'Tomato',
    'Potato',
    'Sugarcane',
    'Vegetables',
    'Fruits'
  ];

  const filteredFertilizers = sampleFertilizers.filter((fertilizer) => {
    const matchesCrop =
      !selectedCrop ||
      selectedCrop === 'All' ||
      fertilizer.suitable_for.some(crop => crop.toLowerCase().includes(selectedCrop.toLowerCase()));
    const matchesSearch =
      !searchTerm ||
      fertilizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fertilizer.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  const filteredPesticides = samplePesticides.filter((pesticide) => {
    const matchesCrop =
      !selectedCrop ||
      selectedCrop === 'All' ||
      pesticide.suitable_for.some(crop => crop.toLowerCase().includes(selectedCrop.toLowerCase()));
    const matchesSearch =
      !searchTerm ||
      pesticide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pesticide.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pesticide.target_pest.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Recommendations</h1>
          <p className="text-gray-600">Find the right fertilizers and pesticides for your crops</p>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('fertilizer')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'fertilizer'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Sprout className="h-5 w-5" />
                Fertilizers
              </div>
            </button>
            <button
              onClick={() => setActiveTab('pesticide')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'pesticide'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5" />
                Pesticides
              </div>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder={`Search ${activeTab}s...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Filter by crop</option>
                {cropOptions.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === 'fertilizer' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFertilizers.map((fertilizer, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{fertilizer.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        fertilizer.type === 'Organic'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {fertilizer.type}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Composition</p>
                        <p className="text-gray-600">{fertilizer.composition}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Suitable For</p>
                        <div className="flex flex-wrap gap-2">
                          {fertilizer.suitable_for.map((crop, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Application Method</p>
                        <p className="text-gray-600 text-sm">{fertilizer.application_method}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Recommended Dosage</p>
                        <p className="text-gray-600 text-sm font-medium">{fertilizer.dosage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'pesticide' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPesticides.map((pesticide, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{pesticide.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pesticide.type.includes('Organic')
                          ? 'bg-green-100 text-green-800'
                          : pesticide.type === 'Fungicide'
                          ? 'bg-purple-100 text-purple-800'
                          : pesticide.type === 'Herbicide'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {pesticide.type}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Target Pest</p>
                        <p className="text-gray-600">{pesticide.target_pest}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Suitable For</p>
                        <div className="flex flex-wrap gap-2">
                          {pesticide.suitable_for.map((crop, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded"
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Application Method</p>
                        <p className="text-gray-600 text-sm">{pesticide.application_method}</p>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-yellow-800">Safety Period</p>
                            <p className="text-xs text-yellow-700">{pesticide.safety_period}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {((activeTab === 'fertilizer' && filteredFertilizers.length === 0) ||
              (activeTab === 'pesticide' && filteredPesticides.length === 0)) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No {activeTab}s found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important Safety Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Always read and follow product labels carefully</li>
            <li>• Use protective equipment when handling chemicals</li>
            <li>• Store products in a cool, dry place away from children and animals</li>
            <li>• Follow recommended dosages to avoid crop damage and environmental harm</li>
            <li>• Respect safety periods before harvesting</li>
            <li>• Consult local agricultural experts for specific recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
