import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CallControls({
  micEnabled,
  cameraEnabled,
  onToggleMic,
  onToggleCamera,
  onEndCall,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlBtn} onPress={onToggleMic}>
        <Ionicons
          name={micEnabled ? 'mic' : 'mic-off'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlBtn} onPress={onToggleCamera}>
        <Ionicons
          name={cameraEnabled ? 'videocam' : 'videocam-off'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.endBtn} onPress={onEndCall}>
        <Ionicons name="call" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },

  endBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
});
