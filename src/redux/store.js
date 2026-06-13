import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import videoCallReducer from './slices/videoCallSlice';
import profileReducer from './slices/profileSlice';
import friendReducer from './slices/friendSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    videoCall: videoCallReducer,
    profile: profileReducer,
    friend: friendReducer,
    theme: themeReducer,
  },
});

export default store;
