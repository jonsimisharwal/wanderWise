import React, { useState, useEffect, useCallback } from 'react';
import { Plane, Clock, MapPin, DollarSign, Users, Calendar, Filter, AlertCircle, RefreshCw } from 'lucide-react';

// Enhanced Flight Service that generates dynamic results based on search parameters
class TravelTalesFlightService {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('API key is required for flight search');
        }
        this.apiKey = apiKey;
        this.baseUrl = 'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search';
    }

    async searchFlights(searchParams) {
        try {
            console.log('Searching flights with params:', searchParams);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Generate dynamic flight data based on search parameters
            return this.generateDynamicFlightData(searchParams);
        } catch (error) {
            console.error('Flight search error:', error);
            throw error;
        }
    }

    generateDynamicFlightData(searchParams) {
        const { origin, destination, departureDate, passengers, maxBudget } = searchParams;
        
        // Airport database for realistic airport names
        const airports = {
            'NYC': { name: 'John F. Kennedy International Airport', city: 'New York' },
            'JFK': { name: 'John F. Kennedy International Airport', city: 'New York' },
            'LGA': { name: 'LaGuardia Airport', city: 'New York' },
            'LAX': { name: 'Los Angeles International Airport', city: 'Los Angeles' },
            'SFO': { name: 'San Francisco International Airport', city: 'San Francisco' },
            'CHI': { name: 'O\'Hare International Airport', city: 'Chicago' },
            'ORD': { name: 'O\'Hare International Airport', city: 'Chicago' },
            'MIA': { name: 'Miami International Airport', city: 'Miami' },
            'DEN': { name: 'Denver International Airport', city: 'Denver' },
            'SEA': { name: 'Seattle-Tacoma International Airport', city: 'Seattle' },
            'BOS': { name: 'Logan International Airport', city: 'Boston' },
            'ATL': { name: 'Hartsfield-Jackson International Airport', city: 'Atlanta' },
            'DFW': { name: 'Dallas/Fort Worth International Airport', city: 'Dallas' },
            'LAS': { name: 'McCarran International Airport', city: 'Las Vegas' },
            'PHX': { name: 'Sky Harbor International Airport', city: 'Phoenix' },
            'DC': { name: 'Ronald Reagan Washington National Airport', city: 'Washington' },
            'DCA': { name: 'Ronald Reagan Washington National Airport', city: 'Washington' },
        };

        // Airlines database
        const airlines = [
            { code: 'AA', name: 'American Airlines' },
            { code: 'DL', name: 'Delta Airlines' },
            { code: 'UA', name: 'United Airlines' },
            { code: 'SW', name: 'Southwest Airlines' },
            { code: 'JB', name: 'JetBlue Airways' },
            { code: 'AS', name: 'Alaska Airlines' },
            { code: 'B6', name: 'JetBlue' },
            { code: 'F9', name: 'Frontier Airlines' },
        ];

        // Calculate base price based on route distance and popularity
        const basePrice = this.calculateBasePrice(origin, destination);
        const departDate = new Date(departureDate);
        
        // Generate 3-6 flight options with varying characteristics
        const numFlights = Math.floor(Math.random() * 4) + 3;
        const flights = [];

        for (let i = 0; i < numFlights; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const stops = this.generateStops();
            const { duration, price } = this.calculateFlightDetails(basePrice, stops, passengers);
            
            // Skip flights that exceed budget
            if (maxBudget && price > maxBudget) {
                continue;
            }

            const departureTime = this.generateDepartureTime(i);
            const arrivalTime = this.calculateArrivalTime(departureTime, duration);

            flights.push({
                id: `flight_${origin}_${destination}_${i}`,
                price: {
                    amount: price,
                    currency: 'USD',
                    formatted: `$${price}`
                },
                bookingUrl: `https://example.com/book/${i}`,
                legs: [{
                    id: `leg_${i}`,
                    origin: {
                        code: origin,
                        name: airports[origin]?.name || `${origin} Airport`,
                        city: airports[origin]?.city || origin
                    },
                    destination: {
                        code: destination,
                        name: airports[destination]?.name || `${destination} Airport`,
                        city: airports[destination]?.city || destination
                    },
                    departure: {
                        time: departureTime.toISOString(),
                        formatted: departureTime.toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                        })
                    },
                    arrival: {
                        time: arrivalTime.toISOString(),
                        formatted: arrivalTime.toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                        })
                    },
                    duration: {
                        minutes: duration,
                        formatted: this.formatDuration(duration)
                    },
                    stops: stops,
                    airline: airline
                }],
                totalDuration: duration,
                totalStops: stops,
                tags: this.generateTags(stops, price, basePrice)
            });
        }

        // Sort flights by various criteria for more realistic results
        flights.sort((a, b) => a.price.amount - b.price.amount);

        return {
            success: true,
            flights: flights,
            totalResults: flights.length,
            searchInfo: {
                origin: origin,
                destination: destination,
                departureDate: departureDate,
                passengers: passengers,
                tripType: searchParams.tripType
            }
        };
    }

    calculateBasePrice(origin, destination) {
        // Simple distance-based pricing simulation
        const routes = {
            'NYC-LAX': 450, 'LAX-NYC': 450,
            'NYC-SFO': 400, 'SFO-NYC': 400,
            'NYC-CHI': 200, 'CHI-NYC': 200,
            'NYC-MIA': 250, 'MIA-NYC': 250,
            'LAX-SFO': 150, 'SFO-LAX': 150,
            'CHI-LAX': 350, 'LAX-CHI': 350,
            'NYC-BOS': 120, 'BOS-NYC': 120,
            'NYC-DC': 100, 'DC-NYC': 100,
        };

        const routeKey = `${origin}-${destination}`;
        const basePrice = routes[routeKey] || 300;
        
        // Add some randomness (±20%)
        const variation = basePrice * 0.2;
        return Math.floor(basePrice + (Math.random() - 0.5) * variation);
    }

    generateStops() {
        const rand = Math.random();
        if (rand < 0.4) return 0; // 40% direct flights
        if (rand < 0.8) return 1; // 40% one stop
        return 2; // 20% two stops
    }

    calculateFlightDetails(basePrice, stops, passengers) {
        // Duration increases with stops
        let duration = 180 + Math.random() * 300; // 3-8 hours base
        duration += stops * 90; // Add 1.5 hours per stop
        duration = Math.floor(duration);

        // Price decreases with more stops but varies
        let price = basePrice;
        if (stops === 1) price *= 0.8;
        if (stops === 2) price *= 0.6;
        
        // Add random variation
        price *= (0.8 + Math.random() * 0.4);
        price = Math.floor(price);

        return { duration, price };
    }

    generateDepartureTime(index) {
        const baseDate = new Date();
        baseDate.setHours(6 + index * 3, Math.random() * 60, 0, 0);
        return baseDate;
    }

    calculateArrivalTime(departureTime, durationMinutes) {
        return new Date(departureTime.getTime() + durationMinutes * 60000);
    }

    generateTags(stops, price, basePrice) {
        const tags = [];
        
        if (stops === 0) tags.push({ label: 'Direct', type: 'success' });
        if (stops === 1) tags.push({ label: '1 Stop', type: 'info' });
        if (stops >= 2) tags.push({ label: 'Multiple Stops', type: 'warning' });
        
        if (price <= basePrice * 0.7) tags.push({ label: 'Great Deal', type: 'success' });
        if (price <= basePrice * 0.5) tags.push({ label: 'Best Value', type: 'success' });
        
        return tags;
    }

    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
}

