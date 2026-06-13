import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MessagesScreen({ navigation }) {
  const [search, setSearch] = useState('');

  // Structured exact dataset matching mockup items
  const chats = [
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

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderChat = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => navigation.navigate('Chat', { user: item })}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />

      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.messageSnippet} numberOfLines={1}>
          {item.message}
        </Text>
      </View>

      <View style={styles.metaColumn}>
        <Text style={styles.timeText}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Text Section */}
      <Text style={styles.screenHeaderTitle}>Messages</Text>

      {/* Styled Inline Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#9CA3AF"
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search messages"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* Core Conversations Feed */}
      <FlatList
        data={filteredChats}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenHeaderTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
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
    color: '#000000',
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
    borderBottomColor: '#F9FAFB',
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
    color: '#000000',
    marginBottom: 4,
  },
  messageSnippet: {
    color: '#6B7280',
    fontSize: 14,
  },
  metaColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
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
  bottomTabContainer: {
    height: 64,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#888888',
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#6338E8',
    fontWeight: '600',
  },
});
