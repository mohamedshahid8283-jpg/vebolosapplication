import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux Global Memory Hook Integration
import useAuth from '../../hooks/useAuth';

// Isolated Clean Local Database Storage Service Wrappers
import storageService from '../../services/storageService';

// Form Field Business Logic Security Utilities
import { isValidEmail } from '../../utils/validators';
import { STORAGE_KEYS } from '../../utils/constants';

export default function LoginScreen({ navigation }) {
  // Pull core state management hooks out from Redux architecture slices
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Automatically parse storage files to check for an existing validation user token
  useEffect(() => {
    checkExistingSession();
  });

  const checkExistingSession = async () => {
    try {
      // Access storage layer via your storage service manager
      const savedUser = await storageService.getItem(STORAGE_KEYS.USER);
      const savedToken = await storageService.getItem(STORAGE_KEYS.TOKEN);

      if (savedUser && savedToken) {
        console.log(
          'Valid local session discovered. Syncing state to Redux memory wrapper...',
        );

        // Sync the stored user structure directly down into your active Redux memory state
        login({ user: savedUser, token: savedToken });

        // Forward authenticated router execution path past login forms safely
        navigation.getParent()?.navigate('App');
      }
    } catch (error) {
      console.error(
        'Failed processing internal database validation properties:',
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    const cleanEmail = email.trim();

    // Validate email structure using your utility layer before attempting network execution
    if (!cleanEmail || !password.trim()) {
      Alert.alert('Missing Information', 'Please enter email and password');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid email address structure.',
      );
      return;
    }

    try {
      setIsLoading(true);

      // Simulated local authenticated database return payload
      const mockUserAuthPayload = {
        id: 'user_shahid_99',
        name: 'Shahid',
        email: cleanEmail.toLowerCase(),
        role: 'Product Manager',
        location: 'Bangalore',
        image:
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
        about: 'Building Vebolos applications. 🚀',
        interests: ['Tech', 'Design', 'Music'],
      };

      const mockJwtToken = 'mock_jwt_session_token_xyzabc123';

      // 1. Commit values securely down to device storage layer
      await storageService.setItem(STORAGE_KEYS.USER, mockUserAuthPayload);
      await storageService.setItem(STORAGE_KEYS.TOKEN, mockJwtToken);

      // 2. Synchronize memory workspace states up using Redux action dispatch handlers
      login({ user: mockUserAuthPayload, token: mockJwtToken });

      console.log(
        'Authentication properties committed successfully across all domains.',
      );

      // 3. Forward state flow into the main application router environment
      navigation.getParent()?.navigate('App');
    } catch (error) {
      Alert.alert(
        'Authentication Error',
        'Something went wrong while executing your login request.',
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6338E8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header Text */}
        <Text style={styles.title}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Email Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email or Phone</Text>
          <TextInput
            placeholder="Enter email or phone"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() =>
            Alert.alert('Reset Password', 'Forgot password link clicked.')
          }
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Log In Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Divider Row */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Social Logins */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
        </View>

        {/* Bottom Switch Screen Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign up</Text>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 28,
  },
  forgotPasswordText: {
    color: '#6338E8',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    height: 54,
    backgroundColor: '#6338E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
