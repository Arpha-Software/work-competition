import axios from 'axios';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bicp2-15a28878e665.herokuapp.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = getCookie('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
