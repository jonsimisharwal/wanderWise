
import React, { useState, useEffect } from 'react';
import { RefreshCw, DollarSign, AlertCircle, CheckCircle, TrendingUp, Globe, Zap, Sparkles } from 'lucide-react';

// Currency Converter Class (fixed country mapping)
class CurrencyConverterClass {
  constructor() {
    this.exchangeRates = {};
    this.apiKey = '395c51fd831946bdb7415d82b4de9f53';
    this.baseUrl = 'https://v6.exchangerate-api.com/v6';
    
    // Enhanced country-to-currency mapping with all variations
    this.countryToCurrency = {
      'United States': 'USD', 'USA': 'USD', 'US': 'USD', 'America': 'USD',
      'Japan': 'JPY', 'Japanese': 'JPY',
      'United Kingdom': 'GBP', 'UK': 'GBP', 'Britain': 'GBP', 'England': 'GBP',
      'India': 'INR', 'Indian': 'INR',
      'Canada': 'CAD', 'Canadian': 'CAD',
      'Australia': 'AUD', 'Australian': 'AUD', 'Aussie': 'AUD',
      'China': 'CNY', 'Chinese': 'CNY', 'PRC': 'CNY',
      'Germany': 'EUR', 'German': 'EUR', 'Deutschland': 'EUR',
      'France': 'EUR', 'French': 'EUR', 'Francia': 'EUR',
      'Italy': 'EUR', 'Italian': 'EUR', 'Italia': 'EUR',
      'Spain': 'EUR', 'Spanish': 'EUR', 'España': 'EUR',
      'Netherlands': 'EUR', 'Dutch': 'EUR', 'Holland': 'EUR',
      'Switzerland': 'CHF', 'Swiss': 'CHF', 'Schweiz': 'CHF',
      'Singapore': 'SGD', 'Singaporean': 'SGD',
      'Thailand': 'THB', 'Thai': 'THB', 'Siam': 'THB',
      'Malaysia': 'MYR', 'Malaysian': 'MYR',
      'Indonesia': 'IDR', 'Indonesian': 'IDR',
      'Philippines': 'PHP', 'Filipino': 'PHP', 'Pilipinas': 'PHP',
      'Vietnam': 'VND', 'Vietnamese': 'VND', 'Viet Nam': 'VND',
      'Turkey': 'TRY', 'Turkish': 'TRY', 'Türkiye': 'TRY',
      'Mexico': 'MXN', 'Mexican': 'MXN', 'México': 'MXN',
      'Brazil': 'BRL', 'Brazilian': 'BRL', 'Brasil': 'BRL',
      'South Korea': 'KRW', 'Korea': 'KRW', 'Korean': 'KRW', 'Republic of Korea': 'KRW', 'ROK': 'KRW',
      'Russia': 'RUB', 'Russian': 'RUB', 'USSR': 'RUB',
      'South Africa': 'ZAR', 'South African': 'ZAR', 'SA': 'ZAR',
      'UAE': 'AED', 'United Arab Emirates': 'AED', 'Emirates': 'AED', 'Dubai': 'AED',
      'Norway': 'NOK', 'Norwegian': 'NOK', 'Norge': 'NOK',
      'Sweden': 'SEK', 'Swedish': 'SEK', 'Sverige': 'SEK',
      'Denmark': 'DKK', 'Danish': 'DKK', 'Danmark': 'DKK',
      'Poland': 'PLN', 'Polish': 'PLN', 'Polska': 'PLN',
      'Czech Republic': 'CZK', 'Czech': 'CZK', 'Czechia': 'CZK',
      'Hungary': 'HUF', 'Hungarian': 'HUF', 'Magyar': 'HUF',
      'Romania': 'RON', 'Romanian': 'RON', 'România': 'RON',
      'Bulgaria': 'BGN', 'Bulgarian': 'BGN',
      'Croatia': 'EUR', 'Croatian': 'EUR', 'Hrvatska': 'EUR', // Croatia uses EUR now
      'Israel': 'ILS', 'Israeli': 'ILS',
      'Egypt': 'EGP', 'Egyptian': 'EGP',
      'Nigeria': 'NGN', 'Nigerian': 'NGN'
    };

    this.currencySymbols = {
      'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'INR': '₹', 'CAD': 'C$',
      'AUD': 'A$', 'CHF': 'Fr', 'CNY': '¥', 'KRW': '₩', 'SGD': 'S$', 'THB': '฿',
      'MYR': 'RM', 'IDR': 'Rp', 'PHP': '₱', 'VND': '₫', 'TRY': '₺', 'MXN': '$',
      'BRL': 'R$', 'ZAR': 'R', 'AED': 'د.إ', 'RUB': '₽', 'NOK': 'kr', 'SEK': 'kr',
      'DKK': 'kr', 'PLN': 'zł', 'CZK': 'Kč', 'HUF': 'Ft', 'RON': 'lei', 'BGN': 'лв',
      'ILS': '₪', 'EGP': 'E£', 'NGN': '₦'
    };
  }

