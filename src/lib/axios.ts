import axios from 'axios';
import { getAuthToken, clearAuthCookies } from '@/src/lib/cookies';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

// Request interceptor for adding auth token from cookies
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases here
    if (error.response?.status === 401) {
      // Handle unauthorized access - clear cookies and redirect
      clearAuthCookies();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
