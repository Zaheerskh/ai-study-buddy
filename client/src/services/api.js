import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on login/signup page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }).then((res) => {
      // Handle both old and new response formats for backward compatibility
      return res.data.data || res.data;
    }),
  signup: (username, email, password) =>
    api.post('/auth/register', { username, email, password }).then((res) => {
      return res.data.data || res.data;
    }),
  getMe: () => api.get('/auth/me').then((res) => {
    return res.data.data || res.data;
  })
};

export const studyMaterialAPI = {
  getAll: () => api.get('/study-materials').then((res) => {
    return res.data.data || res.data;
  }),
  getById: (id) => api.get(`/study-materials/${id}`).then((res) => {
    return res.data.data || res.data;
  }),
  create: (data) => api.post('/study-materials', data).then((res) => {
    return res.data.data || res.data;
  }),
  update: (id, data) => api.put(`/study-materials/${id}`, data).then((res) => {
    return res.data.data || res.data;
  }),
  delete: (id) => api.delete(`/study-materials/${id}`).then((res) => res.data)
};

export default api;
