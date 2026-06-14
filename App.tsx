import React from 'react';
import { Provider } from 'react-redux';

// Central Redux Store Architecture
import store from './src/redux/store';

// Real-Time Socket Connection Layer
import socketService from './src/services/socketService';
import SocketContext from './src/context/SocketContext'; 

// Main App Router Control Center
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    /* 1. Inject your global Redux memory state across the entire application stack */
    <Provider store={store}>
      
      {/* 2. Inject your real-time socket engine instance so useSocket() hooks work instantly */}
      <SocketContext.Provider value={socketService}>
        
        {/* 3. Render your secure conditional route gatekeeper layout */}
        <RootNavigator />
        
      </SocketContext.Provider>
    </Provider>
  );
}