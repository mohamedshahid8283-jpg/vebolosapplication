/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home/HomeScreen';
import MessagesScreen from '../screens/Chat/MessagesScreen';
import VideoCallScreen from '../screens/VideoCall/VideoCallScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

import useTheme from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const colors = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        // Dynamically configure styles and hide the bar for the VideoCall tab
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          height: 70,
          borderRadius: 35,
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          // Hide tab bar completely when the VideoCall screen route is selected
          display: route.name === 'VideoCall' ? 'none' : 'flex',
        },

        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'compass' : 'compass-outline';
              break;

            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;

            case 'VideoCall':
              iconName = focused ? 'videocam' : 'videocam-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;

            default:
              iconName = 'ellipse';
          }

          return (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? '#fff' : colors.subText}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="VideoCall" component={VideoCallScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: '#7C4DFF', // Your active indicator accent color
  },
});
