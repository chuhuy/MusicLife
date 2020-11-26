import { API } from './index';
import { RESOURCE_URL, EXPLORE } from './../shared/constance/api';

export const getLatestSongs = () => {
    const query = `
        query {
            latestSongs(first: 5, offset: 0) {
                music_id
                title
                url
                image_url
                artists
                lyric
            }
        }
    `;
    return API.graphql(RESOURCE_URL + EXPLORE, query);
};
