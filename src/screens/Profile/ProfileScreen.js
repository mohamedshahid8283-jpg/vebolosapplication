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

// Redux Architecture State Integrations
import { useSelector } from 'react-redux';

// Architecture Design System Custom Hooks
import useTheme from '../../hooks/useTheme';

export default function ProfileScreen({ navigation }) {
  // Extract global dynamic color tokens matching current mode configurations
  const { colors } = useTheme();

  // Retrieve authenticated active profile payload directly from the Redux store slice
  const { user } = useSelector(state => state.auth);

  // Fallback visual structure configuration if store fields resolve as null initially
  const userProfile = user || {
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

  // Safe checks to avoid crashing if nested attributes or stats are empty
  const profileStats = userProfile.stats || {
    likes: '—',
    matches: 0,
    chats: 0,
  };
  const profileInterests = userProfile.interests || [];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top Profile Header Title */}
      <Text style={[styles.screenHeaderTitle, { color: colors.text }]}>
        Profile
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Image Container with Floating Camera Button */}
        <View style={styles.avatarMainWrapper}>
          <View style={styles.avatarOuterFrame}>
            <Image
              source={{ uri: userProfile.image }}
              style={[
                styles.userAvatarImage,
                { backgroundColor: colors.border },
              ]}
            />
            <TouchableOpacity
              style={[
                styles.cameraFloatingButton,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Ionicons name="camera" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Identity Headings Block */}
        <View style={styles.identityContainer}>
          <View style={styles.nameRow}>
            <Text style={[styles.profileNameText, { color: colors.text }]}>
              {userProfile.name}, {userProfile.age || '26'}
            </Text>
            <Ionicons name="checkmark-circle" size={18} color="#6338E8" />
          </View>
          <Text
            style={[styles.metaRoleLocationText, { color: colors.subText }]}
          >
            {userProfile.role || 'Member'} •{' '}
            {userProfile.location || 'Bangalore'}
          </Text>
        </View>

        {/* About Me Info Section */}
        <View style={styles.infoSectionBlock}>
          <Text style={[styles.sectionHeadingTitle, { color: colors.text }]}>
            About me
          </Text>
          <Text
            style={[styles.paragraphBodyDescription, { color: colors.text }]}
          >
            {userProfile.about || 'No details provided yet.'}
          </Text>
        </View>

        {/* Dynamic Interests Tags Row */}
        {profileInterests.length > 0 && (
          <View style={styles.infoSectionBlock}>
            <Text style={[styles.sectionHeadingTitle, { color: colors.text }]}>
              Interests
            </Text>
            <View style={styles.interestsFlexGrid}>
              {profileInterests.map((interest, index) => (
                <View
                  key={index}
                  style={[
                    styles.tagCapsule,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Text style={[styles.tagCapsuleText, { color: colors.text }]}>
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Divider Separation Break Line */}
        <View
          style={[
            styles.horizontalBreakLine,
            { backgroundColor: colors.border },
          ]}
        />

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
            <Text
              style={[
                styles.metricValueNumberText,
                { color: colors.text, fontSize: 16 },
              ]}
            >
              {profileStats.likes || '—'}
            </Text>
            <Text
              style={[styles.metricLabelSubtitle, { color: colors.subText }]}
            >
              Likes
            </Text>
          </View>

          <View
            style={[
              styles.verticalDividerLine,
              { backgroundColor: colors.border },
            ]}
          />

          {/* Matches Metric block */}
          <View style={styles.metricColumnCard}>
            <Text
              style={[styles.metricValueNumberText, { color: colors.text }]}
            >
              {profileStats.matches}
            </Text>
            <Text
              style={[styles.metricLabelSubtitle, { color: colors.subText }]}
            >
              Matches
            </Text>
          </View>

          <View
            style={[
              styles.verticalDividerLine,
              { backgroundColor: colors.border },
            ]}
          />

          {/* Chats Metric block */}
          <View style={styles.metricColumnCard}>
            <Text
              style={[styles.metricValueNumberText, { color: colors.text }]}
            >
              {profileStats.chats}
            </Text>
            <Text
              style={[styles.metricLabelSubtitle, { color: colors.subText }]}
            >
              Chats
            </Text>
          </View>
        </View>

        {/* Divider Separation Break Line */}
        <View
          style={[
            styles.horizontalBreakLine,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Navigation Shortcut Buttons Container */}
        <View style={styles.navigationButtonsRow}>
          <TouchableOpacity
            style={[
              styles.actionCardButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={20} color="#6338E8" />
            <Text style={[styles.actionCardButtonText, { color: colors.text }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionCardButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={20} color="#4B5563" />
            <Text style={[styles.actionCardButtonText, { color: colors.text }]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
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
  },
  cameraFloatingButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
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
  },
  metaRoleLocationText: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  infoSectionBlock: {
    marginBottom: 24,
  },
  sectionHeadingTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  paragraphBodyDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  interestsFlexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagCapsule: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagCapsuleText: {
    fontSize: 13,
    fontWeight: '500',
  },
  horizontalBreakLine: {
    height: 1,
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
    height: 55,
  },
  metricIconMargin: {
    marginBottom: 2,
  },
  metricValueNumberText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricLabelSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  verticalDividerLine: {
    width: 1,
    height: 32,
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
  },
});
