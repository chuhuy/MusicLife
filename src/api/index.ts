import axios from 'axios';
import queryString from 'query-string';

export const API = {
    get: async (url: string, param: any) => {
        try {
            const response = await axios.get('https://' + url + queryString.stringify(param));
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    post: async (url: string, body: any) => {
        try {
            const response = await axios.post('https://' + url, body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    graphql: async (url: string, query: any) => {
        try {
            const response = await axios.post('https://' + url, {query: query});
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};
