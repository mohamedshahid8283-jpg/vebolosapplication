import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MatchCard({ user, callTime }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name}</Text>

      <Text style={styles.country}>{user?.country}</Text>

      <Text style={styles.timer}>{callTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 180,
    left: 20,
  },

  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },

  country: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 4,
  },

  timer: {
    color: '#00E676',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
});
