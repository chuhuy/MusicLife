import { string } from 'yup';
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

export const postFavoriteSong = (access_token: string, music_id: number) => {
  const query = `
    mutation {
      addFavoriteSong(music_id: ${music_id})
    } 
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};

export const fetchIsFavoriteSong = (access_token: string, music_id: number) => {
  console.log(access_token)
  const query = `
    query {
      isFavoriteSong(music_id: ${music_id})
    } 
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};

export const postFavoriteAlbum = (access_token: string, album_id: number) => {
  const query = `
    mutation {
      addFavoriteAlbum(album_id: ${album_id})
    } 
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};

export const fetchIsFavoriteAlbum = (access_token: string, album_id: number) => {
  const query = `
    query {
      isFavoriteAlbum(album_id: ${album_id})
    } 
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};

export const addSongToPlaylist = (access_token: string, music_id: number, playlist_id: number) => {
  const query = `
    mutation {
      addSongToPlaylist(music_id: ${music_id} playlist_id: ${playlist_id})
    } 
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};

export const fetchSongByPlaylist = (access_token: string, playlist_id: number) => {
  const query = `
    songs: getSongByPlaylist(playlist_id: ${playlist_id}) {
      music_id
      title
      url
      image_url
      artists
      lyric
    }
  `;

  return API.graphql(RESOURCE_URL + PERSONAL, query, access_token);
};
