import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

/* Injeta o token em todas as requisições autenticadas */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@eventflow:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
