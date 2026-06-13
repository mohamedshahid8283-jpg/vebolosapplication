import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MessageInput({ value, onChangeText, onSend }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type a message..."
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
        <Ionicons name="send" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },

  sendBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
