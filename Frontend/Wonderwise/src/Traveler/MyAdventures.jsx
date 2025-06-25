import React, { useState ,useEffect} from 'react';
import { MapPin, Calendar, Heart, MessageCircle,PencilIcon,Save,X, Share2, Camera, Globe,Trash, Award, Mountain, Users, Target, Star, Trophy, Compass } from 'lucide-react';

const MyAdventures = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showAllBadges, setShowAllBadges] = useState(false);
   
  const initialprofile = {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    bio: "Digital nomad • Adventure seeker • Photography enthusiast",
    location: "Currently in Bali, Indonesia",
    stats: {
      countries: 47,
      adventures: 156,
      
    },
    badges: [
      {
        name: "Explorer",
        icon: Compass,
        color: "bg-blue-500",
        progress: 100,
        description: "Visited 47 countries across 6 continents",
        unlocked: true,
        rarity: "Epic"
      },
      {
        name: "Photographer",
        icon: Camera,
        color: "bg-purple-500",
        progress: 100,
        description: "Captured over 10,000 travel photos",
        unlocked: true,
        rarity: "Rare"
      },
      {
        name: "Storyteller",
        icon: Star,
        color: "bg-yellow-500",
        progress: 85,
        description: "Written 156 adventure stories",
        unlocked: true,
        rarity: "Common"
      },
      {
        name: "Mountain Climber",
        icon: Mountain,
        color: "bg-green-500",
        progress: 100,
        description: "Conquered peaks over 5000m altitude",
        unlocked: true,
        rarity: "Legendary"
      },
      {
        name: "Social Butterfly",
        icon: Users,
        color: "bg-pink-500",
        progress: 78,
        description: "Connected with 12.4K fellow adventurers",
        unlocked: true,
        rarity: "Rare"
      },
      {
        name: "Goal Setter",
        icon: Target,
        color: "bg-red-500",
        progress: 92,
        description: "Completed 23 out of 25 bucket list items",
        unlocked: true,
        rarity: "Epic"
      },
      {
        name: "Legend",
        icon: Trophy,
        color: "bg-orange-500",
        progress: 45,
        description: "Reach 50 countries milestone",
        unlocked: false,
        rarity: "Mythical"
      }
    ]
  };

  const adventures = [
    {
      id: 1,
      title: "Lost in the Himalayas: A Solo Trek to Everest Base Camp",
      location: "Nepal",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
      excerpt: "17 days of pure adventure through the world's highest peaks. The journey that changed my perspective on life forever...",
      likes: 342,
      comments: 28,
      tags: ["Trekking", "Mountains", "Solo Travel", "Nepal"]
    },
    {
      id: 2,
      title: "Sunrise Over Angkor Wat: Cambodia's Ancient Wonders",
      location: "Siem Reap, Cambodia",
      date: "February 8, 2024",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d4d3d7?w=800&h=500&fit=crop",
      excerpt: "Exploring the magnificent temples of Angkor Archaeological Park at dawn. The golden light painting ancient stones...",
      likes: 287,
      comments: 19,
      tags: ["Temples", "History", "Photography", "Cambodia"]
    },
    {
      id: 3,
      title: "Chasing Northern Lights in Iceland's Wilderness",
      location: "Reykjavik, Iceland",
      date: "January 22, 2024",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=500&fit=crop",
      excerpt: "Three weeks of hunting the Aurora Borealis across Iceland's dramatic landscapes. From ice caves to volcanic beaches...",
      likes: 456,
      comments: 34,
      tags: ["Northern Lights", "Iceland", "Photography", "Winter"]
    },
    {
      id: 4,
      title: "Street Food Safari Through Bangkok's Hidden Gems",
      location: "Bangkok, Thailand",
      date: "December 10, 2023",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
      excerpt: "Diving deep into Bangkok's street food culture. From floating markets to hidden alleyway kitchens...",
      likes: 198,
      comments: 15,
      tags: ["Food", "Culture", "Thailand", "Street Food"]
    },
    {
      id: 5,
      title: "Sailing the Greek Islands: A Mediterranean Dream",
      location: "Santorini, Greece",
      date: "November 3, 2023",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=500&fit=crop",
      excerpt: "Island hopping through the Cyclades. Crystal blue waters, white-washed villages, and unforgettable sunsets...",
      likes: 378,
      comments: 22,
      tags: ["Islands", "Sailing", "Greece", "Mediterranean"]
    },
    {
      id: 6,
      title: "Safari Adventures in Kenya's Maasai Mara",
      location: "Maasai Mara, Kenya",
      date: "October 18, 2023",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=500&fit=crop",
      excerpt: "Witnessing the Great Migration and meeting the Maasai people. An unforgettable journey into Africa's heart...",
      likes: 512,
      comments: 41,
      tags: ["Safari", "Wildlife", "Kenya", "Culture"]
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };
  const [profile, setProfile] = useState(initialprofile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        // Also update editForm with loaded data
        setEditForm({
          name: parsedProfile?.name || '',
          bio: parsedProfile?.bio || '',
          location: parsedProfile?.location || '',
          avatar: parsedProfile?.avatar || '',
          stats: {
            countries: parsedProfile?.stats?.countries || 0,
            adventures: parsedProfile?.stats?.adventures || 0,
            followers: parsedProfile?.stats?.followers || 0
          }
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        setProfile(initialprofile);
        setEditForm(initialprofile);
      }
    } else {
      setProfile(initialprofile);
      setEditForm(initialprofile);
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = () => {
    setProfile(editForm);
    localStorage.setItem('userProfile', JSON.stringify(editForm));
    setIsEditing(false);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setEditForm(prev => ({
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [childField]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  // Start editing
  const startEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-purple-950 rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Edit/Save/Cancel Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {!isEditing ? (
            <button 
              onClick={startEdit}
              className="p-2 rounded-full hover:bg-pink-900 transition-colors"
            >
              <PencilIcon className="w-4 h-4 text-white" />
            </button>
          ) : (
            <>
              <button 
                onClick={saveProfile}
                className="p-2 rounded-full hover:bg-green-700 bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={cancelEdit}
                className="p-2 rounded-full hover:bg-red-700 bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </>
          )}
        </div>
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                <img
                  src={initialprofile.avatar}
                  alt={initialprofile.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-blue-100"
                />
                {isEditing && (
              <div className="mt-2">
                <input
                  type="url"
                  value={editForm.avatar}
                  onChange={(e) => handleInputChange('avatar', e.target.value)}
                  placeholder="Image URL"
                  className="w-full px-2 py-1 text-xs rounded border bg-white text-black"
                />
              </div>
            )}
                </div>
                
                {/* Name */}
          {isEditing ? (
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-2xl font-bold text-center w-full mb-2 px-2 py-1 rounded border bg-white text-black"
            />
          ) : (
            <h2 className="text-2xl font-bold text-white mb-2">{initialprofile.name}</h2>
          )}
            {/* Bio */}
          {isEditing ? (
            <textarea
              value={editForm.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full px-2 py-1 rounded border mb-3 bg-white text-black resize-none"
              rows="3"
            />
          ) : (
            <p className="text-white mb-3">{initialprofile.bio}</p>
          )}
                {/* Location */}
          <div className="flex items-center justify-center text-sm text-white mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            {isEditing ? (
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="px-2 py-1 rounded border bg-white text-black ml-1"
              />
            ) : (
              initialprofile.location
            )}
          </div>
        </div>

              {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
           {isEditing ? (
  <input
    type="number"
    value={editForm?.stats?.countries || 0}
    onChange={(e) => handleInputChange('stats.countries', parseInt(e.target.value) || 0)}
    className="text-xl font-bold text-center w-full mb-1 px-1 py-1 rounded border bg-white text-black text-sm"
  />
) : (
  <div className="text-xl font-bold text-blue-400">
    {profile?.stats?.countries || 0}
  </div>
)}
<div className="text-xs text-white">Countries</div>
          </div>
          <div className="text-center">
           {isEditing ? (
  <input
    type="number"
    value={editForm?.stats?.adventures || 0}
    onChange={(e) => handleInputChange('stats.adventures', parseInt(e.target.value) || 0)}
    className="text-xl font-bold text-center w-full mb-1 px-1 py-1 rounded border bg-white text-black text-sm"
  />
) : (
  <div className="text-xl font-bold text-purple-400">
    {profile?.stats?.adventures || 0}
  </div>
)}
            <div className="text-xs text-white">Adventures</div>
          </div>
          
        </div>

              {/* Interactive Badges */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Achievements
                  </h3>
                  <button
                    onClick={() => setShowAllBadges(!showAllBadges)}
                    className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {showAllBadges ? 'Show Less' : `View All (${initialprofile.badges.length})`}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {(showAllBadges ? initialprofile.badges : initialprofile.badges.slice(0, 4)).map((badge, index) => {
                    const IconComponent = badge.icon;
                    const isSelected = selectedBadge === index;
                    
                    return (
                      <div
                        key={index}
                        className={`relative p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          badge.unlocked 
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600' 
                            : 'bg-gray-900 border border-gray-700 opacity-60'
                        } ${isSelected ? 'ring-2 ring-blue-400 shadow-lg' : ''}`}
                        onClick={() => setSelectedBadge(isSelected ? null : index)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`p-1.5 rounded-lg ${badge.color} ${!badge.unlocked ? 'grayscale' : ''}`}>
                            <IconComponent className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-white truncate">{badge.name}</div>
                            <div className={`text-xs ${
                              badge.rarity === 'Mythical' ? 'text-purple-300' :
                              badge.rarity === 'Legendary' ? 'text-orange-300' :
                              badge.rarity === 'Epic' ? 'text-blue-300' :
                              badge.rarity === 'Rare' ? 'text-green-300' :
                              'text-gray-300'
                            }`}>
                              {badge.rarity}
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-1">
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-500 ${badge.color}`}
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-400">{badge.progress}%</div>
                        
                        {/* Expanded Details */}
                        {isSelected && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-800 rounded-lg border border-gray-600 shadow-xl z-10">
                            <p className="text-xs text-gray-300 mb-2">{badge.description}</p>
                            {!badge.unlocked && (
                              <div className="text-xs text-yellow-400 flex items-center">
                                <Target className="w-3 h-3 mr-1" />
                                In Progress
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Unlock Effect */}
                        {badge.unlocked && (
                          <div className="absolute -top-1 -right-1">
                            <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-purple-950 flex items-center justify-center">
                              <div className="w-1 h-1 bg-white rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Achievement Summary */}
                <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-300">Overall Progress</span>
                    <span className="text-white font-medium">
                      {Math.round(initialprofile.badges.reduce((acc, badge) => acc + badge.progress, 0) / initialprofile.badges.length)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full bg-green-600 transition-all duration-1000"
                      style={{ 
                        width: `${Math.round(initialprofile.badges.reduce((acc, badge) => acc + badge.progress, 0) / initialprofile.badges.length)}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{initialprofile.badges.filter(b => b.unlocked).length} Unlocked</span>
                    <span>{initialprofile.badges.filter(b => !b.unlocked).length} In Progress</span>
                  </div>
                </div>
              </div>

              
            </div>
          </div>

          {/* Blog Posts Section - Single Column Layout */}
          <div className="container px-2 py-2 w-full max-w-none">
      {/* Header */}
      <div className="mb-3 flex justify-between items-center ">
        <div className='ml-1'>
          <h1 className="text-3xl font-bold text-purple-900 mb-2">My Adventures</h1>
          <p className="text-gray-600">Sharing stories from around the world</p>
        </div>
        <button className=' px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-blue-600 transition-colors  flex-shrink-0'>             
              Create post           
                </button>
      </div>

      {/* Adventure Grid - Using CSS Grid with explicit styles */}
      <div 
        className="gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gridAutoRows: 'minmax(400px, auto)'
        }}
      >
        {adventures.map((adventure) => (
          <article key={adventure.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-purple-900">
            <div className="relative">
              <img
                src={adventure.image}
                alt={adventure.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                <MapPin className="w-3 h-3 text-blue-600 mr-1" />
                <span className="text-xs font-medium text-gray-800">{adventure.location}</span>
              </div>
              <div className="absolute top-3 right-3 px-2 py-1 flex items-center">
               <Trash className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer transition-colors" /> 
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {adventure.date}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                {adventure.title}
              </h3>
              
              <p className="text-gray-600 mb-3 leading-relaxed text-sm overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}>
                {adventure.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {adventure.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {adventure.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                    +{adventure.tags.length - 2}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleLike(adventure.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      likedPosts.has(adventure.id) 
                        ? 'text-red-500' 
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.has(adventure.id) ? 'fill-current' : ''}`} />
                    <span className="text-xs font-medium">
                      {adventure.likes + (likedPosts.has(adventure.id) ? 1 : 0)}
                    </span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{adventure.comments}</span>
                  </button>
                </div>
                
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs font-medium">Share</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Alternative: Force 3 columns with media queries */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .adventure-grid-force {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .adventure-grid-force {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        @media (max-width: 767px) {
          .adventure-grid-force {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
        </div>  
      </div>
    </div>
  );
};

export default MyAdventures;