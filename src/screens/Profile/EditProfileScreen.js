import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Redux Global Memory Hook & Actions Integration
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/authSlice';
import { updateProfile } from '../redux/slices/profileSlice';

// Structural Context, Utilities, and Persistence Services
import useTheme from '../../hooks/useTheme';
import storageService from '../../services/storageService';
import { STORAGE_KEYS } from '../../utils/constants';

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  // Extract custom dynamic light/dark style colors
  const { colors } = useTheme();

  // Retrieve active authenticated profile data from central Redux store
  const { user } = useSelector(state => state.auth);

  // Form input control states initialized with Redux user fields or fallbacks
  const [fullName, setFullName] = useState(user?.name || 'Rohan');
  const [avatarUri, setAvatarUri] = useState(
    user?.image ||
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
  );
  const [aboutMe, setAboutMe] = useState(
    user?.about ||
      'Adventure seeker, food lover and always up for a good conversation.',
  );
  const [interests, setInterests] = useState(
    user?.interests || ['Travel', 'Gym', 'Music', 'Movies'],
  );

  // Date time management control hooks
  const [dobDate, setDobDate] = useState(new Date());
  const [dobText, setDobText] = useState(user?.dob || '12 May 1998');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize internal state inputs if Redux store registers runtime variance updates
  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setAvatarUri(user.image);
      setAboutMe(user.about);
      setInterests(user.interests || []);
      if (user.dob) setDobText(user.dob);
    }
  }, [user]);

  const handleUpdatePhoto = () => {
    const options = { mediaType: 'photo', quality: 0.8 };
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setAvatarUri(response.assets[0].uri);
      }
    });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      setDobText(formattedDate);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Validation Error', 'Full Name field cannot be empty.');
      return;
    }

    try {
      setIsSaving(true);

      // Synthesize compiled updated entity payload structure
      const updatedUserPayload = {
        ...user,
        name: fullName.trim(),
        image: avatarUri,
        about: aboutMe.trim(),
        dob: dobText,
        interests: interests,
      };

      // 1. Write fresh updates down to local persistent device file system
      await storageService.setItem(STORAGE_KEYS.USER, updatedUserPayload);

      // 2. Dispatch data updates up to the global Redux store slices simultaneously
      dispatch(updateUser(updatedUserPayload));
      dispatch(updateProfile(updatedUserPayload));

      console.log(
        'Profile configurations saved and distributed to Redux stores.',
      );

      Alert.alert('Success', 'Profile changes saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Failed writing update profile states:', error);
      Alert.alert('Error', 'Something went wrong while saving adjustments.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddMoreInterest = () => {
    Alert.alert('Interests', 'Open interest selector modal context.');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Dynamic Action Top Header Bar */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIconButton}
          disabled={isSaving}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleSave} disabled={isSaving}>
          {isSaving ? (
            <ActivityIndicator size="small" color="#6338E8" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile User Avatar Section */}
        <View style={styles.avatarMainContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatarUri }}
              style={[styles.avatarImage, { backgroundColor: colors.border }]}
            />
            <TouchableOpacity
              style={[
                styles.cameraIconButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={handleUpdatePhoto}
              activeOpacity={0.8}
              disabled={isSaving}
            >
              <Ionicons name="camera-outline" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Form Module */}
        <View style={styles.formContainer}>
          {/* Full Name Form Section */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.subText }]}>
              Full Name
            </Text>
            <TextInput
              style={[
                styles.textInputBox,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              editable={!isSaving}
            />
          </View>

          {/* Date of Birth Form Section */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.subText }]}>
              Date of Birth
            </Text>
            <TouchableOpacity
              style={[
                styles.interactiveInputFrame,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => setShowDatePicker(true)}
              disabled={isSaving}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: dobText ? colors.text : '#9CA3AF',
                }}
              >
                {dobText}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.subText}
              />
            </TouchableOpacity>
          </View>

          {/* Conditional Calendar Picker Initialization Node */}
          {showDatePicker && (
            <DateTimePicker
              value={dobDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={onDateChange}
            />
          )}

          {/* About Me Multi-line Area Block */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.subText }]}>
              About me
            </Text>
            <TextInput
              style={[
                styles.textInputBox,
                styles.multiLineInputHeight,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              value={aboutMe}
              onChangeText={setAboutMe}
              placeholder="Tell us about yourself"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              editable={!isSaving}
            />
          </View>

          {/* Interests Form Display Layout */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.subText }]}>
              Interests
            </Text>
            <View style={styles.interestsFlexWrapper}>
              {interests.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.interestTag,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Text
                    style={[styles.interestTagText, { color: colors.text }]}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>

            {/* Add More Interest Action Label */}
            <TouchableOpacity
              style={styles.addMoreRowButton}
              onPress={handleAddMoreInterest}
              disabled={isSaving}
            >
              <Ionicons name="add" size={18} color="#6338E8" />
              <Text style={styles.addMoreLinkLabel}>Add more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerIconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6338E8',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatarMainContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  formContainer: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInputBox: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  interactiveInputFrame: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  multiLineInputHeight: {
    height: 100,
    paddingTop: 14,
    paddingBottom: 14,
  },
  interestsFlexWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  interestTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestTagText: {
    fontSize: 13,
    fontWeight: '500',
  },
  addMoreRowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  addMoreLinkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6338E8',
  },
});
