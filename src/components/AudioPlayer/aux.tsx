const setupPlayer = async () => {
  console.log('Player');
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    // if (songs) {
    //   // console.log('songs', songs);
    // }
    const track = {
      id: 4,
      title: 'Book The Rental Wit It',
      artist: 'RAGE',
      artwork: require('../assets/img1.jpg'),
      url: '/data/user/0/com.appmusics/files/songs/YykjpeuMNEk.mp3',
    };
    // await TrackPlayer.add([track]);
  } catch (error) {
    console.log(error);
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(currentTrack, playBackState, State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }
};