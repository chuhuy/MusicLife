import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    FETCH_CURRENT_USER_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    FETCH_CURRENT_USER_FAILED,
} from './actions';
import {Action} from './../../../models/redux/Action';

const initState = {
    username: null,
    display_name: null,
    validation: false,
    access_token: null,
    error: null,
    refresh_token: null,
};

export const authReducer = (state: any = initState, action: Action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('Logged in');
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
            };
        case LOGIN_FAILED:
        case LOGOUT:
            return {
                username: null,
                access_token: null,
                refresh_token: null,
            };

        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                display_name: action.payload.display_name,
            };
        case FETCH_CURRENT_USER_FAILED:
            return state;
        default:
            return state;
    }
};
