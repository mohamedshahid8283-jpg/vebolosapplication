import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  messages: [],
  typingUsers: [],
};

const chatSlice = createSlice({
  name: 'chat',

  initialState,

  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: state => {
      state.messages = [];
    },

    setTypingUsers: (state, action) => {
      state.typingUsers = action.payload;
    },
  },
});

export const {
  setChats,
  setMessages,
  addMessage,
  clearMessages,
  setTypingUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
