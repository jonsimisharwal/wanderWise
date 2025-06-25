import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Sparkles, Heart,Cloud, Sun,Building, Snowflake,Plane, Leaf, Coffee, Mountain, Waves, Clock, Star, TrendingUp, Umbrella, Car, Music, Flag, Flower,Wallet } from 'lucide-react';
import { TravelTalesFlightResults } from '/src/Traveler/API/flight_integration.jsx';
import IntegratedHotelSearchComponent from './API/HotelSearch.jsx';
import WeatherApp from './API/WeatherApp.jsx';
import CurrencyConverter from './API/CurrencyConverter.jsx';

const TravelTales = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [tripData, setTripData] = useState({
    origin:'',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    mood: '',
    interests: []
  });
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currencyData, setCurrencyData] = useState(null);

  const handleCurrencyData = (data) => {
    console.log('Currency data received:', data);
    /*
    data = {
      localBudget: "¥163,450",        // Formatted for display
      originalBudget: "€1,000.00",    // Original amount
      exchangeRate: 163.45,           // Exchange rate
      targetCurrency: "JPY",          // Target currency code
      baseCurrency: "EUR",            // Base currency code
      destination: "Japan",           // Destination country
      rawAmount: 163450               // Raw converted amount
    }
    */
    
    setCurrencyData(data);
    
    // You can now use this data anywhere in your app
    // For example, update trip budget display, save to state, etc.
  };

  // Add this hook for selected flight
  
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showHotelSearch, setShowHotelSearch] = useState(false);
const [tripDataForHotel, setTripDataForHotel] = useState(null);
     const handleHotelSelection = (hotel) => {
    
   const searchHotels = () => {
  const tripSearchData = {
    tripId: currentTrip.id,
    destination: currentTrip.destination,
    budget: currentTrip.budget,
    guests: currentTrip.guests,
    checkIn: currentTrip.checkIn,
    checkOut: currentTrip.checkOut
  };
}
   
  // Pass data to hotel component
  setShowHotelSearch(true);
  setTripDataForHotel(tripSearchData);
};
const [weatherInfo, setWeatherInfo] = useState(null);

  // Function to handle weather data from WeatherApp
  const handleWeatherData = (weatherData) => {
    setWeatherInfo(weatherData);
    console.log('Weather data received:', weatherData);
  }
  const moods = [
    { id: 'adventure', label: 'Adventure', icon: Mountain, color: 'bg-orange-500', description: 'Thrilling experiences and outdoor activities' },
    { id: 'relaxation', label: 'Relaxation', icon: Umbrella, color: 'bg-blue-500', description: 'Peaceful retreats and spa experiences' },
    { id: 'cultural', label: 'Cultural', icon: Coffee, color: 'bg-purple-500', description: 'Museums, history, and local traditions' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'bg-pink-500', description: 'Intimate dining and scenic views' },
    { id: 'family', label: 'Family', icon: Users, color: 'bg-green-500', description: 'Bonding time journeys' },
    { id: 'party', label: 'Party', icon: Music, color: 'bg-red-500', description: 'Wild nightlife vibes' },
    { id: 'nature', label: 'Nature', icon: Flower, color: 'bg-emerald-500', description: 'Earthy, green retreats' },
    { id: 'spiritual', label: 'Spiritual', icon: Flag, color: 'bg-indigo-500', description: 'Inner peace trips' },
    { id: 'roadtrip', label: 'Road Trip', icon: Car, color: 'bg-purple-500', description: 'Scenic, endless rides' }
  ];
  const mockAccommodations = [
  {
    name: "The Beverly Hills Hotel",
    location: "Beverly Hills, CA",
    type: "Luxury Hotel",
    price: 450,
    rating: 5
  },
  {
    name: "Hotel Figueroa",
    location: "Downtown LA",
    type: "Boutique Hotel",
    price: 180,
    rating: 4
  },
  {
    name: "The Standard Hollywood",
    location: "West Hollywood",
    type: "Modern Hotel",
    price: 220,
    rating: 4
  },
  {
    name: "Mama Shelter LA",
    location: "Hollywood",
    type: "Design Hotel",
    price: 160,
    rating: 4
  },
  {
    name: "Hotel Erwin",
    location: "Venice Beach",
    type: "Beach Hotel",
    price: 280,
    rating: 4
  },
  {
    name: "The LINE Hotel LA",
    location: "Koreatown",
    type: "Contemporary Hotel",
    price: 200,
    rating: 4
  }
];

