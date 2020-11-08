import TrackPlayer from 'react-native-track-player';
import { Song } from '../../models/song';

export const playSong = (song: Song) => {
    const track = {
        id: song.id,
        url: song.url,
        title: song.title,
        artist: song.artist,
        album: song.album || '',
        genre: song.genre || '',
        date: '2020-10-20T07:00:00+00:00',
        artwork: song.image_url,
    };
    TrackPlayer.removeUpcomingTracks().then(() => {
        TrackPlayer.pause();
    })
    .catch(() => {
        TrackPlayer.pause();
    });
    TrackPlayer.add(track).then(() => {
        TrackPlayer.play();
    });
};
