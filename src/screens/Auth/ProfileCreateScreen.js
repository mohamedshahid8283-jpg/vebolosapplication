import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Redux Global Memory Hook Integrations
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { setProfile } from '../../redux/slices/profileSlice';

// Centralized Storage Service Architecture
import storageService from '../../services/storageService';
import { STORAGE_KEYS } from '../../utils/constants';
import { generateId } from '../../utils/helpers';

export default function ProfileCreateScreen({ navigation }) {
  const dispatch = useDispatch();

  const [avatarUri, setAvatarUri] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobText, setDobText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [preference, setPreference] = useState('');
  const [interests, setInterests] = useState('');
  const [vibes, setVibes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Access user's system photo gallery
  const handleSelectPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setAvatarUri(response.assets[0].uri);
      }
    });
  };

  // Process system calendar selections
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      setDobText(formattedDate);
    }
  };

  // Preference configuration trigger sheet
  const handleSelectPreference = () => {
    Alert.alert(
      'I am looking for',
      'Select your preference configuration matches.',
      [
        { text: 'Men', onPress: () => setPreference('Men') },
        { text: 'Women', onPress: () => setPreference('Women') },
        { text: 'Everyone', onPress: () => setPreference('Everyone') },
      ],
    );
  };

  const handleNext = async () => {
    const cleanName = fullName.trim();
    const cleanInterests = interests.trim();
    const cleanVibes = vibes.trim();

    if (!cleanName || !dobText || !preference || !cleanInterests) {
      Alert.alert(
        'Missing Field',
        'Please fill out your identity attributes to continue.',
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Recover the initial profile details cached by SignupScreen
      const savedBaseSession = await storageService.getItem(STORAGE_KEYS.USER);
      const baseUserData = savedBaseSession || {};

      // 2. Synthesize complete aggregated user profile entity
      const completeUserProfile = {
        id: baseUserData.id || `user_${generateId()}`,
        name: cleanName,
        email: baseUserData.email || '',
        dob: dobText,
        preference: preference,
        role: 'Member',
        location: 'Bangalore',
        image: avatarUri || 'https://via.placeholder.com/150',
        about: cleanVibes || 'Hey there! I am new to Vebolos.',
        interests: cleanInterests
          .split(',')
          .map(i => i.trim())
          .filter(Boolean),
        stats: {
          likes: '0',
          matches: 0,
          chats: 0,
        },
      };

      const mockJwtToken = 'mock_jwt_session_token_xyzabc123';

      // 3. Persist updated configuration data structures back down to device storage
      await storageService.setItem(STORAGE_KEYS.USER, completeUserProfile);
      await storageService.setItem(STORAGE_KEYS.TOKEN, mockJwtToken);

      // 4. Update the global Redux state slices simultaneously
      dispatch(loginUser({ user: completeUserProfile, token: mockJwtToken }));
      dispatch(setProfile(completeUserProfile));

      console.log(
        'User profile generated and stored in Redux & AsyncStorage successfully.',
      );

      // 5. Replace state path safely into primary tab dashboard workspace
      navigation.getParent()?.replace('App');
    } catch (error) {
      console.error('Failed writing full identity config blocks:', error);
      Alert.alert('Storage Error', 'Unable to compile profile data settings.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Create your profile</Text>
        <Text style={styles.subtitle}>Tell others about yourself</Text>

        {/* Circular Avatar Photo Picker Frame Container */}
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleSelectPhoto}
          disabled={isSubmitting}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={styles.selectedAvatarImage}
            />
          ) : (
            <View style={styles.avatarPlaceholderContainer}>
              <Ionicons
                name="camera-outline"
                size={26}
                color="#6338E8"
                style={styles.cameraIcon}
              />
              <Text style={styles.avatarText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Input Forms Wrapper Layout Block */}
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
              editable={!isSubmitting}
            />
          </View>

          {/* Date of Birth Selection Box Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.pickerSelectorBox}
              onPress={() => setShowDatePicker(true)}
              disabled={isSubmitting}
            >
              <Text
                style={
                  dobText
                    ? styles.pickerValueText
                    : styles.pickerPlaceholderText
                }
              >
                {dobText ? dobText : 'Select your date of birth'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* Conditional Picker Initialization Entry Node */}
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={onDateChange}
            />
          )}

          {/* Preference Selection Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>I'm looking for</Text>
            <TouchableOpacity
              style={styles.pickerSelectorBox}
              onPress={handleSelectPreference}
              disabled={isSubmitting}
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

          {/* Interests Form Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Interests (Comma separated)</Text>
            <TextInput
              placeholder="e.g. Travel, Gym, Music, Cooking"
              placeholderTextColor="#A0A0A0"
              style={styles.input}
              value={interests}
              onChangeText={setInterests}
              editable={!isSubmitting}
            />
          </View>

          {/* Vibes Descriptive Form Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>My Vibes</Text>
            <TextInput
              placeholder="Describe your current energy status or tagline"
              placeholderTextColor="#A0A0A0"
              style={styles.input}
              value={vibes}
              onChangeText={setVibes}
              editable={!isSubmitting}
            />
          </View>
        </View>

        {/* Next Step Router Navigation Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
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
    marginBottom: 32,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 32,
    overflow: 'hidden',
  },
  avatarPlaceholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAvatarImage: {
    width: '100%',
    height: '100%',
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
    marginBottom: 12,
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
    justifyContent: 'space-between',
  },
  pickerPlaceholderText: {
    fontSize: 15,
    color: '#A0A0A0',
  },
  pickerValueText: {
    fontSize: 15,
    color: '#000000',
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
});
