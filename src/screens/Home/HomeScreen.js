import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Configured mock data based on design profile details
  const sampleUser = {
    name: 'Aanya',
    age: 24,
    role: 'Designer',
    location: 'Bangalore',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    about: 'Love traveling, coffee and deep conversations. 💜',
    interests: ['Travel', 'Photography', 'Music', 'Coffee'],
  };

  // Functional action click trigger handlers
  const handleDislike = () => {
    Alert.alert('Passed', `You skipped ${sampleUser.name}'s profile.`);
  };

  const handleLike = () => {
    Alert.alert('Liked! 💜', `You liked ${sampleUser.name}'s profile!`);
  };

  const handleSuperLike = () => {
    Alert.alert(
      'Super Like! ⭐',
      `You sent a Super Like to ${sampleUser.name}!`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Brand Customized Header Row */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="heart-half" size={26} color="#6338E8" />
          <Text style={styles.brandText}>Vebolos</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="options-outline" size={22} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Main Main Content Feed Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Input Filter Component */}
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search profiles"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* Profile Card Viewport Container */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cardWrapper}
          onPress={() =>
            navigation.navigate('UserDetails', { user: sampleUser })
          }
        >
          <ImageBackground
            source={{ uri: sampleUser.image }}
            style={styles.cardImage}
            imageStyle={styles.cardImageRadius}
          >
            {/* Overlay User Text Information */}
            <View style={styles.cardTextOverlay}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>
                  {sampleUser.name}, {sampleUser.age}
                </Text>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#6338E8"
                  style={styles.badge}
                />
              </View>
              <Text style={styles.profileMeta}>
                {sampleUser.role} • {sampleUser.location}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Action Button Controls (Sits directly underneath user image card) */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[styles.circleButton, styles.dislikeButton]}
            onPress={handleDislike}
          >
            <Ionicons name="close" size={26} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.circleButton, styles.likeButtonPrimary]}
            onPress={handleLike}
          >
            <Ionicons name="heart" size={32} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.circleButton, styles.starButton]}
            onPress={handleSuperLike}
          >
            <Ionicons name="star" size={24} color="#FFB300" />
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
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6338E8',
    letterSpacing: -0.5,
  },
  notificationButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40, // Ensures layout space at the bottom when scrolling
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    height: '100%',
  },
  cardWrapper: {
    height: SCREEN_HEIGHT * 0.52,
    width: '100%',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImageRadius: {
    borderRadius: 24,
  },
  cardTextOverlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  badge: {
    marginTop: 2,
  },
  profileMeta: {
    color: '#E5E7EB',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 24, // Ties actions closely underneath image container
    marginBottom: 10,
  },
  circleButton: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dislikeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  likeButtonPrimary: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#6338E8',
  },
  starButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
});
