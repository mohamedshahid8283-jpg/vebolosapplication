import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  remoteUser: null,
  duration: 0,
  micEnabled: true,
  cameraEnabled: true,
};

const videoCallSlice = createSlice({
  name: 'videoCall',

  initialState,

  reducers: {
    setCallStatus: (state, action) => {
      state.status = action.payload;
    },

    setRemoteUser: (state, action) => {
      state.remoteUser = action.payload;
    },

    setCallDuration: (state, action) => {
      state.duration = action.payload;
    },

    toggleMic: state => {
      state.micEnabled = !state.micEnabled;
    },

    toggleCamera: state => {
      state.cameraEnabled = !state.cameraEnabled;
    },

    resetCall: state => {
      state.status = 'idle';
      state.remoteUser = null;
      state.duration = 0;
      state.micEnabled = true;
      state.cameraEnabled = true;
    },
  },
});

export const {
  setCallStatus,
  setRemoteUser,
  setCallDuration,
  toggleMic,
  toggleCamera,
  resetCall,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
