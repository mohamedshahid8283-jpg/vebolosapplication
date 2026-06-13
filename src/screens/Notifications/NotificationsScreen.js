import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppTheme from '../../theme/useTheme';

export default function NotificationsScreen() {
  const colors = useAppTheme();

  const [notifications] = useState([
    {
      id: '1',
      type: 'friend_request',
      name: 'Sophia',
      message: 'sent you a friend request',
      time: '2 min ago',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      unread: true,
    },
    {
      id: '2',
      type: 'message',
      name: 'Liam',
      message: 'sent you a message',
      time: '10 min ago',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      unread: true,
    },
    {
      id: '3',
      type: 'call',
      name: 'Emma',
      message: 'missed your video call',
      time: '1 hour ago',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      unread: false,
    },
    {
      id: '4',
      type: 'friend_accept',
      name: 'Olivia',
      message: 'accepted your friend request',
      time: '3 hours ago',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      unread: false,
    },
    {
      id: '5',
      type: 'system',
      name: 'VEBOLOS',
      message: 'Welcome to the community 🎉',
      time: 'Yesterday',
      image: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
      unread: false,
    },
  ]);

  const getNotificationIcon = type => {
    switch (type) {
      case 'friend_request':
        return 'person-add';

      case 'friend_accept':
        return 'people';

      case 'message':
        return 'chatbubble';

      case 'call':
        return 'videocam';

      default:
        return 'notifications';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.notificationCard,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.avatar} />

        <View style={styles.iconBadge}>
          <Ionicons
            name={getNotificationIcon(item.type)}
            size={12}
            color="#fff"
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.name,
            {
              color: colors.text,
            },
          ]}
        >
          {item.name}
        </Text>

        <Text
          style={[
            styles.message,
            {
              color: colors.subText,
            },
          ]}
        >
          {item.message}
        </Text>

        <Text
          style={[
            styles.time,
            {
              color: colors.subText,
            },
          ]}
        >
          {item.time}
        </Text>
      </View>

      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          Notifications
        </Text>

        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={24} color="#7C4DFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
  },

  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  iconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  message: {
    marginTop: 4,
    fontSize: 14,
  },

  time: {
    marginTop: 6,
    fontSize: 12,
  },

  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7C4DFF',
  },
});
