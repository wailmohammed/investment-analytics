// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (name, email, password) => api.post('/auth/register', { name, email, password });
export const getPortfolio = () => api.get('/portfolio');
export const addStock = (stockData) => api.post('/portfolio', stockData);
export const updateStock = (id, stockData) => api.put(`/portfolio/${id}`, stockData);
export const deleteStock = (id) => api.delete(`/portfolio/${id}`);
export const getDividends = () => api.get('/dividends');
export const addDividend = (dividendData) => api.post('/dividends', dividendData);
export const updateDividend = (id, dividendData) => api.put(`/dividends/${id}`, dividendData);
export const deleteDividend = (id) => api.delete(`/dividends/${id}`);
export const getAnalysisData = () => api.get('/analysis');

export default api;