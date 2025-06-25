import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // Using Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token is invalid or expired
      removeToken();
      removeUser();
      // Optionally redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Token management functions
export const setToken = (token) => {
  localStorage.setItem('aeroai_token', token);
};

export const getToken = () => {
  return localStorage.getItem('aeroai_token');
};

export const removeToken = () => {
  localStorage.removeItem('aeroai_token');
};

// User management functions
export const setUser = (user) => {
  localStorage.setItem('aeroai_user', JSON.stringify(user));
};

export const getUser = () => {
  const userStr = localStorage.getItem('aeroai_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = () => {
  localStorage.removeItem('aeroai_user');
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken() && !!getUser();
};

// API Functions
export const authAPI = {
  // Sign up
  signup: async (userData) => {
    try {
      const response = await api.post('/signup', userData);
      const { token, user } = response.data;
      
      // Store token and user data
      setToken(token);
      setUser(user);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed. Please try again.',
      };
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      setToken(token);
      setUser(user);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  },

  // Logout
  logout: () => {
    removeToken();
    removeUser();
    // Optionally make API call to invalidate token on server
    return { success: true };
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch profile.',
      };
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/verify');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Token verification failed.',
      };
    }
  },
};

export default authAPI;