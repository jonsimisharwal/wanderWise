import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, Plane, Hotel, Camera, Heart, Share2, Clock, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const TripPlanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get place data from navigation state, fallback to sample data
  const passedPlace = location.state?.place;
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    numberOfTravelers: 1,
    transportation: '',
    accommodation: '',
    activities: [],
    travelerDetails: {
      name: '',
      email: '',
      phone: ''
    }
  });

  // Convert Places data structure to TripPlanner format
  const placeData = passedPlace ? {
    id: passedPlace.id,
    name: passedPlace.name,
    image: passedPlace.image, // Using sample image since Places uses emojis
    description: passedPlace.description,
    rating: passedPlace.rating,
    totalReviews: passedPlace.reviews,
    budget: {
      min: passedPlace.priceLevel === 'budget' ? 5000 : passedPlace.priceLevel === 'mid' ? 15000 : 30000,
      max: passedPlace.priceLevel === 'budget' ? 15000 : passedPlace.priceLevel === 'mid' ? 35000 : 80000
    },
    knownFor: passedPlace.highlights,
    highlights: [
      `Experience ${passedPlace.highlights[0]}`,
      `Discover ${passedPlace.highlights[1]}`,
      `Enjoy ${passedPlace.highlights[2] || 'local culture'}`,
      `Visit ${passedPlace.highlights[3] || 'famous landmarks'}`
    ],
    duration: passedPlace.duration,
    bestTime: passedPlace.bestTime,
    continent: passedPlace.continent,
    category: passedPlace.category,
    transportation: [
      { type: "Flight", price: passedPlace.priceLevel === 'budget' ? "₹8,000 - ₹15,000" : passedPlace.priceLevel === 'mid' ? "₹12,000 - ₹25,000" : "₹20,000 - ₹50,000", duration: "2-8 hours" },
      { type: "Train", price: "₹2,000 - ₹8,000", duration: "8-24 hours" },
      { type: "Bus", price: "₹1,200 - ₹4,000", duration: "10-20 hours" }
    ],
    accommodations: [
      { type: "Luxury Resort", price: passedPlace.priceLevel === 'luxury' ? "₹15,000 - ₹35,000/night" : "₹10,000 - ₹25,000/night", features: "Premium amenities, Spa, Fine dining" },
      { type: "Mid-range Hotel", price: "₹4,000 - ₹12,000/night", features: "Comfortable rooms, Restaurant, Pool" },
      { type: "Budget Hostel", price: "₹800 - ₹3,000/night", features: "Basic facilities, WiFi, Shared spaces" }
    ],
    activities: [
      { name: `${passedPlace.highlights[0]} Experience`, price: "₹2,500", duration: "3-4 hours" },
      { name: `${passedPlace.highlights[1]} Tour`, price: "₹1,800", duration: "4-5 hours" },
      { name: `${passedPlace.highlights[2] || 'Cultural'} Walk`, price: "₹1,200", duration: "3 hours" },
      { name: `${passedPlace.category} Adventure`, price: "₹2,000", duration: "Half day" },
      { name: "Local Food Tour", price: "₹1,500", duration: "3-4 hours" }
    ]
  } : {
    // Fallback sample data (your original hardcoded data)
    id: 1,
    name: "Sample Destination",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    description: "Experience an amazing destination with beautiful sights and rich culture.",
    rating: 4.5,
    totalReviews: 1500,
    budget: { min: 15000, max: 50000 },
    knownFor: ["Beautiful Sights", "Rich Culture", "Great Food", "Adventure"],
    highlights: ["Scenic views", "Cultural sites", "Local cuisine", "Adventure activities"],
    transportation: [
      { type: "Flight", price: "₹8,000 - ₹15,000", duration: "2-3 hours" },
      { type: "Train", price: "₹2,000 - ₹5,000", duration: "12-15 hours" },
      { type: "Bus", price: "₹1,200 - ₹3,000", duration: "14-16 hours" }
    ],
    accommodations: [
      { type: "Luxury Resort", price: "₹12,000 - ₹25,000/night", features: "Beach front, Pool, Spa" },
      { type: "Mid-range Hotel", price: "₹4,000 - ₹8,000/night", features: "Pool, Restaurant, AC" },
      { type: "Budget Hostel", price: "₹800 - ₹2,000/night", features: "Shared facilities, WiFi" }
    ],
    activities: [
      { name: "Sightseeing Tour", price: "₹2,500", duration: "3-4 hours" },
      { name: "Cultural Experience", price: "₹1,200", duration: "4-5 hours" },
      { name: "Food Tour", price: "₹800", duration: "3 hours" },
      { name: "Adventure Activity", price: "₹1,500", duration: "2 hours" },
      { name: "Local Market Visit", price: "₹500", duration: "2 hours" }
    ]
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleActivityToggle = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity.name)
        ? prev.activities.filter(a => a !== activity.name)
        : [...prev.activities, activity.name]
    }));
  };

  const handleBookRequest = () => {
    console.log('Booking request:', formData);
    alert('Booking request submitted! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-purple-900">
      {/* Hero Section with Place Details */}
      <div className="relative">
        <div className="h-96 bg-cover bg-center relative" style={{backgroundImage: `url(${placeData.image})`}}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="text-white p-8 w-full">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">{placeData.name}</h1>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-current" size={24} />
                    <span className="text-xl font-semibold">{placeData.rating}</span>
                    <span className="text-gray-200">({placeData.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-green-400" size={20} />
                    <span>₹{placeData.budget.min.toLocaleString()} - ₹{placeData.budget.max.toLocaleString()}</span>
                  </div>
                  {passedPlace && (
                    <>
                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-400" size={20} />
                        <span>{passedPlace.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-red-400" size={20} />
                        <span>{passedPlace.continent}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                    <Heart size={20} />
                    Save
                  </button>
                  <button className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                    <Share2 size={20} />
                    Share
                  </button>
                  <button className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                    <Camera size={20} />
                    Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Place Description and Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Destination</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{placeData.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Known For</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {placeData.knownFor.map((item, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
              
              {passedPlace && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Best Time:</span>
                    <p className="font-semibold text-gray-800">{passedPlace.bestTime}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Category:</span>
                    <p className="font-semibold text-gray-800 capitalize">{passedPlace.category}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Trip Highlights</h3>
              <div className="space-y-3">
                {placeData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Travel Tip</h4>
                <p className="text-gray-600 text-sm">
                  {passedPlace 
                    ? `Best time to visit is ${passedPlace.bestTime} for optimal weather and experiences.`
                    : 'Plan your trip during the recommended season for the best experience.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Planning Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Plan Your Trip</h2>
          
          {/* Basic Trip Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline mr-2" size={16} />
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline mr-2" size={16} />
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline mr-2" size={16} />
                Number of Travelers
              </label>
              <select
                value={formData.numberOfTravelers}
                onChange={(e) => handleInputChange('numberOfTravelers', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Transportation Options */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Plane className="mr-2" size={20} />
              Choose Transportation
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {placeData.transportation.map((transport, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.transportation === transport.type
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleInputChange('transportation', transport.type)}
                >
                  <h4 className="font-semibold text-gray-800">{transport.type}</h4>
                  <p className="text-purple-600 font-medium">{transport.price}</p>
                  <p className="text-gray-600 text-sm">{transport.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accommodation Options */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Hotel className="mr-2" size={20} />
              Select Accommodation
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {placeData.accommodations.map((accommodation, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.accommodation === accommodation.type
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleInputChange('accommodation', accommodation.type)}
                >
                  <h4 className="font-semibold text-gray-800">{accommodation.type}</h4>
                  <p className="text-purple-600 font-medium">{accommodation.price}</p>
                  <p className="text-gray-600 text-sm">{accommodation.features}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Activities</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {placeData.activities.map((activity, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.activities.includes(activity.name)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleActivityToggle(activity)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-purple-600 font-medium">{activity.price}</span>
                        <span className="text-gray-600 text-sm flex items-center">
                          <Clock size={14} className="mr-1" />
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.activities.includes(activity.name)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.activities.includes(activity.name) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traveler Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Traveler Details</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.travelerDetails.name}
                  onChange={(e) => handleInputChange('travelerDetails.name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.travelerDetails.email}
                  onChange={(e) => handleInputChange('travelerDetails.email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.travelerDetails.phone}
                  onChange={(e) => handleInputChange('travelerDetails.phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Book Request Button */}
          <div className="text-center">
            <button
              onClick={() => {
                handleBookRequest();
                navigate('/bookrequest', { state: { formData, placeData }});
              }}
              className="bg-pink-900 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Send Booking Request
            </button>
            <p className="text-gray-600 text-sm mt-3">We'll contact you within 24 hours with a customized itinerary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;