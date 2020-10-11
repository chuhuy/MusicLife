import { API } from './index';
import { AUTH_URL, SIGNIN } from './../shared/constance/api';

export const signinWithEmail = (email: string, password: string) => {
    const body = {
        email: email,
        password: password,
    };
    // return axios({
    //     method: 'POST',
    //     url: AUTH_URL + SIGNIN,
    //     params: body,
    // });
    return API.post(AUTH_URL + SIGNIN, body);
};

export const signinWithUsername = async (username: string, password: string) => {
    const body = {
        username: username,
        password: password,
    };
    return API.post(AUTH_URL + SIGNIN, body);
};
