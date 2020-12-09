import TrackPlayer from 'react-native-track-player';
import {postSongCounter} from '../../api/explore';
import {
  continueMusic,
  pauseMusic,
  restart,
  skipMusic,
} from '../../redux/modules/player/actions';
import {store} from '../../redux/store';

const trackService = async () => {
  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious().then(() => {
      store.dispatch(skipMusic(false));
    });
  });

  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play().then(() => {
      store.dispatch(continueMusic());
    });
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause().then(() => {
      store.dispatch(pauseMusic());
    });
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
    store.dispatch(continueMusic());
  });

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext().then(() => {
      store.dispatch(skipMusic(true));
    });
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
            TrackPlayer.add(currentTracks).then(() => {
              store.dispatch(restart());
              TrackPlayer.play();
            });
          })
          .catch((err) => {
            console.log(err);
            TrackPlayer.stop();
            store.dispatch(pauseMusic());
          });
      } else {
        store.dispatch(pauseMusic());
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
        console.log(songId);
        // console.log(songs[songIndex].music_id);
        // console.log(tracks[songIndex].id)
        if (songId !== tracks[songIndex].id
        || songId === track) {
          const duration = Math.floor(await TrackPlayer.getDuration());
          console.log(duration);
  
          if (Math.floor(position) >= duration * 0.9) {
            postSongCounter(parseInt(track))
                .then(() => {
                  store.dispatch(skipMusic(true));
                  TrackPlayer.play();
                  console.log('post counter');
                });
          }
        }
        

        
        // if (Math.floor(duration) === Math.floor(position)) {
        //   TrackPlayer.pause();
        //   console.log('next');
        //   postSongCounter(parseInt(track))
        //     .then(() => {
        //       console.log('post counter');
        //       store.dispatch(skipMusic(true));
        //       TrackPlayer.play();
        //     })
        //     .catch(() => {
        //       console.log('post failed');
        //     });
        // } else {
        //   console.log('play');
        // }
      }
    }
  });
};

export default trackService;
