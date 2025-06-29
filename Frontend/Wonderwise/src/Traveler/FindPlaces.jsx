import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Search, Filter, Heart, Star, DollarSign, Clock, Sun, Camera, MapPin, Plane, Car, Ship, Train } from 'lucide-react';

const Places = () => {
  const navigate = useNavigate(); // Add this hook
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGridCols = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const categories = [
    { id: 'all', label: 'All', icon: MapPin, color: 'text-white' },
    { id: 'adventure', label: 'Adventure', icon: MapPin, color: 'text-green-400' },
    { id: 'culture', label: 'Culture', icon: MapPin, color: 'text-purple-400' },
    { id: 'beach', label: 'Beach', icon: MapPin, color: 'text-blue-400' },
    { id: 'nature', label: 'Nature', icon: MapPin, color: 'text-green-500' },
    { id: 'city', label: 'City', icon: MapPin, color: 'text-gray-400' }
  ];

  const continents = ['all', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];

  const places = [
    {
      id: 1,
      name: 'Tokyo, Japan',
      continent: 'Asia',
      category: 'city',
      description: 'Experience the perfect blend of traditional culture and cutting-edge technology in Japan\'s vibrant capital.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
      rating: 4.8,
      reviews: 2847,
      price: '$$$',
      priceLevel: 'luxury',
      duration: '5-7 days',
      bestTime: 'Mar-May',
      highlights: ['Temples', 'Sushi', 'Cherry Blossoms', 'Technology'],
      transportation: ['plane', 'train']
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      continent: 'Europe',
      category: 'beach',
      description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters make this Greek island paradise unforgettable.',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 1923,
      price: '$$',
      priceLevel: 'mid',
      duration: '3-5 days',
      bestTime: 'Apr-Oct',
      highlights: ['Sunsets', 'Beaches', 'Wine', 'Architecture'],
      transportation: ['plane', 'ship']
    },
    {
      id: 3,
      name: 'Machu Picchu, Peru',
      continent: 'South America',
      category: 'adventure',
      description: 'Discover the ancient Incan citadel high in the Andes mountains, one of the New Seven Wonders of the World.',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 3156,
      price: '$$',
      priceLevel: 'mid',
      duration: '4-6 days',
      bestTime: 'May-Sep',
      highlights: ['Hiking', 'History', 'Ruins', 'Mountains'],
      transportation: ['plane', 'train']
    },
    {
      id: 4,
      name: 'Paris, France',
      continent: 'Europe',
      category: 'culture',
      description: 'The City of Light offers world-class museums, iconic landmarks, and unparalleled romantic atmosphere.',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop',
      rating: 4.6,
      reviews: 4521,
      price: '$$$',
      priceLevel: 'luxury',
      duration: '4-7 days',
      bestTime: 'Apr-Jun',
      highlights: ['Eiffel Tower', 'Louvre', 'Cafés', 'Fashion'],
      transportation: ['plane', 'train']
    },
    {
      id: 5,
      name: 'Bali, Indonesia',
      continent: 'Asia',
      category: 'beach',
      description: 'Tropical paradise with beautiful beaches, ancient temples, and rich cultural heritage.',
       image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop',
      rating: 4.5,
      reviews: 2134,
      price: '$',
      priceLevel: 'budget',
      duration: '7-10 days',
      bestTime: 'Apr-Oct',
      highlights: ['Beaches', 'Temples', 'Rice Terraces', 'Yoga'],
      transportation: ['plane']
    },
    {
      id: 6,
      name: 'Serengeti, Tanzania',
      continent: 'Africa',
      category: 'nature',
      description: 'Witness the great migration and incredible wildlife in one of Africa\'s most famous national parks.',
       image: 'https://picsum.photos/600/400?random=1',
      rating: 4.8,
      reviews: 1456,
      price: '$$$',
      priceLevel: 'luxury',
      duration: '5-8 days',
      bestTime: 'Jun-Oct',
      highlights: ['Safari', 'Wildlife', 'Migration', 'Photography'],
      transportation: ['plane', 'car']
    }
  ];

  const getTransportIcon = (transport) => {
    switch(transport) {
      case 'plane': return Plane;
      case 'car': return Car;
      case 'ship': return Ship;
      case 'train': return Train;
      default: return Car;
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Filter places based on search and filters
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = searchTerm === '' || 
                           place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           place.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      const matchesContinent = selectedContinent === 'all' || place.continent === selectedContinent;
      const matchesPrice = priceRange === 'all' || place.priceLevel === priceRange;

      return matchesSearch && matchesCategory && matchesContinent && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedContinent, priceRange]);

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Travel Destinations</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore breathtaking destinations curated for every type of traveler
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, activities, or experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-lg shadow-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'border-pink-500 bg-pink-500/20 text-pink-300 shadow-md'
                      : 'border-white/20 text-gray-300 hover:border-white/40 bg-white/5 hover:shadow-md'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 mr-2 ${category.color}`} />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Advanced Filters Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center mx-auto px-6 py-3 bg-white/10 border border-white/20 rounded-full text-gray-300 hover:border-white/40 hover:shadow-md transition-all duration-300"
            >
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-6 space-y-6 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-200 mb-3 font-medium">Continent</label>
                  <select
                    value={selectedContinent}
                    onChange={(e) => setSelectedContinent(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {continents.map(continent => (
                      <option key={continent} value={continent} className="bg-gray-800">
                        {continent === 'all' ? 'All Continents' : continent}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-200 mb-3 font-medium">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="all" className="bg-gray-800">All Budgets</option>
                    <option value="budget" className="bg-gray-800">Budget ($)</option>
                    <option value="mid" className="bg-gray-800">Mid-range ($$)</option>
                    <option value="luxury" className="bg-gray-800">Luxury ($$$)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-300">
            Showing <span className="text-pink-400 font-semibold">{filteredPlaces.length}</span> amazing destinations
          </p>
        </div>

        {/* Places Grid - Responsive */}
        <div 
          className="gap-6 w-full max-w-7xl mx-auto px-4"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`
          }}
        >
          {filteredPlaces.map(place => (
            <div key={place.id} className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 overflow-hidden hover:border-pink-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              {/* Image Header */}
              <div className="relative p-8 bg-gradient-to-br from-indigo-100 to-purple-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-6xl">{place.image}</div>
                  <button
                    onClick={() => toggleFavorite(place.id)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      favorites.includes(place.id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={favorites.includes(place.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/20 rounded-full text-xs text-gray-800 backdrop-blur-sm">
                    {place.continent}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                  <p className="text-gray-700 text-sm overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>{place.description}</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-gray-900 font-medium ml-1">{place.rating}</span>
                  </div>
                  <span className="text-gray-600 text-sm">({place.reviews} reviews)</span>
                  <div className="ml-auto flex items-center text-green-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium">{place.price}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {place.highlights.slice(0, 3).map((highlight, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    {place.duration}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                    {place.bestTime}
                  </div>
                </div>

                {/* Transportation */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Travel by:</span>
                  {place.transportation.map((transport, index) => {
                    const TransportIcon = getTransportIcon(transport);
                    return (
                      <TransportIcon key={index} className="w-4 h-4 text-gray-600" />
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      navigate('/tripplanner', { state: { place } });
                    }}
                    className="flex-1 bg-pink-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-pink-800 transition-all duration-300 shadow-md"
                  >
                    Plan Trip
                  </button>
                  <button className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-200 transition-all duration-300">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No places found</h3>
            <p className="text-gray-300 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedContinent('all');
                setPriceRange('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;