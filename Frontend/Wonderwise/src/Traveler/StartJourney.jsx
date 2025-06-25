import React, { useState, useEffect } from 'react';
import { Plane, Zap, Users, Star, Heart, Share2, Mountain,Compass,Camera,Search, Cpu, Globe, Rocket, Navigation, Brain, MapPin, BookOpen, MessageSquare, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const StartJourney = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [likedStories, setLikedStories] = useState(new Set());
  const [animateCards, setAnimateCards] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleFind = () => {
    if (source && destination) {
      console.log(`Planning route from ${source} to ${destination}`);
      // Here you would integrate with a mapping service like Google Maps API
    }
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };


  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const destinations = [
    {
      id: 1,
      name: "Bali Paradise",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=500&fit=crop",
      color: "from-green-400 to-blue-500",
      aiScore: 9.8,
      flightTime: "14h 30m",
      aiRecommendation: "Perfect weather & cultural experiences"
    },
    {
      id: 2,
      name: "Swiss Alpine",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
      color: "from-orange-400 to-red-500",
      aiScore: 9.9,
      flightTime: "8h 45m",
      aiRecommendation: "Adventure seeker's dream destination"
    },
    {
      id: 3,
      name: "Tokyo Metropolis",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop",
      color: "from-pink-400 to-purple-500",
      aiScore: 9.7,
      flightTime: "12h 15m",
      aiRecommendation: "Modern meets traditional harmony"
    },
    {
      id: 4,
      name: "Santorini Sunset",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=500&fit=crop",
      color: "from-blue-400 to-cyan-500",
      aiScore: 9.6,
      flightTime: "10h 20m",
      aiRecommendation: "Romantic getaway perfection"
    },
    {
      id: 5,
      name: "Safari Adventure",
      country: "Kenya",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop",
      color: "from-amber-400 to-orange-500",
      aiScore: 9.5,
      flightTime: "16h 45m",
      aiRecommendation: "Wildlife experience of a lifetime"
    },
    {
      id: 6,
      name: "Northern Lights",
      country: "Iceland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=500&fit=crop",
      color: "from-purple-400 to-indigo-500",
      aiScore: 9.4,
      flightTime: "6h 30m",
      aiRecommendation: "Aurora visibility: 92% this season"
    }
  ];

  const travelStories = [
    {
      id: 1,
      title: "7 Days in Tokyo: A First-Timer's Guide",
      author: "Sarah Chen",
      destination: "Tokyo",
      readTime: "5 min read",
      likes: 124,
      aiRating: 9.8,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      excerpt: "From bustling Shibuya to serene temples, discover the perfect balance of modern and traditional Japan...",
      tags: ["Travel Guide", "Culture", "City Guide"],
      gradient: "from-pink-500 to-orange-500",
      category: "Cultural Experience"
    },
    {
      id: 2,
      title: "Budget Backpacking Through Europe",
      author: "Mike Thompson",
      destination: "Europe",
      readTime: "8 min read",
      likes: 89,
      aiRating: 9.5,
      image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=300&fit=crop",
      excerpt: "How I traveled 12 countries in 30 days for under $1500. Tips, tricks, and hidden gems...",
      tags: ["Budget Travel", "Backpacking", "Europe"],
      gradient: "from-blue-500 to-purple-500",
      category: "Budget Adventure"
    },
    {
      id: 3,
      title: "Bali's Hidden Temples & Beaches",
      author: "Emma Rodriguez",
      destination: "Bali",
      readTime: "6 min read",
      likes: 156,
      aiRating: 9.7,
      image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=300&fit=crop",
      excerpt: "Discover secret spots away from tourist crowds. Authentic Balinese experiences await...",
      tags: ["Hidden Gems", "Spiritual", "Beach Life"],
      gradient: "from-green-500 to-teal-500",
      category: "Spiritual Journey"
    },
    {
      id: 4,
      title: "Swiss Alps Adventure: Beyond Skiing",
      author: "David Kim",
      destination: "Switzerland",
      readTime: "7 min read",
      likes: 203,
      aiRating: 9.6,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
      excerpt: "Hiking trails, mountain villages, and authentic Swiss experiences beyond the slopes...",
      tags: ["Adventure", "Mountains", "Hiking"],
      gradient: "from-orange-500 to-red-500",
      category: "Adventure Sports"
    },
    {
      id: 5,
      title: "Santorini Sunset Magic",
      author: "Lisa Johnson",
      destination: "Greece",
      readTime: "4 min read",
      likes: 178,
      aiRating: 9.4,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
      excerpt: "The most romantic sunset spots and local secrets for the perfect Greek island getaway...",
      tags: ["Romance", "Photography", "Sunset"],
      gradient: "from-blue-500 to-cyan-500",
      category: "Romantic Escape"
    },
    {
      id: 6,
      title: "Kenya Safari: Wildlife Photography Tips",
      author: "Alex Turner",
      destination: "Kenya",
      readTime: "9 min read",
      likes: 142,
      aiRating: 9.3,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      excerpt: "Capture the Big Five and stunning landscapes with these expert photography techniques...",
      tags: ["Wildlife", "Photography", "Safari"],
      gradient: "from-amber-500 to-orange-500",
      category: "Wildlife Adventure"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      initial: "S",
      rating: 5,
      comment: "The AI recommendations were spot-on! Found hidden gems in Prague I never would have discovered on my own.",
      trip: "Prague Trip",
      timeAgo: "2 weeks ago",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 2,
      name: "Mike T.",
      initial: "M",
      rating: 5,
      comment: "Saved me hours of planning! The personalized itinerary was perfect for my family vacation in Thailand.",
      trip: "Thailand Trip",
      timeAgo: "1 month ago",
      gradient: "from-green-400 to-teal-500"
    },
    {
      id: 3,
      name: "Emma R.",
      initial: "E",
      rating: 5,
      comment: "Incredible experience! The AI found activities that perfectly matched my interests and budget.",
      trip: "Italy Adventure",
      timeAgo: "3 weeks ago",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 4,
      name: "David L.",
      initial: "D",
      rating: 5,
      comment: "Best travel planner ever! The local recommendations were absolutely authentic and amazing.",
      trip: "Morocco Journey",
      timeAgo: "1 week ago",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  const toggleLike = (storyId) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const analyzeWithAI = () => {
    setAiAnalyzing(true);
    setTimeout(() => setAiAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 size-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 size-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 size-3 bg-amber-400 rounded-full animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-purple-600 py-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Plane className="size-12 text-white mr-4 animate-pulse" />
              <Brain className="size-6 text-cyan-300 absolute -top-1 -right-1 animate-spin" style={{animationDuration: '3s'}} />
            </div>
            <h1 className="text-5xl font-bold text-white">
              AeroAI
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            AI-Powered Travel Planning - Discover, Plan, Experience
          </p>
          <button 
            onClick={analyzeWithAI}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center mx-auto"
          >
            <Cpu className={`size-5 mr-2 ${aiAnalyzing ? 'animate-spin' : ''}`} />
            {aiAnalyzing ? 'AI Analyzing Preferences...' : 'Plan My Perfect Trip'}
          </button>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
       <div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-20 left-10 text-purple-300/20 animate-pulse">
    <Mountain size={80} />
  </div>
  <div className="absolute top-40 right-20 text-purple-300/20 animate-bounce">
    <Globe size={60} />
  </div>
  <div className="absolute bottom-32 left-20 text-purple-300/20 animate-pulse">
    <Camera size={50} />
  </div>
  <div className="absolute bottom-20 right-32 text-purple-300/20 animate-bounce">
    <Compass size={70} />
  </div>
</div>

<div className="relative z-10 max-w-6xl ml-9 mr-5 w-full items-center">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    {/* Left side - Quote and Search */}
    <div className="space-y-8 ml-12">
      {/* Quote section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-purple-700/50 rounded-full backdrop-blur-sm">
            <MapPin className="text-purple-900" size={24} />
          </div>
          <div className="h-1 flex-1 bg-gradient-to-r from-purple-400 to-transparent rounded"></div>
        </div>
        
        <blockquote className="text-4xl lg:text-5xl font-bold text-purple-900 leading-tight">
          "The world is a book, and those who do 
          <span className="text-transparent bg-clip-text bg-purple-900"> not travel</span> read only 
          <span className="text-transparent bg-clip-text bg-purple-900">one page</span>."
        </blockquote>
        
        <p className="text-purple-900 text-lg italic">- Saint Augustine</p>
      </div>
      
      {/* Search section */}
      <div className="relative">
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your next adventure..."
            className="w-full px-6 py-4 pl-14 text-white placeholder-purple-300 bg-purple-800/30 backdrop-blur-md border border-purple-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-200 transition-colors" size={20} />
          
          <button
            onClick={()=>{handleSearch,
              navigate('/FindPlaces')
            }
            }
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium"
          >
            Explore
          </button>
        </div>
      </div>
    </div>

<div className="space-y-8 ml-12 mr-8">
    {/* Right side - Stats section */}
    <div className="flex flex-col justify-center items-center ">
      <div className="grid grid-cols-2 gap-8 text-center ">
        {[
          { number: '195', label: 'Countries' },
          { number: '7', label: 'Continents' },
          { number: '∞', label: 'Adventures' },
          { number: '1', label: 'Life' }
        ].map((stat, index) => (
          <div key={index} className="p-8 bg-purple-800/30 backdrop-blur-sm rounded-3xl border border-purple-600/30 hover:bg-purple-700/40 transition-all duration-300 transform hover:scale-105 w-60 h-57 ">
            <div className="text-3xl font-bold text-purple-200 mb-3">
              {stat.number}
            </div>
            <div className="text-purple-200 text-lg font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      </div>
    
    </div></div>
  
</div>
      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Globe className="size-8 text-cyan-400 mr-3 animate-spin" style={{animationDuration: '10s'}} />
          <h2 className="text-3xl font-bold text-white">AI-Curated Destinations</h2>
          <div className="ml-auto flex items-center bg-green-500/20 px-3 py-1 rounded-full">
            <Zap className="size-4 text-green-400 mr-1" />
            <span className="text-green-400 text-sm">AI Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`group relative overflow-hidden rounded-2xl transform transition-all duration-700 hover:scale-105 cursor-pointer border border-cyan-500/20 hover:border-cyan-400/60 ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                backgroundImage: `url(${destination.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '320px'
              }}
              onClick={() => setSelectedTrip(destination)}
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-70 group-hover:opacity-50 transition-opacity duration-300`}></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              {/* AI Score Badge */}
              <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                <Brain className="size-4 text-white mr-1" />
                <span className="text-white font-bold">{destination.aiScore}</span>
              </div>

              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-white/90 mb-2">{destination.country}</p>
                  <p className="text-cyan-300 text-sm mb-3">{destination.aiRecommendation}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      <Navigation className="size-4 mr-1" />
                      {destination.flightTime}
                    </div>
                    <div className="size-8 bg-cyan-500/30 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <MapPin className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Stories Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <BookOpen className="size-8 text-purple-400 mr-3 animate-pulse" />
            <h2 className="text-3xl font-bold text-white">Travel Stories & Guides</h2>
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center bg-purple-500/20 px-3 py-1 rounded-full">
                <span className="size-2 bg-purple-400 rounded-full animate-pulse mr-2"></span>
                <span className="text-purple-400 text-sm">AI Personalized</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {travelStories.map((story, index) => (
                <div
                  key={story.id}
                  className={`flex-none w-80 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${story.gradient} opacity-70`}></div>
                    
                    {/* AI Rating Badge */}
                    <div className="absolute top-4 left-4 bg-cyan-500/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                      <Brain className="size-3 text-white mr-1" />
                      <span className="text-white text-xs font-bold">{story.aiRating}</span>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => toggleLike(story.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          likedStories.has(story.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`size-4 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-300">
                        <Share2 className="size-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {story.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-cyan-500/30 text-cyan-200 text-xs rounded-full border border-cyan-400/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{story.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{story.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>by {story.author}</span>
                      <div className="flex items-center">
                        <Heart className="size-4 text-red-400 mr-1" />
                        <span className="text-red-400">{story.likes}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Camera className="size-4 mr-1 text-cyan-400" />
                          <span>{story.readTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="size-4 mr-1 text-amber-400" />
                          <span>{story.aiRating}</span>
                        </div>
                      </div>
                      <div className="text-cyan-300 text-xs">{story.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Feedback Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Users className="size-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">Community Feedback</h2>
            <div className="ml-auto flex items-center bg-emerald-500/20 px-3 py-1 rounded-full">
              <Award className="size-4 text-yellow-400 mr-1" />
              <span className="text-blue-400 text-sm">4.8 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-purple-900 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-105 ${
                  animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`size-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {testimonial.initial}
                  </div>
                  <div className="ml-3">
                    <h5 className="font-semibold text-white">{testimonial.name}</h5>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="size-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  "{testimonial.comment}"
                </p>
                <div className="text-xs text-gray-500">
                  {testimonial.trip} • {testimonial.timeAgo}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-indigo-950 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Community Stats</h3>
              <p className="text-gray-300">Powered by AI, trusted by travelers worldwide</p>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">4.8</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">12K+</div>
                <div className="text-sm text-gray-300">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">500+</div>
                <div className="text-sm text-gray-300">Destinations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-purple-950 rounded-2xl p-12 border border-cyan-500/30">
            <MessageSquare className="size-16 mx-auto mb-6 text-white opacity-90" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Planning?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Your perfect trip is just a click away. Let our AI create a personalized travel experience just for you.
            </p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            onClick={()=>navigate('/TravelTales')}>
              <Rocket className="size-5 mr-2" />
              Plan My Dream Trip Now
            </button>
          </div>
        </div>
      </div>

      {/* Selected Trip Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-cyan-500/30">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Brain className="size-8 text-cyan-400 mr-2 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">{selectedTrip.name}</h3>
              </div>
              <p className="text-gray-300 mb-2">{selectedTrip.country}</p>
              <div className="bg-cyan-500/20 rounded-lg p-4 mb-6">
                <p className="text-cyan-300 text-sm mb-2">AI Analysis:</p>
                <p className="text-white">{selectedTrip.aiRecommendation}</p>
                <div className="flex items-center justify-center mt-3">
                  <span className="text-cyan-400 font-bold text-lg">AI Score: {selectedTrip.aiScore}/10</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center mx-auto"
              >
                <Rocket className="size-5 mr-2" />
                Start Planning This Trip
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-purple-900 relative overflow-hidden ml-12 mr-12 rounded-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-600/20 to-transparent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Left Panel - 30% */}
      <div className="w-[30%] bg-gradient-to-br from-purple-800/90 to-indigo-900/90 backdrop-blur-sm p-6 shadow-2xl border-r border-purple-700/50 relative z-10 ">
        <div className="space-y-6">
          {/* Glowing Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 text-cyan-300 mb-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <span className="text-sm font-medium tracking-wider uppercase">Route Planner</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-300"></div>
            </div>
          </div>

          {/* Source Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-purple-800/50 backdrop-blur-sm border border-purple-600/30 rounded-xl p-5">
              <h1 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center">
                <span className="mr-3 text-3xl">🚀</span>
                Source
              </h1>
              <div className="space-y-3">
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Enter starting location..."
                  className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all backdrop-blur-sm"
                />
                <button
                  onClick={() => console.log('Source button clicked')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02]"
                >
                  ✨ Set Source
                </button>
              </div>
            </div>
          </div>

          {/* Destination Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-purple-800/50 backdrop-blur-sm border border-purple-600/30 rounded-xl p-5">
              <h1 className="text-2xl font-bold text-pink-300 mb-4 flex items-center">
                <span className="mr-3 text-3xl">🎯</span>
                Destination
              </h1>
              <div className="space-y-3">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination..."
                  className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all backdrop-blur-sm"
                />
                <button
                  onClick={() => console.log('Destination button clicked')}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/25 transform hover:scale-[1.02]"
                >
                  🌟 Set Destination
                </button>
              </div>
            </div>
          </div>

          {/* Search Route Button */}
          <div className="pt-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300 animate-pulse"></div>
              <button
                onClick={handleFind}
                disabled={!source || !destination}
                className="relative w-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 hover:from-yellow-400 hover:via-pink-400 hover:to-purple-400 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-yellow-500/25 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                {!source || !destination ? '⏳ Enter Locations' : '🗺️ Find Amazing Route'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Map 70% */}
      <div className="w-[70%] relative z-10 ">
        <div className="h-full">
          {/* Futuristic Map Interface */}
          <div className="w-full h-full bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm relative overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0">
              <div className="grid grid-cols-16 grid-rows-12 h-full w-full opacity-20">
                {Array.from({ length: 192 }, (_, i) => (
                  <div 
                    key={i} 
                    className="border border-cyan-400/30 animate-pulse" 
                    style={{ 
                      animationDelay: `${(i * 50) % 3000}ms`,
                      animationDuration: '2s'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2000}ms`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>

            {/* Central Map Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
              {/* Holographic Title */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow shadow-2xl shadow-cyan-500/25">
                    <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🗺️</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
                  Neural Map Interface
                </h2>
                <div className="flex items-center justify-center space-x-2 text-purple-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>

              {/* Dynamic Status */}
              <div className="bg-purple-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 max-w-md shadow-2xl">
                <p className="text-purple-200 text-lg leading-relaxed">
                  {source && destination 
                    ? (
                      <span className="block">
                        <span className="text-cyan-300 font-bold">🚀 {source}</span>
                        <br />
                        <span className="text-purple-400 mx-4">⟿⟿⟿</span>
                        <br />
                        <span className="text-pink-300 font-bold">🎯 {destination}</span>
                        <br />
                        <span className="text-xs text-purple-400 mt-2 block">Calculating optimal route...</span>
                      </span>
                    )
                    : 'Awaiting coordinates for interdimensional travel...'
                  }
                </p>
              </div>

              {/* Advanced Route Visualization */}
              {source && destination && (
                <div className="mt-8 relative">
                  <div className="flex items-center justify-center space-x-8">
                    {/* Start Point */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-cyan-500/30 rounded-full blur animate-pulse"></div>
                      <div className="relative flex flex-col items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                        </div>
                        <span className="text-cyan-300 text-sm mt-2 font-medium">Origin</span>
                      </div>
                    </div>

                    {/* Animated Route Line */}
                    <div className="relative">
                      <div className="w-32 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-4 h-2 bg-white/50 rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="bg-purple-700/80 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-500/30">
                          <span className="text-xs text-purple-200">Quantum Path</span>
                        </div>
                      </div>
                    </div>

                    {/* End Point */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-pink-500/30 rounded-full blur animate-pulse delay-500"></div>
                      <div className="relative flex flex-col items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/25">
                          <div className="w-3 h-3 bg-white rounded-full animate-ping delay-300"></div>
                        </div>
                        <span className="text-pink-300 text-sm mt-2 font-medium">Target</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-purple-400/50 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-pink-400/50 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg"></div>
          </div>
        </div>
      </div>
    </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default StartJourney;