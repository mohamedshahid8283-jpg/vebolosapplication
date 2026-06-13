import axios from 'axios';

const API = axios.create({
  baseURL: 'http://YOUR_SERVER_IP:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error),
);

API.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default API;
