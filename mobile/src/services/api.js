import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.217.22:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Hospital APIs
export const hospitalAPI = {
  getAllHospitals: () => api.get('/hospitals'),
  getHospital: (id) => api.get(`/hospitals/${id}`),
  createHospital: (data) => api.post('/hospitals', data),
  updateHospital: (id, data) => api.put(`/hospitals/${id}`, data),
  deleteHospital: (id) => api.delete(`/hospitals/${id}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getHospitalStats: (id) => api.get(`/dashboard/hospital/${id}/stats`),
};

export default api; 