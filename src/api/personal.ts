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

export const fetchPersonalDetail = async (access_token: string) => {
  const query = `
    query {
      personalPlaylist: getPlaylist {
        album_id: playlist_id
        title: name
        image_url
      }
      personalSong: getFavoriteSong {
        music_id
        title
        url
        image_url
        artists
        lyric
      }
      personalAlbum: getFavoriteAlbum {
        album_id
        title
        artists
        image_url
      }
    }
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};

export const fetchPersonalPlaylist = (access_token: string) => {
  const query = `
    query {
      personalPlaylist: getPlaylist {
        album_id: playlist_id
        title: name
        image_url
      }
    }
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
} ;

export const createPlaylist = (access_token: string, playlist_name: string) => {
  const query = `
    mutation {
      createPlaylist(playlist_name: "${playlist_name}")
    }
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};
