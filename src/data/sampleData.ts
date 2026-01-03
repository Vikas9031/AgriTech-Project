import { Crop, Fertilizer, Pesticide } from '../lib/supabase';

export const sampleCrops: Omit<Crop, 'id' | 'created_at'>[] = [
  {
    name: 'Rice',
    description: 'Rice is a staple food crop grown in flooded fields. It requires warm temperatures and high humidity. Best suited for areas with adequate water supply.',
    season: 'Kharif',
    soil_type: ['Clay', 'Loamy'],
    water_requirement: 'High',
    temperature_range: '20-35°C',
    growing_duration: '120-150 days',
    image_url: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Wheat',
    description: 'Wheat is a major cereal crop grown in cooler seasons. It thrives in moderate temperatures and well-drained soil.',
    season: 'Rabi',
    soil_type: ['Loamy', 'Clay'],
    water_requirement: 'Medium',
    temperature_range: '10-25°C',
    growing_duration: '120-150 days',
    image_url: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Maize',
    description: 'Maize is a versatile crop that can be grown in multiple seasons. It requires moderate water and warm temperatures.',
    season: 'Kharif',
    soil_type: ['Loamy', 'Sandy Loam'],
    water_requirement: 'Medium',
    temperature_range: '18-32°C',
    growing_duration: '90-120 days',
    image_url: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Cotton',
    description: 'Cotton is a major cash crop requiring warm temperatures and moderate rainfall. It grows best in black cotton soil.',
    season: 'Kharif',
    soil_type: ['Black', 'Loamy'],
    water_requirement: 'Medium',
    temperature_range: '21-30°C',
    growing_duration: '180-200 days',
    image_url: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Tomato',
    description: 'Tomatoes are grown year-round in suitable climates. They require well-drained soil and regular watering.',
    season: 'Year-round',
    soil_type: ['Loamy', 'Sandy Loam'],
    water_requirement: 'Medium',
    temperature_range: '20-30°C',
    growing_duration: '60-90 days',
    image_url: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Sugarcane',
    description: 'Sugarcane is a tropical crop requiring high water and warm temperatures throughout its long growing period.',
    season: 'Year-round',
    soil_type: ['Loamy', 'Clay'],
    water_requirement: 'High',
    temperature_range: '20-35°C',
    growing_duration: '300-365 days',
    image_url: 'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Mustard',
    description: 'Mustard is a winter crop grown for its seeds and oil. It thrives in cool temperatures and well-drained soil.',
    season: 'Rabi',
    soil_type: ['Loamy', 'Sandy Loam'],
    water_requirement: 'Low',
    temperature_range: '10-25°C',
    growing_duration: '90-120 days',
    image_url: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Potato',
    description: 'Potatoes are a cool-season crop grown for tubers. They require well-drained soil and moderate watering.',
    season: 'Rabi',
    soil_type: ['Loamy', 'Sandy Loam'],
    water_requirement: 'Medium',
    temperature_range: '15-25°C',
    growing_duration: '90-120 days',
    image_url: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const sampleFertilizers: Omit<Fertilizer, 'id' | 'created_at'>[] = [
  {
    name: 'Urea',
    type: 'Inorganic',
    composition: '46% Nitrogen',
    suitable_for: ['Rice', 'Wheat', 'Maize', 'Cotton'],
    application_method: 'Broadcast or band application',
    dosage: '100-150 kg per hectare'
  },
  {
    name: 'DAP (Diammonium Phosphate)',
    type: 'Inorganic',
    composition: '18% N, 46% P2O5',
    suitable_for: ['All crops'],
    application_method: 'Basal application during sowing',
    dosage: '100-125 kg per hectare'
  },
  {
    name: 'Potash (MOP)',
    type: 'Inorganic',
    composition: '60% K2O',
    suitable_for: ['Cotton', 'Sugarcane', 'Fruits', 'Vegetables'],
    application_method: 'Soil application',
    dosage: '50-100 kg per hectare'
  },
  {
    name: 'Vermicompost',
    type: 'Organic',
    composition: 'NPK 1.5-2-1.5, Rich in micronutrients',
    suitable_for: ['All crops'],
    application_method: 'Mix with soil before sowing',
    dosage: '5-10 tonnes per hectare'
  },
  {
    name: 'Neem Cake',
    type: 'Organic',
    composition: 'NPK 5-1-2, Natural pest repellent',
    suitable_for: ['Vegetables', 'Fruits', 'Cereals'],
    application_method: 'Mix with soil or as top dressing',
    dosage: '250-500 kg per hectare'
  },
  {
    name: 'NPK 19:19:19',
    type: 'Inorganic',
    composition: '19% each N, P2O5, K2O',
    suitable_for: ['All crops'],
    application_method: 'Foliar spray or fertigation',
    dosage: '2-3 kg per hectare for foliar'
  }
];

export const samplePesticides: Omit<Pesticide, 'id' | 'created_at'>[] = [
  {
    name: 'Chlorpyrifos 20% EC',
    type: 'Insecticide',
    target_pest: 'Termites, Root grubs, Stem borers',
    suitable_for: ['Rice', 'Wheat', 'Cotton', 'Sugarcane'],
    application_method: 'Soil application or foliar spray',
    safety_period: '15 days before harvest'
  },
  {
    name: 'Mancozeb 75% WP',
    type: 'Fungicide',
    target_pest: 'Late blight, Early blight, Leaf spots',
    suitable_for: ['Potato', 'Tomato', 'Vegetables'],
    application_method: 'Foliar spray',
    safety_period: '7 days before harvest'
  },
  {
    name: 'Imidacloprid 17.8% SL',
    type: 'Insecticide',
    target_pest: 'Aphids, Jassids, Whiteflies, Thrips',
    suitable_for: ['Cotton', 'Rice', 'Vegetables'],
    application_method: 'Foliar spray or seed treatment',
    safety_period: '21 days before harvest'
  },
  {
    name: 'Propiconazole 25% EC',
    type: 'Fungicide',
    target_pest: 'Rust, Powdery mildew, Leaf spot',
    suitable_for: ['Wheat', 'Rice', 'Fruits'],
    application_method: 'Foliar spray',
    safety_period: '14 days before harvest'
  },
  {
    name: 'Neem Oil',
    type: 'Organic Insecticide',
    target_pest: 'Various insects, Aphids, Mites',
    suitable_for: ['All crops'],
    application_method: 'Foliar spray',
    safety_period: 'Safe up to harvest'
  },
  {
    name: '2,4-D Sodium Salt',
    type: 'Herbicide',
    target_pest: 'Broad-leaved weeds',
    suitable_for: ['Wheat', 'Rice', 'Sugarcane', 'Maize'],
    application_method: 'Post-emergence spray',
    safety_period: '30 days before harvest'
  }
];
