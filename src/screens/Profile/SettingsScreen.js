import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux Architecture State & Hook Integrations
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

// Centralized Storage Service Architecture
import storageService from '../../services/storageService';

export default function SettingsScreen({ navigation }) {
  // Extract custom theme tokens for seamless dynamic styling support
  const { colors } = useTheme();

  // Extract the global logout dispatch wrapper out from your auth slice hook
  const { logout } = useAuth();

  // Custom navigation structure matching list items array mapping
  const settingsMenuOptions = [
    {
      id: 'account',
      title: 'Account',
      subtitle: 'Manage your account',
      icon: 'person-outline',
      action: () =>
        Alert.alert(
          'Account Settings',
          'Navigate to Account Management Screen.',
        ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage notifications',
      icon: 'notifications-outline',
      action: () =>
        Alert.alert('Notifications', 'Navigate to App Notification Toggles.'),
    },
    {
      id: 'privacy',
      title: 'Privacy',
      subtitle: 'Privacy and safety',
      icon: 'lock-closed-outline',
      action: () => navigation.navigate('Privacy'),
    },
    {
      id: 'blocklist',
      title: 'Block List',
      subtitle: "People you've blocked",
      icon: 'ban-outline',
      action: () =>
        Alert.alert('Block List', 'Navigate to Blocked Connections Screen.'),
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help',
      icon: 'help-circle-outline',
      action: () =>
        Alert.alert(
          'Help & Support',
          'Open customer resolution support ticket webview.',
        ),
    },
    {
      id: 'about',
      title: 'About Vebolos',
      subtitle: 'Version 1.0.0',
      icon: 'information-circle-outline',
      action: () =>
        Alert.alert('About', 'Vebolos Application Suite • Version 1.0.0'),
    },
  ];

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out from Vebolos?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            // 1. Purge all cached credentials and profile models from device storage
            await storageService.clearStorage();

            // 2. Clear out the central Redux engine store slice memory logs
            logout();

            console.log(
              'Session tokens deleted and Redux memory dropped successfully.',
            );

            // 3. Reset the history timeline and fallback back to the Login gateway screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Error during log out pipeline execution:', error);
            Alert.alert(
              'Log Out Error',
              'Unable to cleanly clear your local session.',
            );
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Primary Context Header Title */}
      <Text style={[styles.screenHeaderTitle, { color: colors.text }]}>
        Settings
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Core List Map Section */}
        <View style={styles.menuListContainer}>
          {settingsMenuOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItemRow, { borderBottomColor: colors.border }]}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeftGroup}>
                <View
                  style={[
                    styles.iconCircleBackground,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Ionicons name={item.icon} size={22} color={colors.subText} />
                </View>
                <View style={styles.menuTextWrapper}>
                  <Text
                    style={[styles.menuItemTitleText, { color: colors.text }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.menuItemSubtitleText,
                      { color: colors.subText },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.subText}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Destructive Log Out Execution Trigger */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut}
          activeOpacity={0.8}
        >
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenHeaderTitle: {
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  menuListContainer: {
    marginTop: 8,
    marginBottom: 40,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuItemLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircleBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextWrapper: {
    marginLeft: 14,
    flex: 1,
  },
  menuItemTitleText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitleText: {
    fontSize: 13,
  },
  logOutButton: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logOutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
});
