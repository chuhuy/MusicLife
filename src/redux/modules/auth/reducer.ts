import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    FETCH_CURRENT_USER_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    FETCH_CURRENT_USER_FAILED,
    LOGIN_USERNAME,
    LOGIN_EMAIL,
    LOGIN_FACEBOOK,
    FETCH_CURRENT_USER,
    TOKEN_FROM_STORAGE,
} from './actions';
import {Action} from './../../../models/redux/Action';

const initState = {
    username: null,
    display_name: null,
    validation: false,
    access_token: null,
    error: null,
    refresh_token: null,
    loading: false,
};

export const authReducer = (state: any = initState, action: Action) => {
    switch (action.type) {
        // Set loading
        case LOGIN_USERNAME:
        case LOGIN_EMAIL:
        case LOGIN_FACEBOOK:
        case FETCH_CURRENT_USER:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                loading: false,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                loading: false,
            };
        case LOGIN_FAILED:
        case LOGOUT:
            return {
                username: null,
                access_token: null,
                refresh_token: null,
                loading: false,
            };

        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                display_name: action.payload.display_name,
                loading: false,
            };
        case FETCH_CURRENT_USER_FAILED:
            return {
                ...state,
                loading: false,
            };
        case TOKEN_FROM_STORAGE:
            return {
                ...state,
                refresh_token: action.payload.refresh_token,
            };
        default:
            return state;
    }
};
