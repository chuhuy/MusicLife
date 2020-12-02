import {useNavigation} from '@react-navigation/native';
import React, {Fragment} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import {Song} from '../../../models/song';
import {
    pauseMusic,
    playMusic,
    skipMusic,
} from '../../../redux/modules/player/actions';
import {Screen} from '../../constance/screen';
import ModalBottom from '../modal-bottom';
import { SongOptions } from '../option-list/SongOptions';
import {Item} from './item';

interface Props extends DispatchProps, StateProps {
    songs: Array<Song>;
    disableScroll?: boolean;
    children?: any;
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
    const {
        songs,
        disableScroll,
        saveSongToStore,
        playMusic,
        pauseMusic,
        children,
    } = props;
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [songModal, setSongModal] = React.useState<any>(null);
    const navigation = useNavigation();

    const handlePlayMusic = (song) => {
        console.log('play music');
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
                    .catch(() => {
                        TrackPlayer.pause().then(() => pauseMusic());
                    });
            })
            .catch(() => {
                TrackPlayer.pause().then(() => pauseMusic());
            });
        navigation.navigate(Screen.Common.Player);
    };

    const handleOpenOption = (song) => {
        setSongModal(song);
        setIsVisible(true);
        console.log(song);
    };

    const renderItem = (item: Song) => {
        return (
            <Item
                key={item.id}
                name={item.title}
                image={item.image_url}
                artist={item.artist}
                onClick={() => handlePlayMusic(item)}
                onOptionClick={() => handleOpenOption(item)}
            />
        );
    };

    return (
        <>
            {disableScroll ? (
                <View style={styles.flatListContainer}>
                    {songs.map((item) => renderItem(item))}
                    <View style={styles.flatListFooter}>{children}</View>
                </View>
            ) : (
                <Fragment>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.flatListContainer}
                        data={songs}
                        renderItem={({item}) => renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={children}
                        ListFooterComponentStyle={
                            children && {...styles.flatListFooter}
                        }
                    />
                </Fragment>
            )}
            <ModalBottom
                isVisible={isVisible}
                onHide={() => setIsVisible(false)}
                item={songModal}
            >
                <SongOptions/>
            </ModalBottom>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
    flatListContainer: {
        marginVertical: -10,
    },
    flatListFooter: {
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
