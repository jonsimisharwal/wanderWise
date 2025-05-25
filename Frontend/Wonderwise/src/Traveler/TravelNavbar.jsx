import React, { useState, useEffect } from 'react';
import logos from '../images/logos.png';
import { Menu, X, Search, MapPin, Globe, Compass, User, Plane } from 'lucide-react';

export default function TravelNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', icon: MapPin },
    { name: 'MyTrip', icon: Compass },
    { name: 'Explore', icon: Globe },
    { name: 'Stories', icon: Plane }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20' 
          : 'bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-pink-500/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Animated Logo */}
            <div className="flex-shrink-0 group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 overflow-hidden ${
                  scrolled ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <img 
                    src={logos}
                    alt="AeroAI Logo" 
                    className="w-8 h-8 object-contain group-hover:animate-pulse transition-all duration-300"
                  />
                </div>
                <h1 className={`text-3xl font-black tracking-tight transition-all duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                } group-hover:scale-105`} 
                style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                  AeroAI
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href="#"
                      className={`group flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                        scrolled 
                          ? 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg' 
                          : 'text-white/90 hover:text-white hover:bg-white/20 hover:shadow-xl'
                      }`}
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`group flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:block">Explore</span>
              </button>

              {/* Login Button */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className={`group flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                  scrolled 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:block">Journey</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 py-6 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 border border-white/20">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href="#"
                      className={`group flex items-center space-x-3 px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${
                        scrolled 
                          ? 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600' 
                          : 'text-white/90 hover:text-white hover:bg-white/20'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isMenuOpen ? 'slideInUp 0.5s ease-out forwards' : 'none'
                      }}
                    >
                      <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 m-4 w-full max-w-2xl transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Where to next?</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, experiences, stories..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-lg"
                autoFocus
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Bali', 'Tokyo', 'Paris', 'New York', 'Iceland', 'Morocco'].map((place) => (
                <button
                  key={place}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors text-sm font-medium"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 m-4 w-full max-w-md transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Start Your Journey</h3>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                Begin Adventure
              </button>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              New explorer? <a href="#" className="text-blue-600 hover:underline font-semibold">Create account</a>
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-bottom-4 {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}