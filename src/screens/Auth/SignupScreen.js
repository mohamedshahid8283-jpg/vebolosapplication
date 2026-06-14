import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux State Architecture Hooks
import useAuth from '../../hooks/useAuth';

// Central Database Persistence Layer Services
import storageService from '../../services/storageService';

// Business Logic Verification Utilities
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { STORAGE_KEYS } from '../../utils/constants';

export default function SignupScreen({ navigation }) {
  // Extract state setup methods out from Redux hooks
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // 1. Mandatory Input Fields Verification Check
    if (!cleanName || !cleanEmail || !cleanPassword) {
      Alert.alert(
        'Missing Fields',
        'Please fill out all elements to get started.',
      );
      return;
    }

    // 2. Email Regular Expression Architecture Validation Check
    if (!isValidEmail(cleanEmail)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address structure.',
      );
      return;
    }

    // 3. Password Minimum Character Limitation Security Validation Check
    if (!isValidPassword(cleanPassword)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    try {
      setIsLoading(true);

      // Package initial credential metadata payload keys
      const initialRegistrationData = {
        name: cleanName,
        email: cleanEmail.toLowerCase(),
      };

      // 4. Cache data state down to an isolated storage session key
      // This allows 'ProfileCreateScreen' to append DOB, preferences, and photos later
      await storageService.setItem(STORAGE_KEYS.USER, initialRegistrationData);

      console.log(
        'Initial credential keys cached successfully inside storageService.',
      );

      // 5. Forward user to the profile setup screen workspace
      navigation.navigate('ProfileCreate');
    } catch (error) {
      console.error('Failed writing initial registration properties:', error);
      Alert.alert(
        'Registration Error',
        'Something went wrong while initializing your account setup.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header Text */}
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Let's get you started</Text>

        {/* Full Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={name}
            onChangeText={setName}
            editable={!isLoading}
          />
        </View>

        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
              disabled={isLoading}
            >
              <Ionicons
                name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Divider Row */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Register Options */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
            <Ionicons name="logo-google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
            <Ionicons name="logo-apple" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
        </View>

        {/* Bottom Switch Screen Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            disabled={isLoading}
          >
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#000000',
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    height: 54,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    color: '#000000',
    fontSize: 15,
  },
  eyeIcon: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 54,
    backgroundColor: '#6338E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#6338E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#888888',
    paddingHorizontal: 12,
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  socialButton: {
    width: 80,
    height: 56,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#444444',
    fontSize: 15,
  },
  footerLink: {
    color: '#6338E8',
    fontSize: 15,
    fontWeight: '600',
  },
});
