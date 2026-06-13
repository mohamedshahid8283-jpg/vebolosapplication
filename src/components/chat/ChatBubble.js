import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ message, isMe }) {
  return (
    <View
      style={[styles.container, isMe ? styles.myMessage : styles.otherMessage]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isMe ? '#fff' : '#000',
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
  },

  myMessage: {
    backgroundColor: '#7C4DFF',
    alignSelf: 'flex-end',
  },

  otherMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 15,
  },
});
