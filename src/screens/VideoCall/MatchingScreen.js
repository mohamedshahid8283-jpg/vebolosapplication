import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function MatchingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#7C4DFF" />

      <Text style={styles.title}>Finding Your Next Vibe...</Text>

      <Text style={styles.subtitle}>Connecting with random users</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 20,
  },

  subtitle: {
    color: '#aaa',
    marginTop: 10,
  },
});
