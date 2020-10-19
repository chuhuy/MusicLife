import { SignInForm } from "../../../models/form/signin";
import { LoginUser } from "../../../models/LoginUser";

//Login
export const LOGIN_USERNAME = 'LOGIN_USERNAME';
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

//Fetch current user
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILED = 'FETCH_CURRENT_USER_FAILED';

//Refresh token
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

//Logout
export const LOGOUT = 'LOGOUT';

export const loginUsername = (user: SignInForm) => {
    return {
        type: LOGIN_USERNAME,
        payload: user
    }
};

export const loginEmail = (user: SignInForm) => {
    return {
        type: LOGIN_EMAIL,
        payload: { 
            email: user.username, 
            password: user.password
        }
    }
};

export const loginSuccess = ({
    username,
    access_token,
    refresh_token,
}:  LoginUser) => {
    return {
        type: LOGIN_SUCCESS,
        payload: { username, access_token, refresh_token }
    }
};

export const loginFailed = error => {
    return {
        type: LOGIN_FAILED,
        payload: { error }
    }
};