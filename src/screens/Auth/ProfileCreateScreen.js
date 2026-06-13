import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileCreateScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [preference, setPreference] = useState('');

  const handleNext = () => {
    if (!fullName.trim()) {
      Alert.alert('Missing Field', 'Please enter your full name.');
      return;
    }
    // Update this navigation target path to match your app router setup
    navigation.getParent()?.replace('App');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header Section */}
        <Text style={styles.title}>Create your profile</Text>
        <Text style={styles.subtitle}>Tell others about yourself</Text>

        {/* Circular Avatar Photo Upload Button */}
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() =>
            Alert.alert('Upload Photo', 'Launch camera roll picker.')
          }
        >
          <Ionicons
            name="camera-outline"
            size={26}
            color="#6338E8"
            style={styles.cameraIcon}
          />
          <Text style={styles.avatarText}>Add Photo</Text>
        </TouchableOpacity>

        {/* Input Fields Wrapper */}
        <View style={styles.formContainer}>
          {/* Full Name Input Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#A0A0A0"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Date of Birth Selection Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.pickerSelectorBox}
              onPress={() =>
                Alert.alert('Select Date', 'Open Native Date Picker.')
              }
            >
              <Text
                style={
                  dob ? styles.pickerValueText : styles.pickerPlaceholderText
                }
              >
                {dob ? dob : 'Select your date of birth'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* Preference Selection Dropdown Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>I'm looking for</Text>
            <TouchableOpacity
              style={styles.pickerSelectorBox}
              onPress={() =>
                Alert.alert('Select Preference', 'Open selection sheet.')
              }
            >
              <Text
                style={
                  preference
                    ? styles.pickerValueText
                    : styles.pickerPlaceholderText
                }
              >
                {preference ? preference : 'Select preference'}
              </Text>
              <Ionicons name="chevron-down-outline" size={20} color="#666666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Next Step Action Button */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 36,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 40,
  },
  cameraIcon: {
    marginBottom: 6,
  },
  avatarText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 24,
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
  pickerSelectorBox: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'between',
  },
  pickerPlaceholderText: {
    flex: 1,
    fontSize: 15,
    color: '#A0A0A0',
  },
  pickerValueText: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  button: {
    height: 54,
    backgroundColor: '#6338E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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
});
