import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Global Redux, Hooks, and Theme Integration Slices
import { useSelector, useDispatch } from 'react-redux';
import useChat from '../../hooks/useChat';
import useTheme from '../../hooks/useTheme';
import useSocket from '../../hooks/useSocket';
import {
  setCallStatus,
  setRemoteUser,
} from '../../redux/slices/videoCallSlice';

// System Infrastructure Utilities and Form Trackers
import { formatTime } from '../../utils/dateFormatter';
import { requestVideoCallPermissions } from '../../utils/permissons';
import { CALL_STATUS } from '../../utils/constants';

// 1. ISOLATED COMPOSER: Prevents parent keyboard state from re-rendering the entire chat timeline
const ChatInputToolbar = React.memo(
  ({ onSendMessage, onTypingStatusChange, colors }) => {
    const [localInput, setLocalInput] = useState('');

    // Automatically broadcast typing indicators with a clean debounce pattern
    useEffect(() => {
      if (!onTypingStatusChange) return;

      if (localInput.trim().length > 0) {
        onTypingStatusChange(true);
      }

      const typingTimeout = setTimeout(() => {
        onTypingStatusChange(false);
      }, 2000); // Marks user as stopped if they pause typing for 2 seconds

      return () => clearTimeout(typingTimeout);
    }, [localInput, onTypingStatusChange]);

    const handlePressSend = () => {
      const cleanMsg = localInput.trim();
      if (!cleanMsg) return;
      onSendMessage(cleanMsg);
      setLocalInput('');
    };

    return (
      <View
        style={[
          styles.inputToolbarContainer,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.inputWrapperFrame,
            { backgroundColor: colors.background },
          ]}
        >
          <TextInput
            style={[styles.textInputField, { color: colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={localInput}
            onChangeText={setLocalInput}
            multiline
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.sendActionButton}
          onPress={handlePressSend}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  },
);

export default function ChatScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const listRef = useRef(null);

  const { messages, sendMessage, typingUsers } = useChat();
  const { colors } = useTheme();
  const socketService = useSocket();

  const { user: currentLoggedUser } = useSelector(state => state.auth);

  const { user } = route.params || {
    user: {
      id: 'fallback_user_1',
      name: 'Aanya',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
    },
  };

  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  // Sync sockets safely
  useEffect(() => {
    if (currentLoggedUser?.id && socketService?.socket) {
      socketService.joinRoom(user.id);
    }

    if (socketService?.socket) {
      socketService.onMessage(incomingMessage => {
        if (incomingMessage.senderId === user.id) {
          sendMessage(incomingMessage);
        }
      });
    }

    if (typingUsers) {
      setIsOtherUserTyping(typingUsers.includes(user.id));
    }

    return () => {
      if (currentLoggedUser?.id && socketService?.socket) {
        socketService.leaveRoom(user.id);
      }
    };
  }, [user.id, typingUsers, currentLoggedUser, socketService, sendMessage]);

  // Lock scroll index target focusing logic cleanly
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(
        () => listRef.current?.scrollToEnd({ animated: true }),
        60,
      );
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // 2. CALLBACK HOOK: Wrapped to block unnecessary render updates downstream
  const onSendPayload = useCallback(
    textPayload => {
      const messagePayload = {
        id: Date.now().toString(),
        text: textPayload,
        sender: 'me',
        senderId: currentLoggedUser?.id || 'me',
        receiverId: user.id,
        time: formatTime(new Date()),
      };

      sendMessage(messagePayload);
      if (socketService?.socket) {
        socketService.sendMessage(messagePayload);
      }
    },
    [user.id, currentLoggedUser, sendMessage, socketService],
  );

  // Handle outbound real-time typing events safely
  const handleTypingStatusChange = useCallback(
    isTyping => {
      if (socketService?.socket && currentLoggedUser?.id) {
        socketService.socket.emit('typing_status', {
          senderId: currentLoggedUser.id,
          receiverId: user.id,
          isTyping,
        });
      }
    },
    [user.id, currentLoggedUser, socketService],
  );

  const handleAppVideoCallInitiate = async () => {
    const hasHardwarePermissions = await requestVideoCallPermissions();
    if (!hasHardwarePermissions) {
      Alert.alert(
        'Hardware Required',
        'Camera and Audio permissions are required to start a chat call.',
      );
      return;
    }

    dispatch(setRemoteUser(user));
    dispatch(setCallStatus(CALL_STATUS.SEARCHING));

    if (socketService?.socket) {
      socketService.startVideoCall({
        receiverId: user.id,
        senderName: currentLoggedUser?.name,
      });
    }

    navigation.navigate('VideoCall');
  };

  // 3. MEMOIZED ROW BUBBLE: Stops execution updates from redrawing stable text entries
  const renderBubble = useCallback(
    ({ item }) => {
      const isMe =
        item.sender === 'me' || item.senderId === currentLoggedUser?.id;
      return (
        <View style={styles.bubbleRowContainer}>
          <View
            style={[
              styles.bubbleWrapper,
              isMe ? styles.myBubbleAlign : styles.otherBubbleAlign,
            ]}
          >
            <View
              style={[
                styles.msgBubble,
                isMe ? styles.myBubbleBg : { backgroundColor: colors.border },
              ]}
            >
              <Text
                style={[
                  styles.msgText,
                  isMe ? styles.myText : { color: colors.text },
                ]}
              >
                {item.text}
              </Text>
            </View>
            <Text
              style={[
                styles.timeStamp,
                isMe ? styles.myTimeAlign : styles.otherTimeAlign,
              ]}
            >
              {item.time}
            </Text>
          </View>
        </View>
      );
    },
    [currentLoggedUser?.id, colors.border, colors.text],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top Header Section */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </TouchableOpacity>
          <Image source={{ uri: user.image }} style={styles.headerAvatar} />
          <View style={styles.headerTextWrapper}>
            <Text style={[styles.headerProfileName, { color: colors.text }]}>
              {user.name}
            </Text>
            <Text style={styles.headerSubtitleStatus}>
              {isOtherUserTyping ? 'typing...' : 'Online'}
            </Text>
          </View>
        </View>

        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            style={styles.headerActionButton}
            onPress={handleAppVideoCallInitiate}
          >
            <Ionicons name="videocam" size={22} color="#6338E8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Feed Viewport with rendering constraint configurations */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderBubble}
        contentContainerStyle={styles.chatListContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Composition Input Tray Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ChatInputToolbar
          onSendMessage={onSendPayload}
          onTypingStatusChange={handleTypingStatusChange}
          colors={colors}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 4,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  headerTextWrapper: {
    marginLeft: 10,
  },
  headerProfileName: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitleStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
    marginTop: 1,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerActionButton: {
    padding: 8,
  },
  chatListContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  bubbleRowContainer: {
    width: '100%',
    marginBottom: 16,
  },
  bubbleWrapper: {
    maxWidth: '75%',
  },
  myBubbleAlign: {
    alignSelf: 'flex-end',
  },
  otherBubbleAlign: {
    alignSelf: 'flex-start',
  },
  msgBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  myBubbleBg: {
    backgroundColor: '#6338E8',
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myText: {
    color: '#FFFFFF',
  },
  timeStamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  myTimeAlign: {
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  otherTimeAlign: {
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  inputToolbarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    gap: 12,
  },
  inputWrapperFrame: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
    maxHeight: 100,
  },
  textInputField: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
  },
  emojiButton: {
    paddingLeft: 8,
  },
  sendActionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6338E8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6338E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
