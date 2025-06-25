import React, { useState } from 'react';
import { MapPin, Star, Wifi, Car, Coffee, Dumbbell, ArrowLeft } from 'lucide-react';

const IntegratedHotelSearchComponent = ({ 
  tripData = null, 
  onBackToTrip = null,
  externalSearchTrigger = false 
}) => {
  // Pre-loaded hotels that will always show
  const [hotels] = useState([
    {
      id: 1,
      name: 'Burj Al Arab Jumeirah',
      rating: 4.9,
      price: 240,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      amenities: ['wifi', 'parking', 'gym', 'restaurant', 'pool'],
      description: 'Iconic luxury hotel with stunning sea views',
      location: 'Jumeirah Beach',
      city: 'Dubai'
    },
    {
      id: 2,
      name: 'Dubai Marina Hotel',
      rating: 4.5,
      price: 180,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      amenities: ['wifi', 'gym', 'restaurant'],
      description: 'Modern hotel in vibrant Marina district',
      location: 'Dubai Marina',
      city: 'Dubai'
    },
    {
      id: 3,
      name: 'The Taj Mahal Palace',
      rating: 4.7,
      price: 140,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['wifi', 'restaurant', 'gym'],
      description: 'Historic luxury hotel overlooking Arabian Sea',
      location: 'Colaba',
      city: 'Mumbai'
    },
    {
      id: 4,
      name: 'Mandarin Oriental Bangkok',
      rating: 4.8,
      price: 110,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
      amenities: ['wifi', 'restaurant', 'pool', 'gym'],
      description: 'Riverside luxury with Thai hospitality',
      location: 'Chao Phraya River',
      city: 'Bangkok'
    }
  ]);

  const [savedDestinations] = useState([
    { id: 1, city: 'Dubai', budget: 250, guests: 2 },
    { id: 2, city: 'Mumbai', budget: 150, guests: 1 },
    { id: 3, city: 'Bangkok', budget: 120, guests: 2 }
  ]);

  const [selectedCity, setSelectedCity] = useState('Dubai');
  const [filteredHotels, setFilteredHotels] = useState(
    hotels.filter(hotel => hotel.city === 'Dubai')
  );

  const searchByCity = (cityName) => {
    setSelectedCity(cityName);
    const cityHotels = hotels.filter(hotel => hotel.city === cityName);
    setFilteredHotels(cityHotels);
  };

  const selectHotel = (hotel) => {
    if (onBackToTrip) {
      onBackToTrip({
        selectedHotel: hotel,
        destination: selectedCity
      });
    } else {
      alert(`Selected: ${hotel.name} in ${hotel.city}`);
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'coffee': return <Coffee className="w-4 h-4" />;
      case 'gym': return <Dumbbell className="w-4 h-4" />;
      case 'restaurant': return <Coffee className="w-4 h-4" />;
      case 'pool': return <div className="w-4 h-4 bg-blue-400 rounded-full"></div>;
      default: return null;
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🏨 Hotel Search Results
            </h1>
            <p className="text-gray-600">
              Currently showing hotels in: <strong>{selectedCity}</strong>
            </p>
          </div>
          {onBackToTrip && (
            <button
              onClick={() => onBackToTrip(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Trip
            </button>
          )}
        </div>
      </div>

      {/* City Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">🌍 Search by City</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedDestinations.map(destination => (
            <button
              key={destination.id}
              onClick={() => searchByCity(destination.city)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCity === destination.city
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">{destination.city}</h4>
                <p className="text-sm text-gray-600">Budget: ${destination.budget}</p>
                <p className="text-sm text-gray-600">Guests: {destination.guests}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Results */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} in {selectedCity}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Hotel+Image';
                }}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${hotel.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>
                
                <div className="mb-2">
                  {renderStars(hotel.rating)}
                </div>
                
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hotel.location}
                </p>
                
                <p className="text-gray-700 mb-3 text-sm">{hotel.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
                      {getAmenityIcon(amenity)}
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => selectHotel(hotel)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                >
                  Select Hotel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">📝 How it works:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Click on different cities above to see available hotels</li>
          <li>• Hotels are filtered by city and show pricing, ratings, and amenities</li>
          <li>• Click "Select Hotel" to choose your accommodation</li>
          <li>• All hotels include essential amenities and location details</li>
        </ul>
      </div>
    </div>
  );
};

export default IntegratedHotelSearchComponent;