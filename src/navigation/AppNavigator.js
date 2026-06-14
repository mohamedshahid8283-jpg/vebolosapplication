import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';

import ChatScreen from '../screens/Chat/ChatScreen';
import UserDetailsScreen from '../screens/Home/UserDetailsScreen';

import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import PrivacyScreen from '../screens/Profile/PrivacyScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Creates a smooth native feel when moving into chat logs or settings
      }}
    >
      {/* Primary Bottom Navigation Panel Container */}
      <Stack.Screen name="BottomTabs" component={BottomTabs} />

      {/* Direct Communication Logs Stack Panel */}
      <Stack.Screen name="Chat" component={ChatScreen} />

      {/* Discovery Feed Profile Inspection Viewport */}
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />

      {/* Account Personalization Workspace Panels */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
}
