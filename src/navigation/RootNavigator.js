import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Redux Architecture State Hook Integration
import { useSelector } from 'react-redux';

// Child Navigator Imports
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // Retrieve 'isLoggedIn' boolean flag dynamically from central Redux memory slices
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          /* -------------------------------------------------------------
             PROTECTED ROUTE: Exposed ONLY if active token validations pass.
             ------------------------------------------------------------- */
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          /* -------------------------------------------------------------
             UNAUTHENTICATED ROUTE: Exposed when user logs out or has no session.
             ------------------------------------------------------------- */
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
