import axios from 'axios';

// Get the backend URL from environment variables (for production) or fallback to Render URL (for deployment)
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';  // Replace with your actual Render URL

// Create Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,  // Set timeout for API requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json',  // Set default content type
    },
});

// Optional: Add interceptors for global error handling or logging
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('General error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
