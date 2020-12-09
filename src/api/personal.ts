import {RESOURCE_URL, PERSONAL} from './../shared/constance/api';
import {API} from './index';

export const commentSong = async (
  content: string,
  music_id: number,
  access_token: string,
) => {
  const query = `
  mutation {
    commentSong(content: "${content}" music_id: ${music_id})
  }`;
  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};
