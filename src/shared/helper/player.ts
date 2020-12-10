import TrackPlayer from 'react-native-track-player';
import {Song} from '../../models/song';
import {store} from '../../redux/store';
import {
  addSong,
  playChosenSong,
  playMusic,
  removeSong,
	restart,
  skipMusic,
  togglePlayMusic,
} from '../../redux/modules/player/actions';

// Handle controller
export const togglePlay = async () => {
  const {player} = store.getState();
	console.log('toggle Play');
  if (player.isPlaying) {
    TrackPlayer.pause()
      .then(() => {
        store.dispatch(togglePlayMusic());
      })
      .catch((error) => console.log(error));
  } else {
    const getPosition = TrackPlayer.getPosition();
    const getDuration = TrackPlayer.getDuration();
    
    try {
			Promise.all([getPosition, getDuration])
				.then((value) => {
					if (Math.floor(value[0]) >= Math.floor(value[1])) {
            resetQueue();
					} else {
            TrackPlayer.play()
              .then(() => {
                store.dispatch(togglePlayMusic());
              });
          }
				});
    } catch (err) {
      console.log(err);
      TrackPlayer.pause();
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
                  let {player} = store.getState();

                  if (player.isPlaying) {
                    store.dispatch(togglePlayMusic());
                  }
                });
            });
          });
    });
};

export const handleNext = async () => {
  TrackPlayer.skipToNext()
    .then(() => {
      console.log('next');
      TrackPlayer.play()
        .then(() => {
          store.dispatch(skipMusic(true));
        })
        .catch((err) => {
          console.log(err);
          TrackPlayer.pause()
            .then(() => {
              let {player} = store.getState();

              if (player.isPlaying) {
                store.dispatch(togglePlayMusic());
              }
            });
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
              let {player} = store.getState();
              if (!player.isPlaying) {
                store.dispatch(togglePlayMusic());
              }
            });
        });
    }
  });
};

export const playSong = async (songs: Array<Song>) => {
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
    TrackPlayer.pause()
      .then(() => {
        let {player} = store.getState();

        if (player.isPlaying) {
          store.dispatch(togglePlayMusic());
        }
      });
  }
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
            if (player.isPlaying) {
              store.dispatch(togglePlayMusic());
            }
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

export const playSongNowPlaying = (index: number) => {
  let {player} = store.getState();
  let {songIndex} = player;
  let remainSongs = index - songIndex;

  if (remainSongs > 0) {
    while (remainSongs--) {
      TrackPlayer.skipToNext();
    }
  } else {
    while (remainSongs++) {
      TrackPlayer.skipToPrevious();
    }
  }

  TrackPlayer.play()
    .then(() => {
      store.dispatch(playChosenSong(index));
    })
    .catch(err => {
      console.log(err);
    });
};
