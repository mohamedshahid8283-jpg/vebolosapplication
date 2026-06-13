import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  // Mock data representing the visual profile configuration
  const userProfile = {
    name: 'Rohan',
    age: 26,
    role: 'Product Manager',
    location: 'Bangalore',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    about:
      'Adventure seeker, food lover and always up for a good conversation.',
    interests: ['Travel', 'Gym', 'Music', 'Movies'],
    stats: {
      likes: '—',
      matches: 36,
      chats: 24,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Profile Header Title */}
      <Text style={styles.screenHeaderTitle}>Profile</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Image Container with Floating Camera Button */}
        <View style={styles.avatarMainWrapper}>
          <View style={styles.avatarOuterFrame}>
            <Image
              source={{ uri: userProfile.image }}
              style={styles.userAvatarImage}
            />
            <TouchableOpacity
              style={styles.cameraFloatingButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Ionicons name="camera" size={16} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Identity Headings Block */}
        <View style={styles.identityContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.profileNameText}>
              {userProfile.name}, {userProfile.age}
            </Text>
            <Ionicons name="checkmark-circle" size={18} color="#6338E8" />
          </View>
          <Text style={styles.metaRoleLocationText}>
            {userProfile.role} • {userProfile.location}
          </Text>
        </View>

        {/* About Me Info Section */}
        <View style={styles.infoSectionBlock}>
          <Text style={styles.sectionHeadingTitle}>About me</Text>
          <Text style={styles.paragraphBodyDescription}>
            {userProfile.about}
          </Text>
        </View>

        {/* Dynamic Interests Tags Row */}
        <View style={styles.infoSectionBlock}>
          <Text style={styles.sectionHeadingTitle}>Interests</Text>
          <View style={styles.interestsFlexGrid}>
            {userProfile.interests.map((interest, index) => (
              <View key={index} style={styles.tagCapsule}>
                <Text style={styles.tagCapsuleText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Divider Separation Break Line */}
        <View style={styles.horizontalBreakLine} />

        {/* Statistics Metric Row Dashboard */}
        <View style={styles.metricsDashboardRow}>
          {/* Likes Metric block */}
          <View style={styles.metricColumnCard}>
            <Ionicons
              name="heart"
              size={22}
              color="#EF4444"
              style={styles.metricIconMargin}
            />
            <Text style={styles.metricLabelSubtitle}>Likes</Text>
          </View>

          <View style={styles.verticalDividerLine} />

          {/* Matches Metric block */}
          <View style={styles.metricColumnCard}>
            <Text style={styles.metricValueNumberText}>
              {userProfile.stats.matches}
            </Text>
            <Text style={styles.metricLabelSubtitle}>Matches</Text>
          </View>

          <View style={styles.verticalDividerLine} />

          {/* Chats Metric block */}
          <View style={styles.metricColumnCard}>
            <Text style={styles.metricValueNumberText}>
              {userProfile.stats.chats}
            </Text>
            <Text style={styles.metricLabelSubtitle}>Chats</Text>
          </View>
        </View>

        {/* Divider Separation Break Line */}
        <View style={styles.horizontalBreakLine} />

        {/* Navigation Shortcut Buttons Container */}
        <View style={styles.navigationButtonsRow}>
          <TouchableOpacity
            style={styles.actionCardButton}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={20} color="#6338E8" />
            <Text style={styles.actionCardButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCardButton}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={20} color="#4B5563" />
            <Text style={styles.actionCardButtonText}>Settings</Text>
          </TouchableOpacity>
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
  screenHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  avatarMainWrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarOuterFrame: {
    position: 'relative',
    width: 130,
    height: 130,
  },
  userAvatarImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#F3F4F6',
  },
  cameraFloatingButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  identityContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileNameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
  metaRoleLocationText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    fontWeight: '500',
  },
  infoSectionBlock: {
    marginBottom: 24,
  },
  sectionHeadingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 10,
  },
  paragraphBodyDescription: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
    fontWeight: '400',
  },
  interestsFlexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagCapsule: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagCapsuleText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  horizontalBreakLine: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  metricsDashboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  metricColumnCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  metricIconMargin: {
    marginBottom: 2,
  },
  metricValueNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  metricLabelSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  verticalDividerLine: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  navigationButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  actionCardButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  actionCardButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});
