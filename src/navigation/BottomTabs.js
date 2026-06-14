/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home/HomeScreen';
import MessagesScreen from '../screens/Chat/MessagesScreen';
import VideoCallScreen from '../screens/VideoCall/VideoCallScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

// Architecture Design System Custom Theme Hook Integration
import useTheme from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  // FIXED: Destructured colors property out from your custom useTheme hook return schema
  const { colors } = useTheme();

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
          backgroundColor: colors.card, // Now correctly resolves light/dark card color
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          // Hide tab bar completely when the VideoCall screen route is active
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
            <View
              style={[
                styles.iconContainer,
                focused && [
                  styles.activeIcon,
                  { backgroundColor: colors.primary },
                ],
              ]}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? '#FFFFFF' : colors.subText} // Correctly flags text state hues
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
    // Dynamic background primary fallback is injected inline via colors.primary token asset wrapper paths
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
