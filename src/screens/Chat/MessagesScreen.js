import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux Global Memory Hook Integrations
import { useSelector, useDispatch } from 'react-redux';
import { setChats } from './../../redux/slices/chatSlice';

// Global Custom Theme Architecture Hook
import useTheme from '../../hooks/useTheme';

export default function MessagesScreen({ navigation }) {
  const dispatch = useDispatch();

  // Extract custom dynamic light/dark style colors
  const { colors } = useTheme();

  // Retrieve active conversations state directly from the global Redux store
  const { chats } = useSelector(state => state.chat);

  const [search, setSearch] = useState('');

  // Pre-populate global Redux memory state with fallback data ONLY if truly empty on start
  useEffect(() => {
    if (!chats || chats.length === 0) {
      const defaultMockChats = [
        {
          id: '1',
          name: 'Aanya',
          image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
          message: 'Hey! How are you?',
          unread: 1,
          time: '2m',
        },
        {
          id: '2',
          name: 'Rohan',
          image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
          message: 'That sounds great!',
          unread: 0,
          time: '10m',
        },
        {
          id: '3',
          name: 'Priya',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
          message: "Let's catch up soon.",
          unread: 0,
          time: '1h',
        },
        {
          id: '4',
          name: 'Arjun',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
          message: 'Nice to meet you 😊',
          unread: 0,
          time: '2h',
        },
        {
          id: '5',
          name: 'Neha',
          image:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
          message: 'Thanks!',
          unread: 0,
          time: '3h',
        },
      ];
      dispatch(setChats(defaultMockChats));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // Removed chats dependency to run only on initial mount check

  // Safe verification wrapper parsing search strings safely against Redux profiles
  const filteredChats = (chats || []).filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  // OPTIMIZATION: Wrapped row cards to block unnecessary re-draw cycles across search triggers
  const renderChat = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[styles.chatCard, { borderBottomColor: colors.border }]}
        onPress={() => navigation.navigate('Chat', { user: item })}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />

        <View style={styles.chatInfo}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text
            style={[styles.messageSnippet, { color: colors.subText }]}
            numberOfLines={1}
          >
            {item.message}
          </Text>
        </View>

        <View style={styles.metaColumn}>
          <Text style={[styles.timeText, { color: colors.subText }]}>
            {item.time}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    ),
    [colors.border, colors.text, colors.subText, navigation],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top Header Text Section */}
      <Text style={[styles.screenHeaderTitle, { color: colors.text }]}>
        Messages
      </Text>

      {/* Styled Inline Search Bar */}
      <View
        style={[styles.searchBarContainer, { backgroundColor: colors.border }]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.subText}
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search messages"
          placeholderTextColor={colors.subText}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      {/* Core Conversations Feed with high-performance list constraints */}
      <FlatList
        data={filteredChats}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        // Performance Enhancements for quick searching and smooth frame rates
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenHeaderTitle: {
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E5E7EB',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  messageSnippet: {
    fontSize: 14,
  },
  metaColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#6338E8',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
