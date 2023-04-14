/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Home} from './src/screens';
import {PlayLists} from './src/screens/playlists';

import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
const tabConfig = {
  ScreenA: {
    name: 'songs',
    icon: 'home',
    screen: Home,
  },
  ScreenB: {
    name: 'playlists',
    icon: 'settings',
    screen: PlayLists,
  },
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default gestureHandlerRootHOC(App);