// Mock Activities Data
const mockActivities = [
  {
    name: "Hollywood Studio Tour",
    description: "Behind-the-scenes look at famous movie studios",
    price: 75,
    duration: "3 hours",
    rating: 4.6
  },
  {
    name: "Griffith Observatory Visit",
    description: "Iconic observatory with city views and planetarium",
    price: 25,
    duration: "2-3 hours",
    rating: 4.7
  },
  {
    name: "Santa Monica Pier",
    description: "Classic boardwalk with rides and ocean views",
    price: 40,
    duration: "Half day",
    rating: 4.3
  },
  {
    name: "Getty Center Museum",
    description: "World-class art museum with stunning architecture",
    price: 20,
    duration: "3-4 hours",
    rating: 4.8
  },
  {
    name: "Venice Beach Walking Tour",
    description: "Explore the bohemian culture and street art",
    price: 35,
    duration: "2 hours",
    rating: 4.2
  },
  {
    name: "Rodeo Drive Shopping",
    description: "Luxury shopping experience in Beverly Hills",
    price: 15,
    duration: "2-4 hours",
    rating: 4.1
  }
];

// Mock Transportation Data
const mockTransportation = [
  {
    type: "Metro Rail",
    description: "Public transit system",
    price: "$1.75/ride",
    color: "bg-blue-500"
  },
  {
    type: "Uber/Lyft",
    description: "Rideshare services",
    price: "$15-40/ride",
    color: "bg-green-500"
  },
  {
    type: "Car Rental",
    description: "Daily rental from major companies",
    price: "$45-80/day",
    color: "bg-orange-500"
  },
  {
    type: "Taxi",
    description: "Traditional taxi service",
    price: "$20-50/ride",
    color: "bg-yellow-500"
  },
  {
    type: "Bus",
    description: "Metro bus network",
    price: "$1.75/ride",
    color: "bg-purple-500"
  }
];
// Mock Weather Data
const mockWeather = [
  {
    day: "Today",
    condition: "Sunny",
    temp: "75°F",
    icon: "☀️"
  },
  {
    day: "Tomorrow",
    condition: "Partly Cloudy",
    temp: "72°F",
    icon: "⛅"
  },
  {
    day: "Friday",
    condition: "Clear",
    temp: "78°F",
    icon: "☀️"
  },
  {
    day: "Saturday",
    condition: "Sunny",
    temp: "80°F",
    icon: "☀️"
  },
  {
    day: "Sunday",
    condition: "Overcast",
    temp: "68°F",
    icon: "☁️"
  }
];

