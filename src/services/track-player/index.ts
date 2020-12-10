import TrackPlayer from 'react-native-track-player';
import { postSongCounter } from '../../api/explore';
import { stopMusic, restart, skipMusic, togglePlayMusic } from '../../redux/modules/player/actions';
import { store } from '../../redux/store';
import { handleNext, handlePrevious, togglePlay } from '../../shared/helper/player';

const trackService = async () => {
  TrackPlayer.addEventListener('remote-previous', () => {
    handlePrevious();
    console.log('remote previous');
  });

  TrackPlayer.addEventListener('remote-play', () => {
    togglePlay();
    console.log('remote play');
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    togglePlay();
    console.log('remote pause');
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
    store.dispatch(stopMusic());
    console.log('remote stop');
  });

  TrackPlayer.addEventListener('remote-next', () => {
    handleNext();
  });

  TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
    console.log('end queue');
    console.log(data);
    let {position, track} = data;

    if (position > 0) {
      postSongCounter(parseInt(track))
        .then(() => {
          console.log('post counter');
        });
      let {player} = store.getState();

      if (player.isRepeat) {
        const currentTracks = await TrackPlayer.getQueue();

        TrackPlayer.reset()
          .then(() => {
            TrackPlayer.add(currentTracks)
              .then(() => {
                store.dispatch(restart());
                TrackPlayer.play();
              });
          })
          .catch((err) => {
            console.log(err);
            TrackPlayer.stop();
            store.dispatch(togglePlayMusic());
          });
      } else {
        store.dispatch(togglePlayMusic());
      }
    }
  });

  TrackPlayer.addEventListener('playback-track-changed', async (data) => {
    let {nextTrack, track, position} = data;
    console.log('playback track');
    console.log(data);

    if (track && position >= 0) {
      if (nextTrack) {
        let {player} = store.getState();
        let {songs, songIndex} = player;

        let tracks = await TrackPlayer.getQueue();
        let songId = songs[songIndex].music_id.toString();

        if (songId !== tracks[songIndex].id
        || songId === track) {
          const duration = Math.floor(await TrackPlayer.getDuration());
  
          if (Math.floor(position) >= duration * 0.9) {
            postSongCounter(parseInt(track))
                .then(() => {
                  store.dispatch(skipMusic(true));
                  TrackPlayer.play();
                  console.log('post counter');
                });
          }
        }
      }
    }
  });
};

export default trackService;
