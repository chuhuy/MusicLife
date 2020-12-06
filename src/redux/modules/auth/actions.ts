import {SignInForm} from '../../../models/form/signin';
import {LoginUser} from '../../../models/LoginUser';
import {ReduxCallbacks} from '../../../models/redux/ReduxCallback';

//Login
export const LOGIN_USERNAME = 'LOGIN_USERNAME';
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
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

export const TOKEN_FROM_STORAGE = 'TOKEN_FROM_STORAGE';

export const loginUsername = (user: SignInForm, callbacks?: ReduxCallbacks) => {
  return {
    type: LOGIN_USERNAME,
    payload: {...user, callbacks},
  };
};

export const loginEmail = (user: SignInForm, callbacks?: ReduxCallbacks) => {
  return {
    type: LOGIN_EMAIL,
    payload: {
      email: user.username,
      password: user.password,
      callbacks,
    },
  };
};

export const loginFacebook = (
  access_token: string,
  callbacks?: ReduxCallbacks,
) => {
  return {
    type: LOGIN_FACEBOOK,
    payload: {
      access_token,
      callbacks,
    },
  };
};

export const loginSuccess = ({
  username,
  access_token,
  refresh_token,
  display_name,
  image_url,
  default_avatar,
}: LoginUser) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      username,
      access_token,
      refresh_token,
      display_name,
      image_url,
      default_avatar,
    },
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    payload: {error},
  };
};

export const fetchUserSuccess = ({display_name, image_url, default_avatar}) => {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: {
      display_name,
      image_url,
      default_avatar,
    },
  };
};

export const fetchUserFailed = (error) => {
  return {
    type: FETCH_CURRENT_USER_FAILED,
    payload: {error},
  };
};
