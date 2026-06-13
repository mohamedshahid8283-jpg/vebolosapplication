import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppTheme from '../../theme/useTheme';

export default function ProfileCard({ user, onEditPress }) {
  const colors = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: user?.image || 'https://randomuser.me/api/portraits/men/1.jpg',
          }}
          style={styles.avatar}
        />

        <View style={styles.onlineDot} />
      </View>

      <Text
        style={[
          styles.name,
          {
            color: colors.text,
          },
        ]}
      >
        {user?.name || 'Shahid'}
      </Text>

      <Text
        style={[
          styles.username,
          {
            color: colors.subText,
          },
        ]}
      >
        @{user?.username || 'vebolos_user'}
      </Text>

      <Text
        style={[
          styles.bio,
          {
            color: colors.subText,
          },
        ]}
      >
        {user?.bio ||
          'Building connections and finding vibes around the world 🌍'}
      </Text>

      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Ionicons name="create-outline" size={18} color="#fff" />

        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  onlineDot: {
    position: 'absolute',
    right: 8,
    bottom: 8,

    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: '#00E676',

    borderWidth: 3,
    borderColor: '#fff',
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 15,
  },

  username: {
    fontSize: 14,
    marginTop: 4,
  },

  bio: {
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },

  editButton: {
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#7C4DFF',

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 30,
  },

  editText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },
});
