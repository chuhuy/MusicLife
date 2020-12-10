import {API} from './index';
import {
  AUTH_URL,
  REGISTER,
  SIGNIN,
  SIGNINFB,
  ME,
  TOKEN,
  CHANGE_PASSWORD,
  CHANGE_DISPLAY_NAME,
  FORGOT,
} from './../shared/constance/api';

export const signinWithEmail = (email: string, password: string) => {
  const body = {
    email,
    password,
  };
  return API.post(AUTH_URL + SIGNIN, body);
};

export const signinWithUsername = async (
  username: string,
  password: string,
) => {
  const body = {
    username,
    password,
  };
  return API.post(AUTH_URL + SIGNIN, body);
};

export const signinWithFacebook = async (access_token: string) => {
  return API.post(AUTH_URL + SIGNINFB, {access_token});
};

export const register = async (
  username: string,
  password: string,
  display_name: string,
  email: string,
) => {
  const body = {
    username,
    password,
    display_name,
    email,
  };

  return API.post(AUTH_URL + REGISTER, body);
};

export const me = async (refresh_token?: string) => {
  if (refresh_token)
    {return API.postWithRefreshToken(AUTH_URL + ME, {}, refresh_token);}
  else {return API.postWithRefreshToken(AUTH_URL + ME, {});}
};

export const token = async (refresh_token: string) => {
  return API.postWithRefreshToken(AUTH_URL + TOKEN, {}, refresh_token);
};

export const changePassword = async (
  old_password: string,
  new_password: string,
) => {
  const body = {
    old_password,
    new_password,
  };
  return API.postWithAccessToken(AUTH_URL + CHANGE_PASSWORD, body);
};

export const changeDisplayName = async (display_name: string) => {
  const body = {
    display_name,
  };
  return API.postWithAccessToken(AUTH_URL + CHANGE_DISPLAY_NAME, body);
};

export const forgotPassword = async (email: string) => {
  const body = {
    email,
  };

  return API.post(AUTH_URL + FORGOT, body);
};
