import API from './api';

const chatService = {
  getChats: async () => {
    const response = await API.get('/chat');

    return response.data;
  },

  getMessages: async roomId => {
    const response = await API.get(`/chat/messages/${roomId}`);

    return response.data;
  },

  sendMessage: async payload => {
    const response = await API.post('/chat/send', payload);

    return response.data;
  },

  deleteMessage: async id => {
    const response = await API.delete(`/chat/message/${id}`);

    return response.data;
  },
};

export default chatService;
