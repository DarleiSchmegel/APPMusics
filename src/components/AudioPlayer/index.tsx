import React, {useState, useEffect, useRef, useMemo} from 'react';
import {Dimensions, View, Text, Animated} from 'react-native';
import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {SongModel} from '../../databases/model/songModel';

type AudioPlayerProps = {
  uri: string;
  playList: SongDataFormated[];
};
import RoundButton from '../RoundButton';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {SongDataFormated} from '../../databases/services/songServices';
import {Title} from '../MenuItem/styles';

const {width, height} = Dimensions.get('window');

async function togglePlayBack(playBackState) {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(
    currentTrack,
    playBackState,
    State.Playing,
    currentTrack != null,
    playBackState === State.Paused,
  );
  if (currentTrack != null) {
    if (playBackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }

  // if (playBackState === 'idle') {
  //   await TrackPlayer.add(playList);

  //   await TrackPlayer.skip(0);
  //   await TrackPlayer.play();
  //   console.log('stoped', State.Stopped, playBackState);
  // }
}

export const AudioPlayer = ({uri, playList}: AudioPlayerProps) => {
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const [songIndex, setsongIndex] = useState(0);
  const songIndexMemo = useMemo(() => {
    return songIndex;
  }, [songIndex]);
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();

  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);

  // console.log('playlistR', playList);
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    try {
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artwork, artist} = track;
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
      } else {
        await TrackPlayer.pause();
        await TrackPlayer.skip(0);
      }
    } catch (error) {
      console.log('ERRO-useTrackPlayerEvents', error);
    }
  });

  useEffect(() => {
    skipTo(songIndexMemo);
  }, [songIndexMemo, playList]);

  //quando a playlista atualiza
  useEffect(() => {
    async function updatePlaylist() {
      try {
        await TrackPlayer.reset();
        await TrackPlayer.add(playList);

        const track = await TrackPlayer.getTrack(songIndex);
        const {title, artwork, artist} = track;
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
        // await TrackPlayer.play();
      } catch (error) {
        console.log('Ocorreu um erro ao reiniciar o TrackPlayer: ', error);
        // lidar com o erro aqui, como exibir uma mensagem de erro para o usuário ou tentar reiniciar novamente
      }
      // await TrackPlayer.reset();
      // await TrackPlayer.add(playList);
      // console.log('TrackPlayer', await TrackPlayer.getTrack(1));
      // // console.log(playList);
    }
    updatePlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playList]);
  useEffect(() => {
    scrollX.addListener(({value}) => {
      // console.log(`ScrollX : ${value} | Device Width : ${width} `);
      const index = Math.round(value / width);

      setsongIndex(index);
      // skipTo(index);
      // console.log(`Index : ${index}`);
    });
    return () => {
      try {
        scrollX.removeAllListeners();
        // TrackPlayer.reset();
        TrackPlayer.pause();
        // TrackPlayer.destroy();
      } catch (error) {
        console.log('TrackPlayer.destroy()', error);
      }
    };
  }, []);

  function getPlaybackTimestamp(time: number): string {
    if (time === null) {
      return '00:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  }

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrevious = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  async function skipTo(trackId: number) {
    let previous = playBackState.toString();
    // console.log('playBackState', playBackState, previous);
    await TrackPlayer.skip(trackId);
    //talvez tirar isso
    // if (previous === 'playing') {
    //   await TrackPlayer.play();
    // }
  }

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={styles.mainWrapper}>
        <Text>{trackTitle}</Text>
      </Animated.View>
    );
  };

  return (
    <Container>
      <Animated.FlatList
        ref={songSlider}
        renderItem={renderSongs}
        data={playList}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
      <View style={styles.sliderContainer}>
        <Text style={{color: '#f25f5c', fontSize: 12}}>
          {getPlaybackTimestamp(progress.position)}
        </Text>
        <Slider
          style={{flex: 1, height: 40}}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#f25f5c"
          minimumTrackTintColor="#f25f5c"
          maximumTrackTintColor="#ccc"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
          thumbStyle={styles.sliderThumb}
          trackStyle={styles.sliderTrack}
        />
        <Text style={{color: '#f25f5c', fontSize: 12}}>
          {getPlaybackTimestamp(progress.duration)}
        </Text>
      </View>
      <MusicControl>
        <TouchableOpacity onPress={() => skipToPrevious()}>
          <Icon name="stepbackward" size={35} color="#f25f5c" />
        </TouchableOpacity>
        <RoundButton
          iconName={playBackState === State.Playing ? 'pause' : 'caretright'}
          onPress={() => togglePlayBack(playBackState)}
        />
        <TouchableOpacity onPress={() => skipToNext()}>
          <Icon name="stepforward" size={35} color="#f25f5c" />
        </TouchableOpacity>
      </MusicControl>
    </Container>
  );
};

const Container = styled.View``;
const styles = StyleSheet.create({
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,

    width: '100%',
    alignItems: 'center',
  },
  sliderTrack: {
    height: 2,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f25f5c',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  mainWrapper: {
    width: width,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
});

const MusicControl = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
