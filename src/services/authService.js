import API from './api';

const authService = {
  login: async data => {
    const response = await API.post('/auth/login', data);

    return response.data;
  },

  register: async data => {
    const response = await API.post('/auth/register', data);

    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/auth/profile');

    return response.data;
  },

  updateProfile: async data => {
    const response = await API.put('/auth/profile', data);

    return response.data;
  },
};

export default authService;
