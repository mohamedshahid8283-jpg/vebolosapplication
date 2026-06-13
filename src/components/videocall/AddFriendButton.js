import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddFriendButton({ visible, onPress }) {
  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="person-add" size={20} color="#fff" />

      <Text style={styles.text}>Add Friend</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#7C4DFF',

    paddingHorizontal: 22,
    paddingVertical: 12,

    borderRadius: 30,
  },

  text: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 15,
  },
});
