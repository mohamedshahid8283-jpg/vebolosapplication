import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Global Custom Theme Architecture Hook
import useTheme from '../../hooks/useTheme';

export default function CallEndedScreen({ duration, onRestart, onHome }) {
  // Extract custom dynamic theme styling configurations
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name="call" size={80} color={colors.danger} />

      <Text style={[styles.title, { color: colors.text }]}>Call Ended</Text>

      <Text style={[styles.duration, { color: colors.subText }]}>
        Duration: {duration}
      </Text>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={onRestart}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Find Another User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.secondaryButton,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={onHome}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>
          Back To Home
        </Text>
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
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
    textAlign: 'center',
  },
  duration: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  secondaryButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
