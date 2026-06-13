import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EmptyState({
  icon = 'chatbubble-outline',
  title = 'No Data Found',
  subtitle = 'Nothing to show here',
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={80} color="#BDBDBD" />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>
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
    marginTop: 15,
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777',
  },
});
