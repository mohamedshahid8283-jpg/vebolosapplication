import { io } from 'socket.io-client';

const DEFAULT_SOCKET_URL = 'http://10.0.2.2:5000'; // Default emulator fallback loop path

class SocketService {
  socket = null;

  connect(userId, customUrl = null) {
    // Allows dynamic server url overrides during testing phases
    const connectionUrl = customUrl || DEFAULT_SOCKET_URL;

    // Prevent establishing duplicate network pipes if already alive
    if (this.socket?.connected) return;

    this.socket = io(connectionUrl, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log(
        '⚡ Socket connected successfully instance ID:',
        this.socket.id,
      );

      // Notify back-end cluster pool to mark user status record as online
      this.socket.emit('user_online', { userId });
    });

    this.socket.on('connect_error', error => {
      console.error(
        '❌ Socket connection handshake failure error:',
        error.message,
      );
    });

    this.socket.on('disconnect', reason => {
      console.log('🔌 Socket disconnected line context reason:', reason);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null; // Reset pointer down back to native null bounds cleanly
    }
  }

  sendMessage(data) {
    if (this.socket) {
      this.socket.emit('send_message', data);
    } else {
      this.logSocketNullWarning('send_message');
    }
  }

  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    } else {
      this.logSocketNullWarning('join_room');
    }
  }

  leaveRoom(roomId) {
    if (this.socket) {
      this.socket.emit('leave_room', roomId);
    } else {
      this.logSocketNullWarning('leave_room');
    }
  }

  onMessage(callback) {
    if (this.socket) {
      // Remove any lingering duplicates to ensure exactly one listener attaches
      this.socket.off('receive_message');
      this.socket.on('receive_message', callback);
    }
  }

  onTyping(callback) {
    if (this.socket) {
      this.socket.off('typing');
      this.socket.on('typing', callback);
    }
  }

  startVideoCall(data) {
    if (this.socket) {
      this.socket.emit('video_call_start', data);
    } else {
      this.logSocketNullWarning('video_call_start');
    }
  }

  answerVideoCall(data) {
    if (this.socket) {
      this.socket.emit('video_call_answer', data);
    } else {
      this.logSocketNullWarning('video_call_answer');
    }
  }

  endVideoCall(data) {
    if (this.socket) {
      this.socket.emit('video_call_end', data);
    } else {
      this.logSocketNullWarning('video_call_end');
    }
  }

  // Internal trace telemetry logger helper
  logSocketNullWarning(actionName) {
    console.warn(
      `⚠️ Action [${actionName}] dropped. Socket layer is null. Call connect() first.`,
    );
  }
}

export default new SocketService();
