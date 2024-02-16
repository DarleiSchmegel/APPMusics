import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Home} from '../screens';
import {PlayLists} from '../screens/playlists';

const Tab = createBottomTabNavigator();

const HomeRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            // paddingVertical: Platform.OS == 'ios' ? 20 : 0,
            height: 55,
            // position: 'absolute',
            backgroundColor: '#131016',
          },
          tabBarActiveTintColor: '#f25f5c',

          tabBarActiveBackgroundColor: '#131016',
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Musicas"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'music'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Playlists"
          component={PlayLists}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name={'list'} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </Tab.Navigator>
  );
};

export default HomeRoutes;
