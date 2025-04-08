import TrackPlayer, {Capability} from 'react-native-track-player';

const trackPlayerSetup = async (): Promise<void> => {
  await TrackPlayer.setupPlayer();
  // Optional: configure capabilities
  await TrackPlayer.updateOptions({
    capabilities: [Capability.Play, Capability.Pause],
  });
};

export default trackPlayerSetup;
