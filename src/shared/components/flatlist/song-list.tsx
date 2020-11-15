import React from 'react';
import {FlatList} from 'react-native';
import { Song } from '../../../models/song';
import {Item} from './item'

interface Props extends DispatchProps, StateProps {
    navigation: any,
    songs: Array<{
        id: string,
        title: string,
        image_url: string,
        url: string,
        playlist_id: string,
        artists: Array<{
            id: string,
            name: string,
            description: string,
            image_url: string
        }>
    }>
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // saveSongToStore: (song: Song) => dispatch({type: SKIP, payload: song}),
        // playMusic: () => dispatch({type: PLAY}),
        // pauseMusic: () => dispatch({type: PAUSE}),
    };
};
const mapStateToProps = (state: any) => ({
    // refresh_token: state.auth.refresh_token,
});

const List: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, songs} = props;

    const handlePlayMusic = (song) => {
        console.log('play music')
        // const formattedSong: Song = {
        //     id: song.id,
        //     title: song.title,
        //     image_url: song.image_url,
        //     artist: song.artists[0].name,
        //     url: song.url,
        // };
        // props.saveSongToStore(formattedSong);
        // const track = {
        //     id: song.id,
        //     url: song.url,
        //     title: song.title,
        //     artist: song.artists[0].name,
        //     album: song.album || '',
        //     genre: song.genre || '',
        //     date: '2020-10-20T07:00:00+00:00',
        //     artwork: song.image_url,
        // };
        // TrackPlayer.reset()
        // .then(() => {
        //     TrackPlayer.add(track)
        //     .then(() => {
        //         TrackPlayer.play()
        //         .then(() => props.playMusic())
        //         .catch(() => props.pauseMusic());
        //     })
        //     .catch(() => {TrackPlayer.pause().then(() => props.pauseMusic());});
        // })
        // .catch(() => {TrackPlayer.pause().then(() => props.pauseMusic());});
        // navigation.navigate('Player');
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    return (
        <>
            <FlatList 
                data={songs}
                renderItem={({item}) => {
                    let artist = item.artists.reduce((s, artist) => s += `${artist.name}, `, '');
                    artist = artist.substr(0, artist.length - 3);
                    
                    return (
                        <Item 
                            title={item.title}
                            image={item.image_url}
                            artist={artist}
                            onClick={() => handlePlayMusic(item)}
                            onOptionClick={handleOpenOption}
                        />
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </>
    )
}

export default List;

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>