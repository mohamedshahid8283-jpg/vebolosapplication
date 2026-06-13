/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoRow}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <Text style={styles.logoText}>Vebolos</Text>
      </View>

      <Text style={styles.heading}>Meet new people</Text>

      <Text style={styles.headingPurple}>Make real connections</Text>

      <Text style={styles.description}>
        A safe space to chat, connect and build meaningful relationships.
      </Text>

      {/* Couple Image */}
      <Image
        source={require('../../assets/couple.png')}
        style={styles.coupleImage}
        resizeMode="contain"
      />

      {/* Get Started */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.primaryText}>Get Started</Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.secondaryText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>By continuing, you agree to our</Text>

      <Text style={styles.links}>Terms of Service and Privacy Policy</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    alignItems: 'center',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },

  logo: {
    width: 30,
    height: 30,
  },

  logoText: {
    marginLeft: 8,
    color: '#7C4DFF',
    fontSize: 22,
    fontWeight: '800',
  },

  heading: {
    marginTop: 40,
    fontSize: 34,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
  },

  headingPurple: {
    fontSize: 34,
    fontWeight: '800',
    color: '#7C4DFF',
    textAlign: 'center',
  },

  description: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    fontSize: 15,
    paddingHorizontal: 15,
  },

  coupleImage: {
    width: 280,
    height: 280,
    marginTop: 20,
  },

  primaryButton: {
    width: '100%',
    height: 58,
    backgroundColor: '#7C4DFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  primaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  secondaryButton: {
    width: '100%',
    height: 58,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  secondaryText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 16,
  },

  terms: {
    marginTop: 30,
    color: '#999',
    fontSize: 12,
  },

  links: {
    marginTop: 5,
    color: '#7C4DFF',
    fontWeight: '600',
    fontSize: 12,
  },
});
