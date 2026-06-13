import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  requests: [],
};

const friendSlice = createSlice({
  name: 'friend',

  initialState,

  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },

    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },

    removeFriend: (state, action) => {
      state.friends = state.friends.filter(item => item.id !== action.payload);
    },

    setRequests: (state, action) => {
      state.requests = action.payload;
    },

    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
  },
});

export const { setFriends, addFriend, removeFriend, setRequests, addRequest } =
  friendSlice.actions;

export default friendSlice.reducer;
