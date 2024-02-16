import React, {useEffect, useState, Component} from 'react';
import {View, Text} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import setupTrackPlayer from '../utils/trackPlayer';

const SplashScreen = ({navigation}) => {
  // const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  // const [isOK, setIsOk] = useState(false);
  useEffect(() => {
    const startTrackPlayer = async () => {
      try {
        const res = await setupTrackPlayer();
        console.log(res);
        if (res) {
          console.log('navigate', res);
        }
        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    };

    startTrackPlayer();

    // const checkIfTrackPlayerIsReady = async () => {
    //   const state = await TrackPlayer.getState();
    //   console.log('state', state);

    //   if (state === State.Ready) {
    //     console.log('ready', state);
    //     navigation.navigate('HomeRoutes');
    //   } else {
    //     setTimeout(() => {
    //       checkIfTrackPlayerIsReady();
    //     }, 1000);
    //   }
    // };

    // checkIfTrackPlayerIsReady();
  }, []);

  // useEffect(() => {
  //   // Verifica se o TrackPlayer está pronto para uso
  //   const checkIfTrackPlayerIsReady = async () => {
  //     const state = await TrackPlayer.getState();
  //     console.log('state', state);

  //     if (state === State.Ready) {
  //       console.log('ready', state);
  //       // Navega para a próxima tela do aplicativo
  //       // Aqui você pode usar a função de navegação do seu aplicativo
  //       navigation.navigate('HomeRoutes');
  //     } else {
  //       // Espera mais um tempo e verifica novamente
  //       setTimeout(() => {
  //         checkIfTrackPlayerIsReady();
  //       }, 1000);
  //     }
  //   };

  //   if (isTrackPlayerInit) {
  //     checkIfTrackPlayerIsReady();
  //   }
  // }, [isTrackPlayerInit]);

  return (
    <View>
      <Text>Minha tela de splash</Text>
    </View>
  );
};

export default SplashScreen;
