import { API } from './index';
import { RESOURCE_URL, EXPLORE } from '../shared/constance/api';
import { ALBUM_GENRE_ITEM, SONG_GENRE_ITEM } from '../shared/constance/pagination';

export const getLatestSongs = () => {
    const query = `
        query {
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
            genres(first: 4 offset: 0) {
                genre_id
                name
                image_url
            }   
        }
    `;
    return API.graphql(RESOURCE_URL + EXPLORE, query);
};

export const fetchAlbumDetail = (album_id: number) => {
    const query = `
        query {
            songsByAlbum (album_id: ${album_id}) {
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
}

export const fetchTop100 = (genre_id: number) => {
    const query = `
        query {
            top100(genre_id: ${genre_id}) {
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
}

export const fetchMusicChart = (area: string) => {
    const query = `
        query {
            chart(area: ${area}) {
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
}

export const fetchLatestSong = (first: number, offset: number) => {
    const query = `
        query {
            latestSongs(first: ${first} offset: ${offset}) {
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
}

export const fetchAblumByGenre = (genre_id: number, first?: number, offset?: number) => {
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
}

export const fetchSongByGenre = (genre_id: number, first?: number, offset?: number) => {
    if (!first) first = SONG_GENRE_ITEM;
    if (!offset) offset = 0;

    const query = `
        query {
            songsByGenre (first: ${first} offset: ${offset} genre_id: ${genre_id}) {
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
}

export const fetchGenreDetail = (genre_id: number) => {
    // console.log(SONG_GENRE_ITEM)
    const query = `
        query {
            songsByGenre (first: ${SONG_GENRE_ITEM} offset: 0 genre_id: ${genre_id}) {
                music_id
                title
                url
                image_url
                artists
                lyric
            }
            albumsByGenre(first: ${ALBUM_GENRE_ITEM} offset: 0 genre_id: ${genre_id}) {
                album_id
                title
                release_date
                image_url
                artists
            }
        }
    `;

    return API.graphql(RESOURCE_URL + EXPLORE, query);
}

export const postSongCounter = (music_id: number) => {
    console.log(music_id)
    const mutation = `
        mutation {
            code: songCounter(music_id: ${music_id})
        }
    `
    
    return API.graphql(RESOURCE_URL + EXPLORE, mutation);
}
