/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => clearTimeout(timer);
  });

  return (
    <LinearGradient colors={['#8A4DFF', '#6D28FF']} style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.appName}>Vebolos</Text>

      <Text style={styles.tagline}>Meet. Connect. Be real.</Text>

      {/* Bottom Decoration */}
      <View style={styles.bottomCurve}>
        <Text style={styles.heart}>♡</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 140,
    height: 140,
  },

  appName: {
    marginTop: 15,
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
  },

  tagline: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    fontWeight: '500',
  },

  bottomCurve: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },

  heart: {
    fontSize: 60,
    color: 'rgba(255,255,255,0.25)',
  },
});
