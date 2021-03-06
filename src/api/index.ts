import axios from 'axios';
import queryString from 'query-string';
import {store} from './../redux/store';

export const API = {
  get: async (url: string, param: any) => {
    try {
      const response = await axios.get(
        'http://' + url + queryString.stringify(param),
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  post: async (url: string, body: any) => {
    try {
      const response = await axios.post('http://' + url, body);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  graphql: async (url: string, query: any, access_token?: string) => {
    try {
      if (access_token) {
        const response = await axios.post(
          'http://' + url,
          {query: query},
          {
            headers: {
              Authorization:
                'Bearer ' + access_token,
            },
          },
        );
        return response.data.data;
      } else {
        const response = await axios.post('https://' + url, {query: query});
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  postWithAccessToken: async (
    url: string,
    body: any,
    access_token?: string,
  ) => {
    const {auth} = store.getState();
    console.log(auth.access_token);
    try {
      const response = await axios.post('http://' + url, body, {
        headers: {
          Authorization:
            'Bearer ' + (access_token ? access_token : auth.access_token),
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  postWithRefreshToken: async (
    url: string,
    body: any,
    refresh_token?: string,
  ) => {
    const {auth} = store.getState();
    try {
      const response = await axios.post('http://' + url, body, {
        headers: {
          Authorization:
            'Bearer ' + (refresh_token ? refresh_token : auth.refresh_token),
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
