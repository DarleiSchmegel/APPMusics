/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import setupTrackPlayer from './src/utils/trackPlayer';
TrackPlayer.registerPlaybackService(() => require('./service'));

TrackPlayer.addEventListener('remote-playback', async () => {
  // inicia o TrackPlayer
  // await TrackPlayer.setupPlayer();
  // await TrackPlayer.updateOptions({
  await setupTrackPlayer();
  // configura as opções do TrackPlayer
  // ...
  // });

  // inicia o seu aplicativo
  AppRegistry.registerComponent(appName, () => App);
});

AppRegistry.registerComponent(appName, () => App);
