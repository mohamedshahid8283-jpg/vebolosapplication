import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Architecture Design System Custom Theme Hook Integration
import useTheme from '../../hooks/useTheme';

export default function MatchingScreen() {
  // Extract custom dynamic theme styling properties
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />

      <Text style={[styles.title, { color: colors.text }]}>
        Finding Your Next Vibe...
      </Text>

      <Text style={[styles.subtitle, { color: colors.subText }]}>
        Connecting with random users
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
});
