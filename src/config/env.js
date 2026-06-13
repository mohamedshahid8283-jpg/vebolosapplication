const ENV = {
  APP_NAME: 'VEBOLOS',

  API_URL: 'http://YOUR_SERVER_IP:5000/api',

  SOCKET_URL: 'http://YOUR_SERVER_IP:5000',

  WEBRTC_STUN_SERVERS: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
  ],
};

export default ENV;
