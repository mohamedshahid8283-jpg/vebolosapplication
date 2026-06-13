import React from 'react';
import { View, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VideoPreview() {
  return (
    <View style={styles.container}>
      <Ionicons name="person" size={55} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 120,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
