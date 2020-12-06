/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { getLatestSongs } from '../../../api/explore';
import { Genre } from '../../../models/genre';
import { Playlist } from '../../../models/playlist';
import { Song } from '../../../models/song';
import { BaseScreen } from '../../../shared/components';
import HeaderMainPage from '../../../shared/components/header-main-page';
import { Screen } from '../../../shared/constance/screen';
import { playSong } from '../../../shared/helper/player';
import { album, genre } from './../../../data';
import { pauseMusic, playMusic, skipMusic } from './../../../redux/modules/player/actions';

interface Props extends DispatchProps, StateProps { }

const mapDispatchToProps = (dispatch: any) => {
    return {
        skipMusic: (isNext: boolean) => dispatch(skipMusic(isNext)),
        playMusic: (song: Song) => dispatch(playMusic([song])),
        pauseMusic: () => dispatch(pauseMusic()),
    };
};
const mapStateToProps = (state: any) => ({
    refresh_token: state.auth.refresh_token,
});

const Device: React.FunctionComponent<Props> = (props: Props) => {
    const navigation = useNavigation();
    const {playMusic} = props;

    const [isTop100, setTop100] = useState<boolean>(false);
    const [latestSong, setLatestSong] = useState<Array<Song>>(null);
    const [latestAlbum, setLatestAlbum] = useState<Array<Playlist>>(null);
    const [genreList, setGenreList] = useState<Array<Genre>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getLatestSongs()
            .then((data) => {
                setLatestSong(data.latestSongs);
                setLatestAlbum(data.latestAlbums);
                setGenreList(data.genres);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    const handlePlayMusic = (song: Song) => {
        console.log('play music');
        try {
            playSong([song]);
            playMusic(song);
            navigation.navigate(Screen.Common.Player);
        } catch (err) {
            console.log(err)
            TrackPlayer.pause().then(() => pauseMusic());
        }
    };

    const handleLastestSong = () => {
        navigation.navigate(Screen.Common.Song, {
            songs: latestSong,
            isLatest: true
        })
    };

    const handleLatestAlbum = () => {
        navigation.navigate(Screen.Common.Playlist, {
            isAlbum: true,
            isLatest: true,
            playlist: album
        })
    };

    const handleGenreList = () => {
        // navigation.navigate(Screen.Device.GenreList, { genre })
    }

    return (
        <>
            <BaseScreen isScroll={false}>
                <HeaderMainPage />

                <Text>Device screen</Text>
            </BaseScreen>
        </>
    );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Device);
