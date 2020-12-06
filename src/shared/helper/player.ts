import TrackPlayer from 'react-native-track-player';
import { Song } from '../../models/song';
import { store } from '../../redux/store';
import { addSong } from '../../redux/modules/player/actions';

export const playSong = (songs: Array<Song>) => {
    let tracks = songs.map(song => {
        return ({
            id: song.music_id.toString(),
            url: song.url,
            title: song.title,
            artist: song.artists,
            album: song.album || '',
            genre: song.genre || '',
            date: '2020-10-20T07:00:00+00:00',
            artwork: song.image_url,
        })
    })

    TrackPlayer.reset()
        .then(() => {
            TrackPlayer.add(tracks).then(() => {
                TrackPlayer.play()
                    .then(() => {
                        console.log('play')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        })
        .catch((err) => {
            throw err;
        })
};

export const getNotExistSongs = (oldSongs: any, newSongs: Array<Song>) => {
    let bigList = oldSongs.length >= newSongs.length ? oldSongs : newSongs;
    let smallLsit = oldSongs.length >= newSongs.length ? newSongs : oldSongs;

    let newList = bigList.filter(song => {
        let isExist = false;
        for (let i = 0; i < smallLsit.length; i++) {
            let id = smallLsit[i].music_id | smallLsit[i].id
            if (song.id == id || song.music_id === id) {
                isExist = true;
                break;
            }
        }

        return !isExist;
    })

    return newList;
}

export const addSongs = async (songs: Array<Song>) => {
    let tracks = songs.map(song => {
        return {
            id: song.music_id.toString(),
            url: song.url,
            title: song.title,
            artist: song.artists,
            album: song.album || '',
            genre: song.genre || '',
            date: '2020-10-20T07:00:00+00:00',
            artwork: song.image_url,
        }
    })
    
    TrackPlayer.add(tracks)
        .then(() => {
            store.dispatch(addSong(songs))
        })
        .catch(err => {
            throw err;
        })
}

export const removeSongs = async (oldSongs: any, newSongs: Array<Song>) => {
    let removeList = getNotExistSongs(oldSongs, newSongs);

    if (removeList.length) {
        let tracks = removeList.map(song => song.music_id.toString() || song.id);

        TrackPlayer.remove(tracks)
            .catch(err => {
                throw err;
            })
    }
}
