import React from 'react';
import TrackPlayer from 'react-native-track-player';
import {FlatList, StyleSheet, View} from 'react-native';
import { Song } from '../../../models/song';
import { pauseMusic, playMusic, skipMusic } from '../../../redux/modules/player/actions';
import {Item} from './item'
import { connect } from 'react-redux';

interface Props extends DispatchProps, StateProps {
    navigation: any,
    songs: Array<Song>,
    disableScroll?: boolean
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveSongToStore: (song: Song) => dispatch(skipMusic(song)),
        playMusic: () => dispatch(playMusic()),
        pauseMusic: () => dispatch(pauseMusic()),
    };
};
const mapStateToProps = (state: any) => ({
    // refresh_token: state.auth.refresh_token,
});

const List: React.FunctionComponent<Props> = (props: Props) => {
    const {navigation, songs, disableScroll, saveSongToStore, playMusic, pauseMusic} = props;

    const handlePlayMusic = (song) => {
        console.log('play music')
        const formattedSong: Song = {
            id: song.id,
            title: song.title,
            image_url: song.image_url,
            artist: song.artist,
            url: song.url,
        };
        saveSongToStore(formattedSong);
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
        TrackPlayer.reset()
        .then(() => {
            TrackPlayer.add(track)
            .then(() => {
                TrackPlayer.play()
                .then(() => playMusic())
                .catch(() => pauseMusic());
            })
            .catch(() => {TrackPlayer.pause().then(() => pauseMusic());});
        })
        .catch(() => {TrackPlayer.pause().then(() => pauseMusic());});
        navigation.navigate('Player');
    };

    const handleOpenOption = () => {
        console.log('Opened option');
    };

    const renderItem = (item: Song) => {
        return (
            <Item 
                key={item.id}
                name={item.title}
                image={item.image_url}
                artist={item.artist}
                onClick={() => handlePlayMusic(item)}
                onOptionClick={handleOpenOption}
            />
        )
    }

    return (
        <>
            {
                disableScroll ? 
                    <View style={styles.flatListContainer}>
                        {songs.map((item) => renderItem(item))}
                    </View> 
                    : <FlatList 
                        contentContainerStyle={styles.flatListContainer}
                        data={songs}
                        renderItem={({item}) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                    />
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
    flatListContainer: {
        marginVertical: -7.5
    }
})