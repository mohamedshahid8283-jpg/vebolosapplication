import API from './api';

const callService = {
  startCall: async payload => {
    const response = await API.post('/call/start', payload);

    return response.data;
  },

  endCall: async payload => {
    const response = await API.post('/call/end', payload);

    return response.data;
  },

  addFriendAfterCall: async payload => {
    const response = await API.post('/friends/add', payload);

    return response.data;
  },

  getCallHistory: async () => {
    const response = await API.get('/call/history');

    return response.data;
  },
};

export default callService;
