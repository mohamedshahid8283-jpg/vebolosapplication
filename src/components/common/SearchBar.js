import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111',
  },
});
