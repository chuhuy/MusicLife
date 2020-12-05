import { PLAY, PAUSE, SKIP, ADD_SONG, CONTINUE, REMOVE_SONG, REPEAT, SHUFFLE, RESTART, STOP } from './actions';
import { Action } from './../../../models/redux/Action';

const initialState = {
    isPlaying: false,
    songs: [],
    songIndex: null,
    isRepeat: false,
    isShuffle: false
};

export const playerReducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
        case PLAY:
            return {
                ...state,
                isPlaying: true,
                songIndex: 0,
                songs: action.payload
            };
        case PAUSE:
            return {
                ...state,
                isPlaying: false
            };
        case SKIP:
            const {songIndex, songs, isRepeat, isPlaying} = state;
            const {isNext} = action.payload;
            let isPlay = true;
            let newIndex;
            console.log('skip reducer')

            if (isNext) {
                newIndex = songIndex === songs.length - 1 ? 0 : songIndex + 1;
                
                if (newIndex === 0 && !isRepeat) {
                    isPlay = false;
                } else isPlay = true;
            } else {
                newIndex = songIndex <= 0 ? songs.length - 1 : 0;
                isPlay = true;
            }

            let newState = {
                ...state,
                songIndex: newIndex,
            }

            return isPlay !== isPlaying ? {...newState, isPlaying: isPlay} : newState;
        case CONTINUE: 
            return {
                ...state,
                isPlaying: true
            }
        case ADD_SONG: {
            const {songs} = state;
            const newSongs = action.payload;
            let isAdd = false;

            for (let i = 0; i < newSongs.length; i++) {
                const index = songs.findIndex(song => song.music_id === newSongs[i].music_id);

                if (index === -1) {
                    songs.push(newSongs[i]);
                    isAdd = true;
                }
            }
            
            if (isAdd) {
                return {
                    ...state,
                    songs: [...songs]
                }
            }
        }
        case REMOVE_SONG: {
            let removeSong = action.payload;
            let {songs, isPlaying} = state;

            songs = songs.filter(song => removeSong.music_id !== song.music_id);
            if (!songs.length) isPlaying = false;

            return {
                ...state,
                songs: [...songs],
                isPlaying
            }
        }
        case REPEAT: 
            return {
                ...state,
                isRepeat: !state.isRepeat
            }   
        case SHUFFLE:{
            let {isShuffle, songs} = state;
            if (songs.length === 1) {
                return {
                    ...state,
                    isShuffle: !state.isShuffle,
                }  
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
                songs: [...songs]
            }  
        } 
        case RESTART: 
            return {
                ...state,
                songIndex: 0
            }
        case STOP: 
            return {
                ...state,
                songs: [],
                songIndex: null,
                isPlaying: false
            }
        default:
            return state;
    }
};
