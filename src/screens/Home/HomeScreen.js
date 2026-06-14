import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux Architecture Hooks & Actions Integration
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setLoading } from '../../redux/slices/profileSlice';

// Structural Context, Utilities, and Persistence Services
import useTheme from '../../hooks/useTheme';
import storageService from '../../services/storageService';
import { STORAGE_KEYS } from '../../utils/constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  // Extract global dynamic color configurations using your custom theme engine hook
  const { colors } = useTheme();

  // Extract application state variables out from the central Redux engine
  const { profile: currentProfile, loading: isLoading } = useSelector(
    state => state.profile,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeUserCount, setActiveUserCount] = useState(148);

  // FIXED: Added empty dependency array to prevent the infinite execution loop
  useEffect(() => {
    fetchDiscoveryFeed();
  }, []);

  // Simulates an asynchronous data fetch from storage/API, syncing to Redux global state
  const fetchDiscoveryFeed = async () => {
    try {
      dispatch(setLoading(true));

      // 1. Check for a locally persisted user setup state configuration entry
      const localUserData = await storageService.getItem(STORAGE_KEYS.USER);

      // 2. Fallback sample data if storage hasn't been written to by a SignUp yet
      const fallbackProfile = {
        id: 'user_aanya_01',
        name: 'Aanya',
        age: 24,
        role: 'Designer',
        location: 'Bangalore',
        image:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        about: 'Love traveling, coffee and deep conversations. 💜',
        interests: ['Travel', 'Photography', 'Music', 'Coffee'],
      };

      const finalActiveProfile = localUserData || fallbackProfile;

      // 3. Update Redux store global state.
      dispatch(setProfile(finalActiveProfile));

      // Simulate micro-drift animation for live user calculations
      setActiveUserCount(Math.floor(Math.random() * (160 - 140 + 1)) + 140);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Data Error',
        'Unable to retrieve data metrics from storage service.',
      );
    } finally {
      // GUARANTEED RUN: Ensures loading spinner turns off even if an exception occurs
      dispatch(setLoading(false));
    }
  };

  const handleDislike = () => {
    if (currentProfile) {
      Alert.alert(
        'Passed',
        `You skipped ${currentProfile.name || 'this'} profile.`,
      );
    }
  };

  const handleLike = () => {
    if (currentProfile) {
      Alert.alert(
        'Liked! 💜',
        `You liked ${currentProfile.name || 'this'} profile!`,
      );
    }
  };

  const handleSuperLike = () => {
    if (currentProfile) {
      Alert.alert(
        'Super Like! ⭐',
        `You sent a Super Like to ${currentProfile.name || 'this'}!`,
      );
    }
  };

  // Render uniform activity loading spinner component layout matching framework rules
  if (isLoading || !currentProfile) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color="#6338E8" />
        <Text style={[styles.loadingText, { color: colors.subText }]}>
          Syncing with Vebolos...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Brand Customized Header Row */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.headerTitleContainer}>
          <Ionicons name="heart-half" size={26} color="#6338E8" />
          <Text style={styles.brandText}>Vebolos</Text>
        </View>

        {/* Dynamic Online Counter Badge */}
        <View style={styles.liveCounterContainer}>
          <View style={styles.liveGreenIndicatorPulse} />
          <Text style={styles.liveCounterText}>{activeUserCount} Online</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={fetchDiscoveryFeed}
        >
          <Ionicons name="refresh-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Input Box */}
        <View
          style={[
            styles.searchBarContainer,
            { backgroundColor: colors.border },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.subText}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search profiles"
            placeholderTextColor={colors.subText}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        {/* Dynamic Profile Card Viewport */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cardWrapper}
          onPress={() =>
            navigation.navigate('UserDetails', { user: currentProfile })
          }
        >
          <ImageBackground
            source={{
              uri: currentProfile.image || 'https://via.placeholder.com/600',
            }}
            style={styles.cardImage}
            imageStyle={styles.cardImageRadius}
          >
            <View style={styles.cardTextOverlay}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>
                  {currentProfile.name || 'User'}, {currentProfile.age || '24'}
                </Text>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#6338E8"
                  style={styles.badge}
                />
              </View>
              <Text style={styles.profileMeta}>
                {currentProfile.role || 'Member'} •{' '}
                {currentProfile.location || 'Bangalore'}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Action Button Controls Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[
              styles.circleButton,
              styles.dislikeButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
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
            style={[
              styles.circleButton,
              styles.starButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
  liveCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  liveGreenIndicatorPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  notificationButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 24,
    marginBottom: 10,
  },
  circleButton: {
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
  },
});
