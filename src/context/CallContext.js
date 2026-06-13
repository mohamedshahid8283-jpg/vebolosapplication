import React, { createContext, useContext, useState } from 'react';

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [callStatus, setCallStatus] = useState('idle');

  const [remoteUser, setRemoteUser] = useState(null);

  const [callDuration, setCallDuration] = useState(0);

  const [isMuted, setIsMuted] = useState(false);

  const [isCameraOff, setIsCameraOff] = useState(false);

  const startSearching = () => {
    setCallStatus('searching');
  };

  const connectCall = user => {
    setRemoteUser(user);

    setCallStatus('connected');

    setCallDuration(0);
  };

  const endCall = () => {
    setCallStatus('ended');
  };

  const resetCall = () => {
    setCallStatus('idle');

    setRemoteUser(null);

    setCallDuration(0);

    setIsMuted(false);

    setIsCameraOff(false);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const toggleCamera = () => {
    setIsCameraOff(prev => !prev);
  };

  return (
    <CallContext.Provider
      value={{
        callStatus,
        remoteUser,
        callDuration,
        isMuted,
        isCameraOff,

        setCallDuration,

        startSearching,
        connectCall,
        endCall,
        resetCall,

        toggleMute,
        toggleCamera,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  return useContext(CallContext);
};

export default CallContext;
