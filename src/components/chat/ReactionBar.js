import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const reactions = ['❤️', '😂', '🔥', '👍', '😍'];

export default function ReactionBar({ onReact }) {
  return (
    <View style={styles.container}>
      {reactions.map(item => (
        <TouchableOpacity
          key={item}
          onPress={() => onReact(item)}
          style={styles.reaction}
        >
          <Text style={styles.emoji}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },

  reaction: {
    marginHorizontal: 5,
  },

  emoji: {
    fontSize: 22,
  },
});
