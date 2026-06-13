import React, { createContext, useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';
import SOCKET_URL from '../config/socketConfig';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketInstance.on('connect', () => {
      console.log('Socket Connected');

      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket Disconnected');

      setConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = data => {
    if (socket) {
      socket.emit('send_message', data);
    }
  };

  const joinRoom = roomId => {
    if (socket) {
      socket.emit('join_room', roomId);
    }
  };

  const leaveRoom = roomId => {
    if (socket) {
      socket.emit('leave_room', roomId);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        sendMessage,
        joinRoom,
        leaveRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketContext;
