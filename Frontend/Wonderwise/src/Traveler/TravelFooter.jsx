import React, { useState, useEffect } from 'react';

import { Mail, Phone, MapPin, Linkedin, Github, Plane, Sparkles, Send, Star } from 'lucide-react';

const TravelFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate static particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);
  }, []);

  const handleNewsletter = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full  bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              animationDelay: `${particle.id * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Floating plane animation */}
      <div className="absolute top-1/4 left-0 pointer-events-none">
        <div 
          className="w-6 h-6 text-blue-400 opacity-30 transform rotate-45"
          style={{
            animation: 'floatPlane 15s linear infinite'
          }}
        >
          <Plane className="w-full h-full" />
        </div>
      </div>

      <footer className="bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-blue-900/90 backdrop-blur-xl text-white relative overflow-hidden w-full max-w-7xl mx-auto rounded-t-2xl shadow-2xl border-t border-purple-500/20">
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-400 to-purple-500 animate-pulse"></div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500/10 rounded-full blur-xl animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>

        <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
          
          {/* Compact Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            
            {/* Brand Section - Compact */}
            <div className="lg:col-span-4 space-y-3 group">
              <div className="relative">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                  <Plane className="w-6 h-6 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  AeroAI
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 animate-spin" style={{animationDuration: '3s'}} />
              </div>
              
              <div className="text-purple-300 italic text-sm font-light">
                AI-powered travel, made simple.
              </div>
              
              <p className="text-slate-300 text-xs leading-relaxed bg-gradient-to-r from-slate-800/50 to-purple-900/30 p-2 rounded-lg border border-purple-500/20">
                Revolutionizing travel planning with intelligent AI solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2 pt-2">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/jonsi-misharwal-24295b286/', color: 'from-blue-500 to-blue-600' },
                  { icon: Github, href: 'https://github.com/jonsimisharwal', color: 'from-purple-500 to-purple-600' }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center w-8 h-8 bg-gradient-to-r ${social.color} rounded-full text-white hover:scale-110 hover:rotate-12 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/40 relative overflow-hidden`}
                    aria-label={`${social.icon.name} profile`}
                  >
                    <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                    <social.icon size={14} className="relative z-10" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Group - All in one row */}
            <div className="lg:col-span-6 flex flex-wrap gap-8 justify-between">
              
              {/* Quick Links */}
              <div 
                className="space-y-2 group flex-1 min-w-[120px]"
                onMouseEnter={() => setHoveredSection('links')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h3 className="text-blue-300 text-sm font-semibold relative pb-2 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Quick Links
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded transition-all duration-300 ${hoveredSection === 'links' ? 'w-full' : 'w-4'}`}></div>
                </h3>
                <ul className="space-y-1">
                  {['Home', 'AI Planner', 'About Us'].map((link) => (
                    <li key={link}>
                      <a 
                        href={`#${link.toLowerCase().replace(' ', '-')}`}
                        onClick={(e) => handleSmoothScroll(e, `#${link.toLowerCase().replace(' ', '-')}`)}
                        className="group flex items-center gap-1 text-slate-300 hover:text-blue-300 transition-all duration-300 text-xs py-1 px-1 rounded hover:bg-blue-500/10"
                      >
                        <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Destinations */}
              <div 
                className="space-y-2 group flex-1 min-w-[120px]"
                onMouseEnter={() => setHoveredSection('destinations')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h3 className="text-purple-300 text-sm font-semibold relative pb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Destinations
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 rounded transition-all duration-300 ${hoveredSection === 'destinations' ? 'w-full' : 'w-4'}`}></div>
                </h3>
                <div className="space-y-1">
                  {['Paris', 'London', 'Tokyo', 'Dubai'].map((destination) => (
                    <a 
                      key={destination}
                      href={`#${destination.toLowerCase().replace(' ', '-')}`}
                      onClick={(e) => handleSmoothScroll(e, `#${destination.toLowerCase().replace(' ', '-')}`)}
                      className="group flex items-center gap-1 text-slate-300 hover:text-purple-300 transition-all duration-300 text-xs py-1 px-1 rounded hover:bg-purple-500/10"
                    >
                      <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      {destination}
                    </a>
                  ))}
                </div>
              </div>

              {/* Get in Touch */}
              <div 
                className="space-y-2 group flex-1 min-w-[150px]"
                onMouseEnter={() => setHoveredSection('contact')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h3 className="text-blue-300 text-sm font-semibold relative pb-2 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Contact
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded transition-all duration-300 ${hoveredSection === 'contact' ? 'w-full' : 'w-4'}`}></div>
                </h3>
                <ul className="space-y-1">
                  {[
                    { icon: Mail, text: 'support@aeroai.com', href: 'mailto:support@aeroai.com' },
                    { icon: Phone, text: '+91-9350544358', href: null }
                  ].map((item, idx) => (
                    <li key={idx} className="group/item flex items-center gap-2 py-1 px-1 rounded hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300">
                      <div className="p-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full group-hover/item:scale-110 transition-transform duration-300">
                        <item.icon size={10} className="text-blue-300" />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-slate-300 hover:text-blue-300 transition-colors duration-300 text-xs">
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-slate-300 text-xs">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section - Compact */}
            <div className="lg:col-span-2">
              <div 
                className="space-y-2 group"
                onMouseEnter={() => setHoveredSection('newsletter')}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <h3 className="text-purple-300 text-sm font-semibold relative pb-2 flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  Newsletter
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 rounded transition-all duration-300 ${hoveredSection === 'newsletter' ? 'w-full' : 'w-4'}`}></div>
                </h3>
                <div className="space-y-2">
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full pl-3 pr-8 py-2 border border-purple-500/30 rounded-lg bg-black/50 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 backdrop-blur-sm text-xs"
                    />
                    <Mail className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-purple-400 pointer-events-none" />
                  </div>
                  
                  <button 
                    onClick={handleNewsletter}
                    disabled={isSubscribed}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 relative overflow-hidden group ${
                      isSubscribed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      {isSubscribed ? (
                        <>
                          <Star className="w-3 h-3" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                          Subscribe
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom - Compact */}
          <div className="border-t border-purple-500/20 pt-3">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <div className="text-slate-400 text-xs flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                © 2024 AeroAI. All rights reserved.
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
              <div className="flex gap-4">
                {['Privacy Policy', 'Terms of Service'].map((link) => (
                  <a 
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-slate-400 hover:text-purple-300 text-xs transition-all duration-300 hover:underline decoration-purple-400 underline-offset-2"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes floatPlane {
          0% { 
            transform: translateX(-100px) translateY(0px) rotate(45deg); 
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% { 
            transform: translateX(calc(100vw + 100px)) translateY(-20px) rotate(45deg); 
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default TravelFooter;