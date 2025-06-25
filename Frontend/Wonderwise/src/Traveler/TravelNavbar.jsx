import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Contact, MapPin, Globe, Compass, Plane} from 'lucide-react';
import { 
  User, 
  Edit, 
  Shield, 
  Languages, 
  Share2, 
  HelpCircle, 
  MessageSquare, 
  LifeBuoy, 
  Moon, 
  LogOut 
} from 'lucide-react';
import TravelFooter from './TravelFooter';
// Mock user database - in real app this would be your backend database
const mockDatabase = {
  users: [
    { id: 1, username: 'demo', password: 'password', name: 'Demo User' }
  ],
  
  findUser: function(username, password) {
    return this.users.find(user => user.username === username && user.password === password);
  },
  
  addUser: function(userData) {
    const newUser = { 
      id: Date.now(), 
      username: userData.username, 
      password: userData.password, 
      name: userData.name 
    };
    this.users.push(newUser);
    return newUser;
  },
  
  userExists: function(username) {
    return this.users.some(user => user.username === username);
  }
};

// Mock auth API for demonstration - replace with your actual API
const authAPI = {
  login: async (credentials) => {
    console.log('Login API called with:', credentials);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockDatabase.findUser(credentials.username, credentials.password);
    if (user) {
      const userData = { id: user.id, username: user.username, name: user.name };
      // Store authentication data (in real app, store JWT token)
      const authData = {
        isAuthenticated: true,
        user: userData,
        timestamp: Date.now()
      };
      
      // In a real app, you'd store the JWT token instead
      try {
        localStorage.setItem('authData', JSON.stringify(authData));
      } catch (e) {
        // Fallback for environments without localStorage
        console.log('Auth data stored in memory only');
      }
      
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  },
  
  signup: async (userData) => {
    console.log('Signup API called with:', userData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockDatabase.userExists(userData.username)) {
      return { success: false, error: 'Username already exists' };
    }
    
    const newUser = mockDatabase.addUser(userData);
    const userResponse = { id: newUser.id, username: newUser.username, name: newUser.name };
    
    // Store authentication data
    const authData = {
      isAuthenticated: true,
      user: userResponse,
      timestamp: Date.now()
    };
    
    try {
      localStorage.setItem('authData', JSON.stringify(authData));
    } catch (e) {
      console.log('Auth data stored in memory only');
    }
    
    return { success: true, user: userResponse };
  },
  
  logout: () => {
    try {
      localStorage.removeItem('authData');
    } catch (e) {
      console.log('Logged out from memory');
    }
    console.log('User logged out');
  },
  
  getStoredAuth: () => {
    try {
      const stored = localStorage.getItem('authData');
      if (stored) {
        const authData = JSON.parse(stored);
        // Check if auth data is not too old (optional: implement token expiry)
        const hoursSinceLogin = (Date.now() - authData.timestamp) / (1000 * 60 * 60);
        if (hoursSinceLogin < 24) { // Keep user logged in for 24 hours
          return authData;
        } else {
          localStorage.removeItem('authData');
        }
      }
    } catch (e) {
      console.log('No stored auth data available');
    }
    return null;
  }
};

export default function TravelNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
     const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { name: 'StartJourney', icon: MapPin,route:'/' },
    { name: 'TravelBlogs', icon: Compass,route:'/TravelBlogs' },
    { name: 'FindPlaces', icon: Globe,route:'/FindPlaces' },
    { name: 'TravelTales', icon: Plane,route:'/TravelTales' },
  ];
  const handleNavigation = (route) => {
    navigate(route);
  };

  // Check for stored authentication on component mount
  useEffect(() => {
    const storedAuth = authAPI.getStoredAuth();
    if (storedAuth) {
      setIsAuthenticated(storedAuth.isAuthenticated);
      setCurrentUser(storedAuth.user);
      console.log('Restored authentication for:', storedAuth.user.name);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showMessage = (message, type = 'error') => {
    if (type === 'error') {
      setErrorMessage(message);
      setSuccessMessage('');
    } else {
      setSuccessMessage(message);
      setErrorMessage('');
    }
    
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 5000);
  };

  const handleLogin = async () => {
    console.log('Login form submitted:', loginForm);
    setIsLoading(true);
    setErrorMessage('');

    if (!loginForm.username || !loginForm.password) {
      showMessage('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const result = await authAPI.login({
        username: loginForm.username.trim(),
        password: loginForm.password
      });

      console.log('Login API response:', result);

      if (result.success) {
        showMessage('Login successful! Welcome back!', 'success');
        setIsAuthenticated(true);
        setCurrentUser(result.user);
        setLoginForm({ username: '', password: '' });
        setTimeout(() => {
          closeAllModals();
        }, 1500);
      } else {
        showMessage(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    console.log('Signup form submitted:', signupForm);
    setIsLoading(true);
    setErrorMessage('');

    if (!signupForm.name || !signupForm.username || !signupForm.password || !signupForm.confirmPassword) {
      showMessage('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      showMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      showMessage('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const result = await authAPI.signup({
        name: signupForm.name.trim(),
        username: signupForm.username.trim(),
        password: signupForm.password
      });

      console.log('Signup API response:', result);

      if (result.success) {
        showMessage('Account created successfully! Welcome to AeroAI!', 'success');
        setIsAuthenticated(true);
        setCurrentUser(result.user);
        setSignupForm({ name: '', username: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          closeAllModals();
        }, 1500);
      } else {
        showMessage(result.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    showMessage('Successfully logged out!', 'success');
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
    setLoginForm({ username: '', password: '' });
    setSignupForm({ name: '', username: '', password: '', confirmPassword: '' });
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' && !isLoading) {
      action();
    }
  };
 

  return (
    <>
      {/* Main Navigation - Fixed Position */}
      <nav 
        className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
          scrolled 
            ? 'bg-white shadow-xl border-b border-gray-200 text-black' 
            : 'bg-gradient-to-r from-blue-600 via-purple-800 to-pink-500 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Animated Logo */}
            <div className="flex-shrink-0 group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 overflow-hidden ${
                  scrolled ? 'bg-black bg-opacity-20' : 'bg-white bg-opacity-20'
                }`}>
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">✈️</span>
                  </div>
                </div>
                <h1 className={`text-3xl font-black tracking-tight transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } group-hover:scale-105`} 
                style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  AeroAI
                </h1>
              </div>
            </div>

            {/* Centered Navigation */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-1 bg-white bg-opacity-10 rounded-2xl p-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.route;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.route)}
                    className={`group flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-grey shadow-lg'
                        : scrolled
                          ? 'text-black-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg'
                          : 'text-white text-opacity-90 hover:text-white hover:bg-white hover:bg-opacity-20 hover:shadow-xl'
                    }`}
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button
                onClick={() =>{ navigate('/MyAdventures')
                 
                }}
                
                className={`group flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-black hover:from-blue-600 hover:to-cyan-500' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
                }`}
              >
                <Contact className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>MyAdventures</span>
              </button>

              {/* Authentication Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  {/* User Profile Button */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                      scrolled ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      Welcome, {currentUser?.name || currentUser?.username}!
                    </span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                


{/* User Dropdown Menu */}
{isUserMenuOpen && (
  <>
    {/* Backdrop */}
    <div 
      className="fixed inset-0 z-40"
      onClick={() => setIsUserMenuOpen(false)}
    />
    
    {/* Dropdown */}
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
      
      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your edit profile logic here
            showMessage('Edit Profile feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Edit className="w-5 h-5" />
          <span className="font-medium">Edit Profile</span>
        </button>
        
        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your security settings logic here
            showMessage('Security Settings feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Shield className="w-5 h-5" />
          <span className="font-medium">Security Settings</span>
        </button>

        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your language settings logic here
            showMessage('Language Settings feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Languages className="w-5 h-5" />
          <span className="font-medium">Language Settings</span>
        </button>

        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your share profile logic here
            showMessage('Share Profile feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share Profile</span>
        </button>

        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your FAQ logic here
            showMessage('FAQ section coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">FAQ</span>
        </button>

        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your feedback logic here
            showMessage('Feedback feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">Feedback</span>
        </button>

        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your help centre logic here
            showMessage('Help Centre feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <LifeBuoy className="w-5 h-5" />
          <span className="font-medium">Help Centre</span>
        </button>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>
        
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            // Add your theme toggle logic here
            showMessage('Theme toggle feature coming soon!', 'success');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
        >
          <Moon className="w-5 h-5" />
          <span className="font-medium">Dark/Light Mode</span>
        </button>
        
        {/* Logout Button */}
        <button
          onClick={() => {
            setIsUserMenuOpen(false);
            handleLogout();
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
     </>
)}
                </div>
              ) : (
                /* Login Button */
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className={`group flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                    scrolled 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:from-purple-600 hover:to-pink-600' 
                      : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
                  }`}
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Control Deck</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      

      {/* Login Modal */}
      {isLoginOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[60]"
          onClick={closeAllModals}
        >
          <div 
            className="bg-white rounded-3xl p-8 m-4 w-full max-w-md transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Entry, Please ✈️</h3>
              <button
                onClick={closeAllModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username (try: demo)"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password (try: password)"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
              
              <button 
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Logging in...
                  </>
                ) : (
                  'Begin Adventure'
                )}
              </button>
            </div>
            
            <p className="text-center text-gray-600 mt-4 text-sm">
              New explorer? <button type="button" onClick={openSignup} className="text-blue-600 hover:underline font-semibold">Sign Up</button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[60]"
          onClick={closeAllModals}
        >
          <div 
            className="bg-white rounded-3xl p-8 m-4 w-full max-w-md transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Join the Adventure 🌍</h3>
              <button
                onClick={closeAllModals}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={signupForm.username}
                  onChange={(e) => setSignupForm({...signupForm, username: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Create password (min 6 chars)"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                  minLength="6"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                  onKeyPress={(e) => handleKeyPress(e, handleSignup)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                  minLength="6"
                />
              </div>
              
              <button 
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Creating Account...
                  </>
                ) : (
                  'Start Exploring'
                )}
              </button>
            </div>
            
            <p className="text-center text-gray-600 mt-4 text-sm">
              Already registered? <button type="button" onClick={openLogin} className="text-blue-600 hover:underline font-semibold">Sign In</button>
            </p>
          </div>
        </div>
      )}

      
    </>
  );
}