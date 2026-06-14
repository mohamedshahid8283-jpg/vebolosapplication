import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux Global Memory Hook Integrations
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

// Centralized Storage Service Architecture
import storageService from '../../services/storageService';

export default function PrivacyScreen({ navigation }) {
  // Extract custom theme tokens for dynamic workspace appearance modes
  const { colors } = useTheme();

  // Extract authentication state drop controls from Redux slice wrappers
  const { logout } = useAuth();

  // State hook managing the Read Receipts boolean switch toggle
  const [readReceipts, setReadReceipts] = useState(true);

  // Array map definition matching privacy options architecture in image
  const privacySettingsOptions = [
    {
      id: 'account_privacy',
      title: 'Account Privacy',
      subtitle: 'Who can see your profile',
      type: 'navigation',
      action: () =>
        Alert.alert(
          'Account Privacy',
          'Navigate to audience visibility controls.',
        ),
    },
    {
      id: 'last_seen',
      title: 'Last Seen',
      subtitle: 'Who can see your last seen',
      type: 'navigation',
      action: () =>
        Alert.alert('Last Seen', 'Navigate to last seen presence controls.'),
    },
    {
      id: 'read_receipts',
      title: 'Read Receipts',
      subtitle: 'Show read receipts',
      type: 'toggle',
    },
    {
      id: 'blocked_users',
      title: 'Blocked Users',
      subtitle: 'Manage blocked users',
      type: 'navigation',
      action: () =>
        Alert.alert('Blocked Users', 'Navigate to block listing settings.'),
    },
    {
      id: 'data_security',
      title: 'Data & Security',
      subtitle: 'Manage your data',
      type: 'navigation',
      action: () =>
        Alert.alert(
          'Data & Security',
          'Navigate to information archival settings.',
        ),
    },
  ];

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you absolutely sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // 1. Purge user registration caches from device storage
              await storageService.clearStorage();

              // 2. Erase user authentication objects from the global Redux state
              logout();

              console.log(
                'Account deleted. Purged storage and updated Redux store.',
              );

              // 3. Reset stack navigation flow back to the Login anchor gateway screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error(
                'Failed executing clean device state account wipe:',
                error,
              );
              Alert.alert(
                'Error',
                'Unable to complete deletion request smoothly.',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top Standard Action Header Bar Container */}
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
          style={styles.headerBackButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Privacy
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.menuListContainer}>
          {privacySettingsOptions.map(item => (
            <View
              key={item.id}
              style={[styles.menuItemRow, { borderBottomColor: colors.border }]}
            >
              {item.type === 'navigation' ? (
                /* Interactive Navigation Row Options Component Wrapper */
                <TouchableOpacity
                  style={styles.innerItemRow}
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <View style={styles.textWrapper}>
                    <Text
                      style={[styles.itemTitleText, { color: colors.text }]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.itemSubtitleText,
                        { color: colors.subText },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.subText}
                  />
                </TouchableOpacity>
              ) : (
                /* Switch Toggle Row Component Wrapper */
                <View style={styles.innerItemRow}>
                  <View style={styles.textWrapper}>
                    <Text
                      style={[styles.itemTitleText, { color: colors.text }]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.itemSubtitleText,
                        { color: colors.subText },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                  <Switch
                    value={readReceipts}
                    onValueChange={setReadReceipts}
                    trackColor={{ false: colors.border, true: '#A78BFA' }}
                    thumbColor={readReceipts ? '#6338E8' : '#F3F4F6'}
                  />
                </View>
              )}
            </View>
          ))}

          {/* Destructive Primary Delete Account Row Element */}
          <View
            style={[styles.menuItemRow, { borderBottomColor: colors.border }]}
          >
            <TouchableOpacity
              style={styles.innerItemRow}
              onPress={handleDeleteAccount}
              activeOpacity={0.7}
            >
              <View style={styles.textWrapper}>
                <Text style={[styles.itemTitleText, styles.destructiveText]}>
                  Delete Account
                </Text>
                <Text
                  style={[styles.itemSubtitleText, { color: colors.subText }]}
                >
                  Permanently delete account
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.subText}
              />
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
  },
  headerBackButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 32, // Offsets header padding alignment metrics cleanly
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  menuListContainer: {
    marginTop: 16,
  },
  menuItemRow: {
    borderBottomWidth: 1,
  },
  innerItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  itemTitleText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitleText: {
    fontSize: 13,
    fontWeight: '400',
  },
  destructiveText: {
    color: '#EF4444',
  },
});
