import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import HomeRoutes from './HomeTabs.routes';
import {Home} from '../screens';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
