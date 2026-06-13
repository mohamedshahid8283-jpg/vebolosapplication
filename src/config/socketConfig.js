import { io } from 'socket.io-client';
import ENV from './env';

let socket = null;

export const connectSocket = userId => {
  if (socket) {
    return socket;
  }

  socket = io(ENV.SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    forceNew: true,
    query: {
      userId,
    },
  });

  socket.on('connect', () => {
    console.log('Socket Connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket Disconnected');
  });

  socket.on('connect_error', error => {
    console.log('Socket Error:', error.message);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
