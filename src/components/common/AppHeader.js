import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AppHeader({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}

        <Text style={styles.title}>{title}</Text>
      </View>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons name={rightIcon} size={24} color="#111" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
    color: '#111',
  },
});
