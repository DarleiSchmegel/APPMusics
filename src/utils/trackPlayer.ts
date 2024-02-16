// trackPlayer.js
import TrackPlayer, {Capability} from 'react-native-track-player';

export default async function setupTrackPlayer() {
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

    // await TrackPlayer.add();
    return true;
  } catch (error) {
    console.log('erroqui', error);
    return false;
  }
}
