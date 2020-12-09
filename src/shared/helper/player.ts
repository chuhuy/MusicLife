import TrackPlayer from 'react-native-track-player';
import {Song} from '../../models/song';
import {store} from '../../redux/store';
import {
  addSong,
  continueMusic,
  pauseMusic,
  playMusic,
  removeSong,
	restart,
  skipMusic,
} from '../../redux/modules/player/actions';

// Handle controller
export const togglePlay = async () => {
  const {player} = store.getState();
	
  if (player.isPlaying) {
    TrackPlayer.pause()
      .then(() => {
        store.dispatch(pauseMusic());
      })
      .catch((error) => console.log(error));
  } else {
    const getBufferedPostion = TrackPlayer.getBufferedPosition();
    const getDuration = TrackPlayer.getDuration();
    
    try {
			Promise.all([getBufferedPostion, getDuration])
				.then((value) => {
					if (value[0] === value[1]) {
            resetQueue();
					} else {
            TrackPlayer.play()
              .then(() => {
                store.dispatch(continueMusic());
              });
          }
				});
    } catch (err) {
      console.log(err);
      TrackPlayer.pause();
      store.dispatch(pauseMusic());
    }
  }
};

export const handlePrevious = () => {
  TrackPlayer.skipToPrevious()
      .then(() => {
          store.dispatch(skipMusic(false));
          console.log('play');
          TrackPlayer.play();
      })
      .catch((e) => {
          console.log(e);
          TrackPlayer.seekTo(0)
            .then(() => {
              TrackPlayer.play()
                .catch((err) => {
                  console.log(err);
                  TrackPlayer.pause()
                    .then(() => {
                      store.dispatch(pauseMusic());
                    });
                });
              });
      });
};

export const handleNext = async () => {
  TrackPlayer.skipToNext()
    .then(() => {
      console.log('next')
      TrackPlayer.play()
        .then(() => {
          store.dispatch(skipMusic(true));
        })
        .catch((err) => {
          console.log(err);
          TrackPlayer.pause()
            .then(() => {
              store.dispatch(pauseMusic())
            })
        });
    })
    .catch((e) => {
        console.log(e);
        
        resetQueue();
    });
};

const resetQueue = async () => {
  TrackPlayer.getQueue().then((data) => {
    let tracks = data;
    if (tracks.length > 1) {
      TrackPlayer.reset().then(() => {
        TrackPlayer.add(tracks)
          .then(() => {
            TrackPlayer.play()
              .then(() => {
                store.dispatch(restart());
              });
          });
      });
    } else {
      TrackPlayer.seekTo(0)
        .then(() => {
          TrackPlayer.play()
            .then(() => {
              store.dispatch(continueMusic());
            });
        });
    }
  });
};

export const playSong = (songs: Array<Song>) => {
  let tracks = songs.map((song) => {
    return {
      id: song.music_id.toString(),
      url: song.url,
      title: song.title,
      artist: song.artists,
      album: song.album || '',
      genre: song.genre || '',
      date: '2020-10-20T07:00:00+00:00',
      artwork: song.image_url,
    };
  });

  try {
    if (songs.length) {
      TrackPlayer.reset();
    }

    TrackPlayer.add(tracks)
      .then(() => {
        TrackPlayer.play()
          .then(() => {
            store.dispatch(playMusic(songs));
          });
      });

    
  } catch (err) {
    console.log(err);
  }
};

export const getNotExistSongs = (oldSongs: any, newSongs: Array<Song>) => {
  let bigList = oldSongs.length >= newSongs.length ? oldSongs : newSongs;
  let smallLsit = oldSongs.length >= newSongs.length ? newSongs : oldSongs;

  let newList = bigList.filter((song) => {
    let isExist = false;
    for (let i = 0; i < smallLsit.length; i++) {
      let id = smallLsit[i].music_id || smallLsit[i].id;
      let newId = song.id || song.music_id;
      
      if ( newId == id) {
        isExist = true;
        break;
      }
    }
  
    return !isExist;
  });

  return newList;
};

export const addSongs = async (songs: Array<Song>) => {
  let tracks = songs.map((song) => {
    return {
      id: song.music_id.toString(),
      url: song.url,
      title: song.title,
      artist: song.artists,
      album: song.album || '',
      genre: song.genre || '',
      date: '2020-10-20T07:00:00+00:00',
      artwork: song.image_url,
    };
  });

  TrackPlayer.add(tracks)
    .then(() => {
      store.dispatch(addSong(songs));
    })
    .catch((err) => {
      throw err;
    });
};

export const removeSongs = async (song: Song) => {
  let {player} = store.getState();
  let {songIndex, songs} = player;

  try {
    TrackPlayer.remove(song.music_id.toString());

    if (songs[songIndex].music_id === song.music_id) {
      if (songs.length === 1) {
        TrackPlayer.pause()
          .then(() => {
            store.dispatch(pauseMusic());
          });
      } else {
        TrackPlayer.skipToNext()
          .then(() => {
            TrackPlayer.play();
          });
      }
    }

    store.dispatch(removeSong(song));
  } catch (err) {
    console.log(err);
  }
};
