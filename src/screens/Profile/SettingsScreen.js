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

export default function SettingsScreen({ navigation }) {
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
      // Dynamically triggers navigation to the Privacy screen stack target
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
        onPress: () => Alert.alert('Disconnected'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Primary Context Header Title */}
      <Text style={styles.screenHeaderTitle}>Settings</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Core List Map Section */}
        <View style={styles.menuListContainer}>
          {settingsMenuOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItemRow}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeftGroup}>
                <View style={styles.iconCircleBackground}>
                  <Ionicons name={item.icon} size={22} color="#4B5563" />
                </View>
                <View style={styles.menuTextWrapper}>
                  <Text style={styles.menuItemTitleText}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitleText}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
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
    backgroundColor: '#FFFFFF',
  },
  screenHeaderTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000000',
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
    borderBottomColor: '#F3F4F6',
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
    backgroundColor: '#F3F4F6',
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
    color: '#000000',
    marginBottom: 2,
  },
  menuItemSubtitleText: {
    fontSize: 13,
    color: '#6B7280',
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
