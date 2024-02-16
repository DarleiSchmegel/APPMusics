/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import TrackPlayer from 'react-native-track-player';
import Routes from './src/routes';

function App(): JSX.Element {
  useEffect(() => {
    return () => {
      try {
        TrackPlayer.reset();
        TrackPlayer.pause();
        // TrackPlayer.destroy();
      } catch (error) {
        console.log('TrackPlayer.destroy()', error);
      }
    };
  }, []);

  return <Routes />;
}

export default gestureHandlerRootHOC(App);
