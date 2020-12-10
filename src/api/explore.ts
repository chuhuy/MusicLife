import {API} from './index';
import {RESOURCE_URL, EXPLORE} from '../shared/constance/api';
import {
  ALBUM_GENRE_ITEM,
  SONG_GENRE_ITEM,
} from '../shared/constance/pagination';

export const fetchExplore = () => {
  const query = `
    query {
      top100: top100List {
        album_id: genre_id
        title: name
        image_url
      }
      latestSongs(first: 4 offset: 0) {
        music_id
        title
        url
        image_url
        artists
        lyric
      }
      latestAlbums(first: 10 offset: 0) {
        album_id
        title
        release_date
        image_url
        artists
      }
    }
  `;
  return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchAlbumDetail = (album_id: number) => {
  const query = `
    query {
      songs: songsByAlbum (album_id: ${album_id}) {
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

export const fetchTop100 = (genre_id: number) => {
  const query = `
    query {
      songs: top100(genre_id: ${genre_id}) {
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

export const fetchMusicChart = (area: string) => {
  const query = `
    query {
      songs: chart(area: ${area}) {
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

export const fetchLatestSong = () => {
  const query = `
    query {
      songs: latestSongs(first: 10 offset: 0) {
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

export const fetchAblumByGenre = (
  genre_id: number,
  first?: number,
  offset?: number,
) => {
  if (!first) first = ALBUM_GENRE_ITEM;
  if (!offset) offset = 0;

  const query = `
    query {
      albumsByGenre(first: ${first} offset: ${offset} genre_id: ${genre_id}) {
        album_id
        title
        release_date
        image_url
        artists
      }
    }
  `;

  return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchSongByGenre = (
  genre_id: number,
  first?: number,
  offset?: number,
) => {
  if (!first) first = SONG_GENRE_ITEM;
  if (!offset) offset = 0;

  const query = `
    query {
      songs: songsByGenre (first: ${first} offset: ${offset} genre_id: ${genre_id}) {
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

export const fetchGenreDetail = (genre_id: number) => {
  const query = `
    query {
      songsByGenre (first: 3 offset: 0 genre_id: ${genre_id}) {
        music_id
        title
        url
        image_url
        artists
        lyric
      }
    albumsByGenre(first: 5 offset: 0 genre_id: ${genre_id}) {
      album_id
      title
      release_date
      image_url
      artists
    }
  }
`;

  return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const postSongCounter = (music_id: number) => {
  const mutation = `
        mutation {
            code: songCounter(music_id: ${music_id})
        }
    `;

  return API.graphql(RESOURCE_URL + EXPLORE, mutation);
};

export const fetchGenres = (first?: number, offset?: number) => {
  const limit = first ? `(first: ${first} offset: ${offset})` : '';

  const query = `
    query {
      genres ${limit}{
        genre_id
        name
        image_url
      }
    }  
  `;

  return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchSearchResult = (keyword: string) => {
  const query = `
    query {
      songs: searchBySong(keyword: "${keyword}") {
        music_id
        title
        url
        image_url
        artists
        lyric
      }
      artists: searchByArtist(keyword: "${keyword}") {
        artist_id
        name
        description
        image_url
      }
      albums: searchByAlbum(keyword: "${keyword}") {
        album_id
        title
        release_date
        image_url
        artists
      }
    }  
  `;

  return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchComment = (music_id: number) => {
  const query = `
    query {
      comments: getComments(music_id: ${music_id}) {
        comment_id
        content
        created_at
        display_name
        image_url
        default_avatar
      }
    }  
  `;

  return API.graphql(RESOURCE_URL + EXPLORE, query);
};
