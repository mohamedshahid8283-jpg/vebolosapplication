import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CallEndedScreen({ duration, onRestart, onHome }) {
  return (
    <View style={styles.container}>
      <Ionicons name="call" size={80} color="#FF3B30" />

      <Text style={styles.title}>Call Ended</Text>

      <Text style={styles.duration}>Duration: {duration}</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onRestart}>
        <Text style={styles.buttonText}>Find Another User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onHome}>
        <Text style={styles.buttonText}>Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
  },

  duration: {
    color: '#aaa',
    marginTop: 10,
    marginBottom: 30,
  },

  primaryButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  secondaryButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
