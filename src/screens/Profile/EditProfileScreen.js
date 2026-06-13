import React, { useState } from 'react';
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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EditProfileScreen({ navigation }) {
  // Input fields hook states initialized with visual mockup entries
  const [fullName, setFullName] = useState('Rohan');
  const [dob, setDob] = useState('12 May 1998');
  const [aboutMe, setAboutMe] = useState(
    'Adventure seeker, food lover and always up for a good conversation.',
  );
  const [interests, setInterests] = useState([
    'Travel',
    'Gym',
    'Music',
    'Movies',
  ]);

  const handleSave = () => {
    Alert.alert('Success', 'Profile changes saved successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleAddMoreInterest = () => {
    Alert.alert('Interests', 'Open interest selector modal context.');
  };

  const handleUpdatePhoto = () => {
    Alert.alert('Photo Upload', 'Launch native device image library picker.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamic Action Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
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
              source={{
                uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
              }}
              style={styles.avatarImage}
            />
            <TouchableOpacity
              style={styles.cameraIconButton}
              onPress={handleUpdatePhoto}
              activeOpacity={0.8}
            >
              <Ionicons name="camera-outline" size={18} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Form Module */}
        <View style={styles.formContainer}>
          {/* Full Name Form Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInputBox}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Date of Birth Form Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <View style={styles.interactiveInputFrame}>
              <TextInput
                style={styles.embeddedInputField}
                value={dob}
                onChangeText={setDob}
                placeholder="Select date of birth"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Calendar', 'Open native system date picker.')
                }
              >
                <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* About Me Multi-line Area Block */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>About me</Text>
            <TextInput
              style={[styles.textInputBox, styles.multiLineInputHeight]}
              value={aboutMe}
              onChangeText={setAboutMe}
              placeholder="Tell us about yourself"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Interests Form Display Layout */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Interests</Text>
            <View style={styles.interestsFlexWrapper}>
              {interests.map((item, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestTagText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Add More Interest Action Label */}
            <TouchableOpacity
              style={styles.addMoreRowButton}
              onPress={handleAddMoreInterest}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerIconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
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
    backgroundColor: '#E5E7EB',
  },
  cameraIconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    color: '#4B5563',
    marginBottom: 8,
  },
  textInputBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  interactiveInputFrame: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  embeddedInputField: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    height: '100%',
    padding: 0,
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
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestTagText: {
    fontSize: 13,
    color: '#374151',
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