  async fetchExchangeRates(baseCurrency = 'USD') {
    try {
      console.log(`Fetching rates for ${baseCurrency} from API...`);
      const response = await fetch(`${this.baseUrl}/${this.apiKey}/latest/${baseCurrency}`);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.result === 'success' && data.conversion_rates) {
        this.exchangeRates = data.conversion_rates;
        console.log('Exchange rates loaded:', Object.keys(this.exchangeRates).length, 'currencies');
        return { 
          success: true, 
          rates: this.exchangeRates,
          lastUpdated: data.time_last_update_utc 
        };
      } else {
        throw new Error(data.error_type || 'API returned unsuccessful result');
      }
    } catch (error) {
      console.error('API Error:', error);
      console.log('Falling back to static rates...');
      
      // Comprehensive fallback rates with all supported currencies
      this.exchangeRates = {
        'EUR': 0.92, 'GBP': 0.79, 'JPY': 151.20, 'INR': 83.45, 'CAD': 1.36,
        'AUD': 1.51, 'CHF': 0.89, 'CNY': 7.24, 'KRW': 1347.82, 'SGD': 1.35,
        'THB': 36.85, 'MYR': 4.73, 'IDR': 15967.50, 'PHP': 58.67, 'VND': 24756.30,
        'TRY': 32.01, 'MXN': 17.08, 'BRL': 5.25, 'RUB': 82.67, 'ZAR': 18.71, 
        'AED': 3.67, 'NOK': 10.45, 'SEK': 10.89, 'DKK': 6.85, 'PLN': 4.12,
        'CZK': 22.45, 'HUF': 365.28, 'RON': 4.56, 'BGN': 1.80, 'HRK': 6.94,
        'ILS': 3.72, 'EGP': 48.95, 'NGN': 1505.50, 'COP': 4250.00, 'CLP': 950.00,
        'PEN': 3.85, 'UYU': 43.50, 'ARS': 850.00, 'BOB': 6.91, 'PYG': 7450.00,
        'TWD': 31.25, 'HKD': 7.82, 'MOP': 8.05, 'BND': 1.35, 'KHR': 4050.00,
        'LAK': 21500.00, 'MMK': 2095.00, 'NPR': 133.50, 'LKR': 325.00, 'BDT': 110.00,
        'PKR': 278.00, 'AFN': 68.50, 'IRR': 42000.00, 'IQD': 1310.00, 'JOD': 0.71,
        'KWD': 0.31, 'LBP': 89500.00, 'OMR': 0.38, 'QAR': 3.64, 'SAR': 3.75,
        'YER': 250.00, 'BHD': 0.38, 'KZT': 450.00, 'UZS': 12500.00, 'AMD': 385.00,
        'AZN': 1.70, 'GEL': 2.65, 'TJS': 10.65, 'TMT': 3.50, 'KGS': 89.50,
        'MNT': 2750.00, 'BTN': 83.45, 'MVR': 15.40
      };
      return { 
        success: true, 
        rates: this.exchangeRates, 
        usingMockData: true,
        error: error.message 
      };
    }
  }

  getCountryCurrency(country) {
    // First try exact match
    if (this.countryToCurrency[country]) {
      return this.countryToCurrency[country];
    }
    
    // Try case-insensitive match
    const lowerCountry = country.toLowerCase();
    for (const [key, value] of Object.entries(this.countryToCurrency)) {
      if (key.toLowerCase() === lowerCountry) {
        return value;
      }
    }
    
    // Try partial match
    for (const [key, value] of Object.entries(this.countryToCurrency)) {
      if (key.toLowerCase().includes(lowerCountry) || lowerCountry.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // If no match found, assume it's already a currency code
    return country.toUpperCase();
  }

  formatCurrency(amount, currency) {
    const symbol = this.currencySymbols[currency] || currency;
    
    // Currencies that don't use decimal places
    if (['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'PYG', 'KHR', 'LAK', 'MMK', 'IRR', 'LBP', 'YER', 'UZS', 'KGS', 'MNT'].includes(currency)) {
      return `${symbol}${Math.round(amount).toLocaleString()}`;
    } else {
      return `${symbol}${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
  }

  async handleDestinationSelect(destination, budget, baseCurrency = 'USD') {
    try {
      const country = typeof destination === 'object' ? destination.country : destination;
      console.log(`Converting ${budget} ${baseCurrency} for destination: ${country}`);
      
      const ratesResult = await this.fetchExchangeRates(baseCurrency);
      if (!ratesResult.success) {
        return { success: false, error: 'Failed to get exchange rates' };
      }

      const targetCurrency = this.getCountryCurrency(country);
      console.log(`Target currency: ${targetCurrency}`);
      
      if (!this.exchangeRates[targetCurrency]) {
        console.error(`Currency ${targetCurrency} not found in rates:`, Object.keys(this.exchangeRates));
        return { 
          success: false, 
          error: `Currency ${targetCurrency} not supported. Please try a different country or contact support.` 
        };
      }

      const exchangeRate = this.exchangeRates[targetCurrency];
      const convertedAmount = budget * exchangeRate;
      
      console.log(`Conversion: ${budget} ${baseCurrency} = ${convertedAmount} ${targetCurrency} (rate: ${exchangeRate})`);
      
      return {
        success: true,
        localBudget: this.formatCurrency(convertedAmount, targetCurrency),
        originalBudget: this.formatCurrency(budget, baseCurrency),
        rawAmount: convertedAmount,
        exchangeRate: exchangeRate,
        baseCurrency: baseCurrency,
        targetCurrency: targetCurrency,
        country: country,
        usingMockData: ratesResult.usingMockData || false,
        lastUpdated: ratesResult.lastUpdated,
        totalCurrencies: Object.keys(this.exchangeRates).length
      };
    } catch (error) {
      console.error('Conversion error:', error);
      return { success: false, error: error.message };
    }
  }
}

const converter = new CurrencyConverterClass();

const CurrencyConverter = ({ 
  onCurrencyData = null,
  initialDestination = 'Japan',
  initialBudget = 1000,
  baseCurrency = 'EUR',
  showControls = true,
  autoConvert = true
}) => {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState(initialDestination);
  const [budget, setBudget] = useState(initialBudget);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [animateResult, setAnimateResult] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Floating animation particles
  const generateSparkles = () => {
    const newSparkles = [];
    for (let i = 0; i < 6; i++) {
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      });
    }
    setSparkles(newSparkles);
  };

  useEffect(() => {
    generateSparkles();
    const interval = setInterval(generateSparkles, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleConversion = async () => {
    if (!destination) {
      setError('Please provide a destination');
      return;
    }

    setLoading(true);
    setError('');
    setAnimateResult(false);
    
    try {
      const conversionResult = await converter.handleDestinationSelect(destination, budget, baseCurrency);
      
      if (conversionResult.success) {
        setResult(conversionResult);
        setTimeout(() => setAnimateResult(true), 100);
        
        if (onCurrencyData) {
          onCurrencyData({
            localBudget: conversionResult.localBudget,
            originalBudget: conversionResult.originalBudget,
            exchangeRate: conversionResult.exchangeRate,
            targetCurrency: conversionResult.targetCurrency,
            baseCurrency: conversionResult.baseCurrency,
            destination: destination,
            rawAmount: conversionResult.rawAmount
          });
        }
      } else {
        setError(conversionResult.error);
      }
      
    } catch (error) {
      setError(`Conversion error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoConvert && initialDestination) {
      setDestination(initialDestination);
      setBudget(initialBudget);
      handleConversion();
    }
  }, [initialDestination, initialBudget, baseCurrency, autoConvert]);

  useEffect(() => {
    setDestination(initialDestination);
    setBudget(initialBudget);
  }, [initialDestination, initialBudget]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            style={{
              left: `${sparkle.left}%`,
              top: '-10px',
              animation: `float ${sparkle.duration}s ${sparkle.delay}s infinite linear`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
       

        {showControls && (
          <div className="max-w-2xl mx-auto mb-8">
            {/* Glassmorphism Input Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Destination Select */}
                <div className="group">
                  <label className="block text-cyan-300 text-sm font-semibold mb-3 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Destination Country
                  </label>
                  <div className="relative">
                    <select
                      value={destination || ''}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white border border-cyan-400/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm hover:border-cyan-400/60 text-lg"
                    >
                      <option value="" className="bg-gray-900">Select destination...</option>
                      <option value="Japan" className="bg-gray-900">🇯🇵 Japan</option>
                      <option value="South Korea" className="bg-gray-900">🇰🇷 South Korea</option>
                      <option value="United Kingdom" className="bg-gray-900">🇬🇧 United Kingdom</option>
                      <option value="India" className="bg-gray-900">🇮🇳 India</option>
                      <option value="Canada" className="bg-gray-900">🇨🇦 Canada</option>
                      <option value="Australia" className="bg-gray-900">🇦🇺 Australia</option>
                      <option value="Germany" className="bg-gray-900">🇩🇪 Germany</option>
                      <option value="France" className="bg-gray-900">🇫🇷 France</option>
                      <option value="Italy" className="bg-gray-900">🇮🇹 Italy</option>
                      <option value="Spain" className="bg-gray-900">🇪🇸 Spain</option>
                      <option value="Thailand" className="bg-gray-900">🇹🇭 Thailand</option>
                      <option value="Singapore" className="bg-gray-900">🇸🇬 Singapore</option>
                      <option value="UAE" className="bg-gray-900">🇦🇪 UAE</option>
                      <option value="Switzerland" className="bg-gray-900">🇨🇭 Switzerland</option>
                      <option value="China" className="bg-gray-900">🇨🇳 China</option>
                      <option value="Brazil" className="bg-gray-900">🇧🇷 Brazil</option>
                      <option value="Mexico" className="bg-gray-900">🇲🇽 Mexico</option>
                      <option value="Russia" className="bg-gray-900">🇷🇺 Russia</option>
                      <option value="Turkey" className="bg-gray-900">🇹🇷 Turkey</option>
                      <option value="South Africa" className="bg-gray-900">🇿🇦 South Africa</option>
                      <option value="Indonesia" className="bg-gray-900">🇮🇩 Indonesia</option>
                      <option value="Malaysia" className="bg-gray-900">🇲🇾 Malaysia</option>
                      <option value="Philippines" className="bg-gray-900">🇵🇭 Philippines</option>
                      <option value="Vietnam" className="bg-gray-900">🇻🇳 Vietnam</option>
                      <option value="Norway" className="bg-gray-900">🇳🇴 Norway</option>
                      <option value="Sweden" className="bg-gray-900">🇸🇪 Sweden</option>
                      <option value="Denmark" className="bg-gray-900">🇩🇰 Denmark</option>
                      <option value="Poland" className="bg-gray-900">🇵🇱 Poland</option>
                      <option value="Czech Republic" className="bg-gray-900">🇨🇿 Czech Republic</option>
                      <option value="Hungary" className="bg-gray-900">🇭🇺 Hungary</option>
                      <option value="Croatia" className="bg-gray-900">🇭🇷 Croatia</option>
                      <option value="Israel" className="bg-gray-900">🇮🇱 Israel</option>
                      <option value="Egypt" className="bg-gray-900">🇪🇬 Egypt</option>
                      <option value="Nigeria" className="bg-gray-900">🇳🇬 Nigeria</option>
                    </select>
                    <TrendingUp className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Budget Input */}
                <div className="group">
                  <label className="block text-pink-300 text-sm font-semibold mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Budget in {baseCurrency}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                      className="w-full bg-gradient-to-r from-pink-900/50 to-purple-900/50 text-white placeholder-gray-400 border border-pink-400/30 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-pink-400/50 focus:border-pink-400 transition-all duration-300 backdrop-blur-sm hover:border-pink-400/60 text-lg"
                      placeholder="Enter budget amount"
                    />
                    <Zap className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Convert Button */}
              <button
                onClick={handleConversion}
                disabled={loading || !destination}
                className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 disabled:opacity-50 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-400/50 text-xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin mr-3" size={24} />
                      Converting Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 animate-pulse" size={24} />
                      Convert Currency
                      <Sparkles className="ml-3 animate-pulse" size={24} />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Loading Animation */}
        {loading && !showControls && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin border-t-cyan-400"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/30 rounded-full animate-spin animate-reverse border-b-purple-400"></div>
            </div>
            <span className="text-2xl text-white font-semibold animate-pulse">Converting your budget...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="backdrop-blur-xl bg-red-500/20 border border-red-400/50 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center">
                <AlertCircle className="text-red-400 mr-3 animate-pulse" size={24} />
                <p className="text-red-200 text-lg font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && result.success && (
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${animateResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-400 mr-3 animate-bounce" size={32} />
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                    Conversion Complete!
                  </h3>
                  <CheckCircle className="text-green-400 ml-3 animate-bounce" size={32} />
                </div>
              </div>
              
              {/* Currency Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Original Budget Card */}
                <div className="group backdrop-blur-lg bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl p-6 border border-blue-400/30 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30">
                  <div className="text-center">
                    <p className="text-blue-300 text-sm font-medium mb-2 uppercase tracking-wider">Your Budget</p>
                    <p className="text-4xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {result.originalBudget}
                    </p>
                    <p className="text-blue-300 text-sm font-semibold">{result.baseCurrency}</p>
                  </div>
                </div>
                
                {/* Converted Amount Card */}
                <div className="group backdrop-blur-lg bg-gradient-to-br from-green-900/40 to-cyan-900/40 rounded-2xl p-6 border border-green-400/30 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/30">
                  <div className="text-center">
                    <p className="text-green-300 text-sm font-medium mb-2 uppercase tracking-wider">Local Currency</p>
                    <p className="text-4xl font-black text-green-400 mb-2 group-hover:text-green-300 transition-colors duration-300 animate-pulse">
                      {result.localBudget}
                    </p>
                    <p className="text-green-300 text-sm font-semibold">{result.country} ({result.targetCurrency})</p>
                  </div>
                </div>
              </div>
              
              {/* Exchange Rate Info */}
              <div className="backdrop-blur-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-400/30">
                <div className="text-center">
                  <p className="text-white text-lg font-semibold mb-2">
                    💱 Exchange Rate: 1 {result.baseCurrency} = {result.exchangeRate.toFixed(4)} {result.targetCurrency}
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-4 mt-3">
                    {result.usingMockData ? (
                      <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-400/40 rounded-full px-4 py-2">
                        <Zap className="text-yellow-400 mr-2" size={16} />
                        <p className="text-yellow-300 text-sm font-medium">Using demo rates</p>
                      </div>
                    ) : (
                      <div className="inline-flex items-center bg-green-500/20 border border-green-400/40 rounded-full px-4 py-2">
                        <CheckCircle className="text-green-400 mr-2" size={16} />
                        <p className="text-green-300 text-sm font-medium">Live rates from API</p>
                      </div>
                    )}
                    {result.totalCurrencies && (
                      <div className="inline-flex items-center bg-blue-500/20 border border-blue-400/40 rounded-full px-4 py-2">
                        <Globe className="text-blue-400 mr-2" size={16} />
                        <p className="text-blue-300 text-sm font-medium">{result.totalCurrencies} currencies</p>
                      </div>
                    )}
                  </div>
                  {result.lastUpdated && (
                    <p className="text-gray-400 text-xs mt-2">
                      Last updated: {new Date(result.lastUpdated).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        {showControls && (
          <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-cyan-300 font-bold text-xl mb-3">Global Coverage</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Convert between 25+ major world currencies with real-time exchange rates
                </p>
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-purple-300 font-bold text-xl mb-3">Live Rates</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Get accurate, up-to-date exchange rates for precise budget planning
                </p>
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-500 transform hover:scale-105 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-pink-300 font-bold text-xl mb-3">Smart Planning</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Instantly see your purchasing power in any destination country
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default CurrencyConverter;