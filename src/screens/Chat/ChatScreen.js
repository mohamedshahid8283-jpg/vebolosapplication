import React, { useState } from 'react';
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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatScreen({ route, navigation }) {
  // Use fallback user properties matching parameters if unspecified
  const { user } = route.params || {
    user: {
      name: 'Aanya',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
    },
  };

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey! How are you?',
      sender: 'other',
      time: '10:10 AM',
    },
    {
      id: '2',
      text: "I'm good, thank you!",
      sender: 'me',
      time: '10:11 AM',
    },
    {
      id: '3',
      text: 'What are you up to?',
      sender: 'other',
      time: '10:25 AM',
    },
    {
      id: '4',
      text: 'Just finished work.',
      sender: 'me',
      time: '10:32 AM',
    },
    {
      id: '5',
      text: 'Nice! Any plans for the weekend?',
      sender: 'other',
      time: '10:32 AM',
    },
    {
      id: '6',
      text: 'Not yet, maybe a road trip! 🚗💨',
      sender: 'me',
      time: '10:33 AM',
    },
  ]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const nextMsg = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'me',
      time: timestamp,
    };

    setMessages(prev => [...prev, nextMsg]);
    setInputMessage('');
  };

  const renderBubble = ({ item }) => {
    const isMe = item.sender === 'me';
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
              isMe ? styles.myBubbleBg : styles.otherBubbleBg,
            ]}
          >
            <Text
              style={[styles.msgText, isMe ? styles.myText : styles.otherText]}
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
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Profile Context Header Control Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={26} color="#000000" />
          </TouchableOpacity>
          <Image source={{ uri: user.image }} style={styles.headerAvatar} />
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerProfileName}>{user.name}</Text>
            <Text style={styles.headerSubtitleStatus}>Online</Text>
          </View>
        </View>

        <View style={styles.headerRightContainer}>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="call" size={22} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="ellipsis-vertical" size={22} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Scroll Area Content Component */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderBubble}
        contentContainerStyle={styles.chatListContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Composition Input Tray Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputToolbarContainer}>
          <View style={styles.inputWrapperFrame}>
            <TextInput
              style={styles.textInputField}
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={inputMessage}
              onChangeText={setInputMessage}
              multiline
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy-outline" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.sendActionButton}
            onPress={handleSend}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
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
    gap: 8,
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
  otherBubbleBg: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#000000',
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
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  inputWrapperFrame: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
    maxHeight: 100,
  },
  textInputField: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
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
  },
});
