import { Song } from "../../../models/song";

export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const SKIP = 'SKIP';

export const playMusic = () => {
    return {
        type: PLAY
    };
};

export const pauseMusic = () => {
    return {
        type: PAUSE
    };
};

export const skipMusic = (song: Song) => {
    return {
        type: SKIP,
        payload: song
    };
};
