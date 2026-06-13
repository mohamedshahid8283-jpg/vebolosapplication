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

export default function PrivacyScreen({ navigation }) {
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
          onPress: () =>
            Alert.alert('Account Deleted', 'Your account has been purged.'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Standard Action Header Bar Container */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBackButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.menuListContainer}>
          {privacySettingsOptions.map(item => (
            <View key={item.id} style={styles.menuItemRow}>
              {item.type === 'navigation' ? (
                /* Interactive Navigation Row Options Component Wrapper */
                <TouchableOpacity
                  style={styles.innerItemRow}
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <View style={styles.textWrapper}>
                    <Text style={styles.itemTitleText}>{item.title}</Text>
                    <Text style={styles.itemSubtitleText}>{item.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                </TouchableOpacity>
              ) : (
                /* Switch Toggle Row Component Wrapper */
                <View style={styles.innerItemRow}>
                  <View style={styles.textWrapper}>
                    <Text style={styles.itemTitleText}>{item.title}</Text>
                    <Text style={styles.itemSubtitleText}>{item.subtitle}</Text>
                  </View>
                  <Switch
                    value={readReceipts}
                    onValueChange={setReadReceipts}
                    trackColor={{ false: '#E5E7EB', true: '#A78BFA' }}
                    thumbColor={readReceipts ? '#6338E8' : '#F3F4F6'}
                  />
                </View>
              )}
            </View>
          ))}

          {/* Destructive Primary Delete Account Row Element */}
          <View style={styles.menuItemRow}>
            <TouchableOpacity
              style={styles.innerItemRow}
              onPress={handleDeleteAccount}
              activeOpacity={0.7}
            >
              <View style={styles.textWrapper}>
                <Text style={[styles.itemTitleText, styles.destructiveText]}>
                  Delete Account
                </Text>
                <Text style={styles.itemSubtitleText}>
                  Permanently delete account
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
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
    backgroundColor: '#FFFFFF',
  },
  headerBackButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  headerSpacer: {
    width: 32, // Matches layout sizing framework metrics of the back button to offset title text center alignment perfectly
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
    borderBottomColor: '#F9FAFB',
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
    color: '#000000',
    marginBottom: 4,
  },
  itemSubtitleText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '400',
  },
  destructiveText: {
    color: '#EF4444',
  },
});
