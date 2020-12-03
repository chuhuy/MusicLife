import { Song } from "../../../models/song";

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const SKIP = 'SKIP';
export const CONTINUE = 'CONTINUE';
export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const REPEAT = 'REPEAT';
export const SHUFFLE = 'SHUFFLE';

export const playMusic = (songs: Array<Song>) => {
    return {
        type: PLAY,
        payload: songs
    };
};

export const pauseMusic = () => {
    return {
        type: PAUSE
    };
};

export const skipMusic = (isNext: boolean) => {
    return {
        type: SKIP,
        payload: isNext
    };
};

export const continueMusic = () => {
    return {
        type: CONTINUE
    }
}

export const addSong = (songs: Array<Song>) => {
    return {
        type: ADD_SONG,
        payload: songs
    }
}

export const removeSong = (song: Song) => {
    return {
        type: REMOVE_SONG,
        payload: song
    }
}

export const repeat = () => {
    return {
        type: REPEAT
    }
}

export const shuffle = () => {
    return {
        type: SHUFFLE
    }
}
