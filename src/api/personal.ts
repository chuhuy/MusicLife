import {RESOURCE_URL, PERSONAL} from './../shared/constance/api';
import {API} from './index';

export const commentSong = async (content: string, music_id: number, access_token: string) => {
  const body = {
    content,
    music_id,
  };
  return API.postWithAccessToken(RESOURCE_URL + PERSONAL, body, access_token);
};