// Flight Results Component (same as before, no changes needed)
const TravelTalesFlightResults = ({ 
    searchParams = {},
    onFlightSelect = () => {},
    maxBudget = null,
    apiKey,
    className = ""
}) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('price');
    const [filterStops, setFilterStops] = useState('all');

    const searchFlights = useCallback(async () => {
        if (!searchParams.origin || !searchParams.destination) {
            setError('Origin and destination are required');
            return;
        }

        if (!apiKey) {
            setError('API key is required for flight search');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const flightService = new TravelTalesFlightService(apiKey);

            const departureDate = new Date(searchParams.departureDate);
            if (isNaN(departureDate.getTime())) {
                throw new Error('Invalid departure date');
            }

            const apiSearchParams = {
                origin: searchParams.origin,
                destination: searchParams.destination,
                departureDate: searchParams.departureDate,
                passengers: searchParams.passengers || 1,
                tripType: searchParams.tripType || 'one-way',
                maxBudget: maxBudget
            };

            console.log('Searching flights with params:', apiSearchParams);
            
            const results = await flightService.searchFlights(apiSearchParams);
            
            if (results.success && results.flights) {
                setFlights(results.flights);
                console.log(`Found ${results.totalResults} flights`);
            } else {
                setError(results.error || 'No flights found for your search criteria');
                setFlights([]);
            }
            
        } catch (err) {
            console.error('Flight search error:', err);
            setError(err.message || 'Failed to search flights. Please try again.');
            setFlights([]);
        } finally {
            setLoading(false);
        }
    }, [searchParams, maxBudget, apiKey]);

    useEffect(() => {
        if (searchParams.origin && searchParams.destination && apiKey) {
            searchFlights();
        }
    }, [searchFlights]);

    const filteredAndSortedFlights = flights
        .filter(flight => {
            if (maxBudget && flight.price.amount > maxBudget) return false;
            if (filterStops === 'direct' && flight.totalStops > 0) return false;
            if (filterStops === 'oneStop' && flight.totalStops !== 1) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price': return a.price.amount - b.price.amount;
                case 'duration': return a.totalDuration - b.totalDuration;
                case 'departure': return new Date(a.legs[0].departure.time) - new Date(b.legs[0].departure.time);
                default: return 0;
            }
        });

    if (loading) {
        return (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mr-3" />
                    <span className="text-gray-600">Searching for flights...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
                <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <div className="text-red-600 font-medium mb-2">Search Error</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={searchFlights}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <Plane className="mr-2" size={24} />
                        Flight Options
                    </h2>
                    <div className="text-sm text-gray-500">
                        {filteredAndSortedFlights.length} of {flights.length} flights
                    </div>
                </div>

                {/* Search Info */}
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4">
                    <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{searchParams.origin} → {searchParams.destination}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>{searchParams.departureDate}</span>
                    </div>
                    <div className="flex items-center">
                        <Users size={16} className="mr-1" />
                        <span>{searchParams.passengers || 1} passenger(s)</span>
                    </div>
                    {maxBudget && (
                        <div className="flex items-center">
                            <DollarSign size={16} className="mr-1" />
                            <span>Max ${maxBudget}</span>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Filter size={16} />
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="price">Sort by Price</option>
                            <option value="duration">Sort by Duration</option>
                            <option value="departure">Sort by Departure</option>
                        </select>
                    </div>
                    <select 
                        value={filterStops} 
                        onChange={(e) => setFilterStops(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Flights</option>
                        <option value="direct">Direct Only</option>
                        <option value="oneStop">1 Stop</option>
                    </select>
                </div>
            </div>

            {/* Flight Results */}
            <div className="divide-y divide-gray-200">
                {filteredAndSortedFlights.map((flight) => (
                    <div key={flight.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                            {/* Flight Info */}
                            <div className="flex-1">
                                {flight.legs.map((leg, index) => (
                                    <div key={index} className="mb-4 last:mb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-8">
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{leg.departure.formatted}</div>
                                                    <div className="text-sm text-gray-600">{leg.origin.code}</div>
                                                    <div className="text-xs text-gray-500">{leg.origin.city}</div>
                                                </div>
                                                
                                                <div className="flex-1 text-center min-w-0">
                                                    <div className="flex items-center justify-center mb-1">
                                                        <div className="h-px bg-gray-300 flex-1"></div>
                                                        <Plane size={16} className="text-gray-400 mx-2" />
                                                        <div className="h-px bg-gray-300 flex-1"></div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">{leg.duration.formatted}</div>
                                                    {leg.stops > 0 && (
                                                        <div className="text-xs text-orange-600">{leg.stops} stop(s)</div>
                                                    )}
                                                </div>
                                                
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{leg.arrival.formatted}</div>
                                                    <div className="text-sm text-gray-600">{leg.destination.code}</div>
                                                    <div className="text-xs text-gray-500">{leg.destination.city}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 text-center">
                                            {leg.airline.name} {leg.airline.code && `• ${leg.airline.code}`}
                                        </div>
                                    </div>
                                ))}

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {flight.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                                                tag.type === 'success' ? 'bg-green-100 text-green-800' :
                                                tag.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                tag.type === 'info' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Price & Book */}
                            <div className="ml-6 text-right flex-shrink-0">
                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                    {flight.price.formatted}
                                </div>
                                <div className="text-sm text-gray-500 mb-3">per person</div>
                                <button 
                                    onClick={() => onFlightSelect(flight)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium min-w-max"
                                >
                                    Select Flight
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAndSortedFlights.length === 0 && flights.length > 0 && (
                <div className="p-6 text-center text-gray-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No flights match your current filters.</p>
                    <p className="text-sm">Try adjusting your search criteria.</p>
                </div>
            )}

            {flights.length === 0 && !loading && !error && (
                <div className="p-6 text-center text-gray-500">
                    <Plane className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>Enter your travel details to search for flights</p>
                </div>
            )}
        </div>
    );
};

// Enhanced Integration Component with editable search parameters
const TravelTalesFlightIntegration = ({ 
    apiKey = '3db772ef062c60cc8a1698b82fd19be8'
}) => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [tripData, setTripData] = useState({
        origin: 'NYC',
        destination: 'LAX', 
        startDate: '2024-07-15',
        travelers: 2,
        budget: 500
    });

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);
        console.log('Flight selected:', flight);
    };

    const handleInputChange = (field, value) => {
        setTripData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">
            {/* API Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    <div className="text-sm text-blue-800">
                        <strong>Dynamic Demo:</strong> Results now change based on your search inputs! Try different routes, dates, and budgets.
                    </div>
                </div>
            </div>

            {/* Search Form */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Flights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <input
                            type="text"
                            placeholder="e.g., NYC, JFK"
                            value={tripData.origin}
                            onChange={(e) => handleInputChange('origin', e.target.value.toUpperCase())}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <input
                            type="text"
                            placeholder="e.g., LAX, SFO"
                            value={tripData.destination}
                            onChange={(e) => handleInputChange('destination', e.target.value.toUpperCase())}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                        <input
                            type="date"
                            value={tripData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                        <input
                            type="number"
                            min="1"
                            max="9"
                            value={tripData.travelers}
                            onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget ($)</label>
                        <input
                            type="number"
                            min="50"
                            value={tripData.budget}
                            onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                
                {/* Popular Routes Quick Selection */}
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Popular routes:</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { from: 'NYC', to: 'LAX' },
                            { from: 'NYC', to: 'SFO' },
                            { from: 'CHI', to: 'LAX' },
                            { from: 'NYC', to: 'MIA' },
                            { from: 'BOS', to: 'SEA' },
                        ].map(route => (
                            <button
                                key={`${route.from}-${route.to}`}
                                onClick={() => {
                                    handleInputChange('origin', route.from);
                                    handleInputChange('destination', route.to);
                                }}
                                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                            >
                                {route.from} → {route.to}
                            </button>
                        ))}
                    </div>
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
                        tripType: 'one-way'
                    }}
                    onFlightSelect={handleFlightSelect}
                    maxBudget={tripData.budget}
                    apiKey={apiKey}
                />
            </div>

            {/* Selected Flight Confirmation */}
            {selectedFlight && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-green-900">Flight Selected!</h3>
                            <p className="text-sm text-green-700">
                                {selectedFlight.legs[0].origin.code} → {selectedFlight.legs[0].destination.code} 
                                for {selectedFlight.price.formatted} per person
                            </p>
                            <p className="text-xs text-green-600">
                                Total cost for {tripData.travelers} travelers: ${selectedFlight.price.amount * tripData.travelers}
                            </p>
                        </div>
                        <button 
                            onClick={() => setSelectedFlight(null)}
                            className="text-green-600 hover:text-green-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export { TravelTalesFlightIntegration,TravelTalesFlightResults};