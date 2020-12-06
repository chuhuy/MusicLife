import {API} from './index';
import {
  AUTH_URL,
  REGISTER,
  SIGNIN,
  SIGNINFB,
  ME,
  TOKEN,
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

export const me = async (refresh_token: string) => {
  return API.postWithRefreshToken(AUTH_URL + ME, {}, refresh_token);
};

export const token = async (refresh_token: string) => {
  return API.postWithRefreshToken(AUTH_URL + TOKEN, {}, refresh_token);
};
