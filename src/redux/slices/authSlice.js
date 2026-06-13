import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logoutUser: state => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
