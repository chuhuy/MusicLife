import {
  PLAY,
  PAUSE,
  SKIP,
  ADD_SONG,
  CONTINUE,
  REMOVE_SONG,
  REPEAT,
  SHUFFLE,
  RESTART,
  STOP,
} from './actions';
import {Action} from './../../../models/redux/Action';

const initialState = {
  isPlaying: false,
  songs: [],
  songIndex: null,
  isRepeat: false,
  isShuffle: false,
};

export const playerReducer = (state: any = initialState, action: Action) => {
  let {songs} = state;
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        isPlaying: true,
        songIndex: 0,
        songs: action.payload,
      };
    case PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case SKIP:
      let {songIndex} = state;
      let {isNext} = action.payload;
      let newIndex;

      if (isNext) {
        newIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1;
      } else {
        newIndex = songIndex <= 0 ? songs.length - 1 : 0;
      }

      return {
        ...state,
        songIndex: newIndex,
      };
    case CONTINUE:
      return {
        ...state,
        isPlaying: true,
      };
    case ADD_SONG: {
      const newSongs = action.payload;
      let isAdd = false;

      for (let i = 0; i < newSongs.length; i++) {
        const index = songs.findIndex(
          (song) => song.music_id === newSongs[i].music_id,
        );

        if (index === -1) {
          songs.push(newSongs[i]);
          isAdd = true;
        }
      }

      if (isAdd) {
        return {
          ...state,
          songs: [...songs],
        };
      }
    }
      break;
    case REMOVE_SONG: {
      let removeSong = action.payload;
      let {isPlaying} = state;

      songs = songs.filter((song) => removeSong.music_id !== song.music_id);
      if (!songs.length) {
        isPlaying = false;
      }

      return {
        ...state,
        songs: [...songs],
        isPlaying,
      };
    }
    case REPEAT:
      return {
        ...state,
        isRepeat: !state.isRepeat,
      };
    case SHUFFLE: {
      let {isShuffle} = state;
      if (songs.length === 1) {
        return {
          ...state,
          isShuffle: !state.isShuffle,
        };
      }

      if (isShuffle) {
        songs.sort();
      } else {
        for (let i = songs.length - 1; i > 0; i--) {
          // Generate random number
          let j = Math.floor(Math.random() * (i + 1));

          let temp = songs[i];
          songs[i] = songs[j];
          songs[j] = temp;
        }
      }

      return {
        ...state,
        isShuffle: !state.isShuffle,
        songs: [...songs],
      };
    }
    case RESTART:
      return {
        ...state,
        songIndex: 0,
        isPlaying: true,
      };
    case STOP:
      return {
        ...state,
        songs: [],
        songIndex: null,
        isPlaying: false,
      };
    default:
      return state;
  }
};
