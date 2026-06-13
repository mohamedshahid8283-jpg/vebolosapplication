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

export default function UserDetailsScreen({ route, navigation }) {
  // Safeguard parameters resolution structure
  const { user } = route.params || {
    user: {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Context Action Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconPadding}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconPadding}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Clean Profile Image Section */}
        <Image source={{ uri: user.image }} style={styles.profileHeroImage} />

        {/* Primary Meta Identity Profile Details Block */}
        <View style={styles.metaTextContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.displayName}>
              {user.name}, {user.age}
            </Text>
            <Ionicons name="checkmark-circle" size={20} color="#6338E8" />
          </View>
          <Text style={styles.subtitleSubtext}>
            {user.role} • {user.location}
          </Text>
        </View>

        {/* About Me Segment */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>About me</Text>
          <Text style={styles.paragraphBodyText}>{user.about}</Text>
        </View>

        {/* Dynamic Categorized Interests Tag Grid */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionHeader}>Interests</Text>
          <View style={styles.interestsGrid}>
            {user.interests &&
              user.interests.map((interest, index) => (
                <View key={index} style={styles.tagItem}>
                  <Text style={styles.tagText}>{interest}</Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Call to Action Footer Module */}
      <View style={styles.footerActionMenu}>
        <TouchableOpacity style={styles.messageActionButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButtonContainer}>
          <Ionicons name="heart-outline" size={24} color="#000000" />
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
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  iconPadding: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
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
    color: '#000000',
  },
  subtitleSubtext: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 10,
  },
  paragraphBodyText: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagItem: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tagText: {
    fontSize: 13,
    color: '#444444',
    fontWeight: '500',
  },
  footerActionMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
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
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
