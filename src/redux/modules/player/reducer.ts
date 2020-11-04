import { PLAY, PAUSE, SKIP } from './actions';
import { Action } from './../../../models/redux/Action';

const initialState = {
    isPlaying: false,
    name: '',
    artist: '',
    url: '',
    id: 0,
    image_url: '',
};

export const playerReducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
        case PLAY:
            return {
                ...state,
                isPlaying: true,
            };
        case PAUSE:
            return {
                ...state,
                isPlaying: false,
            };
        case SKIP:
            return {
                id: action.payload.id,
                name: action.payload.name,
                artist: action.payload.artist,
                url: action.payload.url,
                image_url: action.payload.image_url,
            };
        default:
            return state;
    }
};
