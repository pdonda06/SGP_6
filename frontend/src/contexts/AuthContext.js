import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Set default auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user profile
          const response = await axios.get('/api/users/profile');
          setUser(response.data.data);
        }
      } catch (error) {
        // If token is invalid or expired, clear it
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Get user profile
      const userResponse = await axios.get('/api/users/profile');
      setUser(userResponse.data.data);
      
      return userResponse.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Get user profile
      const userResponse = await axios.get('/api/users/profile');
      setUser(userResponse.data.data);
      
      return userResponse.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 