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
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />

      <Stack.Screen name="Chat" component={ChatScreen} />

      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />

      <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      <Stack.Screen name="Settings" component={SettingsScreen} />

      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
}
