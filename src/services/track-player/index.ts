import TrackPlayer from 'react-native-track-player';

const trackService = async () => {
    TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
};

export default trackService;
