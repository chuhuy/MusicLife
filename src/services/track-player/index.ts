import TrackPlayer from 'react-native-track-player';
import { postSongCounter } from '../../api/explore';
import { continueMusic, pauseMusic, restart, skipMusic } from '../../redux/modules/player/actions';
import { store } from '../../redux/store';

const trackService = async () => {
    const {player} = store.getState();

    TrackPlayer.addEventListener('remote-previous', () => {
        TrackPlayer.skipToPrevious()
            .then(() => {
                store.dispatch(skipMusic(false));
            });
    });

    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play()
            .then(() => {
                store.dispatch(continueMusic())
            })
    });

    TrackPlayer.addEventListener('remote-pause', () => {
        TrackPlayer.pause()
            .then(() => {
                store.dispatch(pauseMusic())
            })
    });

    TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.destroy()
        store.dispatch(continueMusic());
    });

    TrackPlayer.addEventListener('remote-next', () => {
        TrackPlayer.skipToNext()
            .then(() => {
                store.dispatch(skipMusic(true))
            })
    });

    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        console.log('end queue');
        console.log(data);
        let {position, track} = data;

        if (position > 0) {
            postSongCounter(parseInt(track))
                .then((data) => {
                    console.log(data);
                    console.log('post end counter')
                });
                
            if (player.isRepeat) {
                console.log('restart song');
                const currentTracks = await TrackPlayer.getQueue();
    
                TrackPlayer.reset()
                    .then(() => {
                        TrackPlayer.add(currentTracks)
                            .then(() => {
                                store.dispatch(restart());
                                TrackPlayer.play()
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        TrackPlayer.stop();
                        store.dispatch(pauseMusic());
                    })
            } else {
                store.dispatch(pauseMusic());
            }
        }
    });

    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
        let {nextTrack, track, position} = data;  
        console.log('playback track')
        console.log(data)

        if (track && position >= 0) {
            if (nextTrack) {
                TrackPlayer.pause();
                
                postSongCounter(parseInt(track))
                    .then((data) => {
                        console.log(data);
                        console.log('play next song');
                        store.dispatch(skipMusic(true));
                        TrackPlayer.play()
                    })
                    .catch(() => {
                        console.log('post failed');
                    })
            } 
        }
    })
};

export default trackService;
