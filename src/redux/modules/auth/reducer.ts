import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    FETCH_CURRENT_USER,
    REFRESH_TOKEN_SUCCESS,
} from './actions';
import {Action} from './../../../models/redux/Action';

const initState = {
    user: null,
    token: null,
    error: null,
    refresh_token: null,
}

export const authReducer = (state: any = initState, action: Action) => {
    switch (action.type) {
        case LOGIN:
        case REFRESH_TOKEN_SUCCESS:
            console.log("Logged in")
            return {
                ...state,
                token: action.payload.token,
                refresh_token: action.payload.refresh_token,
            };
        
        case LOGIN_FAILED:
        case LOGOUT:
            return {
                user: null,
                token: null,
                refresh_token: null,
            };

        case FETCH_CURRENT_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        default:
            return state;
    }
}