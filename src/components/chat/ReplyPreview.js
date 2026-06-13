import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ReplyPreview({ replyMessage, onCancel }) {
  if (!replyMessage) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.replyTitle}>Replying to</Text>

        <Text numberOfLines={1}>{replyMessage}</Text>
      </View>

      <TouchableOpacity onPress={onCancel}>
        <Ionicons name="close" size={22} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 10,
  },

  replyTitle: {
    color: '#7C4DFF',
    fontWeight: '700',
  },
});
