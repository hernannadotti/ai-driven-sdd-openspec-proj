import axios from 'axios';

// Create Axios instance with Rick and Morty API configuration
const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout'));
    }
    
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }
    
    if (!error.response) {
      return Promise.reject(new Error('Network error'));
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
