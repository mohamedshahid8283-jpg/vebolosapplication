import { io } from 'socket.io-client';

const SOCKET_URL = 'http://YOUR_SERVER_IP:5000';

class SocketService {
  socket = null;

  connect(userId) {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    this.socket.emit('user_online', {
      userId,
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(data) {
    this.socket.emit('send_message', data);
  }

  joinRoom(roomId) {
    this.socket.emit('join_room', roomId);
  }

  leaveRoom(roomId) {
    this.socket.emit('leave_room', roomId);
  }

  onMessage(callback) {
    this.socket.on('receive_message', callback);
  }

  onTyping(callback) {
    this.socket.on('typing', callback);
  }

  startVideoCall(data) {
    this.socket.emit('video_call_start', data);
  }

  answerVideoCall(data) {
    this.socket.emit('video_call_answer', data);
  }

  endVideoCall(data) {
    this.socket.emit('video_call_end', data);
  }
}

export default new SocketService();
