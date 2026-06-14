import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Global Context Architecture Theme Custom Hook Integration
import useTheme from '../../hooks/useTheme';

export default function UserDetailsScreen({ route, navigation }) {
  // Extract global light/dark dynamic color definitions matching theme configurations
  const { colors } = useTheme();

  // Safeguard parameter resolution parsing structure with dynamic fallbacks
  const { user } = route.params || {
    user: {
      id: 'fallback_user',
      name: 'Aanya',
      age: 24,
      role: 'Designer',
      location: 'Bangalore',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      about: 'Love traveling, coffee and deep conversations. 💜',
      interests: ['Travel', 'Photography', 'Music', 'Coffee'],
    },
  };

  // Navigates straight to the Chat view session, forwarding user data parameters
  const handleOpenChat = () => {
    navigation.navigate('Chat', { user });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Context Action Top Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconPadding}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconPadding}>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Profile Image Section */}
        <Image source={{ uri: user.image }} style={styles.profileHeroImage} />

        {/* Primary Meta Identity Profile Details Block */}
        <View style={styles.metaTextContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.displayName, { color: colors.text }]}>
              {user.name}, {user.age}
            </Text>
            <Ionicons name="checkmark-circle" size={20} color="#6338E8" />
          </View>
          <Text style={[styles.subtitleSubtext, { color: colors.subText }]}>
            {user.role} • {user.location}
          </Text>
        </View>

        {/* About Me Segment */}
        <View style={styles.infoSection}>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            About me
          </Text>
          <Text style={[styles.paragraphBodyText, { color: colors.text }]}>
            {user.about}
          </Text>
        </View>

        {/* Dynamic Categorized Interests Tag Grid */}
        <View style={styles.infoSection}>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            Interests
          </Text>
          <View style={styles.interestsGrid}>
            {user.interests &&
              user.interests.map((interest, index) => (
                <View
                  key={index}
                  style={[
                    styles.tagItem,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.tagText, { color: colors.text }]}>
                    {interest}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Call to Action Footer Module */}
      <View
        style={[
          styles.footerActionMenu,
          { backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        <TouchableOpacity
          style={styles.messageActionButton}
          onPress={handleOpenChat}
          activeOpacity={0.8}
        >
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.favoriteButtonContainer,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Ionicons name="heart-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconPadding: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 110, // Generates clearance margin spacing past the footer tray overlay container
  },
  profileHeroImage: {
    width: '100%',
    height: 340,
    borderRadius: 24,
    marginTop: 4,
  },
  metaTextContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitleSubtext: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  paragraphBodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
  },
  footerActionMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  messageActionButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#6338E8',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6338E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButtonContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
