import axios from "axios";

// Set the base URL for your API
const API_BASE_URL = 'http://localhost:5064/api/';

// Axios instance to include baseURL and authentication headers
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // If you're using cookies for authentication
});

// Add the Authorization header globally from localStorage
const setAuthHeader = () => {
  const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization']; // Remove header if no token is found
  }
};

// Call this function to update the headers before making a request
setAuthHeader();

export default api;