// Mock Currency Data
const mockCurrency = {
  rate: "0.85",
  symbol: "€",
  lastUpdated: "2 hours ago",
  budgetEquivalent: "1,700"
};
  const mockFlights = [
  {
    airline: "Delta Airlines",
    duration: "8h 45m",
    price: 650,
    departure: "JFK 09:15",
    arrival: "LAX 15:00",
    stops: "Direct"
  },
  {
    airline: "American Airlines",
    duration: "11h 20m",
    price: 520,
    departure: "JFK 14:30",
    arrival: "LAX 22:50",
    stops: "1 Stop"
  },
  {
    airline: "United Airlines",
    duration: "9h 15m",
    price: 680,
    departure: "JFK 06:45",
    arrival: "LAX 13:00",
    stops: "Direct"
  },
  {
    airline: "JetBlue Airways",
    duration: "12h 35m",
    price: 480,
    departure: "JFK 19:20",
    arrival: "LAX 04:55+1",
    stops: "1 Stop"
  },
  {
    airline: "Southwest Airlines",
    duration: "10h 10m",
    price: 590,
    departure: "JFK 11:00",
    arrival: "LAX 18:10",
    stops: "1 Stop"
  }
];


  const seasons = [
    { id: 'spring', label: 'Spring', icon: Leaf, color: 'text-green-500' },
    { id: 'summer', label: 'Summer', icon: Sun, color: 'text-yellow-500' },
    { id: 'autumn', label: 'Autumn', icon: Leaf, color: 'text-orange-500' },
    { id: 'winter', label: 'Winter', icon: Snowflake, color: 'text-blue-500' }
  ];

  const generateRecommendations = () => {
    const recommendations = {
      adventure: [
        { name: 'Bungee Jumping in Queenstown', price: '$180', rating: 4.9, image: '🏔️' },
        { name: 'White Water Rafting', price: '$120', rating: 4.7, image: '🌊' },
        { name: 'Mountain Hiking Tours', price: '$85', rating: 4.8, image: '⛰️' }
      ],
      relaxation: [
        { name: 'Luxury Spa Resort', price: '$300/night', rating: 4.9, image: '🧘' },
        { name: 'Beach Yoga Sessions', price: '$45', rating: 4.6, image: '🏖️' },
        { name: 'Sunset Cruise', price: '$95', rating: 4.8, image: '🛥️' }
      ],
      cultural: [
        { name: 'Historic City Walking Tour', price: '$35', rating: 4.7, image: '🏛️' },
        { name: 'Local Cooking Class', price: '$75', rating: 4.8, image: '👨‍🍳' },
        { name: 'Art Museum Pass', price: '$25', rating: 4.5, image: '🎨' }
      ],
      romantic: [
        { name: 'Candlelit Dinner Cruise', price: '$150', rating: 4.9, image: '🕯️' },
        { name: 'Couples Spa Treatment', price: '$220', rating: 4.8, image: '💆' },
        { name: 'Private Wine Tasting', price: '$110', rating: 4.7, image: '🍷' }
      ],
      family: [
        { name: 'Theme Park Adventure', price: '$120', rating: 4.8, image: '🎢' },
        { name: 'Zoo Safari Experience', price: '$65', rating: 4.6, image: '🦁' },
        { name: 'Interactive Science Museum', price: '$45', rating: 4.7, image: '🔬' }
      ],
      party: [
        { name: 'Rooftop Club Experience', price: '$80', rating: 4.5, image: '🍾' },
        { name: 'Beach Party Cruise', price: '$120', rating: 4.7, image: '🏖️' },
        { name: 'Live Music Festival', price: '$150', rating: 4.8, image: '🎵' }
      ],
      nature: [
        { name: 'Forest Hiking Trail', price: '$35', rating: 4.9, image: '🌲' },
        { name: 'Wildlife Photography Tour', price: '$95', rating: 4.8, image: '📸' },
        { name: 'Botanical Garden Visit', price: '$25', rating: 4.6, image: '🌺' }
      ],
      spiritual: [
        { name: 'Meditation Retreat', price: '$200', rating: 4.9, image: '🧘‍♀️' },
        { name: 'Temple Pilgrimage Tour', price: '$75', rating: 4.7, image: '⛩️' },
        { name: 'Sunrise Yoga Session', price: '$45', rating: 4.8, image: '🌅' }
      ],
      roadtrip: [
        { name: 'Scenic Highway Drive', price: '$150/day', rating: 4.8, image: '🛣️' },
        { name: 'Vintage Car Rental', price: '$200/day', rating: 4.7, image: '🚗' },
        { name: 'Road Trip Photography Tour', price: '$120', rating: 4.9, image: '📷' }
      ]
    };

    setAiRecommendations(recommendations[tripData.mood] || []);
    setShowRecommendations(true);
  };

  const handleInputChange = (field, value) => {
    setTripData(prev => ({ ...prev, [field]: value }));
  };
   // Handler for flight selection
    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);
        console.log('Selected flight:', flight);
    }
  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      if (activeStep === 2 && tripData.mood) {
        generateRecommendations();
      }
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Calculate position for circular arrangement
  const getCircularPosition = (index, total, radius = 180) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-purple-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-spin" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mt-10">
              Start Your Journey
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-spin" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let AI craft your perfect adventure based on your mood, budget, and dreams
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  activeStep >= step 
                    ? 'bg-fuchsia-900 text-white shadow-lg scale-110' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
                    activeStep > step ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-24 mt-4">
            <span className="text-sm text-gray-400">Destination</span>
            <span className="text-sm text-gray-400">Preferences</span>
            <span className="text-sm text-gray-400">Budget</span>
            <span className="text-sm text-gray-400">Plan</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-6xl mx-auto bg-black/20 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-8">
          
          {/* Step 1: Basic Trip Info */}
          {activeStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Where do you want to go?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-200">
                    <MapPin className="inline w-5 h-5 mr-2" />
                    Origin
                  </label>
                  <input
                    type="text"
                    value={tripData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    placeholder="Where are u?"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                  </div>
                  <div className='space-y-4'>
                  <label className="block text-lg font-medium text-gray-200">
                    <MapPin className="inline w-5 h-5 mr-2" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={tripData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="Where would you like to explore?"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-200">
                    <Users className="inline w-5 h-5 mr-2" />
                    Number of Travelers
                  </label>
                  <select
                    value={tripData.travelers}
                    onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num} className="bg-gray-800">
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-200">
                    <Calendar className="inline w-5 h-5 mr-2" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={tripData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-200">
                    <Calendar className="inline w-5 h-5 mr-2" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={tripData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Mood & Preferences */}
          {activeStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">What's your travel mood?</h2>
              
              {/* Circular Mood Selection */}
              <div className="relative h-96 flex items-center justify-center mb-12">
                {/* Central Circle */}
                <div className="absolute w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-10">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-white mx-auto mb-1 animate-pulse" />
                    <span className="text-white font-bold text-sm">Choose</span>
                    <span className="text-white font-bold text-sm block">Your Vibe</span>
                  </div>
                </div>

                {/* Circular Mood Options */}
                {moods.map((mood, index) => {
                  const position = getCircularPosition(index, moods.length, 160);
                  const IconComponent = mood.icon;
                  const isSelected = tripData.mood === mood.id;
                  
                  return (
                    <div
                      key={mood.id}
                      onClick={() => handleInputChange('mood', mood.id)}
                      className={`absolute cursor-pointer transition-all duration-500 transform hover:scale-110 group ${
                        isSelected ? 'scale-125 z-20' : 'hover:z-10'
                      }`}
                      style={{
                        left: `calc(50% + ${position.x}px - 3rem)`,
                        top: `calc(50% + ${position.y}px - 3rem)`,
                      }}
                    >
                      {/* Mood Circle */}
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        isSelected 
                          ? `${mood.color} border-white shadow-2xl shadow-pink-500/50` 
                          : `bg-white/10 border-white/30 hover:border-pink-400/60 backdrop-blur-sm`
                      }`}>
                        <IconComponent className={`w-8 h-8 transition-all duration-300 ${
                          isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`} />
                      </div>

                      {/* Mood Label */}
                      <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <span className="text-white font-medium text-sm whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                          {mood.label}
                        </span>
                      </div>

                      {/* Selection Ring Animation */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full border-4 border-pink-400 animate-ping opacity-75"></div>
                      )}

                      {/* Connecting Line to Center */}
                      {isSelected && (
                        <div 
                          className="absolute bg-gradient-to-r from-pink-500 to-purple-500 opacity-50"
                          style={{
                            width: '2px',
                            height: `${Math.sqrt(position.x * position.x + position.y * position.y)}px`,
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'top',
                            transform: `rotate(${Math.atan2(position.y, position.x) * 180 / Math.PI + 90}deg)`
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}

                {/* Orbital Rings */}
                <div className="absolute w-80 h-80 border border-white/10 rounded-full animate-spin-slow opacity-30"></div>
                <div className="absolute w-96 h-96 border border-pink-500/20 rounded-full animate-spin-reverse opacity-20"></div>
              </div>

              {/* Selected Mood Description */}
              {tripData.mood && (
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30 animate-fade-in">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {moods.find(m => m.id === tripData.mood)?.label} Travel
                    </h3>
                    <p className="text-gray-200 text-lg">
                      {moods.find(m => m.id === tripData.mood)?.description}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Preferred Season</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {seasons.map((season) => {
                    const IconComponent = season.icon;
                    return (
                      <button
                        key={season.id}
                        onClick={() => handleInputChange('season', season.id)}
                        className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 transform hover:scale-105 ${
                          tripData.season === season.id
                            ? 'border-pink-500 bg-pink-500/20 text-pink-300 shadow-lg'
                            : 'border-white/20 text-gray-300 hover:border-white/40 bg-white/5'
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 mr-2 ${season.color}`} />
                        {season.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget Planning */}
          {activeStep === 3 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">What's your budget?</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { range:'$200-500',label:'Shoestring Budget',desc:' Hostels, Couchsurfing, Street food only,Walk/public transport only,For backpackers and solo travelers' },
                    { range: '$500-1500', label: 'Budget Explorer', desc: 'Budget hostels or guesthouses Local food joints,Public transport, shared cabs,Perfect for student trips or minimalist travel' },
                    { range: '$1500-3500', label: 'Comfort Traveler', desc: 'Hotels or boutique stays ,Mixed dining (local + fine dining),Mix of public & private transport,Best for families or balanced experience seekers' },
                    { range: '$3500-7000', label: 'Luxury Explorer', desc: 'Premium hotels/resorts,Fine dining & experiences,Private transfers or rentals,Business or luxury holiday travelers' },
                    {range:'$7000+',label:'Ultra Luxury',desc:' Private villas, yachts, jets, Gourmet tasting menus,Helicopter transfers, personal guides,For VIPs, celebrities, or once-in-a-lifetime travel'}
                  ].map((budget, index) => (
                    <div
                      key={index}
                      onClick={() => handleInputChange('budget', budget.range)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        tripData.budget === budget.range
                          ? 'border-pink-500 bg-pink-500/20 shadow-lg shadow-pink-500/25'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-white mb-2">{budget.label}</h3>
                        <p className="text-2xl font-bold text-pink-400 mb-3">{budget.range}</p>
                        <p className="text-sm text-gray-300">{budget.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Custom Budget</h3>
                  <div className="flex items-center space-x-4">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <input
                      type="number"
                      placeholder="Enter your budget"
                      value={tripData.customBudget || ''}
                      onChange={(e) => handleInputChange('customBudget', e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <span className="text-gray-300">USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Recommendations & Final Plan */}
          {activeStep === 4 && (
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Your AI-Curated Journey</h2>
              
              {/* Trip Summary */}
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">Trip Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-200">
                  <div><MapPin className="inline w-5 h-5 mr-2" />Destination: {tripData.destination || 'Not specified'}</div>
                  <div><Users className="inline w-5 h-5 mr-2" />Travelers: {tripData.travelers}</div>
                  <div><Calendar className="inline w-5 h-5 mr-2" />Dates: {tripData.startDate} to {tripData.endDate}</div>
                  <div><Heart className="inline w-5 h-5 mr-2" />Mood: {tripData.mood}</div>
                  <div><Wallet className="inline w-5 h-5 mr-2" />Budget: {tripData.budget}</div>
                </div>
              </div>
 

 {/* Flight Results */}
<div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
    <TravelTalesFlightResults
        searchParams={{
            origin: tripData.origin || '',
            destination: tripData.destination || '',
            departureDate: tripData.startDate || new Date().toISOString().split('T')[0],
            passengers: tripData.travelers || 1,
            maxBudget: tripData.budget || 1000
        }}
        onFlightSelect={handleFlightSelect}
        maxBudget={tripData.budget}
        apiKey="3db772ef062c60cc8a1698b82fd19be8" // You can pass your API key here
    />
</div>

              {/* Accommodation Options */}
<div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30">
  {showHotelSearch && (
    <IntegratedHotelSearchComponent 
      tripData={tripDataForHotel}
      externalSearchTrigger={true}
      onBackToTrip={(hotelData) => {
        if (hotelData) {
          // Save selected hotel to your tripdata
          updateTripWithHotel(hotelData);
        }
        setShowHotelSearch(false);
      }}
    />
  )}
</div>
             

  

              {/* Activities & Experiences */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                  Recommended Activities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockActivities.map((activity, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{activity.name}</h4>
                        <span className="text-white font-bold">${activity.price}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{activity.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{activity.duration}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-gray-300">{activity.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

               {/* Transportation Options */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
                
              </div>

               {/* Weather & Travel Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Weather Forecast */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30">
                    <WeatherApp 
        onWeatherData={handleWeatherData}
        initialCity={tripData.destination} 
        showSearch={true}
      />
                  
                </div>
                   { /* Currency Exchange */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
  <CurrencyConverter
    onCurrencyData={handleCurrencyData}           // Callback to receive data
    initialDestination={tripData.destination}     // Pass destination from tripData
   initialBudget={tripData.customBudget ? tripData.customBudget : tripData.budget}            // Pass budget from tripData
    baseCurrency="EUR"                            // Your base currency
    showControls={false}                          // Hide input controls
    autoConvert={true}                            // Auto convert when component loads
  />
</div>
                  </div>
                
              {/* Budget Breakdown */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Estimated Budget Breakdown
                </h3>
                <div className="space-y-3">
                  {[
                    { category: 'Accommodation', amount: '40%', color: 'bg-blue-500' },
                    { category: 'Activities', amount: '30%', color: 'bg-green-500' },
                    { category: 'Food & Dining', amount: '20%', color: 'bg-yellow-500' },
                    { category: 'Transportation', amount: '10%', color: 'bg-red-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded ${item.color} mr-3`}></div>
                        <span className="text-gray-300">{item.category}</span>
                      </div>
                      <span className="text-white font-medium">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
               )}
               

               
          
            
             

         
             
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handlePrevious}
              disabled={activeStep === 1}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                activeStep === 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-fuchsia-950 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              Previous
            </button>

            {activeStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-fuchsia-950 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Next Step
              </button>
            ) : (
              <button className="px-8 py-4 bg-fuchsia-950 text-white rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Create My Journey
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TravelTales;