import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AttachmentSheet({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="image" size={24} color="#7C4DFF" />

            <Text style={styles.text}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="videocam" size={24} color="#7C4DFF" />

            <Text style={styles.text}>Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="document" size={24} color="#7C4DFF" />

            <Text style={styles.text}>Document</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="location" size={24} color="#7C4DFF" />

            <Text style={styles.text}>Location</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  text: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
  },
});
